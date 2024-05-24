import { test as amazon, expect } from '@fixtures/pageFixture'
import excelActions from '../../../main/supportLibraries/ExcelActions'
import { firefox } from 'playwright'

amazon("Amazon Home page", async({page,amazonHomePage,excelActions})=>{
    //await amazonHomePage.launch()
    await amazonHomePage.navigate()
    await amazonHomePage.selectOptionDropdown();
    await amazonHomePage.validateUrl()
    await page.getByRole('link', { name: 'Get It Today' }).click();
    await page.goto('https://www.amazon.in/');
    await page.getByLabel('Open Menu').click();
    await page.getByRole('link', { name: 'Mobiles, Computers' }).click();
    await page.getByRole('link', { name: 'All Mobile Phones' }).click();
    await page.locator('li').filter({ hasText: 'Smartphones & Basic Mobiles' }).click();
    await page.getByRole('link', { name: 'Smartphones & Basic Mobiles' }).click();
    page.context().browser()?.close()
})