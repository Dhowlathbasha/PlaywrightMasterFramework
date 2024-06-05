import * as Constants from '@data/Constants';
import path from 'path';
import fs from 'fs';

export default class Allocator {
  fs = require('fs');

  public static createSuite() {
    //const sheet = CLIUtil.getValueOf("SHEET");
    // Here sheet is filename
    const sheet = 'testcase';
    Allocator.deleteFiles(Constants.CommonConstants.TEST_FOLDER_PATH);
    let testList = Constants.CommonConstants.BLANK;
    const fileList = Allocator.getFiles('../../../../data');

    for (const { TestName, Mode } of fileList) {
      let modeOfRun = Constants.CommonConstants.BLANK;
      if (Mode !== undefined && Mode !== null && Mode !== Constants.CommonConstants.BLANK) {
        modeOfRun = `\n\ttest.describe.configure({ mode: '${Mode}' });`;
      }
      testList += `\ntest.describe("${TestName}", () => {${modeOfRun}
	require("./${TestName}.spec.ts");
});`;
    }

    fs.writeFileSync(
      `${Constants.CommonConstants.TEST_FOLDER_PATH}${sheet}${Constants.CommonConstants.TEST_SUITE_FILE_FORMAT}`,
      Allocator.createTemplate(testList)
    );
    console.log(' Completed!! ');
  }

  public static deleteFiles(directory: string) {
    if (fs.existsSync(directory)) {
      console.log(directory, ' exists!');
    } else {
      console.log(directory, ' does not exist!');
      fs.mkdirSync(directory);
    }

    const files = fs.readdirSync(directory);
    for (const file of files) {
      if (file.includes(Constants.CommonConstants.TEST_SUITE_FILE_FORMAT)) {
        fs.unlinkSync(path.join(directory, file));
      }
    }
  }

  /**
   * Gets the value of command line argument
   * @param argumentName
   * @returns
   */
  // public static getValueOf(argumentName: string) {
  //     const argv = process.argv[2];
  //     if (argv === undefined) {
  //         throw new Error(`${argumentName} is not defined, please send ${argumentName} through CLI`);
  //     }
  //     if (argv.toUpperCase().includes(argumentName)) {
  //         return argv.split("=")[1];
  //     }
  //     throw new Error(`Please send command line argument ${argumentName} with value`);
  // }

  public static createTemplate(testList: string) {
    const suiteTemplate = `/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
/* eslint-disable global-require */
import test from "@playwright/test";
${testList}
`;

    return suiteTemplate;
  }

  // public static getFileNames(dirPath: string)  {
  //     return new Promise((resolve, reject) => {
  //         fs.readdir(dirPath, async (err, files) => {
  //             if (err) {
  //                 reject(`Error reading directory: ${err}`);
  //             }
  //             else if(fs.statSync(dirPath).isDirectory()) {
  //                  Allocator.getFileNames(dirPath)
  //               }
  //             else {
  //                 const filePaths = files.map(file => path.join(dirPath, file));
  //                 resolve(filePaths);
  //             }
  //         });
  //     });
  // }

  public static getFiles(dir: string, files = []) {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
      const name = `${dir}/${file}`;
      if (fs.statSync(name).isDirectory()) {
        Allocator.getFiles(name, files);
      } else {
        const supabase: never = path.basename(name) as never;
        files.push(supabase);
      }
    }

    return files;
  }
}

Allocator.createSuite();
