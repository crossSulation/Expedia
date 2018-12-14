import mysql, { MysqlError, FieldInfo } from "mysql";
import DBConfig from "../configs/defaultCfg";
import logger from "./LogHelper";

class DBHelper {
    private _instance: mysql.Connection;
    private _dbConfig: DBConfig;
    constructor() {
       this._dbConfig = new DBConfig();
       this._instance = this.createConnection();
       this.openDB();
    }

    createConnection():mysql.Connection {
        logger.info('ENV:「'+process.env.NODE_ENV);
        let env_c =process.env.NODE_ENV;
        return mysql.createConnection({
            host: env_c =='production'?this._dbConfig.mysql.addr_container :this._dbConfig.mysql.addr_local,
            port: this._dbConfig.mysql.port,
            password: this._dbConfig.mysql.pwd,
            user: this._dbConfig.mysql.user,
            database: this._dbConfig.mysql.database
        });
    }
    openDB() {
        if(this._instance) {
            this._instance.connect((erro:MysqlError)=>{
                if(erro) throw new Error('Connect failed!');
            });
        }
    }
    closeDB() {
        if(this._instance) {
            this._instance.end();
        }
    }
    execSql(sql:string,params:any,callback:Function):any {
       this.invokeQuery(sql,params,callback);
    }

    addNew(sql:string,params:any,callback:Function):any {
        if(sql.indexOf('insert')<-1) {
            throw new Error('not an insert sql! you may call execSql method');
          }
          this.invokeQuery(sql,params,callback);
    }

    del(sql:string,params:any,callback:Function):any {
        if(sql.indexOf('delete')<-1) {
            throw new Error('not an delete sql! you may call execSql method');
        }
        this.invokeQuery(sql,params,callback);
    }

    update(sql:string,params:any,callback:Function): any {
        if(sql.indexOf('update')<-1)  {
            throw new Error('not an update sql! you may call execSql method!');
        }
        this.invokeQuery(sql,params,callback);
    }

    query(sql:string,params:any,callback:Function):any {
        if(sql.indexOf('select')<-1) {
            throw new Error('not an select sql! you may call execSql instead!');
        }
        this.invokeQuery(sql,params,callback);
    }

    invokeQuery(sql:string,params:any,callback:Function):any {
        if(this._instance) {
            this._instance.query(sql,params,(error:MysqlError,result:any,fields:FieldInfo[])=>{
                  if(error) throw new Error('failed!' + error.code+''+error.message);
                  else
                  callback({result:result, fields: fields});
           });
       }
    }
}

//CURD
export default new DBHelper()




