/**
 * cath the unexpect error
 */
 import Logger from "../helpers/LogHelper";
 import * as clc from "cli-color";
 process.on('uncaughtException',(error:Error)=>{
     Logger.error(`uncaughtException ${error.message}`);
     console.error(clc.red(`uncaughtException ${error.message}`));
 })