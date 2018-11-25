"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultCfg {
    constructor() {
        this.mysql = {
            addr: 'localhost',
            port: 3306,
            user: 'expedia',
            pwd: 'expedia123',
            database: 'Expedia',
            connectTimeout: 30000
        };
        this.cache = {
            expireDate: 3000,
            mongodb: {
                addr: '',
                port: 3000,
                user: '',
                pwd: '',
                database: '',
                connectTimeout: 30000
            }
        };
    }
}
exports.default = DefaultCfg;
