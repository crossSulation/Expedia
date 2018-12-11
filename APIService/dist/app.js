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
const bodyParser = require("body-parser");
const app = express_1.default();
//express setting
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
app.post('/contacts', contactCtrl_1.default.getAllContacts);
app.get('/contacts/userId/:userId', contactCtrl_1.default.getContactsByUserId);
app.get('/contacts/userName/:name', contactCtrl_1.default.getContactsByUserLike);
app.get('/contacts/userName/', contactCtrl_1.default.getContactsByUserLike);
app.get('/contactDetails/userId/:userId', contactCtrl_1.default.getContactDetailByUserId);
app.get('/contacts/count/:userName', contactCtrl_1.default.getContactTotalCount);
app.get('/contacts/count/', contactCtrl_1.default.getContactTotalCount);
exports.default = app;
//# sourceMappingURL=app.js.map