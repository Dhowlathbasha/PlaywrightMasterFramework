import { Page, Locator, expect, TestInfo } from "@playwright/test";
import BaseActions from "./BaseActions";
import { allure } from "allure-playwright";

export default class ElementActions extends BaseActions {

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */
  constructor(public page: Page, public testInfo: TestInfo) {
    super(page, testInfo);
    this.page = page;
    this.testInfo = testInfo;
  }

  //************************  Page operations  ************************
  /**
   * This method hovers over the element
   */
  async hover(locator: string) {
    await this.page.locator(locator).hover();
    return this;
  }

  async sendKey_byLoc(locator: Locator, text: string, description: string) {
    await this.embedScreenshot(description);
    await locator.fill(text);
  }
  //************************  Input operations  ************************

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
    let description: string = locator.description + " is entered with " + strValue;
    await this.test_attach(description, "text/plain");
    await this.allure_attach(description, locator.locators[0], "application/json");
  }

  /**
   * Pick the Locator from the Json file and Enter Text on the Field and Press "Tab" button
   * @param filePath
   * @param locatorName
   * @param strValue
   */
  async sendkeysAndTab(filePath: string, locatorName: string, strValue: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    await this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded();
    await this.page.fill(locator.locators[0], strValue);
    await this.page.press(locator.locators[0], "Tab");
    let description: string = locator.description + " is entered with " + strValue;
    await this.test_attach(description, "text/plain");
    await this.allure_attach(description, locator.locators[0], "application/json");
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
    let description: string = locator.description + " is pressed with " + key;
    await this.test_attach(description, "text/plain");
    await this.allure_attach(description, locator.locators[0], "application/json");
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
   * Returns input.value for <input> or <textarea> or <select> element.
   * @returns
   */
  async fetchInputValue(locator: string): Promise<string> {
    let value: string;
    const element = this.page.locator(locator);
    await element.waitFor();
    value = await element.inputValue();
    return await element.inputValue();;
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
  *
  * @param filePath
  * @param locatorName
  */
  async verifyHidden(filePath: string, locatorName: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    let flagBoolean = await this.page.isHidden(locator.locators[0]);
    let description: string =
      flagBoolean ? locator.description + " is Hidden as Expected" : locator.description + " is NOT Hidden - FAILURE";
    await this.embedScreenshot(description);
    await this.test_attach(description, "text/plain");
    await this.allure_attach(description, locator.locators[0], "application/json");
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
    let description: string =
      flagBoolean ? locator.description + " is Visible as Expected" : locator.description + " is NOT Visible - FAILURE";
    await this.embedScreenshot(description);
    await this.test_attach(description, "text/plain");
    await this.allure_attach(description, locator.locators[0], "application/json");
    await expect.soft(this.page.locator(locator.locators[0])).toBeVisible();
  }

  /**
   *
   * @param filePath
   * @param locatorName
   * @param strExpectedValue
   */
  async verifyValue(filePath: string, locatorName: string, strExpectedValue: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    let actualValue = await this.page.inputValue(locator.locators[0]);
    let description: string =
      strExpectedValue == actualValue
        ? locator.description + " value is displayed as expected = " + strExpectedValue + " ; actual = " + actualValue
        : "FAILURE - " + locator.description + " value is NOT displayed as expected = " + strExpectedValue + " ; actual = " + actualValue;
    await this.embedScreenshot(description);
    await this.test_attach(description, "text/plain");
    await this.allure_attach(description, locator.locators[0], "application/json");
    await expect
      .soft(this.page.locator(locator.locators[0]))
      .toHaveValue(strExpectedValue);
  }

  async verifyDisabled(filePath: string, locatorName: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    let flagBoolean = await this.page.isEditable(locator.locators[0]);
    let description: string =
      !flagBoolean ? locator.description + " is Disabled as Expected" : locator.description + " is NOT Disabled - FAILURE";
    await this.embedScreenshot(description);
    await this.test_attach(description, "text/plain");
    await this.allure_attach(description, locator.locators[0], "application/json");
    await expect
      .soft(this.page.locator(locator.locators[0]))
      .not.toBeEditable();
  }

  async verifyEnabled(filePath: string, locatorName: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    let flagBoolean = await this.page.isEditable(locator.locators[0]);
    let description: string =
      flagBoolean ? locator.description + " is Enabled as Expected" : locator.description + " is NOT Enabled - FAILURE";
    await this.embedScreenshot(description);
    await this.test_attach(description, "text/plain");
    await this.allure_attach(description, locator.locators[0], "application/json");
    await expect.soft(this.page.locator(locator.locators[0])).toBeEditable();
  }

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

  async verifyValue_byLoc(locator: Locator, strExpectedValue: string, description: string) {
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
  async isEnabled(locator: string) {
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
  async isVisible(locator: string, sec: number): Promise<boolean> {
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

  /**
   * Returns the status of the checkbox
   * @returns
   */
  async isChecked(locator: string | Locator) {
    return typeof locator === "string"
      ? await this.page.locator(locator).isChecked()
      : await locator.isChecked();
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

  //************************  DropDown operations  ************************

  /**
   *
   * @param filePath
   * @param locatorName
   * @param strValue
   */
  async selectByVisibleText(filePath: string, locatorName: string, strValue: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    await this.page.selectOption(locator.locators[0], { label: strValue });
    let description: string = locator.description + " is selected with " + strValue;
    await this.test_attach(description, "text/plain");
    await this.allure_attach(description, locator.locators[0], "application/json");
  }

  /**
   *
   * @param filePath
   * @param locatorName
   * @param strValue
   */
  async selectByValue(filePath: string, locatorName: string, strValue: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    let description: string = locator.description + " is selected with " + strValue;
    await this.page.selectOption(locator.locators[0], strValue);
    await this.test_attach(description, "text/plain");
    await this.allure_attach(description, locator.locators[0], "application/json");
  }

  async selectdropdown(locator: string | number) { }

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
}
