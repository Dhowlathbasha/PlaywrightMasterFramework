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
var fs = require("fs");
var allure_playwright_1 = require("allure-playwright");
var BaseActions = /** @class */ (function () {
    /**
     * @param {import('@playwright/test').Page} page
     * @param {import('@playwright/test').TestInfo} testInfo
     */
    function BaseActions(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.page = page;
        this.testInfo = testInfo;
    }
    /**
   *
   * @param locator
   * @returns
   */
    BaseActions.prototype.getLocator = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, locator];
            });
        });
    };
    /**
   *
   * @param locator
   * @param options
   */
    BaseActions.prototype.focusToElement = function (locator, options) {
        return __awaiter(this, void 0, void 0, function () {
            var timeout, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(options === null || options === void 0 ? void 0 : options.focus)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.page.focus(locator)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(!(options === null || options === void 0 ? void 0 : options.focus) && (options === null || options === void 0 ? void 0 : options.timeout))) return [3 /*break*/, 4];
                        timeout = options === null || options === void 0 ? void 0 : options.timeout;
                        return [4 /*yield*/, this.page.locator(locator).scrollIntoViewIfNeeded({ timeout: timeout })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.error("Error Occured in focus Into view of needed");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BaseActions.prototype.findElement = function (locator, options) {
        return __awaiter(this, void 0, void 0, function () {
            var pages, count, pageTitle, pages, pageTitle;
            return __generator(this, function (_a) {
                if (options === null || options === void 0 ? void 0 : options.tabId) {
                    this.page = this.page.context().pages()[options.tabId];
                }
                else if (options === null || options === void 0 ? void 0 : options.tabTitle) {
                    pages = this.page.context().pages();
                    for (count = 0; count < pages.length; count++) {
                        pageTitle = pages[count].title();
                        if (options.tabTitle === pageTitle) {
                            this.page = this.page.context().pages()[count];
                            break;
                        }
                    }
                }
                else if ((options === null || options === void 0 ? void 0 : options.tabTitle) && (options === null || options === void 0 ? void 0 : options.tabId)) {
                    pages = this.page.context().pages();
                    pageTitle = pages[options.tabId].title();
                    if (options.tabTitle === pageTitle) {
                        this.page = this.page.context().pages()[options.tabId];
                    }
                }
                if (options === null || options === void 0 ? void 0 : options.frame) {
                    return [2 /*return*/, this.page.frameLocator(options.frame).locator(locator, {
                            has: options === null || options === void 0 ? void 0 : options.has,
                            hasText: options === null || options === void 0 ? void 0 : options.hasText,
                        })];
                }
                return [2 /*return*/, this.page.locator(locator, {
                        has: options === null || options === void 0 ? void 0 : options.has,
                        hasText: options === null || options === void 0 ? void 0 : options.hasText,
                    })];
            });
        });
    };
    /**
     * Get the Locator from the JSON file
     * @param filePath
     * @param locatorName
     * @returns
     */
    BaseActions.prototype.fetchLocatorfromJson = function (filePath, locatorName) {
        return __awaiter(this, void 0, void 0, function () {
            var rawdata, data;
            return __generator(this, function (_a) {
                rawdata = fs.readFileSync(filePath).toString();
                data = JSON.parse(rawdata);
                return [2 /*return*/, data.locators[locatorName]];
            });
        });
    };
    /**
   * Fetch the Count of Elements List
   * @param locator
   * @returns
   */
    BaseActions.prototype.fetchCountOfElements = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(typeof locator === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.page.locator(locator).count()];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, locator.count()];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, _a];
                }
            });
        });
    };
    BaseActions.prototype.allure_attach = function (description, element_type, contentType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, allure_playwright_1.allure.attachment(description, JSON.stringify(element_type), { contentType: contentType })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseActions.prototype.test_attach = function (description, contentType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.testInfo.attach(description, {
                            body: description,
                            contentType: contentType,
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
  *
  * @param description
  */
    BaseActions.prototype.embedScreenshot = function (description) {
        return __awaiter(this, void 0, void 0, function () {
            var screenshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.screenshot({ fullPage: true })];
                    case 1:
                        screenshot = _a.sent();
                        return [4 /*yield*/, this.testInfo.attach(description, {
                                body: screenshot,
                                contentType: "image/png",
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, allure_playwright_1.allure.attachment(description, screenshot, {
                                contentType: "image/png",
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, allure_playwright_1.allure.attachment(description, JSON.stringify(description), {
                                contentType: "application/json",
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseActions.prototype.embedScreenshot_byLoc = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var screenshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.screenshot({ fullPage: true })];
                    case 1:
                        screenshot = _a.sent();
                        return [4 /*yield*/, this.testInfo.attach(args, {
                                body: screenshot,
                                contentType: "image/png",
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, allure_playwright_1.allure.attachment(args, screenshot, { contentType: "image/png" })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //************************    Verification operations    ************************
    /**
       * To verify that condition passed as input is true
       * @param condition - boolean condition
       * @param description - description of element that is being validated
       * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
       */
    BaseActions.prototype.assertTrue = function (condition_1, description_1) {
        return __awaiter(this, arguments, void 0, function (condition, description, softAssert) {
            var _this = this;
            if (softAssert === void 0) { softAssert = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_1.test.step("Verifying that ".concat(description, " is true"), function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                try {
                                    (0, test_1.expect)(condition, "Expected is 'True' & Actual is '".concat(condition, "'")).toBeTruthy();
                                }
                                catch (error) {
                                    if (!softAssert) {
                                        throw new Error(error);
                                    }
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * To verify that value1 contains value2
     * @param value1 - string input
     * @param value2 - should be present in value1
     * @param description - description of element that is being validated
     * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
     */
    BaseActions.prototype.assertContains = function (value1_1, value2_1, description_1) {
        return __awaiter(this, arguments, void 0, function (value1, value2, description, softAssert) {
            var _this = this;
            if (softAssert === void 0) { softAssert = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_1.test.step("Verifying that ".concat(description, " contains text '").concat(value2, "'"), function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                try {
                                    (0, test_1.expect)(value1, "'".concat(value1, "' is expected to CONTAIN '").concat(value2, "'")).toContain(value2);
                                }
                                catch (error) {
                                    if (!softAssert) {
                                        throw new Error(error);
                                    }
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
    * To verify that value1 contains value1 ignoring case
    * @param value1 - string input
    * @param value2 - should be present in value1
    * @param description - description of element that is being validated
    * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
    */
    BaseActions.prototype.assertContainsIgnoreCase = function (value1_1, value2_1, description_1) {
        return __awaiter(this, arguments, void 0, function (value1, value2, description, softAssert) {
            var _this = this;
            if (softAssert === void 0) { softAssert = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_1.test.step("Verifying that ".concat(description, " contains text '").concat(value2, "'"), function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                try {
                                    (0, test_1.expect)(value1.toLowerCase(), "'".concat(value1, "' is expected to CONTAIN '").concat(value2, "'")).toContain(value2.toLowerCase());
                                }
                                catch (error) {
                                    if (!softAssert) {
                                        throw new Error(error);
                                    }
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
    * To verify that actual contains expected ignoring case
    * @param actual - string input
    * @param expected - string input
    * @param description - description of element that is being validated
    * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
    */
    BaseActions.prototype.assertEqualsIgnoreCase = function (actual_1, expected_1, description_1) {
        return __awaiter(this, arguments, void 0, function (actual, expected, description, softAssert) {
            var _this = this;
            if (softAssert === void 0) { softAssert = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_1.test.step("Verifying that ".concat(description, " has text ").concat(expected), function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                try {
                                    (0, test_1.expect)(actual.toLowerCase(), "Expected '".concat(expected, "' should be EQUAL to Actual '").concat(actual, "'"))
                                        .toEqual(expected.toLowerCase());
                                }
                                catch (error) {
                                    if (!softAssert) {
                                        throw new Error(error);
                                    }
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * To verify actual equals expected
     * @param value1 any object
     * @param value2 any object to compare
     * @param description object description
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    BaseActions.prototype.assertEquals = function (actual_1, expected_1, description_1) {
        return __awaiter(this, arguments, void 0, function (actual, expected, description, softAssert) {
            var _this = this;
            if (softAssert === void 0) { softAssert = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_1.test.step("Verifying that ".concat(description, " has text ").concat(expected), function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                try {
                                    (0, test_1.expect)(actual, "Expected '".concat(expected, "' should be EQUAL to Actual '").concat(actual, "'")).toEqual(expected);
                                }
                                catch (error) {
                                    if (!softAssert) {
                                        throw new Error(error);
                                    }
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * To verify that actual passed as input is false
     * @param condition boolean
     * @param description description of element that is being validated
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    BaseActions.prototype.assertFalse = function (condition_1, description_1) {
        return __awaiter(this, arguments, void 0, function (condition, description, softAssert) {
            var _this = this;
            if (softAssert === void 0) { softAssert = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_1.test.step("Verifying that ".concat(description, " is false"), function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                try {
                                    (0, test_1.expect)(condition, "Expected is 'false' & Acutal is '".concat(condition, "'")).toBeFalsy();
                                }
                                catch (error) {
                                    if (!softAssert) {
                                        throw new Error(error);
                                    }
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
    * To verify that element not contains expected
    * @param actual any value
    * @param expected any value
    * @param description description of element that is being validated
    * @param softAssert for soft asserts this has to be set to true, else this can be ignored
    */
    BaseActions.prototype.assertNotContains = function (actual_1, expected_1, description_1) {
        return __awaiter(this, arguments, void 0, function (actual, expected, description, softAssert) {
            var _this = this;
            if (softAssert === void 0) { softAssert = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_1.test.step("Verifying that ".concat(description, " does not contain '").concat(expected, "'"), function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                try {
                                    (0, test_1.expect)(actual, "'".concat(actual, "' should NOT CONTAIN '").concat(expected, "'")).not.toContain(expected);
                                }
                                catch (error) {
                                    if (!softAssert) {
                                        throw new Error(error);
                                    }
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * To verify actual not equals to expected
     * @param actual any object
     * @param expected any object to compare
     * @param description object description
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    BaseActions.prototype.assertNotEquals = function (actual_1, expected_1, description_1) {
        return __awaiter(this, arguments, void 0, function (actual, expected, description, softAssert) {
            var _this = this;
            if (softAssert === void 0) { softAssert = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_1.test.step("Verifying that ".concat(description, " is not equals to ").concat(expected), function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                try {
                                    (0, test_1.expect)(actual, "Expected '".concat(expected, "' should NOT be EQUAL to Actual '").concat(actual, "'")).not.toEqual(expected);
                                }
                                catch (error) {
                                    if (!softAssert) {
                                        throw new Error(error);
                                    }
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * To verify value not equals to null
     * @param value any value
     * @param description description of the value
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    BaseActions.prototype.assertNotNull = function (value_1, description_1) {
        return __awaiter(this, arguments, void 0, function (value, description, softAssert) {
            var _this = this;
            if (softAssert === void 0) { softAssert = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_1.test.step("Verifying that ".concat(description, " is not null"), function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                try {
                                    (0, test_1.expect)(value, "Expected is 'NOT null' & Actual is '".concat(value, "'")).not.toEqual(null);
                                }
                                catch (error) {
                                    if (!softAssert) {
                                        throw new Error(error);
                                    }
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * To validate that value is not null
     * @param value any value
     * @param description description of the element
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    BaseActions.prototype.assertNull = function (value_1, description_1) {
        return __awaiter(this, arguments, void 0, function (value, description, softAssert) {
            var _this = this;
            if (softAssert === void 0) { softAssert = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_1.test.step("Verifying that ".concat(description, " is equals to null"), function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                try {
                                    (0, test_1.expect)(value, "Expected is 'null' & Actual is '".concat(value, "'")).toEqual(null);
                                }
                                catch (error) {
                                    if (!softAssert) {
                                        throw new Error(error);
                                    }
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
    * To validate that value is Undefined
    * @param value any value
    * @param description description of the element
    * @param softAssert for soft asserts this has to be set to true, else this can be ignored
    */
    BaseActions.prototype.assertUndefined = function (value_1, description_1) {
        return __awaiter(this, arguments, void 0, function (value, description, softAssert) {
            var _this = this;
            if (softAssert === void 0) { softAssert = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_1.test.step("Verifying that ".concat(description, " is undefined"), function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                try {
                                    (0, test_1.expect)(value, "Expected is 'Undefined' & Actual is '".concat(value, "'")).toEqual(typeof undefined);
                                }
                                catch (error) {
                                    if (!softAssert) {
                                        throw new Error(error);
                                    }
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * To validate that element is empty
     * @param value any element
     * @param description description of the element
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    BaseActions.prototype.assertToBeEmpty = function (value_1, description_1) {
        return __awaiter(this, arguments, void 0, function (value, description, softAssert) {
            var _this = this;
            if (softAssert === void 0) { softAssert = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_1.test.step("Verifying that ".concat(description, " is empty"), function () { return __awaiter(_this, void 0, void 0, function () {
                            var error_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, (0, test_1.expect)(value, "Expected is 'Empty' & Actual is '".concat(value, "'")).toBeEmpty()];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_2 = _a.sent();
                                        if (!softAssert) {
                                            throw new Error(error_2);
                                        }
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BaseActions;
}());
exports.default = BaseActions;
//# sourceMappingURL=BaseActions.js.map