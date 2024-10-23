/* eslint-disable @typescript-eslint/no-explicit-any */
import test from '@playwright/test';
import fs from 'fs';
import SOAPResponse from './SoapResponseActions';
import StringUtil from '@utils/StringOps';
import * as Constants from '@data/Constants';
import axios from 'axios';

export default class SOAPRequest {
  format = require('xml-formatter');

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
  public async post(
    endPoint: string,
    requestHeader: any,
    fileName: string,
    requestData: any,
    description: string
  ): Promise<SOAPResponse> {
    let soapResponse!: SOAPResponse;
    await test.step(`Making post request for ${description}`, async () => {
      const url: string = process.env.SOAP_API_BASE_URL + endPoint;
      console.log(`URL: ${url}`);
      const xml = await this.createRequestBody(fileName, requestData);
      const response = await axios.post(url, xml, { headers: requestHeader });
      const { headers, data, status } = response;
      soapResponse = new SOAPResponse(headers, data, status, description);
      console.log(`SOAP Response: \n${this.format(data, { collapseContent: true })}`);
    });

    return soapResponse;
  }

  /**
   * Creates request body by replacing the input parameters
   * @param xmlFileName
   * @param data
   * @returns
   */
  private async createRequestBody(xmlFileName: string, data: any): Promise<string> {
    let xml = fs.readFileSync(Constants.CommonConstants.SOAP_XML_REQUEST_PATH + xmlFileName, 'utf-8');
    xml = StringUtil.formatStringValue(xml, data);
    console.log(`SOAP request : \n${this.format(xml, { collapseContent: true })}`);

    return xml;
  }
}
