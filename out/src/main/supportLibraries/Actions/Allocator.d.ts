export default class Allocator {
    static createSuite(): void;
    static deleteFiles(directory: string): void;
    /**
  * Gets the value of command line argument
  * @param argumentName
  * @returns
  */
    static getValueOf(argumentName: string): string;
    static createTemplate(testList: string, sheet?: string): string;
    static getFileNames(dirPath: string): Promise<unknown>;
    static getFiles(dir: string, files?: never[]): never[];
}
