"use strict";
/**
 * entry port for project
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactCtrl_1 = __importDefault(require("./controllers/contactCtrl"));
const fileManageCtrl_1 = __importDefault(require("./controllers/fileManageCtrl"));
const setupHeadersHandler_1 = __importDefault(require("./middleWares/setupHeadersHandler"));
const bodyParser = require("body-parser");
const app = express_1.default();
//express setting
app.use(bodyParser.json());
app.use(setupHeadersHandler_1.default);
app.set('port', process.env.PORT || 3000);
//wrap the function
new contactCtrl_1.default(app);
new fileManageCtrl_1.default(app);
exports.default = app;
//# sourceMappingURL=app.js.map