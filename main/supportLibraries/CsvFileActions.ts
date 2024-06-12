/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Excel from 'exceljs';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import ccjson from 'convert-csv-to-json';
import * as Constants from '@data/Constants';
import path from 'path';

export default class CsvFileActions {
  async getData(filepathWithName: string, sheetName: string, tcid: string, columnName: string) {
    console.log(path.resolve(Constants.CommonConstants.DATAFOLDER_PATH));
    const updatedFilePath = path.resolve(Constants.CommonConstants.DATAFOLDER_PATH, filepathWithName);
    const workbook = new Excel.Workbook();
    let colNum: any;

    const content_workbook = await workbook.csv.readFile(updatedFilePath, { sheetName: sheetName });
    if (content_workbook !== undefined) {
      const rows = content_workbook.rowCount;

      if ((await this.getColumnNumber(content_workbook, columnName)) !== undefined) {
        colNum = await this.getColumnNumber(content_workbook, columnName);

        return await this.getColumnData(content_workbook, tcid, rows, colNum);
      }
    }
  }

  async getColumnNumber(worksheet: Excel.Worksheet, columnName: string): Promise<any> {
    let colNum: any;
    try {
      for (let index = 1; index <= worksheet.columnCount; index++) {
        if (worksheet.getRow(1).getCell(index).value === columnName) {
          colNum = index;
          break;
        }
      }
    } catch (error) {
      console.error(error);
    }

    return colNum;
  }

  async getColumnData(worksheet: Excel.Worksheet, tcid: string, rowNum: number, columnNum: string | number) {
    let columnData: any;
    for (let index = 2; index <= rowNum; index++) {
      if (worksheet.getRow(index).getCell(1).value === tcid) {
        columnData = worksheet.getRow(index).getCell(columnNum).value;

        return columnData;
      }
    }
  }

  public getHeaders(worksheet: Excel.Worksheet, index: number) {
    const result: string[] = [];

    const row = worksheet.getRow(index);

    if (row === null || !row.values || !row.values.length) return [];

    for (let count: number = 1; count < worksheet.rowCount; count++) {
      const cell = row.getCell(count);
      result.push(cell.text);
    }

    return result;
  }

  async getcsvjson(filepathWithName: string) {
    const updatedFilePath = path.resolve(Constants.CommonConstants.DATAFOLDER_PATH, filepathWithName);
    const updatedJsonPath = path.resolve(Constants.CommonConstants.DATAFOLDER_PATH, 'testcase.json');
    const fileContent = fs.readFileSync(updatedFilePath, { encoding: 'utf-8' });

    let json = ccjson.generateJsonFileFromCsv(updatedFilePath,updatedJsonPath);

    console.log(json);
    
    
    // const regex = /,(?=(?:[^"]*"[^"]*")*(?![^"]*"))/;
    // const rows = fileContent.split('\n');
    // const headers = rows[0]!.split(regex);
    // const jsonData = [];

    // for (let i = 1; i < rows.length; i++) {
    //   const values = rows[i]!.split(regex);
    //   const obj = {};
    //   for (let j = 0; j < headers.length; j++) {
    //     const header = headers[j as number]?.trim();
    //     obj[header] = values[j]!.trim();
    //   }
    //   jsonData.push(obj);
    // }
  }
}
