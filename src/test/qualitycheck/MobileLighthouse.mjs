import { writeFileSync } from 'fs'
import lighthouse from 'lighthouse';
import { launch }from 'chrome-launcher';


(async () => {
  const SITELINK = "https://www.facebook.com"
  const chrome = await launch({ chromeFlags: ['--headless'] });
  const options = { logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port };

  // Below configuration is for Mobile devices 
  const config = { extends: 'lighthouse:default', settings: {formFactor: 'mobile', screenEmulation:{mobile:true}} }

  const runnerResult = await lighthouse(SITELINK, options, config);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  writeFileSync('../../reports/lighthouse/MobileLighthouseMobileReport.html', reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();
})();