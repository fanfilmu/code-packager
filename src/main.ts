import { Component } from "@serverless/core";
import { RubyPackagerInputs, CodePackagerOutputs } from "./interfaces";

import rubyDriver from "./drivers/ruby";

type CodePackagerInputs = RubyPackagerInputs;

export default class CodePackager extends Component {
  async default(inputs: Partial<CodePackagerInputs>): Promise<CodePackagerOutputs> {
    switch(inputs.driver) {
      case "ruby":
        return rubyDriver(this.context, inputs);
      default:
        throw `Expected "driver" option to contain one of: "ruby", but got: "${inputs.driver}"`;
    }
  }
}
