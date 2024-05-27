"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBrowserChannel = exports.fetchBrowserType = void 0;
var Constants = require("../supportLibraries/Constants");
function fetchBrowserType() {
    var browserType = new Map()
        .set("CHROMIUM", Constants.BrowserConstants.CHROMIUM)
        .set("FIREFOX", Constants.BrowserConstants.FIREFOX)
        .set("WEBKIT", Constants.BrowserConstants.WEBKIT);
    var browser = "".concat(process.env.BROWSER);
    return browserType.get(browser);
}
exports.fetchBrowserType = fetchBrowserType;
function fetchBrowserChannel() {
    var browserChannel = new Map()
        .set("CHROME", Constants.BrowserConstants.CHROME)
        .set("EDGE", Constants.BrowserConstants.MSEDGE)
        .set("", Constants.BrowserConstants.BLANK);
    var browser = "".concat(process.env.BROWSER);
    return browserChannel.get(browser);
}
exports.fetchBrowserChannel = fetchBrowserChannel;
//# sourceMappingURL=BrowserConfig.js.map