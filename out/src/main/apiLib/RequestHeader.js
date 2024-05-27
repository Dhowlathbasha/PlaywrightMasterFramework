"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestHeader = /** @class */ (function () {
    function RequestHeader() {
        this.map = new Map();
    }
    RequestHeader.prototype.set = function (key, value) {
        this.map.set(key, value);
        return this;
    };
    RequestHeader.prototype.get = function () {
        return Object.fromEntries(this.map);
    };
    return RequestHeader;
}());
exports.default = RequestHeader;
//# sourceMappingURL=RequestHeader.js.map