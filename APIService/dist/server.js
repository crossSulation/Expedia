"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const serverconfig_1 = __importDefault(require("./configs/serverconfig"));
const LogHelper_1 = __importDefault(require("./helpers/LogHelper"));
const server = app_1.default.listen(app_1.default.get('port'), () => {
    let host = serverconfig_1.default.host;
    let port = app_1.default.get('port') || serverconfig_1.default.port;
    LogHelper_1.default.info(`server is runing at http://${host}:${port}`);
    // console.log(`server is runing at http://${host}:${port}`);
});
