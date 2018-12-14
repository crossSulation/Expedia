import * as config from "./dbconfig";
export default class DefaultCfg {
    mysql: config.MySqlConfig= {
        addr_container:'mysql_database',
        addr_local: 'localhost',
        port:3306,
        user:'root',
        pwd:'root123',
        database:'Expedia',
        connectTimeout:30000
    };
    cache: config.cacheConfig = {
        expireDate: 3000,
        mongodb:{
            addr_container:'mongo_db',
            addr_local:'localhost',
            port:27017,
            user:'mongo',
            pwd:'mongo',
            database:'bookStore',
            connectTimeout:30000
        }
    }
}