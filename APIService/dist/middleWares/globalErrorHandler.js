"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * cath the unexpect error
 */
const LogHelper_1 = __importDefault(require("../helpers/LogHelper"));
const clc = __importStar(require("cli-color"));
process.on('uncaughtException', (error) => {
    LogHelper_1.default.error(`uncaughtException ${error.message}`);
    console.error(clc.red(`uncaughtException ${error.message}`));
});
