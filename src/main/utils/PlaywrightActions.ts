import AxeBuilder from "@axe-core/playwright";
import { Locator, Page, expect, test, TestInfo } from "@playwright/test";
import { Workbook, Worksheet } from "exceljs";
import * as fs from "fs";
import * as pdfjslib from 'pdfjs-dist-es5';
import { allure } from "allure-playwright";
import * as path from "path";

export class PlaywrightActions {
    
    /**
    * @param {import('@playwright/test').Page} page
    * @param {import('@playwright/test').TestInfo} testInfo
    */
    constructor(public page : Page, public testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }

    async openurl(url:string, options?:any){
        await this.page.goto(url,options);
    }

    async openUrlwithEndpoint(url:string, endpoint:string,options?:any){
        url+=endpoint;
        await this.page.goto(url,options)
    }

    async closeTabById(options?: {tabId?: number}) {
        if (options?.tabId) {
            await this.page.context().pages()[options.tabId].close();
        }
        else {
            await this.page.close()
        }
    }

    async closeTabByTitle(options?: {tabTitle?: string}) {
        if (options?.tabTitle) {
            const pages: Array<Page> = this.page.context().pages()

            for (let count = 0; count < pages.length; count++) {
                const pageTitle = pages[count].title()
                if (options.tabTitle === await pageTitle) {
                    this.page = this.page.context().pages()[count]
                    this.page.close()
                    break;
                }
            }
        }
        else {
            await this.page.close()
        }
    }    
    
    async clickByJsonPath(filePath: string, locatorName: string) {
        let locator = await this.fetchLocatorfromJson(filePath, locatorName);
        await this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded();
        await this.page.click(locator.locators[0]);
        this.page.context()
        await this.testInfo.attach(locator.description + " is clicked", { body: locator.description, contentType: 'text/plain' });
        await allure.attachment(locator.description + " is clicked", JSON.stringify(locator.locators[0]), {contentType: "application/json",});
    }

    async clickDynamic(filePath: string, locatorName: string, parameterValue1: string) {
        let locator = await this.fetchLocatorfromJson(filePath, locatorName);
        locator.locators[0] = locator.locators[0].replace("${parameter1}", parameterValue1)
        await this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded();
        await this.page.click(locator.locators[0]);
        await this.testInfo.attach(locator.description + " is clicked", { body: locator.description, contentType: 'text/plain' });
        await allure.attachment(locator.description + " is clicked", JSON.stringify(locator.locators[0]), {contentType: "application/json",});
    }

    async clickAllIfExists(filePath: string, locatorName: string) {
        let locator = await this.fetchLocatorfromJson(filePath, locatorName);
        let flagBoolean = await this.page.locator(locator.locators[0]).count();

        while (flagBoolean > 0) {
            await this.page.click(locator.locators[0]);
            flagBoolean = await this.page.locator(locator.locators[0]).count();
        }
        await this.testInfo.attach("All " + locator.description + " is clicked", { body: locator.description, contentType: 'text/plain' });
        await allure.attachment("All " + locator.description + " is clicked", JSON.stringify(locator.locators[0]), {contentType: "application/json",});
    }

    async getLocator(locator: Locator) {
        return locator;
    }

    async fetchLocatorfromJson(filePath: string, locatorName: string) {
        let rawdata = fs.readFileSync(filePath).toString();
        let data = JSON.parse(rawdata);
        return data.locators[locatorName];
    }

    async sendkeys(filePath: string, locatorName: string, strValue: string) {
        let locator = await this.fetchLocatorfromJson(filePath, locatorName);
        await this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded();
        await this.page.fill(locator.locators[0], strValue);
        await this.testInfo.attach(locator.description + " is entered with " + strValue, { body: locator.description + " is entered with " + strValue, contentType: 'text/plain' });
        await allure.attachment(locator.description + " is entered with " + strValue, JSON.stringify(locator.locators[0]), {contentType: "application/json",});
    }

