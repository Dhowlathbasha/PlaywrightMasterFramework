import type { Page, TestInfo } from '@playwright/test';
import PlaywrightActions from '@utils/PlaywrightActions';

export default class BoilerHomePage {
  actions: PlaywrightActions;

  private readonly locators = {
    key: 'value',
  };

  public constructor(
    public page: Page,
    public testInfo: TestInfo
  ) {
    this.actions = new PlaywrightActions(page, testInfo);
  }

  async navigate() {
    await this.page.goto(process.env.URL as string);
  }
}
