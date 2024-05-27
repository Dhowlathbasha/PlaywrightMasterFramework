import { Page, TestInfo } from "@playwright/test";
import ClickActions from "./ClickActions";
export default class BrowserActions extends ClickActions {
    page: Page;
    testInfo: TestInfo;
    constructor(page: Page, testInfo: TestInfo);
    /**
     * Open a Url in browser window
     * @param url
     * @param options
     */
    openurl(url: string, options?: any): Promise<void>;
    /**
     * Open a Url in browser window with end point
     * @param url
     * @param endpoint
     * @param options
     */
    openUrlwithEndpoint(url: string, endpoint: string, options?: any): Promise<void>;
    /**
     *  Navigate to previous URL
     * @param description
     */
    navigateBack(description: string): Promise<void>;
    /**
     * Navigate to next URL
     * @param description
     */
    navigateForward(description: string): Promise<void>;
    /**
     * Page Refresh
     */
    pageRefresh(): Promise<void>;
    /**
     * Gets the handle of the new window
     * @param selector
     * @param description
     */
    switchToNewWindow(selector: string, description: string): Promise<Page>;
    /**
     * Close the tab by its Id
     * @param options
     */
    closeTabById(options?: {
        tabId?: number;
    }): Promise<void>;
    /**
     * Close the Page tab by its tab title
     * @param options
     */
    closeTabByTitle(options?: {
        tabTitle?: string;
    }): Promise<void>;
    /**
     * Gets the page Title
     * @returns
     */
    getPageTitle(): Promise<string>;
    /**
     * Accept alert and return alert message
     * @param promptText A text to enter in prompt. It is optional for alerts.
     * @returns alert message
     */
    alertAccept(promptText?: string): Promise<string>;
    /**
     * Dismiss alert and return alert message
     * @returns alert message
     */
    alertDismiss(): Promise<string>;
}