    async focusToElement(locator: string, options?: { focus?: boolean, timeout?: number}) {
        try {
            if (options?.focus) {
                await this.page.focus(locator);
            }
            else if (!options?.focus && options?.timeout) {
                const timeout = options?.timeout
                await this.page.locator(locator).scrollIntoViewIfNeeded({timeout})
            }
        }
        catch (error) {
            console.error('Error Occured in focus Into view of needed')
        }
    }

    async presskey(filePath: string, locatorName: string, strValue: string) {
        let locator = await this.fetchLocatorfromJson(filePath, locatorName);
        await this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded();
        await this.page.press(locator.locators[0], strValue);
        await this.testInfo.attach(locator.description + " is pressed with " + strValue, { body: locator.description + " is pressed with " + strValue, contentType: 'text/plain' });
        await allure.attachment(locator.description + " is pressed with " + strValue, JSON.stringify(locator.locators[0]), {contentType: "application/json",});
    }

    async selectRadio(filePath: string, locatorName: string, strValue: string) {
        let locator = await this.fetchLocatorfromJson(filePath, locatorName);
        let locatorToClick = await locator.locators[0].replace('${Value}', strValue);
        await this.page.click(locatorToClick);
        await this.testInfo.attach(locator.description + " is selected with " + strValue, { body: locator.description + " is selected with " + strValue, contentType: 'text/plain' });
        await allure.attachment(locator.description + " is selected with " + strValue, JSON.stringify(locator.locators[0]), {contentType: "application/json",});
    }

    async selectByVisibleText(filePath: string, locatorName: string, strValue: string) {
        let locator = await this.fetchLocatorfromJson(filePath, locatorName);
        await this.page.selectOption(locator.locators[0], { label: strValue });
        await this.testInfo.attach(locator.description + " is selected with " + strValue, { body: locator.description + " is selected with " + strValue, contentType: 'text/plain' });
        await allure.attachment(locator.description + " is selected with " + strValue, JSON.stringify(locator.locators[0]), {contentType: "application/json",});
    }

    async selectByValue(filePath: string, locatorName: string, strValue: string) {
        let locator = await this.fetchLocatorfromJson(filePath, locatorName);
        await this.page.selectOption(locator.locators[0], strValue);
        await this.testInfo.attach(locator.description + " is selected with " + strValue, { body: locator.description + " is selected with " + strValue, contentType: 'text/plain' });
        await allure.attachment(locator.description + " is selected with " + strValue, JSON.stringify(locator.locators[0]), {contentType: "application/json",});
    }

    async embedScreenshot(description: string) {
        const screenshot = await this.page.screenshot({ fullPage: true });
        await this.testInfo.attach(description, { body: screenshot, contentType: 'image/png' });
        await allure.attachment(description, screenshot, {contentType: "image/png",});
        await allure.attachment(description, JSON.stringify(description), {contentType: "application/json",});
        
    }

    async verifyHidden(filePath: string, locatorName: string) {
        let locator = await this.fetchLocatorfromJson(filePath, locatorName);
        let flagBoolean = await this.page.isHidden(locator.locators[0]);
        if (flagBoolean) {
            await this.embedScreenshot(locator.description + " is Hidden as Expected - Screenshot");
            await this.testInfo.attach(locator.description + " is Hidden as Expected", { body: locator.description + " is Hidden as Expected", contentType: 'text/plain' });
            await allure.attachment(locator.description + " is Hidden as Expected" , JSON.stringify(locator.locators[0]), {contentType: "application/json",});
        } else {
            await this.embedScreenshot(locator.description + " is NOT Hidden - FAILURE");
            await this.testInfo.attach(locator.description + " is NOT Hidden - FAILURE", { body: locator.description + " is NOT Hidden - FAILURE", contentType: 'text/plain' });
            await allure.attachment(locator.description + " is NOT Hidden - FAILURE " , JSON.stringify(locator.locators[0]), {contentType: "application/json",});
        }
        await expect.soft(this.page.locator(locator.locators[0])).toBeHidden();
    }

