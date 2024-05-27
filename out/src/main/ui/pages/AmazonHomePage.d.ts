import { Page, TestInfo } from '@playwright/test';
import { PlaywrightActions } from '../../supportLibraries/PlaywrightActions';
export default class AmazonHomePage {
    page: Page;
    testInfo: TestInfo;
    private readonly locators;
    navigate(): Promise<void>;
    selectOptionDropdown(): Promise<void>;
    validateUrl(): Promise<void>;
    actions: PlaywrightActions;
    constructor(page: Page, testInfo: TestInfo);
}
