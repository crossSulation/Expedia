/**
 * generate the mongo models
 */

 import MongoHelper,{MongoConfig} from "./MongoHelper";
 import mongoose,{Schema} from "mongoose";
 import mongodb from "mongodb";
 import clc from "cli-color";
 import SchemaDefine from "../schemas/schema";
 class ModelFactroyHelper {
    private _conn:any;
    private _connInstance : mongoose.Connection;
    private _mongodbInstance: mongodb.Db;
    private _mongoHelper: MongoHelper<MongoConfig>;
    constructor() {
        this._mongoHelper = new MongoHelper({});
        this._mongoHelper.connect()
        .then((conn)=>{
            this._conn =conn;
            this._connInstance =conn.connection;
            this._mongodbInstance =conn.connection.db;
        }).catch((eror)=>{
            console.error(clc.red(eror.message));
        })
    }
    getMongodbInstance():mongodb.Db {
        if(this._mongodbInstance) return this._mongodbInstance;
    }
    getConnectInstance():mongoose.Connection {
        if(this._connInstance) return this._connInstance;
    }
    generateModel(name:string, schema: mongoose.Schema):mongoose.Model<mongoose.Document, any> {
        return this._conn.model(name,schema);
    }

    generateContactM() {
        let contactSchema = new Schema(SchemaDefine.contact);
        return this.generateModel('Contact',contactSchema);
    }
    
    generateGroupM() {
        let groupSchema = new Schema(SchemaDefine.group);
        return this.generateModel('Group',groupSchema);
    }
    
    generateRoomM() {
        let roomSchema = new Schema(SchemaDefine.room);
        return this.generateModel('Room',roomSchema);
    }

    generateUserM() {
        let userSchema =new Schema(SchemaDefine.user);
        return this.generateModel('User',userSchema);
    }
}