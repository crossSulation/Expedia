/**
 * mongodb gridfs
 */

 import mongoose from "mongoose";
 import MongoHelper,{MongoConfig} from "./MongoHelper";
 import GridFSStream from "gridfs-stream";
 import clc from "cli-color";
 import DefaultCfg from "../configs/defaultCfg";
 import logger from "./LogHelper";
 import Multer from "multer";
 import MulterGridfsStorage from "multer-gridfs-storage";
 import * as Crypto from "crypto";
 import * as path from "path";
 import { Request, Response } from "express";

 export interface MongoGridFsHelperResult {
    gridInstance: GridFSStream.Grid,
    gridStorageInstance: MulterGridfsStorage,
    multerInstance: Multer.Instance,
    connInstance: mongoose.Connection,
    mongodbInstance: any,
    mongoInstance : any
 }
 class MongoGridFsHelper {
     private _conn:any;
     private _gridfs:GridFSStream.Grid;
     private _defaultCfg:DefaultCfg;
     private _gridfs_stroage: MulterGridfsStorage;
     _upload:Multer.Instance;
     mongoHelper: MongoHelper<MongoConfig>;
     constructor() {
        console.log(clc.green('initialize....'));
        this.mongoHelper = new MongoHelper({});
        this._defaultCfg = new DefaultCfg();
        
     }
     
     /**
      * @description initialization
      */
     init():Promise<any> {
        let p =new Promise((resolve,reject)=>{
            this.mongoHelper.connect()
            .then((conn)=>{
                this._conn =conn;
                console.log(clc.green('Gridfs....'));
                this._gridfs = GridFSStream(this._conn.connection.db,conn.mongo)
                this._gridfs.collection(this._defaultCfg.cache.mongodb.collection);
                this._gridfs_stroage =new MulterGridfsStorage({
                    db: this._conn.connection.db,
                    file:(req:Request,file)=>{
                        return new Promise((resolve,reject)=>{
                            Crypto.randomBytes(16,(error,buff)=>{
                                if(error) 
                                return reject(error);
                                console.log(req.body);
                                let _metadata =req.body;
                                const filename = buff.toString('hex');
                                const fileInfo = {
                                    filename: filename,
                                    bucketName: this._defaultCfg.cache.mongodb.collection,
                                    metadata: _metadata
                                };
                                resolve(fileInfo); 
                            })
                        });
                    }
                });
                this._upload =Multer({storage : this._gridfs_stroage});
                resolve({
                    gridInstance: this._gridfs,
                    gridStorageInstance: this._gridfs_stroage,
                    multerInstance: this._upload,
                    connInstance: this._conn.connection,
                    mongodbInstance: this._conn.connection.db,
                    mongoInstance : this._conn
                })
            })
            .catch((error)=>{
                logger.error(error.message);
                console.error(clc.red(error));
                reject(error);
            });
        })
        return p;
     }
     /**
      * @description upload file
      * @param req 
      * @param resp 
      */
     uploadFile(req:Request,resp:Response) {
         if(!this._gridfs || !this._upload) return;
         if(req.file) { //single file upload
            resp.json({file: req.file});
            resp.end();
         }else { //for multiple file upload
            resp.json({files: req.files});
            resp.end();
         }
     }

     /**
      * @description get Image file
      * @param req 
      * @param resp 
      */
     getImageFile(req:Request,resp:Response) {
         if(!this._gridfs || !this._upload) return;
         this._gridfs.files.findOne({filename: req.params.filename},(error,file)=>{
             //check if file exist
             if(!file || file.length === 0) {
                 resp.status(404).json({
                     error: {
                         message: `The image file ' ${req.params.filename}' is not existed`
                     }
                 });
                 resp.end();
             }
             //check contentType 
             if(file.contentType==='image/jpeg' || file.contentType==='image/png') {
                 resp.contentType(file.contentType);
                 const readStream =this._gridfs.createReadStream({_id: file._id,filename:file.filename});
                 readStream.on('error',(error)=>{
                    resp.send('No Image from that title!');
                    resp.end();
                 })
                 readStream.pipe(resp);
             }else {
                resp.status(404).json({
                    error: {
                        message: `The file ' ${req.params.filename}' is not image!`
                    }
                });
                resp.end();
             }
         })
     }
 
     /**
      * @description get all files
      * @param req 
      * @param resp 
      */
    getAllFiles(req:Request, resp:Response) {
        if(!this._gridfs || !this._upload) return;
        this._gridfs.files.find().toArray((error,files)=>{
            if(!files || files.length===0) {
                resp.status(404).json({
                    error: {
                        message : `No files!`
                    }
                });
                resp.end();
            }
            resp.json(files);
            resp.end();
        })
    }

    /**
     * @description get file by given name
     * @param req 
     * @param resp 
     */
    getFileByName(req:Request,resp:Response) {
        if(!this._gridfs || !this._upload) return;
        this._gridfs.files.findOne({filename: req.params.filename },(error,file)=>{
            if(!file || file.length ===0) {
                resp.status(404).json({
                    error: {
                        messge: `No such file : ${req.params.filename}`
                    }
                });
                resp.end();
            }else {
                resp.json(file);
                resp.end();
            }
        })
       
    }

    /**
     * @description delete file by given id
     * @param req 
     * @param resp 
     */
    deleteFile(req:Request,resp:Response) {
        if(!this._gridfs || ! this._upload) return;
        this._gridfs.remove({_id: req.params.id,root:'uploads'},(error)=>{
            if(error) {
                resp.status(404).json({
                    error: {
                        message :`can't delete file by given id:${req.params.id}`
                    }
                })
                resp.end();
            }else {
                resp.json({
                    result: {
                        success: true,
                        message: `Success delete file, id:${req.params.id}`
                    }
                });
                resp.end();
            }
        });
    }
/**
 * @description update file name by given specific file id
 * @param req 
 * @param resp 
 */
    updateFileName(req:Request,resp:Response) {
        if(!this._gridfs_stroage || !this._upload) return;
        this._gridfs.files.updateOne({_id:req.params.id},{$set:{'filename': req.params.filename}},(error,result)=>{
             if(error) {
                 resp.status(404).json({
                     error: {
                         message: `update filename failed! file_id :${req.params.id},file_name: ${req.params.filename}`
                     }
                 });
                 resp.end();
             }else {
                 resp.json({
                     result: {
                         message:`update file: ${req.params.id} sucessed!`
                     }
                 });
                 resp.end();
             }
        });
    }
}

 export default MongoGridFsHelper;