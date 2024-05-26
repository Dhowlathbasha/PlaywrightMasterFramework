import PlaywrightActions from "@utils/PlaywrightActions";
import { Locator } from "playwright/test";
import { allure } from "allure-playwright";
import { Page, TestInfo, test } from "@playwright/test";
import ElementActions from "./ElementActions";

export default class clickActions extends ElementActions {

  constructor(public page: Page, public testInfo: TestInfo) {
    super(page, testInfo);
    this.page = page;
    this.testInfo = testInfo;
  }

  //************************  Element operations  ************************

  /**
   * Pick the Locator from the Json file and Click on the Locator
   * @param filePath
   * @param locatorName
   */
  async click_Locator_from_Json(filePath: string, locatorName: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    let description: string = locator.description + " is clicked";
    await this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded();
    await this.page.click(locator.locators[0]);
    await this.test_attach(description, "text/plain");
    await this.allure_attach(description, locator.locators[0], "application/json");
  }

  /**
   * Pick the Locator and Replce the "parameter" in the Json file and Click on the Dynamic Locator
   * @param filePath
   * @param locatorName
   * @param parameterValue
   */
  async clickDynamic(filePath: string, locatorName: string, parameterValue: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    let locatorToClick = locator.locators[0].relocator.lplace(
      "${parameter}", parameterValue);
    let description: string = locator.description + " is clicked";
    await this.page.locator(locatorToClick).scrollIntoViewIfNeeded();
    await this.page.click(locatorToClick);
    await this.test_attach(description, "text/plain");
    await this.allure_attach(description, locator.locators[0], "application/json");
  }

  /**
   *
   * @param filePath
   * @param locatorName
   */
  async clickAllIfExists(filePath: string, locatorName: string) {
    let locator = await this.fetchLocatorfromJson(filePath, locatorName);
    let flagBoolean = await this.page.locator(locator.locators[0]).count();
    let description =
      flagBoolean > 0 ? "All " + locator.description + " is clicked" : "All " + locator.description + " is not clicked";
    if (flagBoolean > 0)
      await this.page.click(locator.locators[0]);
    await this.test_attach(description, "text/plain");
    await this.allure_attach(description, locator.locators[0], "application/json");
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
}