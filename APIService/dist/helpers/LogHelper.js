"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const Winston = __importStar(require("winston"));
const { combine, timestamp, label, printf } = Winston.format;
let myFormat = printf((info) => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});
let myTransports = {
    console: new Winston.transports.Console({ level: 'error' }),
    file: new Winston.transports.File({
        filename: 'debug.log',
        level: 'info'
    }),
};
let logger = Winston.createLogger({
    levels: Winston.config.syslog.levels,
    format: combine(label({ label: 'api' }), timestamp(), myFormat),
    transports: [
        myTransports.console,
        myTransports.file
    ],
    exceptionHandlers: [
        myTransports.console,
        myTransports.file
    ],
    exitOnError: false
});
exports.default = logger;
