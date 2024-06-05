/* eslint-disable @typescript-eslint/no-explicit-any */
import test from '@playwright/test';
import XMLParserUtil from '@utils/XMLParserOps';

export default class SoapResponse {
  public constructor(
    private headers: any,
    private body: any,
    private status: number,
    private description: string
  ) {
    this.headers = headers;
    this.body = body;
    this.status = status;
    this.description = description;
  }
  /**
   * Get content of tag in response body using xpath
   * @param xPathExpression xpath for the tag
   * @param description
   */
  public async getTagContentByXpath(xPathExpression: string, description: string): Promise<string> {
    let text!: string;
    await test.step(`Getting tag value of action ${description}`, async () => {
      text = XMLParserUtil.getTagContentByXpath(this.body, xPathExpression);
    });

    return text;
  }

  /**
   * Get value of attribute in response body using xpath
   * @param xPathExpression xpath for the attribute
   * @param description
   */
  public async getAttributeValueByXpath(xPathExpression: string, description: string): Promise<string> {
    let text!: string;
    await test.step(`Getting attribute value of action ${description}`, async () => {
      text = XMLParserUtil.getAttributeValueByXpath(this.body, xPathExpression);
    });

    return text;
  }

  /**
   * Get header value by header key
   * @param key
   * @param description
   * @returns
   */
  public async getHeaderValueByKey(key: string): Promise<string> {
    let value!: string;
    await test.step(`Getting header value of ${key}`, async () => {
      const jsonHeaders = await JSON.parse(JSON.stringify(this.headers));
      value = jsonHeaders[key];
    });

    return value;
  }

  /**
   * Get response status code
   * @returns
   */
  public async getStatusCode(): Promise<number> {
    let statusValue!: number;
    await test.step(`Getting status code of ${this.description}`, async () => {
      statusValue = this.status;
    });

    return statusValue;
  }

  /**
   * Get response body
   * @returns
   */
  public async getBody(): Promise<string> {
    let bodyvalue!: string;
    await test.step(`Getting response body of ${this.description}`, async () => {
      bodyvalue = this.body;
    });

    return bodyvalue;
  }

  /**
   * Get response headers
   * @returns
   */
  public async getHeaders(): Promise<string> {
    let headers!: string;
    await test.step(`Getting response Headers of ${this.description}`, async () => {
      headers = JSON.stringify(this.headers);
    });

    return headers;
  }
}
