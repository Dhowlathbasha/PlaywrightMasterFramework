import { Worksheet } from "exceljs";
import { Page, TestInfo } from "@playwright/test";
export default class ExcelActions {
    page: Page;
    testInfo: TestInfo;
    getData(filepath_W_name: string, sheetName: string, tcid: string, columnName: string): Promise<any>;
    getColumnNumber(worksheet: Worksheet, columnName: string): Promise<any>;
    getColumnData(worksheet: Worksheet, tcid: string, rowNum: number, columnNum: string | number): Promise<any>;
    /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */
    constructor(page: Page, testInfo: TestInfo);
}
