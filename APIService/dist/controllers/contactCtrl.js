"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
const DBHelper_1 = __importDefault(require("../helpers/DBHelper"));
const mysql_1 = require("mysql");
const LogHelper_1 = __importDefault(require("../helpers/LogHelper"));
const cli_color_1 = __importDefault(require("cli-color"));
const setupHeadersHandler_1 = __importDefault(require("../middleWares/setupHeadersHandler"));
//CURD
class ContactCtrl {
    constructor(app) {
        this.urls = {
            'getAllContacts': {
                method: 'POST',
                url: '/contacts',
                cb: this.queryAllContacts.bind(this)
            },
            'getContactsByUserId': {
                method: 'GET',
                url: '/contacts/userId/:userId',
                cb: this.queryContactsByUserId.bind(this)
            },
            'getContactsByUserLike': {
                method: 'GET',
                url: '/contacts/userName/:name',
                cb: this.queryContactsByUserLike.bind(this)
            },
            'getContactDetailByUserId': {
                method: 'GET',
                url: '/contactDetails/userId/:userId',
                cb: this.queryContactDetailByUserId.bind(this)
            },
            'getContactTotalCountWithUserName': {
                method: 'GET',
                url: '/contacts/count/:userName',
                cb: this.fetchContactTotals.bind(this)
            },
            'getContactTotalCount': {
                method: 'GET',
                url: '/contacts/count',
                cb: this.fetchContactTotals.bind(this)
            }
        };
        this._app = app;
        app.use(setupHeadersHandler_1.default);
        this.makeCall();
    }
    makeCall() {
        Object.keys(this.urls).forEach((key) => {
            let tmp = this.urls[key];
            if (tmp.method == 'POST') {
                console.log(cli_color_1.default.green('/POST ' + tmp.url));
                this._app.post(tmp.url, tmp.cb);
            }
            if (tmp.method == 'GET') {
                console.log(cli_color_1.default.green('/GET ' + tmp.url));
                this._app.get(tmp.url, tmp.cb);
            }
            if (tmp.method == 'PUT') {
                console.log(cli_color_1.default.green('/PUT ' + tmp.url));
                this._app.put(tmp.url, tmp.cb);
            }
            if (tmp.method == 'DELETE') {
                console.log(cli_color_1.default.green('/DELETE ' + tmp.url));
                this._app.delete(tmp.url, tmp.cb);
            }
        });
    }
    queryAllContacts(req, resp) {
        let sql = `select c.UserId,  c.Title, Name, date(c.BirthDate) as BirthDate ,  floor(datediff(now(),date(c.BirthDate)) /365) as Age ,c.IsFavorite ,
        count(cd.UserID) as ContactCount
        from Expedia.Contact c 
        inner join Expedia.ContactDetail  cd on c.UserId =cd.UserId`;
        //console.log(JSON.stringify(req.body));
        //build the sql;
        let rawReq = req.body;
        if (rawReq) {
            sql = sql + ' where';
        }
        if (rawReq.title) {
            sql = sql + ` c.Title='${mysql_1.escape(rawReq.title)}' and`;
        }
        if (rawReq.name) {
            sql = sql + ` c.Name='${mysql_1.escape(rawReq.name)}' and`;
        }
        if (rawReq.birthDate) {
            sql = sql + ` c.BirthDate='${mysql_1.escape(rawReq.birthDate)}' and`;
        }
        //console.log(rawReq.isFavorite);
        if (rawReq.isFavorite != undefined || rawReq.isFavorite != '' || rawReq.isFavorite != null) {
            sql = sql + ` c.IsFavorite =${mysql_1.escape(rawReq.isFavorite)}`;
        }
        // remove the  last 'and'
        if (sql.lastIndexOf('and') == (sql.length - 3)) {
            sql = sql.substring(0, sql.lastIndexOf('and'));
        }
        sql = sql + ' group by cd.UserId';
        if (rawReq.orderBy) {
            sql = sql + ` order by ${rawReq.orderBy} ${rawReq.descORAsc ? rawReq.descORAsc : ' desc'}`;
        }
        sql = sql + ` limit 1000`;
        //console.log(sql);
        LogHelper_1.default.info(`api from ${sql} queryAllContacts sql ${sql}`);
        DBHelper_1.default.query(sql, {}, (result, fields) => {
            //console.log(JSON.stringify(result.result));
            resp.setHeader("Access-Control-Allow-Origin", "*");
            resp.setHeader('Content-Type', 'applicaiton/json');
            resp.json(result.result);
            resp.end();
            // DBHelper.closeDB();
        });
    }
    queryContactsByUserLike(req, resp) {
        let sql = `select  c.UserId,  c.Title, Name, date(c.BirthDate) as BirthDate ,  floor(datediff(now(),date(c.BirthDate)) /365) as Age ,c.IsFavorite ,
      count(cd.UserID) as ContactCount
      from Expedia.Contact c 
      inner join Expedia.ContactDetail  cd on c.UserId =cd.UserId`;
        if (req.params.name && req.params.name != 'null') {
            sql = sql + ` where c.Name like '%${req.params.name}%'`;
        }
        sql = sql + ` group by cd.UserId`;
        if (req.params.orderBy) {
            sql = sql + ` order by ${req.params.orderBy} ${req.params.descORAsc ? req.params.descORAsc : ' desc'}`;
        }
        sql = sql + ` limit 1000`;
        //console.log(sql);
        LogHelper_1.default.info(`api from: ${req.originalUrl} queryContactsByUserLike sql ${sql}`);
        DBHelper_1.default.query(sql, [], (result, fields) => {
            resp.json(result.result);
            resp.end();
        });
    }
    queryContactsByUserId(req, resp) {
        let sql = `select c.UserId,  c.Title, Name, date(c.BirthDate) as BirthDate ,  floor(datediff(now(),date(c.BirthDate)) /365) as Age ,c.IsFavorite ,
       count(cd.UserID) as ContactCount
       from Contact c 
       inner join ContactDetail  cd on c.UserId =cd.UserId
       where c.UserId = '${req.params.userId}'
       group by cd.UserId`;
        if (req.params.orderBy) {
            sql = sql + ` order by ${req.params.orderBy} ${req.params.descORAsc ? req.params.descORAsc : ' desc'}`;
        }
        //console.log(sql);
        LogHelper_1.default.info(`api from: ${req.originalUrl},sql: ${sql}`);
        DBHelper_1.default.query(sql, [], (result, fields) => {
            console.log(JSON.stringify(result.result));
            resp.setHeader("Access-Control-Allow-Origin", "*");
            resp.setHeader('Content-Type', 'applicaiton/json');
            resp.json(result.result);
            resp.end();
        });
    }
    fetchContactTotals(req, resp) {
        let sql = `select  count(UserId)  as TotalCount from Expedia.Contact`;
        console.log(req.params);
        if (req.params.userName && (req.params.userName != 'undefined' && req.params.userName != '' && req.params.userName != 'null')) {
            sql = sql + ` where Name like '%${req.params.userName}%'`;
        }
        //console.log(sql);
        LogHelper_1.default.info(`api from:${req.originalUrl}, sql:${sql}`);
        DBHelper_1.default.query(sql, [req.params.userName], (result, fields) => {
            console.log(JSON.stringify(result.result[0]));
            resp.setHeader("Access-Control-Allow-Origin", "*");
            resp.setHeader('Content-Type', 'applicaiton/json');
            resp.json(result.result);
            resp.end();
        });
    }
    queryContactDetailByUserId(req, resp) {
        let sql = `select * from ContactDetail where UserId='${req.params.userId}'`;
        LogHelper_1.default.info(`api from:${req.originalUrl},sql:${sql}`);
        DBHelper_1.default.query(sql, [], (result, fields) => {
            console.log(JSON.stringify(result.result));
            resp.setHeader("Access-Control-Allow-Origin", "*");
            resp.setHeader('Content-Type', 'applicaiton/json');
            resp.json(result.result);
            resp.end();
        });
    }
}
exports.default = ContactCtrl;
