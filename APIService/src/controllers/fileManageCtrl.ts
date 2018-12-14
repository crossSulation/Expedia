/**
 * files management api here
 */
import  url  from "../utils/Url";
import { Express } from "express";
 class FileMangeCtrl {
     private _app:Express
     private _urls:url.Url ={
         'uploadSingleFile': {
             method:'POST',
             url:'/file/upload/single',
             cb:null
         },
         'uploadMultipleFile': {
            method:'POST',
            url:'/file/upload/multiple',
            cb:null
        }
     }
     constructor(app:Express) {
        this._app =app;
     }

     makeCall() {

     }
 }

 declare function fileManageCtr(app:Express): FileMangeCtrl;

 export default FileMangeCtrl