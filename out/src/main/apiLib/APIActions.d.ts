import { Page } from "@playwright/test";
import RequestHeader from "./RequestHeader";
import RESTRequest from "./RestRequestActions";
import SOAPRequest from "./SoapRequestActions";
export default class APIActions {
    private page;
    constructor(page: Page);
    /**
     * Returns REST Request instance
     * @returns
     */
    get rest(): RESTRequest;
    /**
     * Returns SOAP Request instance
     * @returns
     */
    get soap(): SOAPRequest;
    /**
    * Returns Request header instance
    * @returns
    */
    get header(): RequestHeader;
    mockApi(endpointURL: string, ...jsonPayload: any): Promise<void>;
}
