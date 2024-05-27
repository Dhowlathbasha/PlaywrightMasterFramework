"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConstants = exports.CommonConstants = exports.BrowserConstants = void 0;
exports.BrowserConstants = {
    CHROME: "chrome",
    FIREFOX: "firefox",
    WEBKIT: "webkit",
    MSEDGE: "msedge",
    EDGE: "edge",
    CHROMIUM: "chromium",
    BLANK: "",
};
exports.CommonConstants = {
    SEMICOLON: ";",
    BLANK: "",
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    HALF: 0.5,
    ONE_THOUSAND: 1000,
    DOWNLOAD_PATH: "./test-results/downloads/",
    SOAP_XML_REQUEST_PATH: "src/resources/API/SOAP/",
    REST_JSON_REQUEST_PATH: "src/resources/API/REST/",
    TEST_FOLDER_PATH: "../../tests/",
    TEST_SUITE_FILE_FORMAT: ".test.ts",
    PARALLEL_MODE: "parallel",
    SERIAL_MODE: "serial",
    REPORT_TITLE: "Test Execution Report",
    //TODO: Always set "reports" instead of test-results
    RESULTS_PATH: "./test-results/results",
    // Results Path should be attached with results.xml --> RESULTS_PATH + "/results.xml"
    //JUNIT_RESULTS_PATH : "./test-results/results/results.xml"
    JUNIT_RESULTS_PATH: function () { return "".concat(exports.CommonConstants.RESULTS_PATH, "/results.xml"); },
};
exports.DBConstants = {
    PROTOCOL: ';PROTOCOL=TCPIP',
    CERTIFICATE: ';trustServerCertificate=true;encrypt=false',
    USER: 'user:',
    PASSWORD: 'password:',
    CONNECTION_STRING: 'connectString:',
};
//# sourceMappingURL=Constants.js.map