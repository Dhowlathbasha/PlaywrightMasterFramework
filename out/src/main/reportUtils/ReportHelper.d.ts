import { FullConfig, FullResult, Reporter, Suite, TestCase, TestError, TestResult, TestStep } from '@playwright/test/reporter';
export default class CustomReporterConfig implements Reporter {
    onTestBegin(test: TestCase): void;
    onBegin(config: FullConfig<{}, {}>, suite: Suite): void;
    onTestEnd(test: TestCase, result: TestResult): void;
    onStepBegin(test: TestCase, result: TestResult, step: TestStep): void;
    onStepEnd(test: TestCase, result: TestResult, step: TestStep): void;
    onError(error: TestError): void;
    onEnd(result: FullResult): void;
    fetch_current_time(): string;
    private printLogs;
}
