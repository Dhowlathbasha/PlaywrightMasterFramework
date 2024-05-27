"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randomstring_1 = require("randomstring");
var string_format_1 = require("string-format");
var StringOps = /** @class */ (function () {
    function StringOps() {
    }
    /**
     * This method will return the formatted String by replacing value in {\d}
     * @param str : String to be formatted
     * @param replaceValue : value to replaced in formatted string
     * @returns str
     */
    StringOps.formatString = function (str) {
        var replaceValue = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            replaceValue[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < replaceValue.length; i++) {
            str = str.split("{".concat(i, "}")).join(replaceValue[i]);
        }
        return str;
    };
    /**
     * This method will return the formatted String by replacing value in {key}
     * @param str : String to be formatted
     * @param replaceValue : value to replaced in formatted string
     * @returns str
     */
    StringOps.formatStringValue = function (str, replaceValue) {
        for (var _i = 0, _a = Object.entries(replaceValue); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            str = str.split("{".concat(key, "}")).join("".concat(value));
        }
        return str;
    };
    /**
     * Replaces text in a string, using an string that supports replacement within a string.
     * @param str Original string
     * @param searchValue searches for and replace matches within the string.
     * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
     * @returns
     */
    StringOps.replaceAll = function (str, searchValue, replaceValue) {
        var replacer = new RegExp(searchValue, 'g');
        var replacedStr = str.replace(replacer, replaceValue);
        return replacedStr;
    };
    /**
     * replaces the regex with string value
     * @param str
     * @param regex
     * @param value
     * @returns
     */
    StringOps.getRegXLocator = function (str, regex, value) {
        return str.replace(regex, value);
    };
    /**
     * Generates random alphanumeric string of given length
     * @param length
     * @returns
     */
    StringOps.randomAlphanumericString = function (length) {
        var str = randomstring_1.default.generate(length);
        return str;
    };
    /**
     * Generates random string of given length
     * @param length
     * @returns
     */
    StringOps.randomAlphabeticString = function (length) {
        var str = randomstring_1.default.generate({ length: length, charset: 'alphabetic' });
        return str;
    };
    /**
     * Generates random string of given length with all letters a as uppercase
     * @param length
     * @returns
     */
    StringOps.randomUppercaseString = function (length) {
        var str = randomstring_1.default.generate({ length: length, charset: 'alphabetic', capitalization: "uppercase" });
        return str;
    };
    /**
     * Generates random string of given length with all letters a as lowercase
     * @param length
     * @returns
     */
    StringOps.randomLowercaseString = function (length) {
        var str = randomstring_1.default.generate({ length: length, charset: 'alphabetic', capitalization: "lowercase" });
        return str;
    };
    /**
     * Generates random number string of given length
     * @param length
     * @returns
     */
    StringOps.randomNumberString = function (length) {
        var str = randomstring_1.default.generate({ length: length, charset: 'numeric' });
        return str;
    };
    /**
     * This method will return the formatted String by replacing value in {key} from Object
     * @param str
     * @param obj
     * @returns
     */
    StringOps.formatStringFromObject = function (str, obj) {
        return (0, string_format_1.default)(str, obj);
    };
    return StringOps;
}());
exports.default = StringOps;
//# sourceMappingURL=StringOps.js.map