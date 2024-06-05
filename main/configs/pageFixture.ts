/* eslint-disable no-use-before-define */
import { test as baseTest } from '@playwright/test';
import SupportUtils from '@utils/SupportUtils';
import PlaywrightActions from '@utils/PlaywrightActions';
import ExcelActions from '@utils/ExcelActions';
import AxeBuilder from '@axe-core/playwright';
import BoilerHomePage from '@pages/BoilerHomepage';
import AmazonHomePage from '@pages/AmazonHomePage';
import CsvFileActions from '@utils/CsvFileActions';

interface pages {
  actions: PlaywrightActions;
  amazonHomePage: AmazonHomePage;
  boilerHomePage: BoilerHomePage;
  supportUtils: SupportUtils;
  excelActions: ExcelActions;
  csvActions: CsvFileActions;
  axebuilder: AxeBuilder;
}

const testPages = baseTest.extend<pages>({
  actions: async ({ page }, use) => {
    await use(new PlaywrightActions(page, test.info()));
  },
  amazonHomePage: async ({ page }, use) => {
    await use(new AmazonHomePage(page, test.info()));
  },
  boilerHomePage: async ({ page }, use) => {
    await use(new BoilerHomePage(page, test.info()));
  },
  supportUtils: async ({ page }, use) => {
    await use(new SupportUtils(page, test.info()));
  },

  excelActions: async ({ page }, use) => {
    await use(new ExcelActions());
  },

  csvActions: async ({ page }, use) => {
    await use(new CsvFileActions());
  },

  axebuilder: async ({ page }, use) => {
    const builder = new AxeBuilder({ page });
    await use(builder);
  },
});

const test = testPages;
const testInfo = test.info();
const { expect } = testPages;

export { test, testInfo, expect };
