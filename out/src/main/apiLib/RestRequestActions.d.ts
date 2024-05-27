import { Page } from '@playwright/test';
import RESTResponse from "./RestResponse";
export default class RESTRequest {
    private page;
    constructor(page: Page);
    /**
     * Creates request body from JSON file by replacing the input parameters
     * @param jsonFileName
     * @param data
     * @returns
     */
    createRequestBody(jsonFileName: string, data: any): Promise<string>;
    /**
     * Make POST request and return response
     * @param endPoint
     * @param requestHeader
     * @param jsonAsString
     * @param description
     * @returns
     */
    post(endPoint: string, requestHeader: any, jsonAsString: string, description: string): Promise<RESTResponse>;
    /**
     * Sets the API Response into RestResponse object
     * @param response
     * @param description
     * @returns RestResponse object
     */
    private setRestResponse;
    /**
     * Make Get request and return response
     * @param endPoint
     * @param requestHeader
     * @param description
     * @returns
     */
    get(endPoint: string, requestHeader: any, description: string): Promise<RESTResponse>;
    /**
     * Make Put request and return response
     * @param endPoint
     * @param requestHeader
     * @param jsonAsString
     * @param description
     * @returns
     */
    put(endPoint: string, requestHeader: any, jsonAsString: any, description: string): Promise<RESTResponse>;
    /**
     * Make Patch request and return response
     * @param endPoint
     * @param requestHeader
     * @param jsonAsString
     * @param description
     * @returns
     */
    patch(endPoint: string, requestHeader: any, jsonAsString: any, description: string): Promise<RESTResponse>;
    /**
     * Make Delete request and return response
     * @param endPoint
     * @param requestHeader
     * @param description
     * @returns
     */
    delete(endPoint: string, requestHeader: any, description: string): Promise<RESTResponse>;
    /**
     * Prints the API request on console in curl format
     * @param endPoint
     * @param requestHeader
     * @param jsonRequestBody
     * @param method
     */
    private printRequest;
}
