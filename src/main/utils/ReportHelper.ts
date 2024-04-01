import { FullConfig, FullResult, Reporter, Suite, TestCase, TestError, TestResult, TestStep, } from '@playwright/test/reporter'
import winston from 'winston'
import moment from 'moment'

const console = new winston.transports.Console()

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // - Write all logs with importance level of `info` or less than it
    new winston.transports.File({
      filename: './reports/logs/info.log',
      level: 'info',
    }),
    new winston.transports.File({
      filename: './reports/logs/error.log',
      level: 'error',
    }),
  ],
})

// Writes logs to console
logger.add(console)

export default class CustomReporterConfig implements Reporter {
  onBegin(config: FullConfig<{}, {}>, suite: Suite): void {
    logger.info(
      this.fetch_current_time() +
        ` -> Starting the run with : ${suite.allTests().length} tests`
    )
  }

  onTestBegin(test: TestCase): void {
    logger.info(
      this.fetch_current_time() + ` -> Test Case Started : ${test.title}`
    )
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    logger.info(
      this.fetch_current_time() +
        ` -> Test Case Completed : ${test.title} , Status : ${result.status} , Execution Duration : ${result.duration}`
    )
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    if (step.category === `test.step`) {
      logger.info(
        this.fetch_current_time() +
          ` -> Executing Step : ${step.title}`
      )
    }
  }

  onStepEnd(test: TestCase, result: TestResult, step: TestStep): void {
    if (step.category === `test.step`) {
      logger.info(
        this.fetch_current_time() +
          ` -> Step End : ${step.title}`
      )
    }
  }

  onError(error: TestError): void {
    logger.error(this.fetch_current_time() + ' -> ' + error.message)
  }

  onEnd(result: FullResult): void {
    logger.info(
      this.fetch_current_time() +
        ` -> Over all Execution Status : ${result.status} , Overall Execution Duration : ${result.duration}`
    )
  }

  fetch_current_time() {
    return moment().format('DD-MMM-YYYY hh:mm:ss.SSS')
  }
}
