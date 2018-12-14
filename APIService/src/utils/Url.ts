
import { RequestHandler } from "express";
declare namespace url {
    export interface Url {
        [key:string]:UrlProp
    }
    export interface UrlProp {
        method:string,
        url: string,
        cb:RequestHandler
    }
    
}

export default url
