import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import { defineBddConfig } from "playwright-bdd";
import * as os from "os";
import * as BrowserConfig from "./src/main/configs/BrowserConfig";

const waitTimeInMin: number = 60 * 1000;

dotenv.config({
  path: `.src/test/resource/environments/${process.env.NODE_ENV ? process.env.NODE_ENV : "qa"
    }.env`,
});

const testDir = defineBddConfig({
  paths: ["src/test/features/*.feature"],
  require: ["src/main/steps/*.ts"],
  importTestFrom: "src/main/configs/fixtures/bddPageFixture.ts",
  // ...other playwright-bdd options
});

let testName = process.env.TEST_NAME ?.trim() as string;

export default defineConfig({

  testDir: "./src/test/scriptLibrary/", // Uncomment this for test runner execution
  //testDir, // Uncomment this for Cucumber BDD execution

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "./reports/artifacts",
  //outputDir: './reports/trace-results' /* To store the trace results */,

  use: {
    /**
     * While Playwright can download and use the recent Chromium build, it can operate against the branded Google Chrome
     *  and Microsoft Edge browsers available on the machine (note that Playwright doesn't install them by default).
     *  In particular, the current Playwright version will support Stable and Beta channels of these browsers.
     */
    channel: BrowserConfig.fetchBrowserChannel(),
    browserName: BrowserConfig.fetchBrowserType(),
    headless: false,
    launchOptions: {
      args: ["--start-maximized", "--disable-extensions", "--disable-plugins"],
      headless: false,
      timeout: Number.parseInt(process.env.BROWSER_LAUNCH_TIMEOUT as string, 10),
      slowMo: 0,
      downloadsPath: "./test-results/downloads",
    },
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: Number.parseInt(process.env.ACTION_TIMEOUT as string, 10) * waitTimeInMin,
    acceptDownloads: true,
    navigationTimeout: Number.parseInt(process.env.NAVIGATION_TIMEOUT as string, 10) * waitTimeInMin,
    trace: "on-first-retry",
    video: "retain-on-failure",
    viewport: null,
    screenshot: { 
      mode: "only-on-failure",
      fullPage: true,
    },
  },

  fullyParallel: true,

  reportSlowTests: null,
  reporter: [
    /* Enable the required report format */

    //[`line`],
    //['list', { printSteps: true }],
    //['json', { outputFile: './reports/json-report/results.json' }],
    //['junit', {embedAnnotationsAsProperties: true, embedAttachmentsAsProperty: 'testrun_evidence', outputFile: './reports/junit-report/results.xml' }],
    [`./src/main/utils/ReportHelper.ts`] /* Custom report format with logs */,
    [
      `allure-playwright`,
      {
        environmentInfo: {
          OS: os.platform(),
          BROWSER: process.env.BROWSER?.toUpperCase(),
          BASE_URL: process.env.BASE_URL,
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
        outputFolder: "./reports/allure-results",
        detail: true,
        open: "on-failure",
      },
    ] /* Allure report configuration */,
    [`html`, { outputFolder: "./reports/html-report", open: "never" }],
    ["html", { open: "never", outputFolder: "./test-results/report" }],
    ["junit", { outputFile: "./test-results/results/results.xml" }],
    ["json", { outputFile: "./test-results/results/results.json" }],
    ["./src/framework/logger/TestListener.ts"],
    [
      "monocart-reporter",
      {
        name: "Automation Report",
        outputFile: "./test-results/report/execution.html",
      },
    ],

    //['blob', { outputDir: './reports/blob-report', fileName: `report-${os.platform()}.zip` }]
  ],

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? Number.parseInt(process.env.RETRIES as string) : undefined,

  workers: process.env.CI ? 1 : undefined,
  preserveOutput: "failures-only",

  timeout: Number.parseInt(process.env.TEST_TIMEOUT as string, 10) * waitTimeInMin,

  /* Configure projects for major browsers */

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1980, height: 1080 },
        acceptDownloads: true,
        video: "retain-on-failure",
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
        headless: false,
        launchOptions: {
          slowMo: 0,
        },
        //baseURL: '/',
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1980, height: 1080 },
        acceptDownloads: true,
        video: "retain-on-failure",
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
        headless: false,
        launchOptions: {
          slowMo: 0,
        },
        //baseURL: '/',
      },
    },
    {
      name: "local",
      testMatch: `*${testName}*`,
    },
    {
      name: "suite",
      testMatch: "*.test.ts",
    },
    // {
    //   name: `Device`,
    //   use: {
    //     ...devices[`Pixel 4a (5G)`],
    //     browserName: `chromium`,
    //     channel: `chrome`,
    //     headless: true,
    //     ignoreHTTPSErrors: true,
    //     acceptDownloads: true,
    //     screenshot: `only-on-failure`,
    //     video: `retain-on-failure`,
    //     trace: `retain-on-failure`,
    //     launchOptions: {
    //       slowMo: 0
    //     }
    //   },
    // },
  ],
});
