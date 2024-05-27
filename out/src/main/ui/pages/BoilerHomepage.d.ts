import { Page, TestInfo } from '@playwright/test';
import PlaywrightActions from '../../supportLibraries/PlaywrightActions';
export default class BoilerHomePage {
    page: Page;
    testInfo: TestInfo;
    private readonly locators;
    navigate(): Promise<void>;
    actions: PlaywrightActions;
    constructor(page: Page, testInfo: TestInfo);
}
