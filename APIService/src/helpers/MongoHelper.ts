import * as mongoose from "mongoose";
import multer from "multer";
import MulterGridfsStorage from "multer-gridfs-storage";
import DefaultCfg from "../configs/defaultCfg";
import logger from "./LogHelper";

export interface MongoConfig {

}

class MongoHelper<MongoConfig> {
    private _defaultCfg: DefaultCfg;
    private _conn:mongoose.Connection
    constructor(props:MongoConfig) {
        this._defaultCfg = new DefaultCfg();
        this.connect()
        .then((result)=>{
            logger.info('Connected to Mongo successfully!');
            this._conn =result;
        }).catch((error)=>{
            logger.error(error.message);
        })
    }

    connect() {
        logger.info('ENV:「'+process.env.NODE_ENV);
        let env_c =process.env.NODE_ENV;
      return mongoose.createConnection(
           env_c=='prodcution'
           ? this._defaultCfg.cache.mongodb.addr_container
           : this._defaultCfg.cache.mongodb.addr_local,{
           dbName:this._defaultCfg.cache.mongodb.database,
           useCreateIndex:true,
           user:this._defaultCfg.cache.mongodb.user,
           pass: this._defaultCfg.cache.mongodb.pwd
       });
    }

}