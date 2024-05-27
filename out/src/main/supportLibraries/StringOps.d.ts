export default class StringOps {
    /**
     * This method will return the formatted String by replacing value in {\d}
     * @param str : String to be formatted
     * @param replaceValue : value to replaced in formatted string
     * @returns str
     */
    static formatString(str: string, ...replaceValue: string[]): string;
    /**
     * This method will return the formatted String by replacing value in {key}
     * @param str : String to be formatted
     * @param replaceValue : value to replaced in formatted string
     * @returns str
     */
    static formatStringValue(str: string, replaceValue: any): string;
    /**
     * Replaces text in a string, using an string that supports replacement within a string.
     * @param str Original string
     * @param searchValue searches for and replace matches within the string.
     * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
     * @returns
     */
    static replaceAll(str: string, searchValue: string, replaceValue: string): string;
    /**
     * replaces the regex with string value
     * @param str
     * @param regex
     * @param value
     * @returns
     */
    static getRegXLocator(str: string, regex: RegExp, value: string): string;
    /**
     * Generates random alphanumeric string of given length
     * @param length
     * @returns
     */
    static randomAlphanumericString(length: number): string;
    /**
     * Generates random string of given length
     * @param length
     * @returns
     */
    static randomAlphabeticString(length: number): string;
    /**
     * Generates random string of given length with all letters a as uppercase
     * @param length
     * @returns
     */
    static randomUppercaseString(length: number): string;
    /**
     * Generates random string of given length with all letters a as lowercase
     * @param length
     * @returns
     */
    static randomLowercaseString(length: number): string;
    /**
     * Generates random number string of given length
     * @param length
     * @returns
     */
    static randomNumberString(length: number): string;
    /**
     * This method will return the formatted String by replacing value in {key} from Object
     * @param str
     * @param obj
     * @returns
     */
    static formatStringFromObject(str: string, obj: any): string;
}
