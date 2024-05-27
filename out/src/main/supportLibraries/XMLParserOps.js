"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xmldom_1 = require("xmldom");
var xpath = require('xpath');
var Dom = xmldom_1.default.DOMParser;
var XMLParserOps = /** @class */ (function () {
    function XMLParserOps() {
    }
    /**
     * Get content of tag in XML using xpath
     * @param xPathExpression xpath for the tag
     * @param xml as string
     */
    XMLParserOps.getTagContentByXpath = function (xml, xPathExpression) {
        var doc = new Dom().parseFromString(xml);
        var text = xpath.select("string(".concat(xPathExpression, ")"), doc);
        return text;
    };
    /**
     * Get value of attribute in XML using xpath
     * @param xPathExpression xpath for the attribute
     * @param xml as string
     */
    XMLParserOps.getAttributeValueByXpath = function (xml, xPathExpression) {
        var _a;
        var doc = new Dom().parseFromString(xml);
        var text = (_a = xpath.select1(xPathExpression, doc)) === null || _a === void 0 ? void 0 : _a.value;
        return text;
    };
    return XMLParserOps;
}());
exports.default = XMLParserOps;
//# sourceMappingURL=XMLParserOps.js.map