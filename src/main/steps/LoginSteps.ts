import { test } from '../configs/fixtures/bddPageFixture'
import { createBdd } from 'playwright-bdd'

const { Given, When, Then, } = createBdd(test)

Given('User navigates to the application', async ({ amazonHomePage }) => {
  await amazonHomePage.navigate()
})

Given('User click on the login link', async ({ page,amazonHomePage }) => {
  await amazonHomePage.selectOptionDropdown()
  //await page.getByRole('link', { name: 'Get It Today' }).click()
})
