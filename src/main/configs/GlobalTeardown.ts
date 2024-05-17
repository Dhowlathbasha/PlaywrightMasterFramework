import fs from 'fs';
import { mergeHTMLReports } from "playwright-merge-html-reports";

async function globalTeardown() {
    let rootPath = "./reports/";
    let pathToDirectory = rootPath + "html-report";
    let arrayFilespath: string[] = [];

    mergeHTMLReports(getFiles(pathToDirectory,arrayFilespath), {
        outputFolderName: "html-report",
    });
}

function getFiles(dir:string , files: string[]) {
    const fileList = fs.readdirSync(dir)
    for (const file of fileList) {
      const name : any = `${dir}/${file}`
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files)
      } else {
        files.push(name)
      }
    }
    return files
  }
  

export default globalTeardown;