/**
 * files management api here
 */
import  url  from "../utils/Url";
import { Express, Response } from "express";
import clc from "cli-color";
import fs from "fs";
import Multer from "multer";
import { Request } from "express-serve-static-core";
import setupHeaderHander  from "../middleWares/setupHeadersHandler";
import MongoGridFsHelper,{ MongoGridFsHelperResult } from "../helpers/MongoGridFsHelper";
 class FileMangeCtrl {
     private _app:Express;
     private _grid_fs_helper: MongoGridFsHelper;
     private _upload:Multer.Instance;
     private _urls:url.Url ={
         'uploadSingleFile': {
             method:'POST',
             url:'/file/upload/single',
             single: true,
             cb:this.uploadSingleFile.bind(this)
         },
         'uploadMultipleFile': {
            method:'POST',
            url:'/file/upload/multiple',
            single:false,
            cb:this.uploadMultipleFile.bind(this)
        },
        'getImageFile': {
            method: 'GET',
            url:'/file/image/:filename',
            cb: this.getImageFile.bind(this)
        },
        'getAllFiles': {
            method: 'GET',
            url: '/file/files',
            cb: this.getAllFiles.bind(this)
        },
        'getFileByFileName': {
            method: 'GET',
            url:'/file/:filename',
            cb: this.getFileByFileName.bind(this)
        },
        'deleteFileById': {
            method:'DELETE',
            url:'/file/:id',
            cb: this.deleteFileById.bind(this)
        },
        'updateFileName': {
            method:'PUT',
            url:'/file/update',
            cb: this.updateFileName.bind(this)
        }
     }
     constructor(app:Express) {
        this._app =app;
        app.use(setupHeaderHander);
        this.init();
     }
     
      init() {
        console.log(clc.green('initializing....'));
        this._grid_fs_helper = new MongoGridFsHelper();
        this._grid_fs_helper.init()
        .then((result: MongoGridFsHelperResult)=>{
             this._upload =result.multerInstance ;
             this.makeCall();
        }).catch((error)=>{
            console.log(clc.red(error.message));
        })
     }
     makeCall() {
        Object.keys(this._urls).forEach((key)=>{
             let tmp =this._urls[key];
              if(tmp.method=='POST') {
                 console.log(clc.green('/POST '+tmp.url));
                 this._app.post(tmp.url,tmp.single ? this._upload.single('file'): this._upload.any(),tmp.cb);
              }
              if(tmp.method=='GET') {
                 console.log(clc.green('/GET '+tmp.url));
                 this._app.get(tmp.url,tmp.cb);
              }
              if(tmp.method=='PUT') {
                 console.log(clc.green('/PUT '+tmp.url));
                 this._app.put(tmp.url,tmp.cb);
              }
              if(tmp.method=='DELETE') {
                 console.log(clc.green('/DELETE '+tmp.url));
                 this._app.delete(tmp.url,tmp.cb);
              }
        });
     }

     /**
      * @description upload sinlge file
      * @param req 
      * @param resp 
      */
     uploadSingleFile(req:Request,resp:Response) {
         console.log(clc.green(`upload file:[${req.file.filename}]`));
          this._grid_fs_helper.uploadFile(req,resp);
     }

     uploadMultipleFile(req:Request,resp:Response) {
         console.log(clc.green(`upload multiple files [${JSON.stringify(req.files)}]`));
         this._grid_fs_helper.uploadFile(req,resp);
     }
     /**
      * 
      * @param req 
      * @param resp 
      */
     getImageFile(req:Request, resp:Response) {
         console.log(clc.green(`get image file:[${req.params.filename}]`));
         this._grid_fs_helper.getImageFile(req,resp);
     }
     
     /**
      * @param req
      * @param resp
      */
    
      getAllFiles(req:Request, resp:Response) {
          console.log(clc.green(`get all files...`));
          this._grid_fs_helper.getAllFiles(req,resp);
      }

      /**
       * 
       * @param req 
       * @param resp 
       */
      getFileByFileName(req:Request, resp:Response) {
          console.log(clc.green(`get file ${req.params.filename}`));
          this._grid_fs_helper.getFileByName(req,resp);
      }

      /**
       * 
       * @param req 
       * @param resp 
       */
      deleteFileById(req:Request,resp:Response) {
          console.log(clc.green(`del file file_id ${req.params.id}`));
          this._grid_fs_helper.deleteFile(req,resp);
      }
      
      /**
       * 
       * @param req 
       * @param resp 
       */
      updateFileName(req:Request,resp:Response) {
          console.log(clc.green(`update filename file_id ${req.params.id}`));
          this._grid_fs_helper.updateFileName(req,resp);
      }
      
      /**
       * @description get the thumbnail of upload file
       * @param req 
       * @param resp
       * TODO 
       */
      getThumbnailOfImage(req:Request, resp:Response) {
        
      }

      /**
       * @description shim the image when upload the file with wrong orientation
       * @param req 
       * @param resp 
       * TODO
       */
      tranformImageByExif(req:Request,resp:Response) {

      }
 }

 declare function fileManageCtr(app:Express): FileMangeCtrl;

 export default FileMangeCtrl