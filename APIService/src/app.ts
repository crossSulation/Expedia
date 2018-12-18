/**
 * entry port for project
 */

import express from "express";
import ContactCtrl  from "./controllers/contactCtrl";
import FileManageCtrl from "./controllers/fileManageCtrl";
import setupHeaderHander  from "./middleWares/setupHeadersHandler";
import bodyParser= require("body-parser");
const app:express.Express = express();
//express setting
app.use(bodyParser.json());
app.use(setupHeaderHander);
app.set('port',process.env.PORT || 3000);
//wrap the function
new ContactCtrl(app);
new FileManageCtrl(app);
export default app;