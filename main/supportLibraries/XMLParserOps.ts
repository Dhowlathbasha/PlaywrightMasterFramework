import xmldom from '@xmldom/xmldom';

const Dom = xmldom.DOMParser;
import type { SelectedValue } from 'xpath';
import xpath from 'xpath';
export default class XMLParserOps {
  /**
   * Get content of tag in XML using xpath
   * @param xPathExpression xpath for the tag
   * @param xml as string
   */
  public static getTagContentByXpath(xml: string, xPathExpression: string): string {
    const doc = new Dom().parseFromString(xml);
    const text: SelectedValue = xpath.select1(xPathExpression, doc) as SelectedValue;

    return text?.valueOf() as string;
  }

  /**
   * Get value of attribute in XML using xpath
   * @param xPathExpression xpath for the attribute
   * @param xml as string
   */
  public static getAttributeValueByXpath(xml: string, xPathExpression: string): string {
    const doc = new Dom().parseFromString(xml);
    const text: SelectedValue = xpath.select1(xPathExpression, doc) as SelectedValue;

    return text?.valueOf() as string;
  }
}
