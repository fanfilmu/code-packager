import * as path from "path";
import { tmpdir } from "os";
import { exec, ExecOptions } from "child_process";
import * as rimraf_ from "rimraf";
const rimraf = rimraf_;

const randomNameComponent = (): string => Math.random().toString(36).substring(10);

/**
 * Generated randomized name of the build directory.
 * @param name Base name for the directory
 */
export const createBuildDirectory = (name: string): string => path.join(tmpdir(), `${name}-${randomNameComponent()}`);

export const safeExec = (command: string, options?: ExecOptions): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    exec(command, options || {}, (error) => {
      error ? reject(error.message) : resolve();
    });
  });
}

export const removeDir = (path: string, options?: rimraf_.Options): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    rimraf(path, options || {}, (error) => {
      error ? reject(error.message) : resolve();
    })
  });
}
