import AxeBuilder from "@axe-core/playwright";
import { Locator, Page, expect, test, TestInfo } from "@playwright/test";
import * as fs from "fs";
import * as pdfjslib from "pdfjs-dist-es5";
import { allure } from "allure-playwright";
import * as Constants from "../supportLibraries/Constants";

export default class PlaywrightActions {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */
  constructor(public page: Page, public testInfo: TestInfo) {
    this.page = page;
    this.testInfo = testInfo;
  }

  //************************  Page operations  ************************

  /**
   * Open a Url in browser window
   * @param url
   * @param options
   */
  async openurl(url: string, options?: any) {
    await this.page.goto(url, options);
  }

  /**
   * Open a Url in browser window with end point
   * @param url
   * @param endpoint
   * @param options
   */
  async openUrlwithEndpoint(url: string, endpoint: string, options?: any) {
    url += endpoint;
    await this.page.goto(url, options);
  }

  /**
   *  Navigate to previous URL
   * @param description
   */
  async navigateBack(description: string) {
    await this.page.goBack();
  }

  /**
   * Navigate to next URL
   * @param description
   */
  async navigateForward(description: string) {
    await this.page.goForward();
  }

  /**
   * Page Refresh
   */
  async pageRefresh() {
    await this.page.reload();
  }

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
   * Gets the handle of the new window
   * @param selector
   * @param description
   */
  public async switchToNewWindow(
    selector: string,
    description: string
  ): Promise<Page> {
    let [newPage] = [this.page];
    await test.step(`Opening  ${description} Window`, async () => {
      [newPage] = await Promise.all([
        this.page.context().waitForEvent("page"),
        await this.page.locator(selector).click(),
      ]);
      await newPage.waitForLoadState("domcontentloaded");
    });
    return newPage;
  }

  /**
   * Close the tab by its Id
   * @param options
   */
  async closeTabById(options?: { tabId?: number }) {
    if (options?.tabId) {
      await this.page.context().pages()[options.tabId].close();
    } else {
      await this.page.close();
    }
  }

  /**
   * Close the Page tab by its tab title
   * @param options
   */
  async closeTabByTitle(options?: { tabTitle?: string }) {
    if (options?.tabTitle) {
      const pages: Array<Page> = this.page.context().pages();

      for (let count = 0; count < pages.length; count++) {
        const pageTitle = pages[count].title();
        if (options.tabTitle === (await pageTitle)) {
          this.page = this.page.context().pages()[count];
          this.page.close();
          break;
        }
      }
    } else {
      await this.page.close();
    }
  }

  /**
   * Gets the page Title
   * @returns
   */
  public async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  //************************  Element operations  ************************

  /**
   * Pick the Locator from the Json file and Click on the Locator
   * @param filePath
   * @param locatorName
   */
  async click_Locator_from_Json(filePath: string, locatorName: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    await this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded();
    await this.page.click(locator.locators[0]);
    await this.testInfo.attach(locator.description + " is clicked", {
      body: locator.description,
      contentType: "text/plain",
    });
    await allure.attachment(
      locator.description + " is clicked",
      JSON.stringify(locator.locators[0]),
      { contentType: "application/json" }
    );
  }

