"use strict";
/**
 * entry port for project
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const contactCtrl_1 = __importDefault(require("./controllers/contactCtrl"));
const fileManageCtrl_1 = __importDefault(require("./controllers/fileManageCtrl"));
const bodyParser = require("body-parser");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ejsengine = require('ejs');
const app = express_1.default();
//express setting
app.use(bodyParser.json());
// app.use(setupHeaderHander);
//setting for chat
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, "public"), {}));
app.set('views', path_1.default.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.get('/chat', (req, res, next) => {
    console.log('....chat....');
    // res.setHeader('Content-Type','text/html');
    res.render('index', { data: {
            contactList
        } });
});
app.set('port', process.env.PORT || 3000);
//wrap the function
new contactCtrl_1.default(app);
new fileManageCtrl_1.default(app);
exports.default = app;
