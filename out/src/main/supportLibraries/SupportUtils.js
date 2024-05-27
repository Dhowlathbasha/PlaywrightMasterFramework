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
var moment_1 = require("moment");
var fs_1 = require("fs");
var SupportUtils = /** @class */ (function () {
    function SupportUtils(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }
    /**
      * Generates date based on the input
      * @param format date format
      * @param days increment OR decrement the days
      * @param months increment OR decrement the months
      * @param years increment OR decrement the years
      * @returns
      */
    SupportUtils.prototype.dateGenerator = function (format, days, months, years) {
        return __awaiter(this, void 0, void 0, function () {
            var date;
            return __generator(this, function (_a) {
                date = (0, moment_1.default)().add(days, 'd').add(months, 'M').add(years, 'y')
                    .format(format);
                return [2 /*return*/, date];
            });
        });
    };
    /**
     * Customizes the date that has been given as input based on other input parameter
     * @param date to be customized
     * @param format date format
     * @param days increment OR decrement the days
     * @param months increment OR decrement the months
     * @param years increment OR decrement the years
     * @returns
     */
    SupportUtils.prototype.dateCustomizer = function (date, format, days, months, years) {
        return __awaiter(this, void 0, void 0, function () {
            var customDate;
            return __generator(this, function (_a) {
                customDate = (0, moment_1.default)(date, format).add(days, 'd').add(months, 'M').add(years, 'y')
                    .format(format);
                return [2 /*return*/, customDate];
            });
        });
    };
    /**
     * Generates time in hr:min format based on the input
     * @param format time format
     * @param hours increment OR decrement the hours
     * @param minutes increment OR decrement the minutes
     * @returns
     */
    SupportUtils.prototype.timeGenerator = function (format, hours, minutes) {
        return __awaiter(this, void 0, void 0, function () {
            var time;
            return __generator(this, function (_a) {
                time = (0, moment_1.default)().add(minutes, 'm').add(hours, 'h').format(format);
                return [2 /*return*/, time];
            });
        });
    };
    SupportUtils.prototype.addDaysToCurrentDate = function (addDays) {
        return __awaiter(this, void 0, void 0, function () {
            var date, formattedDate;
            return __generator(this, function (_a) {
                date = (0, moment_1.default)().add(addDays, "d").toDate();
                formattedDate = (0, moment_1.default)(date).format("DD-MMM-YYYY hh:mm:ss.SSS");
                return [2 /*return*/, formattedDate];
            });
        });
    };
    SupportUtils.prototype.addAnnotations = function (jsonData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.testInfo.annotations.push({
                    type: "test_id",
                    description: jsonData["Testcase"],
                });
                this.testInfo.annotations.push({
                    type: "test_key",
                    description: jsonData["TestKey"],
                });
                this.testInfo.annotations.push({
                    type: "test_summary",
                    description: jsonData["TestSummary"],
                });
                this.testInfo.annotations.push({
                    type: "test_description",
                    description: jsonData["TestcaseDescription"],
                });
                return [2 /*return*/];
            });
        });
    };
    SupportUtils.prototype.generateRandomAplhabets = function (length) {
        return __awaiter(this, void 0, void 0, function () {
            var result, characters, charactersLength, counter;
            return __generator(this, function (_a) {
                result = "";
                characters = "abcdefghijklmnopqrstuvwxyz";
                charactersLength = characters.length;
                counter = 0;
                while (counter < length) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    counter += 1;
                }
                return [2 /*return*/, result];
            });
        });
    };
    SupportUtils.prototype.readJsonFile = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                JSON.parse(fs_1.default.readFileSync(path, "utf-8"));
                return [2 /*return*/];
            });
        });
    };
    SupportUtils.prototype.readValuesFromTextFile = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exists(filePath)];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/, fs_1.default.readFileSync("".concat(filePath), "utf-8")];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SupportUtils.prototype.writeDataIntoTextFile = function (filePath, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fs_1.default.writeFile(filePath, data, function (error) {
                    if (error)
                        throw error;
                });
                return [2 /*return*/];
            });
        });
    };
    SupportUtils.prototype.exists = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (fs_1.default.existsSync(path)) {
                    return [2 /*return*/, path];
                }
                return [2 /*return*/];
            });
        });
    };
    return SupportUtils;
}());
exports.default = SupportUtils;
//# sourceMappingURL=SupportUtils.js.map