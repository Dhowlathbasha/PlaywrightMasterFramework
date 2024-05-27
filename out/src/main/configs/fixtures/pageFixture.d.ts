import AmazonHomePage from '@pages/AmazonHomePage';
import SupportUtils from '../../supportLibraries/SupportUtils';
import PlaywrightActions from '../../supportLibraries/PlaywrightActions';
import ExcelActions from '../../supportLibraries/ExcelActions';
import BoilerHomePage from '@pages/BoilerHomepage';
import AxeBuilder from '@axe-core/playwright';
type pages = {
    actions: PlaywrightActions;
    amazonHomePage: AmazonHomePage;
    boilerHomePage: BoilerHomePage;
    supportUtils: SupportUtils;
    excelActions: ExcelActions;
    axebuilder: AxeBuilder;
};
export declare const test: import("@playwright/test").TestType<import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions & pages, import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions>;
export declare const expect: import("@playwright/test").Expect<{}>;
export {};
