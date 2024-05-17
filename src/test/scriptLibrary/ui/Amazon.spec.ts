import { test as amazon, expect } from '@fixtures/pageFixture'
import excelActions from '../../../main/utils/ExcelActions'
import { firefox } from 'playwright'

amazon("Amazon Home page", async({page,amazonHomePage,excelActions})=>{
    //await amazonHomePage.launch()
    await amazonHomePage.navigate()
    await amazonHomePage.selectOptionDropdown();
    await amazonHomePage.validateUrl()
    await page.getByRole('link', { name: 'Get It Today' }).click();
    page.context().browser()?.close()
})