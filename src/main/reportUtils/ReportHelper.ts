import { FullConfig, FullResult, Reporter, Suite, TestCase, TestError, TestResult, TestStep, } from '@playwright/test/reporter'
import moment from 'moment'
import logger from './CustomLogger'

export default class CustomReporterConfig implements Reporter {
  onTestBegin(test: TestCase): void {
    logger.info(
      this.fetch_current_time() + ` -> Test Case Started : ${test.title}`
    )
  }

  onBegin(config: FullConfig<{}, {}>, suite: Suite): void {
    logger.info(
      this.fetch_current_time() +
        ` -> Starting the run with : ${suite.allTests().length} tests`
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

  private printLogs(msg: string, separator: string) {
    logger.info(separator);
    logger.info(`${msg.toUpperCase()}`);
    logger.info(separator);
}
}
