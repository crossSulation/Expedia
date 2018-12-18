import  { Request,Response,RequestHandler,NextFunction } from "express";
/**
 * common header for each request
 */

 let setupHeaderHander =(req:Request,resp:Response,next:NextFunction):void => {
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader('Content-Type','applicaiton/json');
        next();
 }

 export =setupHeaderHander