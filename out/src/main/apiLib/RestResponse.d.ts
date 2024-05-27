export default class RESTResponse {
    private headers;
    private body;
    private status;
    private description;
    constructor(headers: any, body: string, status: number, description: string);
    /**
     * Get content of tag in response body using JSON path
     * @param jsonPath
     * @param description
     * @returns
     */
    getTagContentByJsonPath(jsonPath: string, description: string): Promise<string>;
    /**
     * Get header value by header key
     * @param key
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
