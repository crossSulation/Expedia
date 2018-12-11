"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultCfg {
    constructor() {
        this.mysql = {
            addr: '',
            port: 3306,
            user: 'root',
            pwd: 'root123',
            database: 'expedia',
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
//# sourceMappingURL=defaultCfg.js.map