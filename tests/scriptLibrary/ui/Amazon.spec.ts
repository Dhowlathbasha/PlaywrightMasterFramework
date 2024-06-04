import { test, expect } from '@fixtures/pageFixture'

// amazon("Amazon Home page", async({page,amazonHomePage,context})=>{
//     console.log(
//      context.browser()?.version());
//     //await amazonHomePage.launch()
//     await amazonHomePage.navigate()
//     await amazonHomePage.selectOptionDropdown();
//     await amazonHomePage.validateUrl()
//     await page.getByRole('link', { name: 'Get It Today' }).click();
//     await page.goto('https://www.amazon.in/');
//     await page.getByLabel('Open Menu').click();
//     await page.getByRole('link', { name: 'Mobiles, Computers' }).click();
//     await page.getByRole('link', { name: 'All Mobile Phones' }).click();
//     await page.locator('li').filter({ hasText: 'Smartphones & Basic Mobiles' }).click();
//     await page.getByRole('link', { name: 'Smartphones & Basic Mobiles' }).click();
//     page.context().browser()?.close()
// })

test('has title', async ({ page,actions }) => {
    await actions.openurl('https://playwright.dev/',{waitUntil: "domcontentloaded"}) // Checking Fixture is Working or not
    //await page.goto('https://playwright.dev/');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });
  
  test('get started link', async ({ page,actions }) => {
    await actions.openurl('https://playwright.dev/',{waitUntil: "domcontentloaded"}) // Checking Fixture is Working or not
  
    // Click the get started link.
    //await page.getByRole('link', { name: 'Get started' }).click();
    await actions.click_byLoc(page.getByRole('link', { name: 'Get started' }),"")
  
    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
  
  test('test', async ({ page }) => {
    await page.goto('https://reqres.in/',{waitUntil: "domcontentloaded"});
    await page.locator('li').filter({ hasText: 'List users' }).scrollIntoViewIfNeeded({timeout: 5000});
    await page.locator('li').filter({ hasText: 'List users' }).click();
    await page.locator('li').filter({ hasText: 'Single user' }).first().scrollIntoViewIfNeeded({timeout: 5000});
    await page.locator('li').filter({ hasText: 'Single user' }).first().click();
    await page.waitForTimeout(5000);
  });
  