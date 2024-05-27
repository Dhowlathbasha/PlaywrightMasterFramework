import AmazonHomePage from '../../ui/pages/AmazonHomePage';
import SupportUtils from '../../supportLibraries/SupportUtils';
import { PlaywrightActions } from '../../supportLibraries/PlaywrightActions';
import ExcelActions from '../../supportLibraries/ExcelActions';
import BoilerHomePage from '../../ui/pages/BoilerHomepage';
type pages = {
    actions: PlaywrightActions;
    amazonHomePage: AmazonHomePage;
    boilerHomePage: BoilerHomePage;
    supportUtils: SupportUtils;
    excelActions: ExcelActions;
};
export declare const test: import("playwright/test").TestType<import("playwright/test").PlaywrightTestArgs & import("playwright/test").PlaywrightTestOptions & import("playwright-bdd/dist/run/bddFixtures/types").BddFixtures & pages, import("playwright/test").PlaywrightWorkerArgs & import("playwright/test").PlaywrightWorkerOptions & import("playwright-bdd/dist/run/bddFixtures/types").BddFixturesWorker>;
export declare const expect: import("playwright/test").Expect<{}>;
export {};
