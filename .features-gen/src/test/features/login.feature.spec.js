/** Generated from: src\test\features\login.feature */
import { test } from "../../../../src/main/configs/fixtures/bddPageFixture.ts";

test.describe("User Authentication tests", () => {

  test("Login should be success", async ({ Given, amazonHomePage, And, page }) => {
    await Given("User navigates to the application", null, { amazonHomePage });
    await And("User click on the login link", null, { page, amazonHomePage });
  });

  test("Login should be success1", async ({ Given, amazonHomePage, And, page }) => {
    await Given("User navigates to the application", null, { amazonHomePage });
    await And("User click on the login link", null, { page, amazonHomePage });
  });

  test("Login should be success2", async ({ Given, amazonHomePage, And, page }) => {
    await Given("User navigates to the application", null, { amazonHomePage });
    await And("User click on the login link", null, { page, amazonHomePage });
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $testMetaMap: ({}, use) => use(testMetaMap),
  $uri: ({}, use) => use("src\\test\\features\\login.feature"),
});

const testMetaMap = {
  "Login should be success": {"pickleLocation":"3:3"},
  "Login should be success1": {"pickleLocation":"7:3"},
  "Login should be success2": {"pickleLocation":"11:3"},
};