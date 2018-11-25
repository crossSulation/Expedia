import * as Winston from "winston";
import { TransformableInfo } from "logform";

let myFormat =Winston.format.printf((info)=>{
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});
let myTransports = {
    console: new Winston.transports.Console({level:'error'}),
    file: new Winston.transports.File({
        filename: __dirname+'debug.log',
        level: 'info'
    }),
};
let logger =Winston.createLogger({
    levels:Winston.config.syslog.levels,
    format: myFormat,
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