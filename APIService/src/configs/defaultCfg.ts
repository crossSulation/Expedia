import * as config from "./dbconfig";
export default class DefaultCfg {
    mysql: config.MySqlConfig= {
        addr:'mysql_database',
        port:3306,
        user:'root',
        pwd:'root123',
        database:'Expedia',
        connectTimeout:30000
    };
    cache: config.cacheConfig = {
        expireDate: 3000,
        mongodb:{
            addr:'',
            port:3000,
            user:'',
            pwd:'',
            database:'',
            connectTimeout:30000
        }
    }
}