import { FullConfig, FullResult, Reporter, Suite, TestCase, TestError, TestResult, TestStep, } from '@playwright/test/reporter'
import moment from 'moment'
import logger from './CustomLogger'

const TEST_SEPARATOR = "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^";
const STEP_SEPARATOR = "------------------------------------------------------------------------------";

export default class ReportHelper implements Reporter {
  onTestBegin(test: TestCase): void {
    logger.info(
      ` -> Test Case Started : ${test.title}`, TEST_SEPARATOR
    )
  }

  onBegin(config: FullConfig<{}, {}>, suite: Suite): void {
    logger.info(
      ` -> Starting suite run with : ${suite.allTests().length} tests`
    )
  }


  onTestEnd(test: TestCase, result: TestResult): void {
    if (result.status === 'failed') {
      logger.error(`Test: ${test.title} - ${result.status}\n${result.error?.stack}`);
  }
  let status = ` -> Test Case Completed : ${test.title} , Status : ${result.status} , Execution Duration : ${result.duration}`
  this.publishlogs(status, TEST_SEPARATOR);
    
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    if (step.category === `test.step`) {
      if (typeof step.parent !== "undefined") {
        logger.info(
          ` -> Executing Step : ${step.title}`
        )
      }
      else {
        this.publishlogs(`Started Step: ${step.title}`, STEP_SEPARATOR);
    }
    }
  }

  onStepEnd(test: TestCase, result: TestResult, step: TestStep): void {
    if (step.category === `test.step` && typeof step.parent === "undefined") {
      this.publishlogs(
        ` -> Completed Step : ${step.title}`,STEP_SEPARATOR
      )
    }
  }

  onError(error: TestError): void {
    logger.error(`Message: ->  ${error.message}`)
    logger.error(`  Stack: ->  ${error.stack}`);
    logger.error(`  Value: ->  ${error.value}`);
  }

  onEnd(result: FullResult): void {
    logger.info(
      ` -> Over all Execution Status of the Suite: ${result.status} , Overall Execution Duration : ${result.duration}`
    )
  }

  fetch_current_time() {
    return moment().format('DD-MMM-YYYY hh:mm:ss.SSS')
  }

  private publishlogs(msg: string, separator: string) {
    logger.info(separator);
    logger.info(`${msg.toUpperCase()}`);
    logger.info(separator);
  }
}
