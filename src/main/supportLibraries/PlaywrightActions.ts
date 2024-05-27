import AxeBuilder from "@axe-core/playwright";
import { Locator, Page, expect, test, TestInfo } from "@playwright/test";
import * as fs from "fs";
import * as pdfjslib from "pdfjs-dist-es5";
import * as Constants from "../supportLibraries/Constants";
import BrowserActions from "./Actions/BrowserActions";

export default class PlaywrightActions extends BrowserActions {

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */
  constructor(public page: Page, public testInfo: TestInfo) {
    super(page, testInfo);
  }

  async getPdfPageText(pdf: any, pageNo: number) {
    const page = await pdf.getPage(pageNo);
    const tokenizedText = await page.getTextContent();
    const pageText = tokenizedText.items
      .map((token: any) => token.str)
      .join("");
    return pageText;
  }

  async getPDFText(filePath: any): Promise<string> {
    const dataBuffer = fs.readFileSync(filePath);
    const pdf = await pdfjslib.getDocument(dataBuffer).promise;
    const maxPages = pdf.numPages;
    const pageTextPromises = [];
    for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
      pageTextPromises.push(this.getPdfPageText(pdf, pageNo));
    }
    const pageTexts = await Promise.all(pageTextPromises);
    return pageTexts.join(" ");
  }


  /**
   * Downloads the file and returns the downloaded file name
   * @param selector element that results in file download
   * @param description description of the element
   * @returns downloaded file name
   */
  async downloadFile(selector: string, description: string): Promise<string> {
    let fileName!: string;
    await test.step(`Downloading ${description} file`, async () => {
      const [download] = await Promise.all([
        this.page.waitForEvent("download"),
        await this.page.locator(selector).click({ modifiers: ["Alt"] }),
      ]);
      fileName = download.suggestedFilename();
      const filePath = `${Constants.CommonConstants.DOWNLOAD_PATH}${fileName}`;
      await download.saveAs(filePath);
      await download.delete();
    });
    return fileName;
  }

  //************************  Wait operations  ************************

  /**
 * Returns when the required dom content is in loaded state.
 */
  async waitForDomLoad() {
    await this.page.waitForLoadState("domcontentloaded", { timeout: 5000 });
  }

  /**
   * Wait for Page to complete the state of networkIdle
   */
  async waitForNetworkIdle() {
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Returns when the required load state has been reached.
   */
  async waitForLoadState() {
    await this.page.waitForLoadState();
  }

  /**
   * Wait for element to be disappear
   * @param locator
   * @returns
   */
  async waitTillElementDisappear(locator: string) {
    await this.page.locator(locator).waitFor({ state: "hidden" });
    return this;
  }

  /**
   * wait for element to be visible
   * @param wait time for element is visible
   * @returns
   */
  async waitTillVisible(locator: string, sec: number) {
    await this.page
      .locator(locator)
      .waitFor({ state: "visible", timeout: sec * 1000 });
    return this;
  }

  /**
   * wait for element not to be present in DOM
   * @returns
   */
  async waitTillDetachedFromDom(locator: string) {
    await this.page.locator(locator).waitFor({ state: "detached" });
    return this;
  }

  /**
   * wait for element to be attached to DOM
   * @returns
   */
  async waitForPresent(locator: string) {
    await this.page.locator(locator).waitFor({ state: "attached" });
    return this;
  }

  //************************    visual validation   ************************

  async verifySnapshot_byLoc(locator: Locator) {
    await expect(locator).toHaveScreenshot();
    const screenshot = await locator.screenshot();
    await this.testInfo.attach("ACTUAL SCREENSHOT - Visual Validation", {
      body: screenshot,
      contentType: "image/png",
    });
  }

  async verifySnapshot(filePath: string, locatorName: string, screenshotPath: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    await expect
      .soft(this.page.locator(locator.locators[0]))
      .toHaveScreenshot(screenshotPath);
    const screenshot = await this.page
      .locator(locator.locators[0])
      .screenshot();
    await this.testInfo.attach("ACTUAL SCREENSHOT - Visual Validation", {
      body: screenshot,
      contentType: "image/png",
    });
  }

  //************************    accessibility   ************************

  async validateAccessibility(strDescription: string) {
    const page = this.page;
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    await this.testInfo.attach("accessibility-scan-results-" + strDescription, {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: "application/json",
    });

    expect(accessibilityScanResults.violations).toEqual([]);
  }
}
