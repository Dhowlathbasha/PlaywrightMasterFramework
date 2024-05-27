"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var console = new winston_1.default.transports.Console();
var logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.uncolorize({ level: true, message: true, raw: true }), winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.align(), winston_1.default.format.printf(function (info) { return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message); })),
        }),
        new winston_1.default.transports.File({
            filename: "test-results/logs/execution.log",
            format: winston_1.default.format.combine(winston_1.default.format.uncolorize({ level: true, message: true, raw: true }), winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.align(), winston_1.default.format.printf(function (info) { return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message); })),
        }),
    ],
});
// Writes logs to console
logger.add(console);
exports.default = logger;
//# sourceMappingURL=CustomLogger.js.map