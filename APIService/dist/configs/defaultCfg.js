"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultCfg {
    constructor() {
        this.mysql = {
            addr: 'mysql_database',
            port: 3306,
            user: 'root',
            pwd: 'root123',
            database: 'Expedia',
            connectTimeout: 30000
        };
        this.cache = {
            expireDate: 3000,
            mongodb: {
                addr: 'mongo_db',
                port: 27017,
                user: 'mongo',
                pwd: 'mongo',
                database: 'bookStore',
                connectTimeout: 30000
            }
        };
    }
}
exports.default = DefaultCfg;
