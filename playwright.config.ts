import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'
import { defineBddConfig } from 'playwright-bdd';
import * as os from "os";

// switch (process.env.NODE_ENV) {
//   case 'local':
//     dotenv.config({ path: './resource/environments/local.env' })
//     break
//   case 'dev':
//     dotenv.config({ path: './resource/environments/dev.env' })
//     break
//   case 'qa':
//     dotenv.config({ path: './resource/environments/qa.env' })
//     break
//   default:
//     dotenv.config({ path: './resource/environments/qa.env' })
// }

dotenv.config({
  path: `./resource/environments/${process.env.NODE_ENV ? process.env.NODE_ENV : 'qa'}.env`,
})

const testDir = defineBddConfig({
  paths: ['src/test/features/*.feature'],
  require: ['src/main/steps/*.ts'],
  importTestFrom: 'src/main/configs/fixtures/bddPageFixture.ts',
  // ...other playwright-bdd options
})

export default defineConfig({
  //globalSetup: `./src/configs/GlobalSetup`,

  globalTeardown: './src/main/configs/GlobalTeardown',

  testDir: './src/test/scriptLibrary/', // Uncomment this for test runner execution

  //testDir, // Uncomment this for Cucumber BDD execution

  fullyParallel: true,

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: './reports/artifacts',

  //outputDir: './reports/trace-results' /* To store the trace results */,

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
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
        outputFolder: './reports/allure-results',
        detail: true,
        open: 'on-failure',
      },
    ] /* Allure report configuration */,

    [`html`, { outputFolder: './reports/html-report', open: 'never' }],

    //['blob', { outputDir: './reports/blob-report', fileName: `report-${os.platform()}.zip` }]
  ],

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : undefined,

  workers: process.env.CI ? 1 : undefined,

  timeout: 60 * 1000,

  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    trace: 'on-first-retry',
    video: 'on-first-retry',
    viewport: { width: 1280, height: 500 },
    screenshot: 'on',
  },

  /* Configure projects for major browsers */

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1980, height: 1080 },
        acceptDownloads: true,
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        headless: false,
        launchOptions: {
          slowMo: 0,
        },
        //baseURL: '/',
      },
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
})
