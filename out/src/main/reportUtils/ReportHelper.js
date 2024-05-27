"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = require("moment");
var CustomLogger_1 = require("./CustomLogger");
var CustomReporterConfig = /** @class */ (function () {
    function CustomReporterConfig() {
    }
    CustomReporterConfig.prototype.onTestBegin = function (test) {
        CustomLogger_1.default.info(this.fetch_current_time() + " -> Test Case Started : ".concat(test.title));
    };
    CustomReporterConfig.prototype.onBegin = function (config, suite) {
        CustomLogger_1.default.info(this.fetch_current_time() +
            " -> Starting the run with : ".concat(suite.allTests().length, " tests"));
    };
    CustomReporterConfig.prototype.onTestEnd = function (test, result) {
        CustomLogger_1.default.info(this.fetch_current_time() +
            " -> Test Case Completed : ".concat(test.title, " , Status : ").concat(result.status, " , Execution Duration : ").concat(result.duration));
    };
    CustomReporterConfig.prototype.onStepBegin = function (test, result, step) {
        if (step.category === "test.step") {
            CustomLogger_1.default.info(this.fetch_current_time() +
                " -> Executing Step : ".concat(step.title));
        }
    };
    CustomReporterConfig.prototype.onStepEnd = function (test, result, step) {
        if (step.category === "test.step") {
            CustomLogger_1.default.info(this.fetch_current_time() +
                " -> Step End : ".concat(step.title));
        }
    };
    CustomReporterConfig.prototype.onError = function (error) {
        CustomLogger_1.default.error(this.fetch_current_time() + ' -> ' + error.message);
    };
    CustomReporterConfig.prototype.onEnd = function (result) {
        CustomLogger_1.default.info(this.fetch_current_time() +
            " -> Over all Execution Status : ".concat(result.status, " , Overall Execution Duration : ").concat(result.duration));
    };
    CustomReporterConfig.prototype.fetch_current_time = function () {
        return (0, moment_1.default)().format('DD-MMM-YYYY hh:mm:ss.SSS');
    };
    CustomReporterConfig.prototype.printLogs = function (msg, separator) {
        CustomLogger_1.default.info(separator);
        CustomLogger_1.default.info("".concat(msg.toUpperCase()));
        CustomLogger_1.default.info(separator);
    };
    return CustomReporterConfig;
}());
exports.default = CustomReporterConfig;
//# sourceMappingURL=ReportHelper.js.map