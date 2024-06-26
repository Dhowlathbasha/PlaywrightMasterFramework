import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
//import { defineBddConfig } from 'playwright-bdd';
import * as os from 'os';
import * as BrowserConfig from './main/configs/BrowserConfig';
import * as Constants from '@data/Constants';

const waitTimeInMin: number = 60 * 1000;

dotenv.config({
  path: `./resource/environments/${process.env.NODE_ENV ? process.env.NODE_ENV : 'qa'}.env`,
});

// const testDir = defineBddConfig({
//   paths: ['tests/features/*.feature'],
//   require: ['main/steps/*.ts'],
//   importTestFrom: 'main/configs/fixtures/bddPageFixture.ts',
//   // ...other playwright-bdd options
// });

//const testName = process.env.TEST_NAME?.trim() as string;
const TESTCASE_DIR = process.env.TESTCASE_DIR as string;
export default defineConfig({
  //testDir, // Uncomment this for Cucumber BDD execution
  outputDir: './test-results/artifacts', //Folder for test artifacts such as screenshots, videos, traces, etc.
  testDir: TESTCASE_DIR, // Uncomment this for test runner execution
  use: {
    /**
     * While Playwright can download and use the recent Chromium build, it can operate against the branded Google Chrome
     *  and Microsoft Edge browsers available on the machine (note that Playwright doesn't install them by default).
     *  In particular, the current Playwright version will support Stable and Beta channels of these browsers.
     */
    channel: BrowserConfig.fetchBrowserChannel(),
    browserName: BrowserConfig.fetchBrowserType(),
    deviceScaleFactor: undefined,
    headless: false,
    launchOptions: {
      args: ['--start-maximized', '--disable-extensions', '--disable-plugins'],
      headless: false,
      timeout: Number.parseInt(process.env.BROWSER_LAUNCH_TIMEOUT as string, 10),
      slowMo: 0,
      downloadsPath: Constants.CommonConstants.DOWNLOAD_PATH,
    },
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: Number.parseInt(process.env.ACTION_TIMEOUT as string, 10) * waitTimeInMin,
    acceptDownloads: true,
    ignoreHTTPSErrors: true,
    navigationTimeout: Number.parseInt(process.env.NAVIGATION_TIMEOUT as string, 10) * waitTimeInMin,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    viewport: null,
    contextOptions: {
      recordHar: { path: 'requests.har', mode: 'full', urlFilter: 'https://www.google.com/' },
    },
    screenshot: {
      mode: 'on',
      fullPage: true,
    },
  },
  fullyParallel: true,
  reportSlowTests: null,
  reporter: [
    ['line'],
    //['list', { printSteps: true }],
    //['blob', { outputDir: './test-results/blob-report', fileName: `report-${os.platform()}.zip` }]
    [`./main/supportLibraries/reportUtils/ReportHelper.ts`] /* Custom report format with logs */,

    /* Allure report configuration */
    [
      `allure-playwright`,
      {
        environmentInfo: {
          OS: os.platform(),
          BROWSER: process.env.BROWSER?.toUpperCase(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
        outputFolder: './test-results/allure-results',
        detail: true,
        open: 'on-failure',
      },
    ],
    [`html`, { outputFolder: './html-reporter/html-report', open: 'never' }],
    [
      'junit',
      {
        embedAnnotationsAsProperties: true,
        embedAttachmentsAsProperty: 'testrun_evidence',
        outputFile: Constants.CommonConstants.JUNIT_RESULTS_PATH(),
      },
    ],
    ['json', { outputFile: Constants.CommonConstants.JSON_RESULTS_PATH() }],
    [
      'monocart-reporter',
      {
        name: 'Automation Report',
        outputFile: './test-results/report/execution.html',
      },
    ],
  ],
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : undefined,
  workers: process.env.CI ? Number.parseInt(process.env.PARALLEL_THREAD as string, 10) : undefined,
  preserveOutput: 'failures-only',
  timeout: Number.parseInt(process.env.TEST_TIMEOUT as string, 10) * waitTimeInMin,
  expect: {
    timeout: Number.parseInt(process.env.TEST_TIMEOUT as string, 10) * waitTimeInMin,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: "local",
    //   testMatch: `*${testName}*`,
    // },
    // {
    //   name: "suite",
    //   testMatch: "*.test.ts",
    // },
  ],
});
