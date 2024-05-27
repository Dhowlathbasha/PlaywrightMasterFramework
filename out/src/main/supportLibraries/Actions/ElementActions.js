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
var BaseActions_1 = require("./BaseActions");
var ElementActions = /** @class */ (function (_super) {
    __extends(ElementActions, _super);
    /**
     * @param {import('@playwright/test').Page} page
     * @param {import('@playwright/test').TestInfo} testInfo
     */
    function ElementActions(page, testInfo) {
        var _this = _super.call(this, page, testInfo) || this;
        _this.page = page;
        _this.testInfo = testInfo;
        return _this;
    }
    //************************  Page operations  ************************
    /**
     * This method hovers over the element
     */
    ElementActions.prototype.hover = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.locator(locator).hover()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    ElementActions.prototype.sendKey_byLoc = function (locator, text) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedLocator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updatedLocator = typeof locator === "string" ? this.page.locator(locator) : locator;
                        return [4 /*yield*/, updatedLocator.fill(text)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //************************  Input operations  ************************
    /**
     * Press a key on web page
     * @param key
     * @param description
     */
    ElementActions.prototype.keyPressByKeyboard = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.keyboard.press(key)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Pick the Locator from the Json file and Enter Text on the Field
     * @param filePath
     * @param locatorName
     * @param strValue
     */
    ElementActions.prototype.sendkeys = function (filePath, locatorName, strValue) {
        return __awaiter(this, void 0, void 0, function () {
            var locator, description;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchLocatorfromJson(filePath, locatorName)];
                    case 1:
                        locator = _a.sent();
                        return [4 /*yield*/, this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.page.fill(locator.locators[0], strValue)];
                    case 3:
                        _a.sent();
                        description = locator.description + " is entered with " + strValue;
                        return [4 /*yield*/, this.test_attach(description, "text/plain")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.allure_attach(description, locator.locators[0], "application/json")];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Pick the Locator from the Json file and Enter Text on the Field and Press "Tab" button
     * @param filePath
     * @param locatorName
     * @param strValue
     */
    ElementActions.prototype.sendkeysAndTab = function (filePath, locatorName, strValue) {
        return __awaiter(this, void 0, void 0, function () {
            var locator, description;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchLocatorfromJson(filePath, locatorName)];
                    case 1:
                        locator = _a.sent();
                        return [4 /*yield*/, this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.page.fill(locator.locators[0], strValue)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.page.press(locator.locators[0], "Tab")];
                    case 4:
                        _a.sent();
                        description = locator.description + " is entered with " + strValue;
                        return [4 /*yield*/, this.test_attach(description, "text/plain")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.allure_attach(description, locator.locators[0], "application/json")];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Pick the Locator from the Json file and Enter Text on the Field and Press Keys
     * such as `ArrowLeft` or `a`. button
     * @param filePath
     * @param locatorName
     * @param strValue
     */
    ElementActions.prototype.presskey = function (filePath, locatorName, key) {
        return __awaiter(this, void 0, void 0, function () {
            var locator, description;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchLocatorfromJson(filePath, locatorName)];
                    case 1:
                        locator = _a.sent();
                        return [4 /*yield*/, this.page.locator(locator.locators[0]).scrollIntoViewIfNeeded()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.page.press(locator.locators[0], key)];
                    case 3:
                        _a.sent();
                        description = locator.description + " is pressed with " + key;
                        return [4 /*yield*/, this.test_attach(description, "text/plain")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.allure_attach(description, locator.locators[0], "application/json")];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Press a key on web element
     * @param key
     */
    ElementActions.prototype.keyPress = function (locator, key) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedLocator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updatedLocator = typeof locator === "string" ? this.page.locator(locator) : locator;
                        return [4 /*yield*/, updatedLocator.press(key)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns input.value for <input> or <textarea> or <select> element.
     * @returns
     */
    ElementActions.prototype.fetchInputValue = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            var value, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = this.page.locator(locator);
                        return [4 /*yield*/, element.waitFor()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, element.inputValue()];
                    case 2:
                        value = _a.sent();
                        return [4 /*yield*/, element.inputValue()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Gets the text content
     * @returns
     */
    ElementActions.prototype.getTextContent = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            var content, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = this.page.locator(locator);
                        return [4 /*yield*/, element.waitFor()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, element.textContent()];
                    case 2:
                        content = (_a.sent()).trim();
                        return [2 /*return*/, content];
                }
            });
        });
    };
    /**
   * Get all the text Content
   * @returns
   */
    ElementActions.prototype.getAllTextContent = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            var content, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = typeof locator === "string" ? this.page.locator(locator) : locator;
                        return [4 /*yield*/, element.first().waitFor()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, element.allTextContents()];
                    case 2:
                        content = _a.sent();
                        return [2 /*return*/, content];
                }
            });
        });
    };
    /**
     * Get Attribute value
     * @param attributeName
     * @returns
     */
    ElementActions.prototype.getAttribute = function (locator, attributeName) {
        return __awaiter(this, void 0, void 0, function () {
            var value, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = this.page.locator(locator);
                        return [4 /*yield*/, element.waitFor()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, element.getAttribute(attributeName)];
                    case 2:
                        value = (_a.sent()).trim();
                        return [2 /*return*/, value];
                }
            });
        });
    };
    /**
     * Get innerHTML
     * @returns
     */
    ElementActions.prototype.getInnerHTML = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            var text, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = this.page.locator(locator);
                        return [4 /*yield*/, element.waitFor()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, element.innerHTML()];
                    case 2:
                        text = (_a.sent()).trim();
                        return [2 /*return*/, text];
                }
            });
        });
    };
    /**
     * Get inner text
     * @returns
     */
    ElementActions.prototype.getInnerText = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            var text, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = this.page.locator(locator);
                        return [4 /*yield*/, element.waitFor()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, element.innerText()];
                    case 2:
                        text = (_a.sent()).trim();
                        return [2 /*return*/, text];
                }
            });
        });
    };
    /**
    *
    * @param filePath
    * @param locatorName
    */
    ElementActions.prototype.verifyHidden = function (filePath, locatorName) {
        return __awaiter(this, void 0, void 0, function () {
            var locator, flagBoolean, description;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchLocatorfromJson(filePath, locatorName)];
                    case 1:
                        locator = _a.sent();
                        return [4 /*yield*/, this.page.isHidden(locator.locators[0])];
                    case 2:
                        flagBoolean = _a.sent();
                        description = flagBoolean ? locator.description + " is Hidden as Expected" : locator.description + " is NOT Hidden - FAILURE";
                        return [4 /*yield*/, this.embedScreenshot(description)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.test_attach(description, "text/plain")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.allure_attach(description, locator.locators[0], "application/json")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, test_1.expect.soft(this.page.locator(locator.locators[0])).toBeHidden()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param filePath
     * @param locatorName
     */
    ElementActions.prototype.verifyVisible = function (filePath, locatorName) {
        return __awaiter(this, void 0, void 0, function () {
            var locator, flagBoolean, description;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchLocatorfromJson(filePath, locatorName)];
                    case 1:
                        locator = _a.sent();
                        return [4 /*yield*/, this.page.isVisible(locator.locators[0])];
                    case 2:
                        flagBoolean = _a.sent();
                        description = flagBoolean ? locator.description + " is Visible as Expected" : locator.description + " is NOT Visible - FAILURE";
                        return [4 /*yield*/, this.embedScreenshot(description)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.test_attach(description, "text/plain")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.allure_attach(description, locator.locators[0], "application/json")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, test_1.expect.soft(this.page.locator(locator.locators[0])).toBeVisible()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param filePath
     * @param locatorName
     * @param strExpectedValue
     */
    ElementActions.prototype.verifyValue = function (filePath, locatorName, strExpectedValue) {
        return __awaiter(this, void 0, void 0, function () {
            var locator, actualValue, description;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchLocatorfromJson(filePath, locatorName)];
                    case 1:
                        locator = _a.sent();
                        return [4 /*yield*/, this.page.inputValue(locator.locators[0])];
                    case 2:
                        actualValue = _a.sent();
                        description = strExpectedValue == actualValue
                            ? locator.description + " value is displayed as expected = " + strExpectedValue + " ; actual = " + actualValue
                            : "FAILURE - " + locator.description + " value is NOT displayed as expected = " + strExpectedValue + " ; actual = " + actualValue;
                        return [4 /*yield*/, this.embedScreenshot(description)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.test_attach(description, "text/plain")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.allure_attach(description, locator.locators[0], "application/json")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, test_1.expect
                                .soft(this.page.locator(locator.locators[0]))
                                .toHaveValue(strExpectedValue)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ElementActions.prototype.verifyDisabled = function (filePath, locatorName) {
        return __awaiter(this, void 0, void 0, function () {
            var locator, flagBoolean, description;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchLocatorfromJson(filePath, locatorName)];
                    case 1:
                        locator = _a.sent();
                        return [4 /*yield*/, this.page.isEditable(locator.locators[0])];
                    case 2:
                        flagBoolean = _a.sent();
                        description = !flagBoolean ? locator.description + " is Disabled as Expected" : locator.description + " is NOT Disabled - FAILURE";
                        return [4 /*yield*/, this.embedScreenshot(description)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.test_attach(description, "text/plain")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.allure_attach(description, locator.locators[0], "application/json")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, test_1.expect
                                .soft(this.page.locator(locator.locators[0]))
                                .not.toBeEditable()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ElementActions.prototype.verifyEnabled = function (filePath, locatorName) {
        return __awaiter(this, void 0, void 0, function () {
            var locator, flagBoolean, description;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchLocatorfromJson(filePath, locatorName)];
                    case 1:
                        locator = _a.sent();
                        return [4 /*yield*/, this.page.isEditable(locator.locators[0])];
                    case 2:
                        flagBoolean = _a.sent();
                        description = flagBoolean ? locator.description + " is Enabled as Expected" : locator.description + " is NOT Enabled - FAILURE";
                        return [4 /*yield*/, this.embedScreenshot(description)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.test_attach(description, "text/plain")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.allure_attach(description, locator.locators[0], "application/json")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, test_1.expect.soft(this.page.locator(locator.locators[0])).toBeEditable()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ElementActions.prototype.verifyVisible_byLoc = function (locator, description) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.embedScreenshot(description + "VERIFY VISIBLE - VALIDATION SCREENSHOT")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, test_1.expect)(locator).toBeVisible()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ElementActions.prototype.verifyHidden_byLoc = function (locator, description) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.embedScreenshot(description + " VERIFY HIDDEN - VALIDATION SCREENSHOT")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, test_1.expect)(locator).toBeHidden()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ElementActions.prototype.verifyValue_byLoc = function (locator, strExpectedValue, description) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.embedScreenshot(description + " VERIFY VALUE - VALIDATION SCREENSHOT")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, test_1.expect)(locator).toHaveValue(strExpectedValue)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ElementActions.prototype.verifyDisabled_byLoc = function (locator, description) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.embedScreenshot(description + " VERIFY DISABLED - VALIDATION SCREENSHOT")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, test_1.expect)(locator).not.toBeEditable()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ElementActions.prototype.verifyEnabled_byLoc = function (locator, description) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.embedScreenshot(description + " VERIFY ENABLED - VALIDATION SCREENSHOT")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, test_1.expect)(locator).toBeEditable()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ElementActions.prototype.verifyChkboxNotChkd_byLoc = function (locator, description) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.embedScreenshot(description + " VERIFY CHECKBOX CHECKED - VALIDATION SCREENSHOT")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, test_1.expect)(locator).not.toBeChecked()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * checks if element is editable
     * @returns Promise<boolean>
     */
    ElementActions.prototype.isEditable = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            var status, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = this.page.locator(locator);
                        return [4 /*yield*/, element.waitFor()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, element.isEditable()];
                    case 2:
                        status = _a.sent();
                        return [2 /*return*/, status];
                }
            });
        });
    };
    /**
     * checks if element is enabled
     * @returns Promise<boolean>
     */
    ElementActions.prototype.isEnabled = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            var status, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = this.page.locator(locator);
                        return [4 /*yield*/, element.waitFor()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, element.isEnabled()];
                    case 2:
                        status = _a.sent();
                        return [2 /*return*/, status];
                }
            });
        });
    };
    /**
     * checks if element is visible
     * @param wait time for element to be visible
     * @returns Promise<boolean>
     */
    ElementActions.prototype.isVisible = function (locator, sec) {
        return __awaiter(this, void 0, void 0, function () {
            var visibility, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.page
                                .locator(locator)
                                .isVisible({ timeout: sec * 1000 })];
                    case 1:
                        visibility = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        visibility = false;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, visibility];
                }
            });
        });
    };
    /**
     * Returns the status of the checkbox
     * @returns
     */
    ElementActions.prototype.isChecked = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(typeof locator === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.page.locator(locator).isChecked()];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, locator.isChecked()];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, _a];
                }
            });
        });
    };
    //************************  Check Box operations  ************************
    /**
     * check checkbox or radio button
     */
    ElementActions.prototype.check = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(typeof locator === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.page.locator(locator).check()];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, locator.check()];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        _a;
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * uncheck checkbox or radio button
     * @returns
     */
    ElementActions.prototype.uncheck = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(typeof locator === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.page.locator(locator).uncheck()];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, locator.uncheck()];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        _a;
                        return [2 /*return*/, this];
                }
            });
        });
    };
    //************************  DropDown operations  ************************
    /**
     *
     * @param filePath
     * @param locatorName
     * @param strValue
     */
    ElementActions.prototype.selectByVisibleText = function (filePath, locatorName, strValue) {
        return __awaiter(this, void 0, void 0, function () {
            var locator, description;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchLocatorfromJson(filePath, locatorName)];
                    case 1:
                        locator = _a.sent();
                        return [4 /*yield*/, this.page.selectOption(locator.locators[0], { label: strValue })];
                    case 2:
                        _a.sent();
                        description = locator.description + " is selected with " + strValue;
                        return [4 /*yield*/, this.test_attach(description, "text/plain")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.allure_attach(description, locator.locators[0], "application/json")];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param filePath
     * @param locatorName
     * @param strValue
     */
    ElementActions.prototype.selectByValue = function (filePath, locatorName, strValue) {
        return __awaiter(this, void 0, void 0, function () {
            var locator, description;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchLocatorfromJson(filePath, locatorName)];
                    case 1:
                        locator = _a.sent();
                        description = locator.description + " is selected with " + strValue;
                        return [4 /*yield*/, this.page.selectOption(locator.locators[0], strValue)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.test_attach(description, "text/plain")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.allure_attach(description, locator.locators[0], "application/json")];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ElementActions.prototype.selectdropdown = function (locator) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    /**
     * Gets all the options in dropdown
     * @returns
     */
    ElementActions.prototype.getAllOptions = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            var selectOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page
                            .locator(locator)
                            .locator("option")
                            .allTextContents()];
                    case 1:
                        selectOptions = _a.sent();
                        return [2 /*return*/, selectOptions];
                }
            });
        });
    };
    /**
     * Gets all the selected options in dropdown
     * @returns
     */
    ElementActions.prototype.getAllSelectedOptions = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            var selectOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page
                            .locator(locator)
                            .locator("option[selected='selected']")
                            .allTextContents()];
                    case 1:
                        selectOptions = _a.sent();
                        return [2 /*return*/, selectOptions];
                }
            });
        });
    };
    return ElementActions;
}(BaseActions_1.default));
exports.default = ElementActions;
//# sourceMappingURL=ElementActions.js.map