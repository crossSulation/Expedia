/**
 * entry port for project
 */

import express from "express";
import contactCtr from "./controllers/contactCtrl";

import bodyParser= require("body-parser");
const app = express();

//express setting
app.use(bodyParser.json());
app.set('port',process.env.PORT || 3000);
app.post('/contacts',contactCtr.getAllContacts);
app.get('/contacts/userId/:userId',contactCtr.getContactsByUserId);
app.get('/contacts/userName/:name',contactCtr.getContactsByUserLike);
app.get('/contactDetails/userId/:userId',contactCtr.getContactDetailByUserId);
app.get('/contacts/count',contactCtr.getContactTotalCount);
export default app;