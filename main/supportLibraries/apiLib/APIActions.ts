import type { Page } from '@playwright/test';
import RequestHeader from '@utils/apiLib/RequestHeader';
import RESTRequest from '@utils/apiLib/RestRequestActions';
import SOAPRequest from '@utils/apiLib/SoapRequestActions';

export default class APIActions {
  constructor(private page: Page) {
    this.page = page;
  }
  /**
   * Returns REST Request instance
   * @returns
   */
  public get rest(): RESTRequest {
    return new RESTRequest(this.page);
  }

  /**
   * Returns SOAP Request instance
   * @returns
   */
  public get soap(): SOAPRequest {
    return new SOAPRequest();
  }

  /**
   * Returns Request header instance
   * @returns
   */
  public get header(): RequestHeader {
    return new RequestHeader();
  }

  //************************    mocking api     ************************

  async mockApi(endpointURL: string, ...jsonPayload: any) {
    console.log(jsonPayload);
    await this.page.route(endpointURL, async (route) => {
      await route.fulfill(jsonPayload);
    });
  }
}
