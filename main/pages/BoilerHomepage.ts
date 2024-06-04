import { test, Page, TestInfo, Locator } from '@playwright/test';
import PlaywrightActions from '../supportLibraries/PlaywrightActions';

export default class BoilerHomePage {
  private readonly locators = {
    key: 'value',
  };

  async navigate() {
    await this.page.goto(process.env.URL as string);
  }

  actions: PlaywrightActions;

  public constructor(
    public page: Page,
    public testInfo: TestInfo
  ) {
    this.actions = new PlaywrightActions(page, testInfo);
  }
}
