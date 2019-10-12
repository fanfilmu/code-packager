import { expect } from "chai";
import * as fs from "fs";
import * as glob from "glob";

import { RubyPackagerInputs, CodePackagerOutputs } from "../../src/interfaces";
import { removeDir } from "../../src/drivers/common";
import { CodePackager } from "../../src/main";

describe("with Ruby Driver", () => {
  const inputs: RubyPackagerInputs = {
    driver: "ruby",
    code: {
      root: "tests/fixtures/ruby-app",
      src: "tests/fixtures/ruby-app/src",
    }
  }

  const codePackager = new CodePackager();
  let result: Partial<CodePackagerOutputs> = {};

  beforeEach(async function() {
    this.timeout(4000);
    await codePackager.init();
    result = await codePackager.default(inputs);
  });

  afterEach(async () => {
    if (result.path) {
      await removeDir(result.path);
    }
  });

  it("copies the src files over", () => {
    expect(fs.existsSync(result.path + "/hello.rb")).to.be.true;
  });

  it("loads proper gem", () => {
    glob(result.path + "/vendor/bundle/ruby/*/gems/*", (error, matches) => {
      expect(error).to.be.null;

      expect(matches.length).to.eq(1);
      expect(matches[0]).to.match(/jwt/);
    });
  });
});
