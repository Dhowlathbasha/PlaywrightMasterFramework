/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Page, TestInfo } from '@playwright/test';
import moment from 'moment';
import fs from 'fs';

export default class SupportUtils {
  constructor(
    public page: Page,
    public testInfo: TestInfo
  ) {
    this.page = page;
    this.testInfo = testInfo;
  }

  /**
   * Generates date based on the input
   * @param format date format
   * @param days increment OR decrement the days
   * @param months increment OR decrement the months
   * @param years increment OR decrement the years
   * @returns
   */
  async dateGenerator(format: string, days: number, months: number, years: number) {
    const date = moment().add(days, 'd').add(months, 'M').add(years, 'y').format(format);

    return date;
  }

  /**
   * Customizes the date that has been given as input based on other input parameter
   * @param date to be customized
   * @param format date format
   * @param days increment OR decrement the days
   * @param months increment OR decrement the months
   * @param years increment OR decrement the years
   * @returns
   */
  async dateCustomizer(date: string, format: string, days: number, months: number, years: number) {
    const customDate = moment(date, format).add(days, 'd').add(months, 'M').add(years, 'y').format(format);

    return customDate;
  }

  /**
   * Generates time in hr:min format based on the input
   * @param format time format
   * @param hours increment OR decrement the hours
   * @param minutes increment OR decrement the minutes
   * @returns
   */
  async timeGenerator(format: string, hours: number, minutes: number) {
    const time = moment().add(minutes, 'm').add(hours, 'h').format(format);

    return time;
  }

  async addDaysToCurrentDate(addDays: moment.DurationInputArg1) {
    const date = moment().add(addDays, 'd').toDate();
    const formattedDate = moment(date).format('DD-MMM-YYYY hh:mm:ss.SSS');

    return formattedDate;
  }

  async addAnnotations(jsonData: { [x: string]: any }) {
    this.testInfo.annotations.push({
      type: 'test_id',
      description: jsonData['Testcase'],
    });
    this.testInfo.annotations.push({
      type: 'test_key',
      description: jsonData['TestKey'],
    });
    this.testInfo.annotations.push({
      type: 'test_summary',
      description: jsonData['TestSummary'],
    });
    this.testInfo.annotations.push({
      type: 'test_description',
      description: jsonData['TestcaseDescription'],
    });
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

  async readJsonFile(path: string) {
    JSON.parse(fs.readFileSync(path, 'utf-8'));
  }

  async readValuesFromTextFile(filePath: string): Promise<any> {
    if (await this.exists(filePath)) {
      return fs.readFileSync(`${filePath}`, `utf-8`);
    }
  }

  async writeDataIntoTextFile(
    filePath: number | fs.PathLike | string,
    data: string | NodeJS.ArrayBufferView
  ): Promise<void> {
    fs.writeFile(filePath, data, (error) => {
      if (error) throw error;
    });
  }

  async exists(path: string) {
    if (fs.existsSync(path)) {
      return path;
    }
  }
}
