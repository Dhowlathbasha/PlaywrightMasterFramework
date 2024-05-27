import { test as baseTest , TestInfo, Page} from '@playwright/test'
import AmazonHomePage from '@pages/AmazonHomePage'
import SupportUtils from '../../supportLibraries/SupportUtils'
import PlaywrightActions from '../../supportLibraries/PlaywrightActions'
import ExcelActions from '../../supportLibraries/ExcelActions'
import BoilerHomePage from '@pages/BoilerHomepage'
import AxeBuilder from '@axe-core/playwright'

type pages = {
  actions: PlaywrightActions
  amazonHomePage: AmazonHomePage
  boilerHomePage:BoilerHomePage
  supportUtils: SupportUtils
  excelActions: ExcelActions
  axebuilder : AxeBuilder
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
  
  axebuilder: async ({ page }, use, testInfo) => {
    //await use(new AxeBuilder({page}))
    const builder = new AxeBuilder({page})
    await use (builder)
  }
})

export const test = testPages
export const expect = testPages.expect