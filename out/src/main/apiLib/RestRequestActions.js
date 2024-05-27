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
var fs_1 = require("fs");
var fetch_to_curl_1 = require("fetch-to-curl");
var Constants = require("../supportLibraries/Constants");
var StringOps_1 = require("../supportLibraries/StringOps");
var RestResponse_1 = require("./RestResponse");
var RESTRequest = /** @class */ (function () {
    function RESTRequest(page) {
        this.page = page;
    }
    /**
     * Creates request body from JSON file by replacing the input parameters
     * @param jsonFileName
     * @param data
     * @returns
     */
    RESTRequest.prototype.createRequestBody = function (jsonFileName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                json = fs_1.default.readFileSync(Constants.CommonConstants.REST_JSON_REQUEST_PATH + jsonFileName, 'utf-8');
                json = StringOps_1.default.formatStringValue(json, data);
                return [2 /*return*/, json];
            });
        });
    };
    /**
     * Make POST request and return response
     * @param endPoint
     * @param requestHeader
     * @param jsonAsString
     * @param description
     * @returns
     */
    RESTRequest.prototype.post = function (endPoint, requestHeader, jsonAsString, description) {
        return __awaiter(this, void 0, void 0, function () {
            var headersAsJson, restResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headersAsJson = JSON.parse(JSON.stringify(requestHeader));
                        return [4 /*yield*/, test_1.test.step("Making POST request for ".concat(description), function () { return __awaiter(_this, void 0, void 0, function () {
                                var response;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.printRequest(endPoint, headersAsJson, jsonAsString, 'post');
                                            return [4 /*yield*/, this.page.request.post(endPoint, { headers: headersAsJson, data: JSON.parse(jsonAsString) })];
                                        case 1:
                                            response = _a.sent();
                                            return [4 /*yield*/, this.setRestResponse(response, description)];
                                        case 2:
                                            restResponse = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, restResponse];
                }
            });
        });
    };
    /**
     * Sets the API Response into RestResponse object
     * @param response
     * @param description
     * @returns RestResponse object
     */
    RESTRequest.prototype.setRestResponse = function (response, description) {
        return __awaiter(this, void 0, void 0, function () {
            var body, headers, statusCode, restResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, response.text()];
                    case 1:
                        body = _a.sent();
                        headers = response.headers();
                        statusCode = response.status();
                        restResponse = new RestResponse_1.default(headers, body, statusCode, description);
                        console.log("Response body: ".concat(JSON.stringify(JSON.parse(body), undefined, 2)));
                        return [2 /*return*/, restResponse];
                }
            });
        });
    };
    /**
     * Make Get request and return response
     * @param endPoint
     * @param requestHeader
     * @param description
     * @returns
     */
    RESTRequest.prototype.get = function (endPoint, requestHeader, description) {
        return __awaiter(this, void 0, void 0, function () {
            var headersAsJson, restResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headersAsJson = JSON.parse(JSON.stringify(requestHeader));
                        return [4 /*yield*/, test_1.test.step("Making GET request for ".concat(description), function () { return __awaiter(_this, void 0, void 0, function () {
                                var response;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.printRequest(endPoint, headersAsJson, null, 'get');
                                            return [4 /*yield*/, this.page.request.get(endPoint, { headers: headersAsJson })];
                                        case 1:
                                            response = _a.sent();
                                            return [4 /*yield*/, this.setRestResponse(response, description)];
                                        case 2:
                                            restResponse = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, restResponse];
                }
            });
        });
    };
    /**
     * Make Put request and return response
     * @param endPoint
     * @param requestHeader
     * @param jsonAsString
     * @param description
     * @returns
     */
    RESTRequest.prototype.put = function (endPoint, requestHeader, jsonAsString, description) {
        return __awaiter(this, void 0, void 0, function () {
            var headersAsJson, restResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headersAsJson = JSON.parse(JSON.stringify(requestHeader));
                        return [4 /*yield*/, test_1.test.step("Making PUT request for ".concat(description), function () { return __awaiter(_this, void 0, void 0, function () {
                                var response;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.printRequest(endPoint, headersAsJson, jsonAsString, 'put');
                                            return [4 /*yield*/, this.page.request.put(endPoint, { headers: headersAsJson, data: JSON.parse(jsonAsString) })];
                                        case 1:
                                            response = _a.sent();
                                            return [4 /*yield*/, this.setRestResponse(response, description)];
                                        case 2:
                                            restResponse = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, restResponse];
                }
            });
        });
    };
    /**
     * Make Patch request and return response
     * @param endPoint
     * @param requestHeader
     * @param jsonAsString
     * @param description
     * @returns
     */
    RESTRequest.prototype.patch = function (endPoint, requestHeader, jsonAsString, description) {
        return __awaiter(this, void 0, void 0, function () {
            var headersAsJson, restResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headersAsJson = JSON.parse(JSON.stringify(requestHeader));
                        return [4 /*yield*/, test_1.test.step("Making PATCH request for ".concat(description), function () { return __awaiter(_this, void 0, void 0, function () {
                                var response;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.printRequest(endPoint, headersAsJson, jsonAsString, 'patch');
                                            return [4 /*yield*/, this.page.request.patch(endPoint, { headers: headersAsJson, data: JSON.parse(jsonAsString) })];
                                        case 1:
                                            response = _a.sent();
                                            return [4 /*yield*/, this.setRestResponse(response, description)];
                                        case 2:
                                            restResponse = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, restResponse];
                }
            });
        });
    };
    /**
     * Make Delete request and return response
     * @param endPoint
     * @param requestHeader
     * @param description
     * @returns
     */
    RESTRequest.prototype.delete = function (endPoint, requestHeader, description) {
        return __awaiter(this, void 0, void 0, function () {
            var headersAsJson, restResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headersAsJson = JSON.parse(JSON.stringify(requestHeader));
                        return [4 /*yield*/, test_1.test.step("Making DELETE request for ".concat(description), function () { return __awaiter(_this, void 0, void 0, function () {
                                var response;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.printRequest(endPoint, headersAsJson, null, 'delete');
                                            return [4 /*yield*/, this.page.request.delete(endPoint, { headers: headersAsJson })];
                                        case 1:
                                            response = _a.sent();
                                            return [4 /*yield*/, this.setRestResponse(response, description)];
                                        case 2:
                                            restResponse = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, restResponse];
                }
            });
        });
    };
    /**
     * Prints the API request on console in curl format
     * @param endPoint
     * @param requestHeader
     * @param jsonRequestBody
     * @param method
     */
    RESTRequest.prototype.printRequest = function (endPoint, requestHeader, jsonRequestBody, method) {
        var requestBody = jsonRequestBody;
        if (jsonRequestBody !== null) {
            requestBody = JSON.stringify(JSON.parse(jsonRequestBody), undefined, 2);
        }
        console.log("Request: ", (0, fetch_to_curl_1.default)({
            url: endPoint,
            headers: requestHeader,
            body: requestBody,
            method: method,
        }));
    };
    return RESTRequest;
}());
exports.default = RESTRequest;
//# sourceMappingURL=RestRequestActions.js.map