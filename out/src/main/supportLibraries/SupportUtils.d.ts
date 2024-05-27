/// <reference types="node" />
/// <reference types="node" />
import { Page, TestInfo } from "@playwright/test";
import moment from "moment";
import fs from "fs";
export default class SupportUtils {
    page: Page;
    testInfo: TestInfo;
    constructor(page: Page, testInfo: TestInfo);
    /**
      * Generates date based on the input
      * @param format date format
      * @param days increment OR decrement the days
      * @param months increment OR decrement the months
      * @param years increment OR decrement the years
      * @returns
      */
    dateGenerator(format: string, days: number, months: number, years: number): Promise<string>;
    /**
     * Customizes the date that has been given as input based on other input parameter
     * @param date to be customized
     * @param format date format
     * @param days increment OR decrement the days
     * @param months increment OR decrement the months
     * @param years increment OR decrement the years
     * @returns
     */
    dateCustomizer(date: string, format: string, days: number, months: number, years: number): Promise<string>;
    /**
     * Generates time in hr:min format based on the input
     * @param format time format
     * @param hours increment OR decrement the hours
     * @param minutes increment OR decrement the minutes
     * @returns
     */
    timeGenerator(format: string, hours: number, minutes: number): Promise<string>;
    addDaysToCurrentDate(addDays: moment.DurationInputArg1): Promise<string>;
    addAnnotations(jsonData: {
        [x: string]: any;
    }): Promise<void>;
    generateRandomAplhabets(length: number): Promise<string>;
    readJsonFile(path: string): Promise<void>;
    readValuesFromTextFile(filePath: string): Promise<any>;
    writeDataIntoTextFile(filePath: number | fs.PathLike | string, data: string | NodeJS.ArrayBufferView): Promise<void>;
    exists(path: string): Promise<string | undefined>;
}
