import { utils } from "@serverless/core";
import * as path from "path";

import { RubyPackagerInputs, CodePackagerDriver } from "../interfaces";
import { createBuildDirectory, safeExec, removeDir } from "./common";

const withDefaults = (inputs: Partial<RubyPackagerInputs>): RubyPackagerInputs => {
  return {
    driver: "ruby",
    code: {
      root: inputs.code && inputs.code.root || process.cwd(),
      src: inputs.code && inputs.code.src || process.cwd(),
    }
  }
}

const rubyDriver: CodePackagerDriver<RubyPackagerInputs> = async (context, inputs) => {
  context.status("Preparing build");

  const fullInputs = withDefaults(inputs);
  const buildDir = createBuildDirectory(".ruby-build-dir");

  context.debug(`Copying source files from ${fullInputs.code.src} to ${buildDir}`);
  utils.copyDir(fullInputs.code.src, buildDir);

  const bundlePath = path.join(buildDir, 'vendor', 'bundle');
  context.debug(`Bundling dependencies in ${bundlePath}.`);

  const runOptions = { cwd: fullInputs.code.root };
  const bundleCommand = `bundle install --without development test --path ${bundlePath}`;

  try {
    await safeExec(bundleCommand, runOptions);
    await removeDir(path.join(fullInputs.code.root, '.bundle'));
  } catch(error) {
    throw new Error(
      `Failed bundling dependencies via "${bundleCommand}" due to the following error: "${error}"`
    );
  }

  return { path: buildDir };
}

export default rubyDriver;
