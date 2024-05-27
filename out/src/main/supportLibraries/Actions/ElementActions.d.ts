import { Page, Locator, TestInfo } from "@playwright/test";
import BaseActions from "./BaseActions";
export default class ElementActions extends BaseActions {
    page: Page;
    testInfo: TestInfo;
    /**
     * @param {import('@playwright/test').Page} page
     * @param {import('@playwright/test').TestInfo} testInfo
     */
    constructor(page: Page, testInfo: TestInfo);
    /**
     * This method hovers over the element
     */
    hover(locator: string): Promise<this>;
    sendKey_byLoc(locator: string | Locator, text: string): Promise<void>;
    /**
     * Press a key on web page
     * @param key
     * @param description
     */
    keyPressByKeyboard(key: string): Promise<void>;
    /**
     * Pick the Locator from the Json file and Enter Text on the Field
     * @param filePath
     * @param locatorName
     * @param strValue
     */
    sendkeys(filePath: string, locatorName: string, strValue: string): Promise<void>;
    /**
     * Pick the Locator from the Json file and Enter Text on the Field and Press "Tab" button
     * @param filePath
     * @param locatorName
     * @param strValue
     */
    sendkeysAndTab(filePath: string, locatorName: string, strValue: string): Promise<void>;
    /**
     * Pick the Locator from the Json file and Enter Text on the Field and Press Keys
     * such as `ArrowLeft` or `a`. button
     * @param filePath
     * @param locatorName
     * @param strValue
     */
    presskey(filePath: string, locatorName: string, key: string): Promise<void>;
    /**
     * Press a key on web element
     * @param key
     */
    keyPress(locator: string | Locator, key: string): Promise<void>;
    /**
     * Returns input.value for <input> or <textarea> or <select> element.
     * @returns
     */
    fetchInputValue(locator: string): Promise<string>;
    /**
     * Gets the text content
     * @returns
     */
    getTextContent(locator: string): Promise<string>;
    /**
   * Get all the text Content
   * @returns
   */
    getAllTextContent(locator: string | Locator): Promise<string[]>;
    /**
     * Get Attribute value
     * @param attributeName
     * @returns
     */
    getAttribute(locator: string, attributeName: string): Promise<string>;
    /**
     * Get innerHTML
     * @returns
     */
    getInnerHTML(locator: string): Promise<string>;
    /**
     * Get inner text
     * @returns
     */
    getInnerText(locator: string): Promise<string>;
    /**
    *
    * @param filePath
    * @param locatorName
    */
    verifyHidden(filePath: string, locatorName: string): Promise<void>;
    /**
     *
     * @param filePath
     * @param locatorName
     */
    verifyVisible(filePath: string, locatorName: string): Promise<void>;
    /**
     *
     * @param filePath
     * @param locatorName
     * @param strExpectedValue
     */
    verifyValue(filePath: string, locatorName: string, strExpectedValue: string): Promise<void>;
    verifyDisabled(filePath: string, locatorName: string): Promise<void>;
    verifyEnabled(filePath: string, locatorName: string): Promise<void>;
    verifyVisible_byLoc(locator: Locator, description: string): Promise<void>;
    verifyHidden_byLoc(locator: Locator, description: string): Promise<void>;
    verifyValue_byLoc(locator: Locator, strExpectedValue: string, description: string): Promise<void>;
    verifyDisabled_byLoc(locator: Locator, description: string): Promise<void>;
    verifyEnabled_byLoc(locator: Locator, description: string): Promise<void>;
    verifyChkboxNotChkd_byLoc(locator: Locator, description: string): Promise<void>;
    /**
     * checks if element is editable
     * @returns Promise<boolean>
     */
    isEditable(locator: string): Promise<boolean>;
    /**
     * checks if element is enabled
     * @returns Promise<boolean>
     */
    isEnabled(locator: string): Promise<boolean>;
    /**
     * checks if element is visible
     * @param wait time for element to be visible
     * @returns Promise<boolean>
     */
    isVisible(locator: string, sec: number): Promise<boolean>;
    /**
     * Returns the status of the checkbox
     * @returns
     */
    isChecked(locator: string | Locator): Promise<boolean>;
    /**
     * check checkbox or radio button
     */
    check(locator: string | Locator): Promise<this>;
    /**
     * uncheck checkbox or radio button
     * @returns
     */
    uncheck(locator: string | Locator): Promise<this>;
    /**
     *
     * @param filePath
     * @param locatorName
     * @param strValue
     */
    selectByVisibleText(filePath: string, locatorName: string, strValue: string): Promise<void>;
    /**
     *
     * @param filePath
     * @param locatorName
     * @param strValue
     */
    selectByValue(filePath: string, locatorName: string, strValue: string): Promise<void>;
    selectdropdown(locator: string | number): Promise<void>;
    /**
     * Gets all the options in dropdown
     * @returns
     */
    getAllOptions(locator: string): Promise<string[]>;
    /**
     * Gets all the selected options in dropdown
     * @returns
     */
    getAllSelectedOptions(locator: string): Promise<string[]>;
}
