export default class SoapResponse {
    private headers;
    private body;
    private status;
    private description;
    constructor(headers: any, body: any, status: number, description: string);
    /**
     * Get content of tag in response body using xpath
     * @param xPathExpression xpath for the tag
     * @param description
     */
    getTagContentByXpath(xPathExpression: string, description: string): Promise<string>;
    /**
     * Get value of attribute in response body using xpath
     * @param xPathExpression xpath for the attribute
     * @param description
     */
    getAttributeValueByXpath(xPathExpression: string, description: string): Promise<string>;
    /**
     * Get header value by header key
     * @param key
     * @param description
     * @returns
     */
    getHeaderValueByKey(key: string): Promise<string>;
    /**
     * Get response status code
     * @returns
     */
    getStatusCode(): Promise<number>;
    /**
     * Get response body
     * @returns
     */
    getBody(): Promise<string>;
    /**
     * Get response headers
     * @returns
     */
    getHeaders(): Promise<string>;
}
