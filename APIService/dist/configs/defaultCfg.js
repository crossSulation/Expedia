"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultCfg {
    constructor() {
        this.mysql = {
            addr_container: 'mysql_database',
            addr_local: 'localhost',
            port: 3306,
            user: 'root',
            pwd: 'root123',
            database: 'Expedia',
            connectTimeout: 30000
        };
        this.cache = {
            expireDate: 3000,
            mongodb: {
                addr_container: 'mongodb://mongo_db',
                addr_local: 'mongodb://root:root123@localhost:27017',
                autoReconnection: true,
                port: 27017,
                user: 'root',
                pwd: 'root123',
                database: 'bookStore',
                collection: 'uploads',
                connectTimeout: 30000
            }
        };
    }
}
exports.default = DefaultCfg;
