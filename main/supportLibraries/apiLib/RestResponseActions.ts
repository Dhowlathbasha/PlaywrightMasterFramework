/* eslint-disable @typescript-eslint/no-explicit-any */
import test from '@playwright/test';
import jp from 'jsonpath';

export default class RESTResponseActions {
  public constructor(
    private headers: any,
    private body: string,
    private status: number,
    private description: string
  ) {
    this.headers = headers;
    this.body = body;
    this.status = status;
    this.description = description;
  }

  /**
   * Get content of tag in response body using JSON path
   * @param jsonPath
   * @param description
   * @returns
   */
  public async getTagContentByJsonPath(jsonPath: string, description: string) {
    await test.step(`Getting content of ${description}`, async () => {
      const body = JSON.parse(this.body);
      const queryValue = jp.query(body, jsonPath);
      //Array Destructuring "const [text] = queryValue is equivalent to "const text = queryValue[0]"
      const [text] = queryValue;

      return text;
    });
  }

  /**
   * Get header value by header key
   * @param key
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
    let bodyValue!: string;
    await test.step(`Getting response body of ${this.description}`, async () => {
      bodyValue = this.body;
    });

    return bodyValue;
  }

  /**
   * Get response headers
   * @returns
   */
  public async getHeaders(): Promise<string> {
    let headersValue!: string;
    await test.step(`Getting response Headers of ${this.description}`, async () => {
      headersValue = this.headers;
    });

    return headersValue;
  }
}
