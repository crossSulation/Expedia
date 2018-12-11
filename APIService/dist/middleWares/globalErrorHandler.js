"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * cath the unexpect error
 */
const LogHelper_1 = __importDefault(require("../helpers/LogHelper"));
process.on('uncaughtException', (error) => {
    LogHelper_1.default.error(`uncaughtException ${error.message}`);
});
//# sourceMappingURL=globalErrorHandler.js.map