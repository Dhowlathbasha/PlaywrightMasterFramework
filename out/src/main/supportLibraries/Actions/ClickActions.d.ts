import { Locator } from "playwright/test";
import { Page, TestInfo } from "@playwright/test";
import ElementActions from "./ElementActions";
export default class ClickActions extends ElementActions {
    page: Page;
    testInfo: TestInfo;
    constructor(page: Page, testInfo: TestInfo);
    /**
     * Pick the Locator from the Json file and Click on the Locator
     * @param filePath
     * @param locatorName
     */
    click_Locator_from_Json(filePath: string, locatorName: string): Promise<void>;
    /**
     * Pick the Locator and Replce the "parameter" in the Json file and Click on the Dynamic Locator
     * @param filePath
     * @param locatorName
     * @param parameterValue
     */
    clickDynamic(filePath: string, locatorName: string, parameterValue: string): Promise<void>;
    /**
     *
     * @param filePath
     * @param locatorName
     */
    clickAllIfExists(filePath: string, locatorName: string): Promise<void>;
    /**
   * Performs mouse click action on the element
   * @param locator
   * @returns
   */
    mouseClick(locator: string | Locator): Promise<this>;
    /**
   * Click on element using js
   * @returns
   */
    jsClick(locator: string | Locator): Promise<this>;
    click_byLoc(locator: string | Locator, description: string): Promise<void>;
    /**
     * Double click on element
     * @returns
     */
    doubleClick(locator: string | Locator): Promise<this>;
}
