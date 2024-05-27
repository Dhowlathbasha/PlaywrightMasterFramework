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
var exceljs_1 = require("exceljs");
var ExcelActions = /** @class */ (function () {
    /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */
    function ExcelActions(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }
    ExcelActions.prototype.getData = function (filepath_W_name, sheetName, tcid, columnName) {
        return __awaiter(this, void 0, void 0, function () {
            var workbook, colNum, content_workbook, worksheet, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workbook = new exceljs_1.Workbook();
                        return [4 /*yield*/, workbook.xlsx.readFile(filepath_W_name)];
                    case 1:
                        content_workbook = _a.sent();
                        worksheet = content_workbook.getWorksheet(sheetName);
                        if (!(worksheet != undefined)) return [3 /*break*/, 5];
                        rows = worksheet.rowCount;
                        return [4 /*yield*/, this.getColumnNumber(worksheet, columnName)];
                    case 2:
                        if (!((_a.sent()) != undefined)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getColumnNumber(worksheet, columnName)];
                    case 3:
                        colNum = _a.sent();
                        return [4 /*yield*/, this.getColumnData(worksheet, tcid, rows, colNum)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ExcelActions.prototype.getColumnNumber = function (worksheet, columnName) {
        return __awaiter(this, void 0, void 0, function () {
            var colNum, i;
            return __generator(this, function (_a) {
                try {
                    for (i = 1; i <= worksheet.columnCount; i++) {
                        if (worksheet.getRow(1).getCell(i).value == columnName) {
                            colNum = i;
                            break;
                        }
                    }
                }
                catch (error) {
                    console.error(error);
                }
                return [2 /*return*/, colNum];
            });
        });
    };
    ExcelActions.prototype.getColumnData = function (worksheet, tcid, rowNum, columnNum) {
        return __awaiter(this, void 0, void 0, function () {
            var columnData, i;
            return __generator(this, function (_a) {
                for (i = 2; i <= rowNum; i++) {
                    if (worksheet.getRow(i).getCell(1).value == tcid) {
                        columnData = worksheet.getRow(i).getCell(columnNum).value;
                        return [2 /*return*/, columnData];
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    return ExcelActions;
}());
exports.default = ExcelActions;
//# sourceMappingURL=ExcelActions.js.map