  /**
   * Pick the Locator and Replce the "parameter" in the Json file and Click on the Dynamic Locator
   * @param filePath
   * @param locatorName
   * @param parameterValue
   */
  async clickDynamic(
    filePath: string,
    locatorName: string,
    parameterValue: string
  ) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    let locatorToClick = locator.locators[0].relocator.lplace(
      "${parameter}",
      parameterValue
    );
    await this.page.locator(locatorToClick).scrollIntoViewIfNeeded();
    await this.page.click(locatorToClick);
    await this.testInfo.attach(locator.description + " is clicked", {
      body: locator.description,
      contentType: "text/plain",
    });
    await allure.attachment(
      locator.description + " is clicked",
      JSON.stringify(locator.locators[0]),
      { contentType: "application/json" }
    );
  }

  /**
   *
   * @param filePath
   * @param locatorName
   */
  async clickAllIfExists(filePath: string, locatorName: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    let flagBoolean = await this.page.locator(locator.locators[0]).count();

    if (flagBoolean > 0) {
      await this.page.click(locator.locators[0]);
      flagBoolean = await this.page.locator(locator.locators[0]).count();

      await this.testInfo.attach("All " + locator.description + " is clicked", {
        body: locator.description,
        contentType: "text/plain",
      });

      await allure.attachment(
        "All " + locator.description + " is clicked",
        JSON.stringify(locator.locators[0]),
        { contentType: "application/json" }
      );
    } else {
      await this.testInfo.attach(
        "All " + locator.description + " is not clicked",
        {
          body: locator.description,
          contentType: "text/plain",
        }
      );

      await allure.attachment(
        "All " + locator.description + " is not clicked",
        JSON.stringify(locator.locators[0]),
        { contentType: "application/json" }
      );
    }
  }

  /**
   *
   * @param locator
   * @returns
   */
  async getLocator(locator: Locator) {
    return locator;
  }

  /**
   * Get the Locator from the JSON file
   * @param filePath
   * @param locatorName
   * @returns
   */
  async fetchLocatorfromJson(filePath: string, locatorName: string) {
    let rawdata = fs.readFileSync(filePath).toString();
    let data = JSON.parse(rawdata);
    return data.locators[locatorName];
  }

  /**
   * Press a key on web page
   * @param key
   * @param description
   */
  async keyPressByKeyboard(key: string) {
    await this.page.keyboard.press(key);
  }

  /**
   * Pick the Locator from the Json file and Enter Text on the Field
   * @param filePath
   * @param locatorName
   * @param strValue
   */
  async sendkeys(filePath: string, locatorName: string, strValue: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    await this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded();
    await this.page.fill(locator.locators[0], strValue);
    await this.testInfo.attach(
      locator.description + " is entered with " + strValue,
      {
        body: locator.description + " is entered with " + strValue,
        contentType: "text/plain",
      }
    );
    await allure.attachment(
      locator.description + " is entered with " + strValue,
      JSON.stringify(locator.locators[0]),
      { contentType: "application/json" }
    );
  }

  /**
   * Pick the Locator from the Json file and Enter Text on the Field and Press "Tab" button
   * @param filePath
   * @param locatorName
   * @param strValue
   */
  async sendkeysAndTab(
    filePath: string,
    locatorName: string,
    strValue: string
  ) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    await this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded();
    await this.page.fill(locator.locators[0], strValue);
    await this.page.press(locator.locators[0], "Tab");
    await this.testInfo.attach(
      locator.description + " is entered with " + strValue,
      {
        body: locator.description + " is entered with " + strValue,
        contentType: "text/plain",
      }
    );
    await allure.attachment(
      locator.description + " is entered with " + strValue,
      JSON.stringify(locator.locators[0]),
      { contentType: "application/json" }
    );
  }

  /**
   * Pick the Locator from the Json file and Enter Text on the Field and Press Keys
   * such as `ArrowLeft` or `a`. button
   * @param filePath
   * @param locatorName
   * @param strValue
   */
  async presskey(filePath: string, locatorName: string, key: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    await this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded();
    await this.page.press(locator.locators[0], key);
    await this.testInfo.attach(
      locator.description + " is pressed with " + key,
      {
        body: locator.description + " is pressed with " + key,
        contentType: "text/plain",
      }
    );
    await allure.attachment(
      locator.description + " is pressed with " + key,
      JSON.stringify(locator.locators[0]),
      { contentType: "application/json" }
    );
  }

  /**
   *
   * @param locator
   * @param options
   */
  async focusToElement(
    locator: string,
    options?: { focus?: boolean; timeout?: number }
  ) {
    try {
      if (options?.focus) {
        await this.page.focus(locator);
      } else if (!options?.focus && options?.timeout) {
        const timeout = options?.timeout;
        await this.page.locator(locator).scrollIntoViewIfNeeded({ timeout });
      }
    } catch (error) {
      console.error("Error Occured in focus Into view of needed");
    }
  }

  /**
   *
   * @param description
   */
  async embedScreenshot(description: string) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.testInfo.attach(description, {
      body: screenshot,
      contentType: "image/png",
    });
    await allure.attachment(description, screenshot, {
      contentType: "image/png",
    });
    await allure.attachment(description, JSON.stringify(description), {
      contentType: "application/json",
    });
  }

  /**
   *
   * @param filePath
   * @param locatorName
   */
  async verifyHidden(filePath: string, locatorName: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    let flagBoolean = await this.page.isHidden(locator.locators[0]);
    if (flagBoolean) {
      await this.embedScreenshot(
        locator.description + " is Hidden as Expected - Screenshot"
      );
      await this.testInfo.attach(
        locator.description + " is Hidden as Expected",
        {
          body: locator.description + " is Hidden as Expected",
          contentType: "text/plain",
        }
      );
      await allure.attachment(
        locator.description + " is Hidden as Expected",
        JSON.stringify(locator.locators[0]),
        { contentType: "application/json" }
      );
    } else {
      await this.embedScreenshot(
        locator.description + " is NOT Hidden - FAILURE"
      );
      await this.testInfo.attach(
        locator.description + " is NOT Hidden - FAILURE",
        {
          body: locator.description + " is NOT Hidden - FAILURE",
          contentType: "text/plain",
        }
      );
      await allure.attachment(
        locator.description + " is NOT Hidden - FAILURE ",
        JSON.stringify(locator.locators[0]),
        { contentType: "application/json" }
      );
    }
    await expect.soft(this.page.locator(locator.locators[0])).toBeHidden();
  }

  /**
   *
   * @param filePath
   * @param locatorName
   */
  async verifyVisible(filePath: string, locatorName: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    let flagBoolean = await this.page.isVisible(locator.locators[0]);
    if (flagBoolean) {
      await this.embedScreenshot(
        locator.description + " is Visible as Expected - Screenshot"
      );
      await this.testInfo.attach(
        locator.description + " is Visible as Expected",
        {
          body: locator.description + " is Visible as Expected",
          contentType: "text/plain",
        }
      );
      await allure.attachment(
        locator.description + " iis Visible as Expected ",
        JSON.stringify(locator.locators[0]),
        { contentType: "application/json" }
      );
    } else {
      await this.embedScreenshot(
        locator.description + " is NOT Visible - FAILURE"
      );
      await this.testInfo.attach(
        locator.description + " is NOT Visible - FAILURE",
        {
          body: locator.description + " is NOT Visible - FAILURE",
          contentType: "text/plain",
        }
      );
      await allure.attachment(
        locator.description + " is NOT Visible - FAILURE ",
        JSON.stringify(locator.locators[0]),
        { contentType: "application/json" }
      );
    }
    await expect.soft(this.page.locator(locator.locators[0])).toBeVisible();
  }

  /**
   *
   * @param filePath
   * @param locatorName
   * @param strExpectedValue
   */
  async verifyValue(
    filePath: string,
    locatorName: string,
    strExpectedValue: string
  ) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    let actualValue = await this.page.inputValue(locator.locators[0]);
    if (strExpectedValue == actualValue) {
      await this.embedScreenshot(
        locator.description +
          " value is displayed as expected = " +
          strExpectedValue +
          " ; actual = " +
          actualValue
      );
      await this.testInfo.attach(
        locator.description +
          " value is displayed as expected = " +
          strExpectedValue +
          " ; actual = " +
          actualValue,
        {
          body:
            locator.description +
            " value is displayed as expected = " +
            strExpectedValue +
            " ; actual = " +
            actualValue,
          contentType: "text/plain",
        }
      );
      await allure.attachment(
        locator.description +
          " value is displayed as expected = " +
          strExpectedValue +
          " ; actual = " +
          actualValue,
        JSON.stringify(locator.locators[0]),
        { contentType: "application/json" }
      );
    } else {
      await this.embedScreenshot(
        "FAILURE - " +
          locator.description +
          " value is NOT displayed as expected = " +
          strExpectedValue +
          " ; actual = " +
          actualValue
      );
      await this.testInfo.attach(
        "FAILURE - " +
          locator.description +
          " value is NOT displayed as expected = " +
          strExpectedValue +
          " ; actual = " +
          actualValue,
        {
          body:
            locator.description +
            " value is NOT displayed as expected = " +
            strExpectedValue +
            " ; actual = " +
            actualValue,
          contentType: "text/plain",
        }
      );
      await allure.attachment(
        locator.description +
          " value is NOT displayed as expected = " +
          strExpectedValue +
          " ; actual = " +
          actualValue,
        JSON.stringify(locator.locators[0]),
        { contentType: "application/json" }
      );
    }
    await expect
      .soft(this.page.locator(locator.locators[0]))
      .toHaveValue(strExpectedValue);
  }

  async verifyDisabled(filePath: string, locatorName: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    let flagBoolean = await this.page.isEditable(locator.locators[0]);
    if (!flagBoolean) {
      await this.embedScreenshot(
        locator.description + " is Disabled as Expected - Screenshot"
      );
      await this.testInfo.attach(
        locator.description + " is Disabled as Expected",
        {
          body: locator.description + " is Disabled as Expected",
          contentType: "text/plain",
        }
      );
      await allure.attachment(
        locator.description + " is Disabled as Expected",
        JSON.stringify(locator.locators[0]),
        { contentType: "application/json" }
      );
    } else {
      await this.embedScreenshot(
        locator.description + " is NOT Disabled - FAILURE"
      );
      await this.testInfo.attach(
        locator.description + " is NOT Disabled - FAILURE",
        {
          body: locator.description + " is NOT Disabled - FAILURE",
          contentType: "text/plain",
        }
      );
      await allure.attachment(
        locator.description + " is NOT Disabled - FAILURE",
        JSON.stringify(locator.locators[0]),
        { contentType: "application/json" }
      );
    }
    await expect
      .soft(this.page.locator(locator.locators[0]))
      .not.toBeEditable();
  }

  async verifyEnabled(filePath: string, locatorName: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    let flagBoolean = await this.page.isEditable(locator.locators[0]);
    if (flagBoolean) {
      await this.embedScreenshot(
        locator.description + " is Enabled as Expected - Screenshot"
      );
      await this.testInfo.attach(
        locator.description + " is Enabled as Expected",
        {
          body: locator.description + " is Enabled as Expected",
          contentType: "text/plain",
        }
      );
      await allure.attachment(
        locator.description + " is Enabled as Expected",
        JSON.stringify(locator.locators[0]),
        { contentType: "application/json" }
      );
    } else {
      await this.embedScreenshot(
        locator.description + " is NOT Enabled - FAILURE"
      );
      await this.testInfo.attach(
        locator.description + " is NOT Enabled - FAILURE",
        {
          body: locator.description + " is NOT Enabled - FAILURE",
          contentType: "text/plain",
        }
      );
      await allure.attachment(
        locator.description + " is NOT Enabled - FAILURE",
        JSON.stringify(locator.locators[0]),
        { contentType: "application/json" }
      );
    }
    await expect.soft(this.page.locator(locator.locators[0])).toBeEditable();
  }

  async findElement(
    locator: string,
    options?: {
      frame?: string;
      tabId?: number;
      tabTitle?: Promise<string>;
      timeOut?: number;
      has?: Locator;
      hasText?: string;
    }
  ) {
    if (options?.tabId) {
      this.page = this.page.context().pages()[options.tabId];
    } else if (options?.tabTitle) {
      const pages: Array<Page> = this.page.context().pages();

      for (let count = 0; count < pages.length; count++) {
        const pageTitle = pages[count].title();
        if (options.tabTitle === pageTitle) {
          this.page = this.page.context().pages()[count];
          break;
        }
      }
    } else if (options?.tabTitle && options?.tabId) {
      const pages: Array<Page> = this.page.context().pages();

      const pageTitle = pages[options.tabId].title();
      if (options.tabTitle === pageTitle) {
        this.page = this.page.context().pages()[options.tabId];
      }
    }

    if (options?.frame) {
      return this.page.frameLocator(options.frame).locator(locator, {
        has: options?.has,
        hasText: options?.hasText,
      });
    }

    return this.page.locator(locator, {
      has: options?.has,
      hasText: options?.hasText,
    });
  }

  //************************  locator operations - actions   ************************

  async click_byLoc(locator: Locator, description: string) {
    await this.embedScreenshot(description);
    await locator.click();
  }

  /**
   * Double click on element
   * @returns
   */
  async doubleClick(locator: string | Locator) {
    const updatedLocator =
      typeof locator === "string" ? this.page.locator(locator) : locator;
    await updatedLocator.dblclick();
    return this;
  }

  async sendKey_byLoc(locator: Locator, text: string, description: string) {
    await this.embedScreenshot(description);
    await locator.fill(text);
  }

  //************************  locator operations - verification   ************************

  async verifyVisible_byLoc(locator: Locator, description: string) {
    await this.embedScreenshot(
      description + "VERIFY VISIBLE - VALIDATION SCREENSHOT"
    );
    await expect(locator).toBeVisible();
  }

  async verifyHidden_byLoc(locator: Locator, description: string) {
    await this.embedScreenshot(
      description + " VERIFY HIDDEN - VALIDATION SCREENSHOT"
    );
    await expect(locator).toBeHidden();
  }

  async verifyValue_byLoc(
    locator: Locator,
    strExpectedValue: string,
    description: string
  ) {
    await this.embedScreenshot(
      description + " VERIFY VALUE - VALIDATION SCREENSHOT"
    );
    await expect(locator).toHaveValue(strExpectedValue);
  }

  async verifyDisabled_byLoc(locator: Locator, description: string) {
    await this.embedScreenshot(
      description + " VERIFY DISABLED - VALIDATION SCREENSHOT"
    );
    await expect(locator).not.toBeEditable();
  }

  async verifyEnabled_byLoc(locator: Locator, description: string) {
    await this.embedScreenshot(
      description + " VERIFY ENABLED - VALIDATION SCREENSHOT"
    );
    await expect(locator).toBeEditable();
  }

  async verifyChkboxNotChkd_byLoc(locator: Locator, description: string) {
    await this.embedScreenshot(
      description + " VERIFY CHECKBOX CHECKED - VALIDATION SCREENSHOT"
    );
    await expect(locator).not.toBeChecked();
  }

  async embedScreenshot_byLoc(...args: any) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.testInfo.attach(args, {
      body: screenshot,
      contentType: "image/png",
    });
    await allure.attachment(args, screenshot, { contentType: "image/png" });
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

  async verifySnapshot(
    filePath: string,
    locatorName: string,
    screenshotPath: string
  ) {
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

  //************************    mocking api     ************************

  async mockApi(endpointURL: string, ...jsonPayload: any) {
    console.log(jsonPayload);
    await this.page.route(endpointURL, async (route) => {
      await route.fulfill(jsonPayload);
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

  async readValuesFromTextFile(filePath: string): Promise<any> {
    if (await this.exists(filePath)) {
      return fs.readFileSync(`${filePath}`, `utf-8`);
    }
  }

  async writeDataIntoTextFile(
    filePath: number | fs.PathLike | string,
    data: string | NodeJS.ArrayBufferView
  ): Promise<void> {
    fs.writeFile(filePath, data, (error) => {
      if (error) throw error;
    });
  }

  async exists(path: string) {
    if (fs.existsSync(path)) {
      return path;
    }
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

  //************************  Alert operations  ************************

  /**
   * Accept alert and return alert message
   * @param promptText A text to enter in prompt. It is optional for alerts.
   * @returns alert message
   */
  async alertAccept(promptText?: string): Promise<string> {
    return this.page.waitForEvent("dialog").then(async (dialog) => {
      dialog.type() === "prompt"
        ? await dialog.accept(promptText)
        : await dialog.accept();
      return dialog.message().trim();
    });
  }

  /**
   * Dismiss alert and return alert message
   * @returns alert message
   */
  async alertDismiss(): Promise<string> {
    return this.page.waitForEvent("dialog").then(async (d) => {
      await d.dismiss();
      return d.message().trim();
    });
  }

  //************************  Check Box operations  ************************

  /**
   * check checkbox or radio button
   */
  async check(locator: string | Locator) {
    typeof locator === "string"
      ? await this.page.locator(locator).check()
      : await locator.check();
    return this;
  }

  /**
   * uncheck checkbox or radio button
   * @returns
   */
  async uncheck(locator: string | Locator) {
    typeof locator === "string"
      ? await this.page.locator(locator).uncheck()
      : await locator.uncheck();
    return this;
  }

  /**
   * Returns the status of the checkbox
   * @returns
   */
  async isChecked(locator: string | Locator) {
    return typeof locator === "string"
      ? await this.page.locator(locator).isChecked()
      : await locator.isChecked();
  }

  //************************  DropDown operations  ************************

  /**
   *
   * @param filePath
   * @param locatorName
   * @param strValue
   */
  async selectByVisibleText(
    filePath: string,
    locatorName: string,
    strValue: string
  ) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    await this.page.selectOption(locator.locators[0], { label: strValue });
    await this.testInfo.attach(
      locator.description + " is selected with " + strValue,
      {
        body: locator.description + " is selected with " + strValue,
        contentType: "text/plain",
      }
    );
    await allure.attachment(
      locator.description + " is selected with " + strValue,
      JSON.stringify(locator.locators[0]),
      { contentType: "application/json" }
    );
  }

  /**
   *
   * @param filePath
   * @param locatorName
   * @param strValue
   */
  async selectByValue(filePath: string, locatorName: string, strValue: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    await this.page.selectOption(locator.locators[0], strValue);
    await this.testInfo.attach(
      locator.description + " is selected with " + strValue,
      {
        body: locator.description + " is selected with " + strValue,
        contentType: "text/plain",
      }
    );
    await allure.attachment(
      locator.description + " is selected with " + strValue,
      JSON.stringify(locator.locators[0]),
      { contentType: "application/json" }
    );
  }

  async selectdropdown(locator: string | number) {}

  /**
   * Gets all the options in dropdown
   * @returns
   */
  async getAllOptions(locator: string): Promise<string[]> {
    let selectOptions: string[];
    selectOptions = await this.page
      .locator(locator)
      .locator("option")
      .allTextContents();
    return selectOptions;
  }

  /**
   * Gets all the selected options in dropdown
   * @returns
   */
  async getAllSelectedOptions(locator: string): Promise<string[]> {
    let selectOptions: string[];
    selectOptions = await this.page
      .locator(locator)
      .locator("option[selected='selected']")
      .allTextContents();
    return selectOptions;
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

  /**
   * Fetch the Count of Elements List
   * @param locator
   * @returns
   */
  async fetchCountOfElements(locator: string | Locator) {
    return typeof locator === "string"
      ? await this.page.locator(locator).count()
      : await locator.count();
  }

  /**
   * Performs mouse click action on the element
   * @param locator
   * @returns
   */
  async mouseClick(locator: string | Locator) {
    const updatedLocator =
      typeof locator === "string" ? this.page.locator(locator) : locator;
    await updatedLocator.scrollIntoViewIfNeeded();
    const box = await updatedLocator.boundingBox();
    await this.page.mouse.click(
      box!.x + box!.width / 2,
      box!.y + box!.height / 2
    );
    return this;
  }

  /**
   * Click on element using js
   * @returns
   */
  async jsClick(locator: string | Locator) {
    const ele =
      typeof locator === "string" ? this.page.locator(locator) : locator;
    await ele.waitFor();
    await ele.evaluate((node: HTMLElement) => {
      node.click();
    });
    return this;
  }

  /**
   * Get all the text Content
   * @returns
   */
  async getAllTextContent(locator: string | Locator): Promise<string[]> {
    let content: string[];
    const element =
      typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.first().waitFor();
    content = await element.allTextContents();
    return content;
  }

  /**
   * Press a key on web element
   * @param key
   */
  async keyPress(locator: string | Locator, key: string) {
    const updatedLocator =
      typeof locator === "string" ? this.page.locator(locator) : locator;
    await updatedLocator.press(key);
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

  /**
   * This method hovers over the element
   */
  async hover(locator: string) {
    await this.page.locator(locator).hover();
    return this;
  }

  /**
   * Returns input.value for <input> or <textarea> or <select> element.
   * @returns
   */
  async fetchInputValue(locator: string): Promise<string> {
    let value: string;
    const element = this.page.locator(locator);
    await element.waitFor();
    value = await element.inputValue();
    return value;
  }

  /**
   * Gets the text content
   * @returns
   */
  async getTextContent(locator: string): Promise<string> {
    let content: string;
    const element = this.page.locator(locator);
    await element.waitFor();
    content = ((await element.textContent()) as string).trim();
    return content;
  }

  /**
   * Get Attribute value
   * @param attributeName
   * @returns
   */
  async getAttribute(locator: string, attributeName: string) {
    let value: string;
    const element = this.page.locator(locator);
    await element.waitFor();
    value = ((await element.getAttribute(attributeName)) as string).trim();
    return value;
  }

  /**
   * Get innerHTML
   * @returns
   */
  async getInnerHTML(locator: string) {
    let text: string;
    const element = this.page.locator(locator);
    await element.waitFor();
    text = (await element.innerHTML()).trim();
    return text;
  }

  /**
   * Get inner text
   * @returns
   */
  async getInnerText(locator: string) {
    let text: string;
    const element = this.page.locator(locator);
    await element.waitFor();
    text = (await element.innerText()).trim();
    return text;
  }

  /**
   * checks if element is editable
   * @returns Promise<boolean>
   */
  async isEditable(locator: string) {
    let status: boolean;
    const element = this.page.locator(locator);
    await element.waitFor();
    status = await element.isEditable();
    return status;
  }

  /**
   * checks if element is enabled
   * @returns Promise<boolean>
   */
  public async isEnabled(locator: string) {
    let status: boolean;
    const element = this.page.locator(locator);
    await element.waitFor();
    status = await element.isEnabled();
    return status;
  }

  /**
   * checks if element is visible
   * @param wait time for element to be visible
   * @returns Promise<boolean>
   */
  public async isVisible(locator: string, sec: number): Promise<boolean> {
    let visibility: boolean;
    try {
      visibility = await this.page
        .locator(locator)
        .isVisible({ timeout: sec * 1000 });
    } catch (error) {
      visibility = false;
    }
    return visibility;
  }
}
