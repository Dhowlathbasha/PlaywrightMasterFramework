import { Locator, Page, test, TestInfo, expect } from "@playwright/test";
import * as fs from "fs";
import { allure } from "allure-playwright";

export default class BaseActions {

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */
  constructor(public page: Page, public testInfo: TestInfo) {
    this.page = page;
    this.testInfo = testInfo;
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
 *
 * @param locator
 * @param options
 */
  async focusToElement(locator: string, options?: { focus?: boolean; timeout?: number }) {
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
      let tabNumber = options.tabId
      this.page = this.page.context().pages()[tabNumber] as Page;
    } else if (options?.tabTitle) {
      const pages: Page[] = this.page.context().pages();

      for (let count = 0; count < pages.length; count++) {
        const updatedpage = pages[count] as Page
        const pageTitle = updatedpage.title();
        if (options.tabTitle === pageTitle) {
          this.page = this.page.context().pages()[count] as Page;
          break;
        }
      }
    } else if (options?.tabTitle && options?.tabId) {
      const pages: Page[] = this.page.context().pages();
      const updatedpage = pages[options.tabId] as Page
      const pageTitle = updatedpage.title();
      if (options.tabTitle === pageTitle) {
        this.page = this.page.context().pages()[options.tabId] as Page;
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
 * Fetch the Count of Elements List
 * @param locator
 * @returns
 */
  async fetchCountOfElements(locator: string | Locator) {
    return typeof locator === "string"
      ? await this.page.locator(locator).count()
      : await locator.count();
  }

  async allure_attach(description: string, element_type: string, contentType: string) {
    await allure.attachment(description, JSON.stringify(element_type), { contentType: contentType });
  }

  async test_attach(description: string, contentType: string) {
    await this.testInfo.attach(description,
      {
        body: description,
        contentType: contentType,
      }
    )
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

  async embedScreenshot_byLoc(...args: any) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.testInfo.attach(args, {
      body: screenshot,
      contentType: "image/png",
    });
    await allure.attachment(args, screenshot, { contentType: "image/png" });
  }

  //************************    Verification operations    ************************

  /**
     * To verify that condition passed as input is true
     * @param condition - boolean condition
     * @param description - description of element that is being validated
     * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
     */
  async assertTrue(condition: boolean, description: string, softAssert = false) {
    await test.step(`Verifying that ${description} is true`, async () => {
      try {
        expect(condition, `Expected is 'True' & Actual is '${condition}'`).toBeTruthy();
      } catch (error) {
        if (!softAssert) {
          throw new Error(error);
        }
      }
    });
  }
  /**
   * To verify that value1 contains value2
   * @param value1 - string input
   * @param value2 - should be present in value1
   * @param description - description of element that is being validated
   * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
   */
  async assertContains(value1: string, value2: string, description: string, softAssert = false) {
    await test.step(`Verifying that ${description} contains text '${value2}'`, async () => {
      try {
        expect(value1, `'${value1}' is expected to CONTAIN '${value2}'`).toContain(value2);
      } catch (error) {
        if (!softAssert) {
          throw new Error(error);
        }
      }
    });
  }

  /**
  * To verify that value1 contains value1 ignoring case
  * @param value1 - string input
  * @param value2 - should be present in value1
  * @param description - description of element that is being validated
  * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
  */
  async assertContainsIgnoreCase(value1: string, value2: string, description: string,
    softAssert = false) {
    await test.step(`Verifying that ${description} contains text '${value2}'`, async () => {
      try {
        expect(value1.toLowerCase(), `'${value1}' is expected to CONTAIN '${value2}'`).toContain(value2.toLowerCase());
      } catch (error) {
        if (!softAssert) {
          throw new Error(error);
        }
      }
    });
  }

  /**
  * To verify that actual contains expected ignoring case
  * @param actual - string input
  * @param expected - string input
  * @param description - description of element that is being validated
  * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
  */
  async assertEqualsIgnoreCase(actual: string, expected: string, description: string,
    softAssert = false) {
    await test.step(`Verifying that ${description} has text ${expected}`, async () => {
      try {
        expect(actual.toLowerCase(), `Expected '${expected}' should be EQUAL to Actual '${actual}'`)
          .toEqual(expected.toLowerCase());
      } catch (error) {
        if (!softAssert) {
          throw new Error(error);
        }
      }
    });
  }

  /**
   * To verify actual equals expected
   * @param value1 any object
   * @param value2 any object to compare
   * @param description object description
   * @param softAssert for soft asserts this has to be set to true, else this can be ignored
   */
  async assertEquals(actual: any, expected: any, description: string, softAssert = false) {
    await test.step(`Verifying that ${description} has text ${expected}`, async () => {
      try {
        expect(actual, `Expected '${expected}' should be EQUAL to Actual '${actual}'`).toEqual(expected);
      } catch (error) {
        if (!softAssert) {
          throw new Error(error);
        }
      }
    });
  }

  /**
   * To verify that actual passed as input is false
   * @param condition boolean
   * @param description description of element that is being validated
   * @param softAssert for soft asserts this has to be set to true, else this can be ignored
   */
  async assertFalse(condition: boolean, description: string, softAssert = false) {
    await test.step(`Verifying that ${description} is false`, async () => {
      try {
        expect(condition, `Expected is 'false' & Acutal is '${condition}'`).toBeFalsy();
      } catch (error) {
        if (!softAssert) {
          throw new Error(error);
        }
      }
    });
  }

  /**
  * To verify that element not contains expected
  * @param actual any value 
  * @param expected any value
  * @param description description of element that is being validated
  * @param softAssert for soft asserts this has to be set to true, else this can be ignored
  */
  async assertNotContains(actual: any, expected: any, description: string, softAssert = false) {
    await test.step(`Verifying that ${description} does not contain '${expected}'`, async () => {
      try {
        expect(actual, `'${actual}' should NOT CONTAIN '${expected}'`).not.toContain(expected);
      } catch (error) {
        if (!softAssert) {
          throw new Error(error);
        }
      }
    });
  }

  /**
   * To verify actual not equals to expected
   * @param actual any object
   * @param expected any object to compare
   * @param description object description
   * @param softAssert for soft asserts this has to be set to true, else this can be ignored
   */
  async assertNotEquals(actual: any, expected: any, description: string, softAssert = false) {
    await test.step(`Verifying that ${description} is not equals to ${expected}`, async () => {
      try {
        expect(actual, `Expected '${expected}' should NOT be EQUAL to Actual '${actual}'`).not.toEqual(expected);
      } catch (error) {
        if (!softAssert) {
          throw new Error(error);
        }
      }
    });
  }

  /**
   * To verify value not equals to null
   * @param value any value
   * @param description description of the value
   * @param softAssert for soft asserts this has to be set to true, else this can be ignored
   */
  async assertNotNull(value: any, description: string, softAssert = false) {
    await test.step(`Verifying that ${description} is not null`, async () => {
      try {
        expect(value, `Expected is 'NOT null' & Actual is '${value}'`).not.toEqual(null);
      } catch (error) {
        if (!softAssert) {
          throw new Error(error);
        }
      }
    });
  }

  /**
   * To validate that value is not null
   * @param value any value
   * @param description description of the element
   * @param softAssert for soft asserts this has to be set to true, else this can be ignored
   */
  async assertNull(value: any, description: string, softAssert = false) {
    await test.step(`Verifying that ${description} is equals to null`, async () => {
      try {
        expect(value, `Expected is 'null' & Actual is '${value}'`).toEqual(null);
      } catch (error) {
        if (!softAssert) {
          throw new Error(error);
        }
      }
    });
  }

  /**
  * To validate that value is Undefined
  * @param value any value
  * @param description description of the element
  * @param softAssert for soft asserts this has to be set to true, else this can be ignored
  */
  async assertUndefined(value: any, description: string, softAssert = false) {
    await test.step(`Verifying that ${description} is undefined`, async () => {
      try {
        expect(value, `Expected is 'Undefined' & Actual is '${value}'`).toEqual(typeof undefined);
      } catch (error) {
        if (!softAssert) {
          throw new Error(error);
        }
      }
    });
  }

  /**
   * To validate that element is empty
   * @param value any element
   * @param description description of the element
   * @param softAssert for soft asserts this has to be set to true, else this can be ignored
   */
  async assertToBeEmpty(value: any, description: string, softAssert = false) {
    await test.step(`Verifying that ${description} is empty`, async () => {
      try {
        await expect(value, `Expected is 'Empty' & Actual is '${value}'`).toBeEmpty();
      } catch (error) {
        if (!softAssert) {
          throw new Error(error);
        }
      }
    });
  }
}
