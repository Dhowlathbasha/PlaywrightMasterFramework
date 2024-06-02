export const BrowserConstants = {
  CHROME: "chrome",
  FIREFOX: "firefox",
  WEBKIT: "webkit",
  MSEDGE: "msedge",
  EDGE: "edge",
  CHROMIUM: "chromium",
  BLANK: "",
};

export const CommonConstants = {
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
  TEST_FOLDER_PATH: "./tests/",
  TEST_SUITE_FILE_FORMAT: ".test.ts",
  PARALLEL_MODE: "parallel",
  SERIAL_MODE: "serial",
  REPORT_TITLE: "Test Execution Report",
  RESULTS_PATH: "./test-results",
  JSON_RESULTS_PATH: () => `${CommonConstants.RESULTS_PATH}/json-report/results.json`,
  JUNIT_RESULTS_PATH: () => `${CommonConstants.RESULTS_PATH}/junit-report/results.xml`,
};

export const DBConstants = {
   PROTOCOL : ';PROTOCOL=TCPIP',
   CERTIFICATE : ';trustServerCertificate=true;encrypt=false',
   USER : 'user:',
   PASSWORD : 'password:',
   CONNECTION_STRING : 'connectString:',
}

