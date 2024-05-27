"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var ClickActions_1 = require("./ClickActions");
var BrowserActions = /** @class */ (function (_super) {
    __extends(BrowserActions, _super);
    function BrowserActions(page, testInfo) {
        var _this = _super.call(this, page, testInfo) || this;
        _this.page = page;
        _this.testInfo = testInfo;
        return _this;
    }
    //************************  Page operations  ************************
    /**
     * Open a Url in browser window
     * @param url
     * @param options
     */
    BrowserActions.prototype.openurl = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.goto(url, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Open a Url in browser window with end point
     * @param url
     * @param endpoint
     * @param options
     */
    BrowserActions.prototype.openUrlwithEndpoint = function (url, endpoint, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url += endpoint;
                        return [4 /*yield*/, this.page.goto(url, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *  Navigate to previous URL
     * @param description
     */
    BrowserActions.prototype.navigateBack = function (description) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.goBack()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Navigate to next URL
     * @param description
     */
    BrowserActions.prototype.navigateForward = function (description) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.goForward()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Page Refresh
     */
    BrowserActions.prototype.pageRefresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.reload()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets the handle of the new window
     * @param selector
     * @param description
     */
    BrowserActions.prototype.switchToNewWindow = function (selector, description) {
        return __awaiter(this, void 0, void 0, function () {
            var newPage;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newPage = [this.page][0];
                        return [4 /*yield*/, test_1.test.step("Opening  ".concat(description, " Window"), function () { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b, _c;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            _b = (_a = Promise).all;
                                            _c = [this.page.context().waitForEvent("page")];
                                            return [4 /*yield*/, this.page.locator(selector).click()];
                                        case 1: return [4 /*yield*/, _b.apply(_a, [_c.concat([
                                                    _d.sent()
                                                ])])];
                                        case 2:
                                            newPage = (_d.sent())[0];
                                            return [4 /*yield*/, newPage.waitForLoadState("domcontentloaded")];
                                        case 3:
                                            _d.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, newPage];
                }
            });
        });
    };
    /**
     * Close the tab by its Id
     * @param options
     */
    BrowserActions.prototype.closeTabById = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(options === null || options === void 0 ? void 0 : options.tabId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.page.context().pages()[options.tabId].close()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.page.close()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Close the Page tab by its tab title
     * @param options
     */
    BrowserActions.prototype.closeTabByTitle = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var pages, count, pageTitle, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(options === null || options === void 0 ? void 0 : options.tabTitle)) return [3 /*break*/, 5];
                        pages = this.page.context().pages();
                        count = 0;
                        _b.label = 1;
                    case 1:
                        if (!(count < pages.length)) return [3 /*break*/, 4];
                        pageTitle = pages[count].title();
                        _a = options.tabTitle;
                        return [4 /*yield*/, pageTitle];
                    case 2:
                        if (_a === (_b.sent())) {
                            this.page = this.page.context().pages()[count];
                            this.page.close();
                            return [3 /*break*/, 4];
                        }
                        _b.label = 3;
                    case 3:
                        count++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.page.close()];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets the page Title
     * @returns
     */
    BrowserActions.prototype.getPageTitle = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.title()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //************************  Alert operations  ************************
    /**
     * Accept alert and return alert message
     * @param promptText A text to enter in prompt. It is optional for alerts.
     * @returns alert message
     */
    BrowserActions.prototype.alertAccept = function (promptText) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.waitForEvent("dialog").then(function (dialog) { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!(dialog.type() === "prompt")) return [3 /*break*/, 2];
                                    return [4 /*yield*/, dialog.accept(promptText)];
                                case 1:
                                    _a = _b.sent();
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, dialog.accept()];
                                case 3:
                                    _a = _b.sent();
                                    _b.label = 4;
                                case 4:
                                    _a;
                                    return [2 /*return*/, dialog.message().trim()];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * Dismiss alert and return alert message
     * @returns alert message
     */
    BrowserActions.prototype.alertDismiss = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.waitForEvent("dialog").then(function (d) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, d.dismiss()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, d.message().trim()];
                            }
                        });
                    }); })];
            });
        });
    };
    return BrowserActions;
}(ClickActions_1.default));
exports.default = BrowserActions;
//# sourceMappingURL=BrowserActions.js.map