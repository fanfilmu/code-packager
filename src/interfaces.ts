import { ComponentContext } from "@serverless/core";

export interface BasePackagerInputs {
  /**
   * Defines paths to the source code
   */
  code: {
    /**
     * Root path to the code directory - a place where
     * the bundling scripts are run.
     * 
     * @default Current working directory
     */
    root: string,
    /**
     * Path to the actual source code of the application.
     * In case of monorepos, might be a subdirectory of
     * the root.
     * 
     * @default Current working directory
     */
    src: string,
  };
}

export interface RubyPackagerInputs extends BasePackagerInputs {
  /**
   * Name of the driver
   */
  driver: "ruby"; 
}

export interface CodePackagerOutputs {
  /**
   * Path to the directory with packaged code.
   */
  path: string;
}

export type CodePackagerDriver<T> = (context: ComponentContext, inputs: Partial<T>) => Promise<CodePackagerOutputs>;
