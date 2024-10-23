import { test } from '@fixtures/bddPageFixture';
import { createBdd } from 'playwright-bdd';

const { Given } = createBdd(test);

Given('User navigates to the application', async ({ amazonHomePage }) => {
  await amazonHomePage.navigate();
});

Given('User click on the login link', async ({ amazonHomePage }) => {
  await amazonHomePage.selectOptionDropdown();
  //await page.getByRole('link', { name: 'Get It Today' }).click()
});
