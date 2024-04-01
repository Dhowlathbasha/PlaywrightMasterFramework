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

  //globalTeardown: './src/configs/GlobalTeardown',

  //testDir: './src/test/scriptLibrary/', // Uncomment this for test runner execution

  testDir, // Uncomment this for Cucumber BDD execution

  fullyParallel: true,

  outputDir: './reports/trace-results' /* To store the trace results */,

  reporter: [
    /* Enable the required report format */

    //[`line`],

    //['list', { printSteps: true }],

    //['json', { outputFile: './reports/json-report/results.json' }],

    //['junit', { outputFile: './reports/junit-report/results.xml' }],

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

    //[`html`, { outputFolder: './reports/html-report', open: 'never' }],

    //['blob', { outputDir: './reports/blob-report', fileName: `report-${os.platform()}.zip` }]
  ],

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 1,

  workers: process.env.CI ? 1 : undefined,

  timeout: 60 * 1000,

  use: {
    trace: 'on',
    video: process.env.CI ? 'retain-on-failure' : 'retain-on-failure',
    screenshot: 'only-on-failure',
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