    async verifyVisible(filePath: string, locatorName: string) {
        let locator = await this.fetchLocatorfromJson(filePath, locatorName);
        let flagBoolean = await this.page.isVisible(locator.locators[0]);
        if (flagBoolean) {
            await this.embedScreenshot(locator.description + " is Visible as Expected - Screenshot");
            await this.testInfo.attach(locator.description + " is Visible as Expected", { body: locator.description + " is Visible as Expected", contentType: 'text/plain' });
            await allure.attachment(locator.description + " iis Visible as Expected " , JSON.stringify(locator.locators[0]), {contentType: "application/json",});
        } else {
            await this.embedScreenshot(locator.description + " is NOT Visible - FAILURE");
            await this.testInfo.attach(locator.description + " is NOT Visible - FAILURE", { body: locator.description + " is NOT Visible - FAILURE", contentType: 'text/plain' });
            await allure.attachment(locator.description + " is NOT Visible - FAILURE " , JSON.stringify(locator.locators[0]), {contentType: "application/json",});
        }
        await expect.soft(this.page.locator(locator.locators[0])).toBeVisible();
    }


    async verifyValue(filePath: string, locatorName: string, strExpectedValue: string) {
        let locator = await this.fetchLocatorfromJson(filePath, locatorName);
        let actualValue = await this.page.inputValue(locator.locators[0]);
        if (strExpectedValue == actualValue) {
            await this.embedScreenshot(locator.description + " value is displayed as expected = " + strExpectedValue + " ; actual = " + actualValue);
            await this.testInfo.attach(locator.description + " value is displayed as expected = " + strExpectedValue + " ; actual = " + actualValue, { body: locator.description + " value is displayed as expected = " + strExpectedValue + " ; actual = " + actualValue, contentType: 'text/plain' });
            await allure.attachment(locator.description + " value is displayed as expected = " + strExpectedValue + " ; actual = " + actualValue , JSON.stringify(locator.locators[0]), {contentType: "application/json",});
        } else {
            await this.embedScreenshot("FAILURE - " + locator.description + " value is NOT displayed as expected = " + strExpectedValue + " ; actual = " + actualValue);
            await this.testInfo.attach("FAILURE - " + locator.description + " value is NOT displayed as expected = " + strExpectedValue + " ; actual = " + actualValue, { body: locator.description + " value is NOT displayed as expected = " + strExpectedValue + " ; actual = " + actualValue, contentType: 'text/plain' });
            await allure.attachment(locator.description + " value is NOT displayed as expected = " + strExpectedValue + " ; actual = " + actualValue , JSON.stringify(locator.locators[0]), {contentType: "application/json",});
        }
        await expect.soft(this.page.locator(locator.locators[0])).toHaveValue(strExpectedValue);
    }

    async waitForNetworkIdle() {
        await this.page.waitForLoadState('networkidle');
    }

    async waitForDomLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyDisabled(filePath: string, locatorName: string) {
        let locator = await this.fetchLocatorfromJson(filePath, locatorName);
        let flagBoolean = await this.page.isEditable(locator.locators[0]);
        if (!flagBoolean) {
            await this.embedScreenshot(locator.description + " is Disabled as Expected - Screenshot");
            await this.testInfo.attach(locator.description + " is Disabled as Expected", { body: locator.description + " is Disabled as Expected", contentType: 'text/plain' });
            await allure.attachment(locator.description + " is Disabled as Expected", JSON.stringify(locator.locators[0]), {contentType: "application/json",});
        } else {
            await this.embedScreenshot(locator.description + " is NOT Disabled - FAILURE");
            await this.testInfo.attach(locator.description + " is NOT Disabled - FAILURE", { body: locator.description + " is NOT Disabled - FAILURE", contentType: 'text/plain' });
            await allure.attachment(locator.description + " is NOT Disabled - FAILURE" , JSON.stringify(locator.locators[0]), {contentType: "application/json",});
        }
        await expect.soft(this.page.locator(locator.locators[0])).not.toBeEditable();
    }


