import { Locator, Page, TestInfo } from "@playwright/test";
import BrowserActions from "./Actions/BrowserActions";
export default class PlaywrightActions extends BrowserActions {
    page: Page;
    testInfo: TestInfo;
    /**
     * @param {import('@playwright/test').Page} page
     * @param {import('@playwright/test').TestInfo} testInfo
     */
    constructor(page: Page, testInfo: TestInfo);
    getPdfPageText(pdf: any, pageNo: number): Promise<any>;
    getPDFText(filePath: any): Promise<string>;
    /**
     * Downloads the file and returns the downloaded file name
     * @param selector element that results in file download
     * @param description description of the element
     * @returns downloaded file name
     */
    downloadFile(selector: string, description: string): Promise<string>;
    /**
   * Returns when the required dom content is in loaded state.
   */
    waitForDomLoad(): Promise<void>;
    /**
     * Wait for Page to complete the state of networkIdle
     */
    waitForNetworkIdle(): Promise<void>;
    /**
     * Returns when the required load state has been reached.
     */
    waitForLoadState(): Promise<void>;
    /**
     * Wait for element to be disappear
     * @param locator
     * @returns
     */
    waitTillElementDisappear(locator: string): Promise<this>;
    /**
     * wait for element to be visible
     * @param wait time for element is visible
     * @returns
     */
    waitTillVisible(locator: string, sec: number): Promise<this>;
    /**
     * wait for element not to be present in DOM
     * @returns
     */
    waitTillDetachedFromDom(locator: string): Promise<this>;
    /**
     * wait for element to be attached to DOM
     * @returns
     */
    waitForPresent(locator: string): Promise<this>;
    verifySnapshot_byLoc(locator: Locator): Promise<void>;
    verifySnapshot(filePath: string, locatorName: string, screenshotPath: string): Promise<void>;
    validateAccessibility(strDescription: string): Promise<void>;
}
