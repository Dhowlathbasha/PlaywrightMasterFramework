import type { Locator } from 'playwright/test';
import type { Page, TestInfo } from '@playwright/test';
import ElementActions from './ElementActions';

export default class ClickActions extends ElementActions {
  constructor(
    public page: Page,
    public testInfo: TestInfo
  ) {
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
  async clickLocatorfromJson(filePath: string, locatorName: string) {
    const locator = await this.fetchLocatorfromJson(filePath, locatorName);
    const description: string = `${locator.description} is clicked`;
    await this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded();
    await this.page.click(locator.locators[0]);
    await this.test_attach(description, 'text/plain');
    await this.allure_attach(description, locator.locators[0], 'application/json');

    return this;
  }

  /**
   * Pick the Locator and Replce the "parameter" in the Json file and Click on the Dynamic Locator
   * @param filePath
   * @param locatorName
   * @param parameterValue
   */
  async clickDynamic(filePath: string, locatorName: string, parameterValue: string) {
    const locator = await this.fetchLocatorfromJson(filePath, locatorName);
    const locatorToClick = locator.locators[0].replace(`$parameter`, parameterValue);
    const description: string = `${locator.description} is clicked`;
    await this.page.locator(locatorToClick).scrollIntoViewIfNeeded();
    await this.page.click(locatorToClick);
    await this.test_attach(description, 'text/plain');
    await this.allure_attach(description, locator.locators[0], 'application/json');

    return this;
  }

  /**
   *
   * @param filePath
   * @param locatorName
   */
  async clickAllIfExists(filePath: string, locatorName: string) {
    const locator = await this.fetchLocatorfromJson(filePath, locatorName);
    const flagBoolean = await this.page.locator(locator.locators[0]).count();
    const description =
      flagBoolean > 0 ? `All ${locator.description} is clicked` : `All ${locator.description} is not clicked`;
    if (flagBoolean > 0) {
      await this.page.click(locator.locators[0]);
    }
    await this.test_attach(description, 'text/plain');
    await this.allure_attach(description, locator.locators[0], 'application/json');

    return this;
  }

  /**
   * Performs mouse click action on the element
   * @param locator
   * @returns
   */
  async mouseClick(locator: string | Locator) {
    const updatedLocator = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await updatedLocator.scrollIntoViewIfNeeded();
    const box = await updatedLocator.boundingBox();
    await this.page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);

    return this;
  }

  /**
   * Click on element using js
   * @returns
   */
  async jsClick(locator: string | Locator) {
    const ele = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await ele.waitFor();
    await ele.evaluate((node: HTMLElement) => {
      node.click();
    });

    return this;
  }

  /**
   * Click or Double Click on the Element by the Locator
   * @param action
   * @param locator
   * @param description
   * @returns
   */
  async clickbyLoc(action = 'Click', locator: string | Locator, description: string) {
    const updatedLocator = typeof locator === 'string' ? this.page.locator(locator) : locator;
    if (action === 'Click') {
      await updatedLocator.click();
    } else {
      await updatedLocator.dblclick();
    }
    await this.test_attach(description, 'text/plain');
    await this.allure_attach(description, locator as unknown as string, 'application/json');

    return this;
  }
}