    async verifyEnabled(filePath: string, locatorName: string) {
        let locator = await this.fetchLocatorfromJson(filePath, locatorName);
        let flagBoolean = await this.page.isEditable(locator.locators[0]);
        if (flagBoolean) {
            await this.embedScreenshot(locator.description + " is Enabled as Expected - Screenshot");
            await this.testInfo.attach(locator.description + " is Enabled as Expected", { body: locator.description + " is Enabled as Expected", contentType: 'text/plain' });
            await allure.attachment(locator.description + " is Enabled as Expected" , JSON.stringify(locator.locators[0]), {contentType: "application/json",});
        } else {
            await this.embedScreenshot(locator.description + " is NOT Enabled - FAILURE");
            await this.testInfo.attach(locator.description + " is NOT Enabled - FAILURE", { body: locator.description + " is NOT Enabled - FAILURE", contentType: 'text/plain' });
            await allure.attachment(locator.description + " is NOT Enabled - FAILURE" , JSON.stringify(locator.locators[0]), {contentType: "application/json",});
        }
        await expect.soft(this.page.locator(locator.locators[0])).toBeEditable();
    }

    async findElement(locator: string, options?: {
        frame?: string,
        tabId?: number,
        tabTitle?: Promise<string>,
        timeOut?: number,
        has?: Locator,
        hasText?: string
    }) {

        if (options?.tabId) {
            this.page = this.page.context().pages()[options.tabId]
        }

        else if (options?.tabTitle) {
            const pages: Array<Page> = this.page.context().pages()

            for (let count = 0; count < pages.length; count++) {
                const pageTitle = pages[count].title()
                if (options.tabTitle === pageTitle) {
                    this.page = this.page.context().pages()[count]
                    break;
                }
            }
        }

        else if (options?.tabTitle && options?.tabId) {
            const pages: Array<Page> = this.page.context().pages()

            const pageTitle = pages[options.tabId].title()
            if (options.tabTitle === pageTitle) {
                this.page = this.page.context().pages()[options.tabId]
            }
        }

        if (options?.frame) {
            return this.page.frameLocator(options.frame).locator(locator, {
                has: options?.has,
                hasText: options?.hasText
            })
        }

        return this.page.locator(locator, {
            has: options?.has,
            hasText: options?.hasText
        })
    }
    //************************  locator operations - actions   ************************

    async click_byLoc(locator:Locator,description:string){
        await this.embedScreenshot(description)
        await locator.click()
    }

    async sendKey_byLoc(locator:Locator,text:string,description:string){
        await this.embedScreenshot(description)
        await locator.fill(text)
    }

    //************************  locator operations - verification   ************************

    async verifyVisible_byLoc(locator:Locator,description:string){
        await this.embedScreenshot(description + "VERIFY VISIBLE - VALIDATION SCREENSHOT")
        await expect(locator).toBeVisible()
    }

    async verifyHidden_byLoc(locator:Locator, description:string) {
        await this.embedScreenshot(description + " VERIFY HIDDEN - VALIDATION SCREENSHOT");
        await expect(locator).toBeHidden();    
      }
     
      async verifyValue_byLoc(locator:Locator, strExpectedValue:string, description:string) {
        await this.embedScreenshot(description + " VERIFY VALUE - VALIDATION SCREENSHOT");
        await expect(locator).toHaveValue(strExpectedValue);
      }
     
      async verifyDisabled_byLoc(locator:Locator, description:string) {
        await this.embedScreenshot(description + " VERIFY DISABLED - VALIDATION SCREENSHOT");
        await expect(locator).not.toBeEditable();
      }
      
      async verifyEnabled_byLoc(locator:Locator, description:string) {
        await this.embedScreenshot(description + " VERIFY ENABLED - VALIDATION SCREENSHOT");
        await expect(locator).toBeEditable();
      }

      async verifyChkboxNotChkd_byLoc(locator:Locator, description:string) {
        await this.embedScreenshot(description + " VERIFY CHECKBOX CHECKED - VALIDATION SCREENSHOT");
        await expect(locator).not.toBeChecked();
      }
      
      async embedScreenshot_byLoc(...args:any) {
        const screenshot = await this.page.screenshot({fullPage: true });
        await this.testInfo.attach(args, { body: screenshot, contentType: 'image/png' });
        await allure.attachment(args, screenshot, {contentType: "image/png",});
      }
     
      //************************    visual validation   ************************
     
