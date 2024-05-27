"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("@playwright/test");
var easy_soap_request_1 = require("easy-soap-request");
var fs_1 = require("fs");
var SoapResponse_1 = require("./SoapResponse");
var StringOps_1 = require("../supportLibraries/StringOps");
var Constants = require("../supportLibraries/Constants");
var SOAPRequest = /** @class */ (function () {
    function SOAPRequest() {
    }
    /**
     * Creates request body by replacing the input parameters
     * @param xmlFileName
     * @param data
     * @returns
     */
    SOAPRequest.prototype.createRequestBody = function (xmlFileName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var format, xml;
            return __generator(this, function (_a) {
                format = require('xml-formatter');
                xml = fs_1.default.readFileSync(Constants.CommonConstants.SOAP_XML_REQUEST_PATH + xmlFileName, 'utf-8');
                xml = StringOps_1.default.formatStringValue(xml, data);
                console.log("SOAP request : \n".concat(format(xml, { collapseContent: true })));
                return [2 /*return*/, xml];
            });
        });
    };
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
    SOAPRequest.prototype.post = function (endPoint, requestHeader, fileName, requestData, description) {
        return __awaiter(this, void 0, void 0, function () {
            var format, soapResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        format = require('xml-formatter');
                        return [4 /*yield*/, test_1.default.step("Making post request for ".concat(description), function () { return __awaiter(_this, void 0, void 0, function () {
                                var url, xml, response, headers, body, statusCode;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            url = process.env.SOAP_API_BASE_URL + endPoint;
                                            console.log("URL: ".concat(url));
                                            return [4 /*yield*/, this.createRequestBody(fileName, requestData)];
                                        case 1:
                                            xml = _a.sent();
                                            return [4 /*yield*/, (0, easy_soap_request_1.default)({ url: url, headers: requestHeader, xml: xml })];
                                        case 2:
                                            response = (_a.sent()).response;
                                            headers = response.headers, body = response.body, statusCode = response.statusCode;
                                            soapResponse = new SoapResponse_1.default(headers, body, statusCode, description);
                                            console.log("SOAP Response: \n".concat(format(body, { collapseContent: true })));
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, soapResponse];
                }
            });
        });
    };
    return SOAPRequest;
}());
exports.default = SOAPRequest;
//# sourceMappingURL=SoapRequestActions.js.map