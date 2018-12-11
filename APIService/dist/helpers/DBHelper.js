"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const defaultCfg_1 = __importDefault(require("../configs/defaultCfg"));
class DBHelper {
    constructor() {
        this._dbConfig = new defaultCfg_1.default();
        this._instance = this.createConnection();
        this.openDB();
    }
    createConnection() {
        return mysql_1.default.createConnection({
            host: this._dbConfig.mysql.addr,
            port: this._dbConfig.mysql.port,
            password: this._dbConfig.mysql.pwd,
            user: this._dbConfig.mysql.user,
            database: this._dbConfig.mysql.database
        });
    }
    openDB() {
        if (this._instance) {
            this._instance.connect((erro) => {
                if (erro)
                    throw new Error('Connect failed!');
            });
        }
    }
    closeDB() {
        if (this._instance) {
            this._instance.end();
        }
    }
    execSql(sql, params, callback) {
        this.invokeQuery(sql, params, callback);
    }
    addNew(sql, params, callback) {
        if (sql.indexOf('insert') < -1) {
            throw new Error('not an insert sql! you may call execSql method');
        }
        this.invokeQuery(sql, params, callback);
    }
    del(sql, params, callback) {
        if (sql.indexOf('delete') < -1) {
            throw new Error('not an delete sql! you may call execSql method');
        }
        this.invokeQuery(sql, params, callback);
    }
    update(sql, params, callback) {
        if (sql.indexOf('update') < -1) {
            throw new Error('not an update sql! you may call execSql method!');
        }
        this.invokeQuery(sql, params, callback);
    }
    query(sql, params, callback) {
        if (sql.indexOf('select') < -1) {
            throw new Error('not an select sql! you may call execSql instead!');
        }
        this.invokeQuery(sql, params, callback);
    }
    invokeQuery(sql, params, callback) {
        if (this._instance) {
            this._instance.query(sql, params, (error, result, fields) => {
                if (error)
                    throw new Error('failed!' + error.code + '' + error.message);
                else
                    callback({ result: result, fields: fields });
            });
        }
    }
}
//CURD
exports.default = new DBHelper();
//# sourceMappingURL=DBHelper.js.map