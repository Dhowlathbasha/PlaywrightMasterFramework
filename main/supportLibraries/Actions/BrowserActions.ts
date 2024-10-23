/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Page, type TestInfo, test } from '@playwright/test';
import ClickActions from './ClickActions';
import logger from '@utils/reportUtils/CustomLogger';

export default class BrowserActions extends ClickActions {
  constructor(
    public page: Page,
    public testInfo: TestInfo
  ) {
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
  async openUrlwithEndpoint(url: string, endpoint: string, options?: never) {
    const updatedurl = url + endpoint;
    await this.page.goto(updatedurl, options);
  }

  /**
   * Navigate to previous URL
   * @param description
   */
  async navigateBack(description: string) {
    await this.page.goBack();
    logger.info(description);
  }

  /**
   * Navigate to next URL
   * @param description
   */
  async navigateForward(description: string) {
    await this.page.goForward();
    logger.info(description);
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
        this.page.context().waitForEvent('page'),
        await this.page.locator(selector).click(),
      ]);
      await newPage.waitForLoadState('domcontentloaded');
    });

    return newPage;
  }

  /**
   * Close the tab by its Id
   * @param options
   */
  async closeTabById(options?: { tabId?: number }) {
    if (options?.tabId) {
      const updatepage = this.page.context().pages()[options.tabId] as Page;
      await updatepage.close();
    } else {
      await this.page.close();
    }

    return this;
  }

  /**
   * Close the Page tab by its tab title
   * @param options
   */
  async closeTabByTitle(options?: { tabTitle?: string }) {
    if (options?.tabTitle) {
      const pages: Page[] = this.page.context().pages();

      for (let count = 0; count < pages.length; count++) {
        const updatedpage = pages[count] as Page;
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

    return this;
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
    return this.page.waitForEvent('dialog').then(async (dialog) => {
      let action: boolean = false;
      action = dialog.type() === 'prompt';

      if (action) {
        await dialog.accept(promptText);
      } else {
        await dialog.accept();
      }

      return dialog.message().trim();
    });
  }

  /**
   * Dismiss alert and return alert message
   * @returns alert message
   */
  public alertDismiss(): Promise<string> {
    return this.page.waitForEvent('dialog').then(async (dialog) => {
      await dialog.dismiss();

      return dialog.message().trim();
    });
  }
}
