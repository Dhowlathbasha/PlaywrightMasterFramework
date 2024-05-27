import { Locator, Page, TestInfo } from "@playwright/test";
export default class BaseActions {
    page: Page;
    testInfo: TestInfo;
    /**
     * @param {import('@playwright/test').Page} page
     * @param {import('@playwright/test').TestInfo} testInfo
     */
    constructor(page: Page, testInfo: TestInfo);
    /**
   *
   * @param locator
   * @returns
   */
    getLocator(locator: Locator): Promise<Locator>;
    /**
   *
   * @param locator
   * @param options
   */
    focusToElement(locator: string, options?: {
        focus?: boolean;
        timeout?: number;
    }): Promise<void>;
    findElement(locator: string, options?: {
        frame?: string;
        tabId?: number;
        tabTitle?: Promise<string>;
        timeOut?: number;
        has?: Locator;
        hasText?: string;
    }): Promise<Locator>;
    /**
     * Get the Locator from the JSON file
     * @param filePath
     * @param locatorName
     * @returns
     */
    fetchLocatorfromJson(filePath: string, locatorName: string): Promise<any>;
    /**
   * Fetch the Count of Elements List
   * @param locator
   * @returns
   */
    fetchCountOfElements(locator: string | Locator): Promise<number>;
    allure_attach(description: string, element_type: string, contentType: string): Promise<void>;
    test_attach(description: string, contentType: string): Promise<void>;
    /**
  *
  * @param description
  */
    embedScreenshot(description: string): Promise<void>;
    embedScreenshot_byLoc(...args: any): Promise<void>;
    /**
       * To verify that condition passed as input is true
       * @param condition - boolean condition
       * @param description - description of element that is being validated
       * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
       */
    assertTrue(condition: boolean, description: string, softAssert?: boolean): Promise<void>;
    /**
     * To verify that value1 contains value2
     * @param value1 - string input
     * @param value2 - should be present in value1
     * @param description - description of element that is being validated
     * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
     */
    assertContains(value1: string, value2: string, description: string, softAssert?: boolean): Promise<void>;
    /**
    * To verify that value1 contains value1 ignoring case
    * @param value1 - string input
    * @param value2 - should be present in value1
    * @param description - description of element that is being validated
    * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
    */
    assertContainsIgnoreCase(value1: string, value2: string, description: string, softAssert?: boolean): Promise<void>;
    /**
    * To verify that actual contains expected ignoring case
    * @param actual - string input
    * @param expected - string input
    * @param description - description of element that is being validated
    * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
    */
    assertEqualsIgnoreCase(actual: string, expected: string, description: string, softAssert?: boolean): Promise<void>;
    /**
     * To verify actual equals expected
     * @param value1 any object
     * @param value2 any object to compare
     * @param description object description
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    assertEquals(actual: any, expected: any, description: string, softAssert?: boolean): Promise<void>;
    /**
     * To verify that actual passed as input is false
     * @param condition boolean
     * @param description description of element that is being validated
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    assertFalse(condition: boolean, description: string, softAssert?: boolean): Promise<void>;
    /**
    * To verify that element not contains expected
    * @param actual any value
    * @param expected any value
    * @param description description of element that is being validated
    * @param softAssert for soft asserts this has to be set to true, else this can be ignored
    */
    assertNotContains(actual: any, expected: any, description: string, softAssert?: boolean): Promise<void>;
    /**
     * To verify actual not equals to expected
     * @param actual any object
     * @param expected any object to compare
     * @param description object description
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    assertNotEquals(actual: any, expected: any, description: string, softAssert?: boolean): Promise<void>;
    /**
     * To verify value not equals to null
     * @param value any value
     * @param description description of the value
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    assertNotNull(value: any, description: string, softAssert?: boolean): Promise<void>;
    /**
     * To validate that value is not null
     * @param value any value
     * @param description description of the element
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    assertNull(value: any, description: string, softAssert?: boolean): Promise<void>;
    /**
    * To validate that value is Undefined
    * @param value any value
    * @param description description of the element
    * @param softAssert for soft asserts this has to be set to true, else this can be ignored
    */
    assertUndefined(value: any, description: string, softAssert?: boolean): Promise<void>;
    /**
     * To validate that element is empty
     * @param value any element
     * @param description description of the element
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    assertToBeEmpty(value: any, description: string, softAssert?: boolean): Promise<void>;
}
