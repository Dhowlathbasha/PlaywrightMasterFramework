export default class XMLParserOps {
    /**
     * Get content of tag in XML using xpath
     * @param xPathExpression xpath for the tag
     * @param xml as string
     */
    static getTagContentByXpath(xml: string, xPathExpression: string): string;
    /**
     * Get value of attribute in XML using xpath
     * @param xPathExpression xpath for the attribute
     * @param xml as string
     */
    static getAttributeValueByXpath(xml: string, xPathExpression: string): string;
}
