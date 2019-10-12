declare module "@serverless/core" {
  interface ComponentContext {
    /**
     * Sets the component status.
     * @param name Name of the status
     */
    status(name: string): void;

    /**
     * Prints debug message to be displayed when deploying
     * with --debug flag.
     * @param text Text to be displayed
     */
    debug(text: string): void;
  }

  interface ComponentUtils {
    /**
     * Recursively copies files from one directory to another.
     * @param source Source directory
     * @param destination Destination directory
     */
    copyDir(source: string, destination: string): void;
  }

  class Component {
    public init(): Promise<void>;
    
    context: ComponentContext;
  }

  const utils: ComponentUtils;
}
