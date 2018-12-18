
import { RequestHandler } from "express";
declare namespace url {
    export interface Url {
        [key:string]:UrlProp
    }
    export interface UrlProp {
        method:string,
        url: string,
        single?: boolean, //for file upload ,single or multiple 
        cb:RequestHandler
    }
    
}

export default url
