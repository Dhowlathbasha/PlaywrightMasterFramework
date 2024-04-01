import { test, expect } from '@fixtures/pageFixture'

//const testParentIssueId = "OrangeHrm" // Folder as per project
//let testData = JSON.parse(fs.readFileSync('./testdataFolder/' + testParentIssueId + '/Testcase1.json', 'utf-8'));

test('Lambda Checkbox', async ({ page, lamdaChkBoxPage , actions}) => {
  await actions.openurl("https://www.lambdatest.com/selenium-playground/checkbox-demo",)
  await lamdaChkBoxPage.verifyAgeCheckbox_notSelected()
  await lamdaChkBoxPage.clickCheckbox()
})


test('Lambda File Upload', async ({ page, lamdaFileUpload , actions}) => {
    await actions.openurl("https://www.lambdatest.com/selenium-playground/upload-file-demo",)
    await lamdaFileUpload.fileUpload_fileChooser()
    await page.waitForTimeout(3_000)
  })

