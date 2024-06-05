import * as Constants from '@data/Constants';

export function fetchBrowserType() {
  const browserType = new Map()
    .set('CHROMIUM', Constants.BrowserConstants.CHROMIUM)
    .set('FIREFOX', Constants.BrowserConstants.FIREFOX)
    .set('WEBKIT', Constants.BrowserConstants.WEBKIT);

  const browser = `${process.env.BROWSER}`;

  return browserType.get(browser);
}

export function fetchBrowserChannel() {
  const browserChannel = new Map()
    .set('CHROME', Constants.BrowserConstants.CHROME)
    .set('EDGE', Constants.BrowserConstants.MSEDGE)
    .set('', Constants.BrowserConstants.BLANK);

  const browser = `${process.env.BROWSER}`;

  return browserChannel.get(browser);
}
