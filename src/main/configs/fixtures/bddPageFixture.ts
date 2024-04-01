import { test as baseTest } from 'playwright-bdd'
import AmazonHomePage from '../../ui/pages/AmazonHomePage';
import SupportUtils from '../../utils/SupportUtils'
import { PlaywrightActions } from '../../utils/PlaywrightActions'
import ExcelActions from '../../utils/ExcelActions'
import BoilerHomePage from '../../ui/pages/BoilerHomepage'

type pages = {
  actions: PlaywrightActions
  amazonHomePage: AmazonHomePage
  boilerHomePage:BoilerHomePage
  supportUtils: SupportUtils
  excelActions: ExcelActions
}

const testPages = baseTest.extend<pages>({
  actions: async ({ page }, use) => {
    await use(new PlaywrightActions(page, test.info()))
  },
  amazonHomePage: async ({ page }, use) => {
    await use(new AmazonHomePage(page, test.info()))
  },
  boilerHomePage: async ({ page }, use) => {
    await use(new BoilerHomePage(page, test.info()))
  },
  supportUtils: async ({ page }, use) => {
    await use(new SupportUtils(page, test.info()))
  },

  excelActions: async ({ page }, use) => {
    await use(new ExcelActions(page,test.info()))
  },
  
})

export const test = testPages
export const expect = testPages.expect