      async verifySnapshot_byLoc(locator:Locator) {
        await expect(locator).toHaveScreenshot();
        const screenshot = await locator.screenshot();
        await this.testInfo.attach("ACTUAL SCREENSHOT - Visual Validation", { body: screenshot, contentType: 'image/png' });
      }

      async verifySnapshot(filePath: string, locatorName: string, screenshotPath: string) {
        let locator = await this.fetchLocatorfromJson(filePath, locatorName);
        await expect.soft(this.page.locator(locator.locators[0])).toHaveScreenshot(screenshotPath);
        const screenshot = await this.page.locator(locator.locators[0]).screenshot();
        await this.testInfo.attach("ACTUAL SCREENSHOT - Visual Validation", { body: screenshot, contentType: 'image/png' });
    }
     
      //************************    mocking api     ************************
     
      async mockApi(endpointURL:string, ...jsonPayload:any) {
         console.log(jsonPayload);
         await this.page.route(endpointURL, async route => {
         await route.fulfill(jsonPayload);
        });
      }
     
      //************************    accessibility   ************************
     
      async validateAccessibility(strDescription: string) {
        const page = this.page
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

        await this.testInfo.attach('accessibility-scan-results-' + strDescription, {
            body: JSON.stringify(accessibilityScanResults, null, 2),
            contentType: 'application/json'
        });

        expect(accessibilityScanResults.violations).toEqual([]);
    }

    //************************    library functions   ************************

    // async getData(filepath_W_name:string,sheetName:string, tcid:string, columnName:string) {
    //     const workbook = new Workbook();
    //     let colNum : any
       
    //     const content_workbook = await workbook.xlsx.readFile(filepath_W_name);
    //     let worksheet;
    //     worksheet = content_workbook.getWorksheet(sheetName);
    //     if(worksheet!=undefined){
    //         let rows = worksheet.rowCount;
             
    //         if(await this.getColumnNumber(worksheet,columnName) != undefined){
    //             colNum = await this.getColumnNumber(worksheet,columnName)
    //             return await this.getColumnData(worksheet,tcid,rows,colNum)
    //         }
    //     }  
    // }

    // async getColumnNumber(worksheet: Worksheet,columnName:string):Promise<any>{
    //     let colNum: any
    //     try {
    //       for (var i = 1; i <= worksheet.columnCount; i++) {
    //         if (worksheet.getRow(1).getCell(i).value == columnName) {
    //           colNum = i
    //           break;
    //         }
    //       }
    //     } catch (error) {
    //       console.error(error)
    //     }
    //     return colNum;
    // }

    // async getColumnData(worksheet: Worksheet,tcid:string,rowNum:number,columnNum:string|number){
    //     let columnData : any
    //     for(var i=2;i<=rowNum;i++){
    //         if(worksheet.getRow(i).getCell(1).value==tcid){
    //             columnData = worksheet.getRow(i).getCell(columnNum).value;
    //             return columnData;
    //         }
    //     }
    // }

    async readValuesFromTextFile(filePath: string): Promise<any> {
       if(await this.exists(filePath)) {
        return fs.readFileSync(`${filePath}`, `utf-8`)
        }
    }

    async writeDataIntoTextFile(filePath: number | fs.PathLike |string, data: string | NodeJS.ArrayBufferView): Promise<void> {    
        fs.writeFile(filePath, data, (error) => {
            if (error)
                throw error;
        });
    }

    async exists(path: string) {
        if (fs.existsSync(path)) {
          return path;
        }
      }

    async getPdfPageText(pdf: any, pageNo: number) {
        const page = await pdf.getPage(pageNo);
        const tokenizedText = await page.getTextContent();
        const pageText = tokenizedText.items.map((token: any) => token.str).join('');
        return pageText;
    }

    async getPDFText(filePath: any): Promise<string> {
        const dataBuffer = fs.readFileSync(filePath);
        const pdf = await pdfjslib.getDocument(dataBuffer).promise;
        const maxPages = pdf.numPages;
        const pageTextPromises = [];
        for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
          pageTextPromises.push(this.getPdfPageText(pdf, pageNo));
        }
        const pageTexts = await Promise.all(pageTextPromises);
        return pageTexts.join(' ');
      }
     
}