import { test, expect } from '@fixtures/pageFixture'
import excelActions from '../../../main/utils/ExcelActions'
import { firefox } from 'playwright'

test("Amazon Home page", {tag:''}, async({page,amazonHomePage,excelActions})=>{
    await firefox.launch()
    await amazonHomePage.navigate()
    await amazonHomePage.selectOptionDropdown();
    await amazonHomePage.validateUrl()
    await page.getByRole('link', { name: 'Get It Today' }).click();
    page.context().browser()?.close()
})