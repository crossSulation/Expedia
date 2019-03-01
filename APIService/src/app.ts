/**
 * entry port for project
 */

import express from "express";
import path from "path";
import ContactCtrl  from "./controllers/contactCtrl";
import FileManageCtrl from "./controllers/fileManageCtrl";
import ChatCtrl from "./controllers/chatCtrl";

import bodyParser= require("body-parser");
import cookieParser from "cookie-parser";
import { clearCache } from "ejs";
import clc from 'cli-color';
import logger from "./helpers/LogHelper";
const ejsengine =require('ejs');
const app:express.Express = express();
//express setting
app.use(bodyParser.json());
// app.use(setupHeaderHander);

//setting for chat
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public"),{}))

app.set('views',path.join(__dirname,"views"));
app.set('view engine','ejs');

app.set('port',process.env.PORT || 3000);
//wrap the function
new ContactCtrl(app);
new FileManageCtrl(app);
new ChatCtrl(app);
export default app;