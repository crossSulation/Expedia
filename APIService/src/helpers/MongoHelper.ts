import mongoose from "mongoose";
import mongodb = require('mongodb');
import multer from "multer";
import MulterGridfsStorage from "multer-gridfs-storage";
import DefaultCfg from "../configs/defaultCfg";
import logger from "./LogHelper";
import clc from "cli-color";
export interface MongoConfig extends DefaultCfg {

}

class MongoHelper<MongoConfig> {
    private _defaultCfg: DefaultCfg;
    constructor(props:MongoConfig) {
        this._defaultCfg = new DefaultCfg();
    }

    connect() {
        logger.info('ENV:「'+process.env.NODE_ENV);
        console.log(clc.green('ENV:「'+process.env.NODE_ENV));
        let env_c =process.env.NODE_ENV;
        let conn_config =env_c == 'production'?
            {
                dbName: this._defaultCfg.cache.mongodb.database,
                useCreateIndex: true,
                autoReconnect: this._defaultCfg.cache.mongodb.autoReconnection,
                user: this._defaultCfg.cache.mongodb.user,
                pass: this._defaultCfg.cache.mongodb.pwd
            }
            :{
                dbName: this._defaultCfg.cache.mongodb.database,
                useCreateIndex: true,
                autoReconnect: this._defaultCfg.cache.mongodb.autoReconnection
            }
      return mongoose.connect(
           env_c=='production'
           ? this._defaultCfg.cache.mongodb.addr_container
           : this._defaultCfg.cache.mongodb.addr_local,
           conn_config);
    }

}

export default MongoHelper