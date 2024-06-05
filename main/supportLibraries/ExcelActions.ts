/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Worksheet } from 'exceljs';
import { Workbook } from 'exceljs';
import type { Page, TestInfo } from '@playwright/test';

export default class ExcelActions {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */
  constructor(
    public page: Page,
    public testInfo: TestInfo
  ) {
    this.page = page;
    this.testInfo = testInfo;
  }

  async getData(filepathWithName: string, sheetName: string, tcid: string, columnName: string) {
    const workbook = new Workbook();
    let colNum: any;

    const content_workbook = await workbook.xlsx.readFile(filepathWithName);
    let worksheet: any = '';
    worksheet = content_workbook.getWorksheet(sheetName);
    if (worksheet !== undefined) {
      const rows = worksheet.rowCount;

      if ((await this.getColumnNumber(worksheet, columnName)) !== undefined) {
        colNum = await this.getColumnNumber(worksheet, columnName);

        return await this.getColumnData(worksheet, tcid, rows, colNum);
      }
    }
  }

  async getColumnNumber(worksheet: Worksheet, columnName: string): Promise<any> {
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

  async getColumnData(worksheet: Worksheet, tcid: string, rowNum: number, columnNum: string | number) {
    let columnData: any;
    for (let index = 2; index <= rowNum; index++) {
      if (worksheet.getRow(index).getCell(1).value === tcid) {
        columnData = worksheet.getRow(index).getCell(columnNum).value;

        return columnData;
      }
    }
  }
}
