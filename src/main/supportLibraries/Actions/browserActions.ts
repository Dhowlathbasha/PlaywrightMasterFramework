import { Page, TestInfo, test } from "@playwright/test";
import ClickActions from "./ClickActions";


export default class BrowserActions extends ClickActions {

  constructor(public page: Page, public testInfo: TestInfo) {
    super(page, testInfo);
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
   * Gets the handle of the new window
   * @param selector
   * @param description
   */
  async switchToNewWindow(selector: string, description: string): Promise<Page> {
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
      const updatepage = this.page.context().pages()[options.tabId] as Page
      await updatepage.close();
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
        const updatedpage = pages[count] as Page
        const pageTitle = updatedpage.title();
        if (options.tabTitle === (await pageTitle)) {
          this.page = this.page.context().pages()[count] as Page;
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
  async getPageTitle(): Promise<string> {
    return await this.page.title();
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
}