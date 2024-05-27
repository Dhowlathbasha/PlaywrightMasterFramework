import SOAPResponse from "./SoapResponse";
export default class SOAPRequest {
    /**
     * Creates request body by replacing the input parameters
     * @param xmlFileName
     * @param data
     * @returns
     */
    private createRequestBody;
    /**
     * Make POST request and return response
     * @param endPoint
     * @param requestHeader
     * @param fileName
     * @param gData
     * @param data
     * @param description
     * @returns
     */
    post(endPoint: string, requestHeader: any, fileName: string, requestData: any, description: string): Promise<SOAPResponse>;
}
