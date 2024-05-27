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
var Constants = require("../Constants");
var path_1 = require("path");
var fs_1 = require("fs");
var Allocator = /** @class */ (function () {
    function Allocator() {
    }
    Allocator.createSuite = function () {
        //const sheet = CLIUtil.getValueOf("SHEET");
        // Here sheet is filename
        var sheet = 'testcase';
        Allocator.deleteFiles(Constants.CommonConstants.TEST_FOLDER_PATH);
        var testList = Constants.CommonConstants.BLANK;
        var fileList = Allocator.getFiles('../../../../data');
        for (var _i = 0, fileList_1 = fileList; _i < fileList_1.length; _i++) {
            var _a = fileList_1[_i], TestName = _a.TestName, Mode = _a.Mode;
            var modeOfRun = Constants.CommonConstants.BLANK;
            if (Mode !== undefined && Mode !== null && Mode !== Constants.CommonConstants.BLANK) {
                modeOfRun = "\n\ttest.describe.configure({ mode: '".concat(Mode, "' });");
            }
            testList += "\ntest.describe(\"".concat(TestName, "\", () => {").concat(modeOfRun, "\n\trequire(\"./").concat(TestName, ".spec.ts\");\n});");
        }
        fs_1.default.writeFileSync("".concat(Constants.CommonConstants.TEST_FOLDER_PATH).concat(sheet).concat(Constants.CommonConstants.TEST_SUITE_FILE_FORMAT), Allocator.createTemplate(testList));
        console.log(" Completed!! ");
    };
    Allocator.deleteFiles = function (directory) {
        var files = fs_1.default.readdirSync(directory);
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            if (file.includes(Constants.CommonConstants.TEST_SUITE_FILE_FORMAT)) {
                fs_1.default.unlinkSync(path_1.default.join(directory, file));
            }
        }
    };
    /**
  * Gets the value of command line argument
  * @param argumentName
  * @returns
  */
    Allocator.getValueOf = function (argumentName) {
        var argv = process.argv[2];
        if (argv === undefined) {
            throw new Error("".concat(argumentName, " is not defined, please send ").concat(argumentName, " through CLI"));
        }
        if (argv.toUpperCase().includes(argumentName)) {
            return argv.split("=")[1];
        }
        throw new Error("Please send command line argument ".concat(argumentName, " with value"));
    };
    Allocator.createTemplate = function (testList, sheet) {
        var suiteTemplate = "/* eslint-disable no-tabs */\n/* eslint-disable import/extensions */\n/* eslint-disable global-require */\nimport test from \"@playwright/test\";\n".concat(testList, "\n");
        return suiteTemplate;
    };
    Allocator.getFileNames = function (dirPath) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fs_1.default.readdir(dirPath, function (err, files) { return __awaiter(_this, void 0, void 0, function () {
                var filePaths;
                return __generator(this, function (_a) {
                    if (err) {
                        reject("Error reading directory: ".concat(err));
                    }
                    else if (fs_1.default.statSync(dirPath).isDirectory()) {
                        Allocator.getFileNames(dirPath);
                    }
                    else {
                        filePaths = files.map(function (file) { return path_1.default.join(dirPath, file); });
                        resolve(filePaths);
                    }
                    return [2 /*return*/];
                });
            }); });
        });
    };
    Allocator.getFiles = function (dir, files) {
        if (files === void 0) { files = []; }
        var fileList = fs_1.default.readdirSync(dir);
        for (var _i = 0, fileList_2 = fileList; _i < fileList_2.length; _i++) {
            var file = fileList_2[_i];
            var name_1 = "".concat(dir, "/").concat(file);
            if (fs_1.default.statSync(name_1).isDirectory()) {
                Allocator.getFiles(name_1, files);
            }
            else {
                var supabase = path_1.default.basename(name_1);
                files.push(supabase);
            }
        }
        return files;
    };
    return Allocator;
}());
exports.default = Allocator;
Allocator.createSuite();
//# sourceMappingURL=Allocator.js.map