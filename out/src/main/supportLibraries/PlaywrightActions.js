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
var playwright_1 = require("@axe-core/playwright");
var test_1 = require("@playwright/test");
var fs = require("fs");
var pdfjslib = require("pdfjs-dist-es5");
var Constants = require("../supportLibraries/Constants");
var BrowserActions_1 = require("./Actions/BrowserActions");
var PlaywrightActions = /** @class */ (function (_super) {
    __extends(PlaywrightActions, _super);
    /**
     * @param {import('@playwright/test').Page} page
     * @param {import('@playwright/test').TestInfo} testInfo
     */
    function PlaywrightActions(page, testInfo) {
        var _this = _super.call(this, page, testInfo) || this;
        _this.page = page;
        _this.testInfo = testInfo;
        return _this;
    }
    PlaywrightActions.prototype.getPdfPageText = function (pdf, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var page, tokenizedText, pageText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pdf.getPage(pageNo)];
                    case 1:
                        page = _a.sent();
                        return [4 /*yield*/, page.getTextContent()];
                    case 2:
                        tokenizedText = _a.sent();
                        pageText = tokenizedText.items
                            .map(function (token) { return token.str; })
                            .join("");
                        return [2 /*return*/, pageText];
                }
            });
        });
    };
    PlaywrightActions.prototype.getPDFText = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var dataBuffer, pdf, maxPages, pageTextPromises, pageNo, pageTexts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataBuffer = fs.readFileSync(filePath);
                        return [4 /*yield*/, pdfjslib.getDocument(dataBuffer).promise];
                    case 1:
                        pdf = _a.sent();
                        maxPages = pdf.numPages;
                        pageTextPromises = [];
                        for (pageNo = 1; pageNo <= maxPages; pageNo += 1) {
                            pageTextPromises.push(this.getPdfPageText(pdf, pageNo));
                        }
                        return [4 /*yield*/, Promise.all(pageTextPromises)];
                    case 2:
                        pageTexts = _a.sent();
                        return [2 /*return*/, pageTexts.join(" ")];
                }
            });
        });
    };
    /**
     * Downloads the file and returns the downloaded file name
     * @param selector element that results in file download
     * @param description description of the element
     * @returns downloaded file name
     */
    PlaywrightActions.prototype.downloadFile = function (selector, description) {
        return __awaiter(this, void 0, void 0, function () {
            var fileName;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_1.test.step("Downloading ".concat(description, " file"), function () { return __awaiter(_this, void 0, void 0, function () {
                            var download, _a, _b, _c, filePath;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        _b = (_a = Promise).all;
                                        _c = [this.page.waitForEvent("download")];
                                        return [4 /*yield*/, this.page.locator(selector).click({ modifiers: ["Alt"] })];
                                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.concat([
                                                _d.sent()
                                            ])])];
                                    case 2:
                                        download = (_d.sent())[0];
                                        fileName = download.suggestedFilename();
                                        filePath = "".concat(Constants.CommonConstants.DOWNLOAD_PATH).concat(fileName);
                                        return [4 /*yield*/, download.saveAs(filePath)];
                                    case 3:
                                        _d.sent();
                                        return [4 /*yield*/, download.delete()];
                                    case 4:
                                        _d.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, fileName];
                }
            });
        });
    };
    //************************  Wait operations  ************************
    /**
   * Returns when the required dom content is in loaded state.
   */
    PlaywrightActions.prototype.waitForDomLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.waitForLoadState("domcontentloaded", { timeout: 5000 })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Wait for Page to complete the state of networkIdle
     */
    PlaywrightActions.prototype.waitForNetworkIdle = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.waitForLoadState("networkidle")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns when the required load state has been reached.
     */
    PlaywrightActions.prototype.waitForLoadState = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.waitForLoadState()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Wait for element to be disappear
     * @param locator
     * @returns
     */
    PlaywrightActions.prototype.waitTillElementDisappear = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.locator(locator).waitFor({ state: "hidden" })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * wait for element to be visible
     * @param wait time for element is visible
     * @returns
     */
    PlaywrightActions.prototype.waitTillVisible = function (locator, sec) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page
                            .locator(locator)
                            .waitFor({ state: "visible", timeout: sec * 1000 })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * wait for element not to be present in DOM
     * @returns
     */
    PlaywrightActions.prototype.waitTillDetachedFromDom = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.locator(locator).waitFor({ state: "detached" })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * wait for element to be attached to DOM
     * @returns
     */
    PlaywrightActions.prototype.waitForPresent = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.locator(locator).waitFor({ state: "attached" })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    //************************    visual validation   ************************
    PlaywrightActions.prototype.verifySnapshot_byLoc = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            var screenshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, test_1.expect)(locator).toHaveScreenshot()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, locator.screenshot()];
                    case 2:
                        screenshot = _a.sent();
                        return [4 /*yield*/, this.testInfo.attach("ACTUAL SCREENSHOT - Visual Validation", {
                                body: screenshot,
                                contentType: "image/png",
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PlaywrightActions.prototype.verifySnapshot = function (filePath, locatorName, screenshotPath) {
        return __awaiter(this, void 0, void 0, function () {
            var locator, screenshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchLocatorfromJson(filePath, locatorName)];
                    case 1:
                        locator = _a.sent();
                        return [4 /*yield*/, test_1.expect
                                .soft(this.page.locator(locator.locators[0]))
                                .toHaveScreenshot(screenshotPath)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.page
                                .locator(locator.locators[0])
                                .screenshot()];
                    case 3:
                        screenshot = _a.sent();
                        return [4 /*yield*/, this.testInfo.attach("ACTUAL SCREENSHOT - Visual Validation", {
                                body: screenshot,
                                contentType: "image/png",
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //************************    accessibility   ************************
    PlaywrightActions.prototype.validateAccessibility = function (strDescription) {
        return __awaiter(this, void 0, void 0, function () {
            var page, accessibilityScanResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = this.page;
                        return [4 /*yield*/, new playwright_1.default({ page: page }).analyze()];
                    case 1:
                        accessibilityScanResults = _a.sent();
                        return [4 /*yield*/, this.testInfo.attach("accessibility-scan-results-" + strDescription, {
                                body: JSON.stringify(accessibilityScanResults, null, 2),
                                contentType: "application/json",
                            })];
                    case 2:
                        _a.sent();
                        (0, test_1.expect)(accessibilityScanResults.violations).toEqual([]);
                        return [2 /*return*/];
                }
            });
        });
    };
    return PlaywrightActions;
}(BrowserActions_1.default));
exports.default = PlaywrightActions;
//# sourceMappingURL=PlaywrightActions.js.map