import { Page, TestInfo } from '@playwright/test';
import moment from 'moment';

export default class SupportUtils{

async addDaysToCurrentDate(addDays: moment.DurationInputArg1) {
    let date = moment().add(addDays,'d').toDate();
    let formattedDate = moment(date).format('DD-MMM-YYYY hh:mm:ss.SSS');
    return formattedDate;
}

async addAnnotations(jsonData: { [x: string]: any; }) {
    this.testInfo.annotations.push({ type: 'test_id', description: jsonData["Testcase"] });
    this.testInfo.annotations.push({ type: 'test_key', description: jsonData["TestKey"] });
    this.testInfo.annotations.push({ type: 'test_summary', description: jsonData["TestSummary"] });
    this.testInfo.annotations.push({ type: 'test_description', description: jsonData["TestcaseDescription"] });
}

async generateRandomAplhabets(length: number) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

constructor(public page : Page, public testInfo : TestInfo){
    this.page = page;
    this.testInfo = testInfo;
}

}
