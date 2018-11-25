/**
 * cath the unexpect error
 */
 import Logger from "../helpers/LogHelper";
 process.on('uncaughtException',(error:Error)=>{
     Logger.error(`uncaughtException ${error.message}`);
 })