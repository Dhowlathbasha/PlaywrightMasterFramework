import { test, Page,TestInfo, Locator, expect } from '@playwright/test'
import { PlaywrightActions } from '../../utils/PlaywrightActions'

export default class AmazonHomePage { 

    private readonly locators = {
        key : 'value',
        dropdown: "Select the department you",
        option: "search-alias=baby",
        babyUrl: "https://www.amazon.in/s?k=bottle&ref=nb_sb_noss"
    } 

    async navigate(){
        await this.page.goto(process.env.URL as string);
    }

    async selectOptionDropdown(){
        await this.page.getByLabel(this.locators.dropdown).selectOption(this.locators.option);
    }

    async validateUrl(){
        await expect(this.page).toHaveURL(this.locators.babyUrl)
    }

    actions : PlaywrightActions

    public constructor(public page : Page , public testInfo : TestInfo) {
        this.actions = new PlaywrightActions(page, testInfo);
    } 
}