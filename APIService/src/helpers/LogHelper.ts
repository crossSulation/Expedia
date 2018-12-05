import * as Winston from "winston";
import { TransformableInfo } from "logform";

const { combine, timestamp, label, printf } = Winston.format;

let myFormat =printf((info)=>{
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});
let myTransports = {
    console: new Winston.transports.Console({level:'error'}),
    file: new Winston.transports.File({
        filename: 'debug.log',
        level: 'info'
    }),
};
let logger =Winston.createLogger({
    levels:Winston.config.syslog.levels,
    format: combine(
        label({label:'api'}),
        timestamp(),
        myFormat
    ),
    transports: [
        myTransports.console,
        myTransports.file
    ],
    exceptionHandlers:[
        myTransports.console,
        myTransports.file
    ],
    exitOnError:false
})

export default logger