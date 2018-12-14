
/**
 * 
 */
import DBHelper from "../helpers/DBHelper";
import { FieldInfo, raw,escape,escapeId } from "mysql";
import {Request ,Response} from 'express';
import logger from "../helpers/LogHelper";
import  url  from "../utils/Url";
import { Express } from "express";
    //CURD

class ContactCtrl {
    private urls:url.Url ={
        'getAllContacts':{
            method:'POST',
            url:'/contacts',
            cb:this.queryAllContacts.bind(this)
        },
        'getContactsByUserId':{
            method:'GET',
            url:'/contacts/userId/:userId',
            cb: this.queryContactsByUserId.bind(this)
        },
        'getContactsByUserLike':{
            method:'GET',
            url:'/contacts/userName/:name',
            cb: this.queryContactsByUserLike.bind(this)
         },
        'getContactDetailByUserId':{
            method:'GET',
            url:'/contactDetails/userId/:userId',
            cb:this.queryContactDetailByUserId.bind(this)
        },
        'getContactTotalCountWithUserName':{
            method:'GET',
            url:'/contacts/count/:userName',
            cb: this.fetchContactTotals.bind(this)
        },
        'getContactTotalCount':{
            method:'GET',
            url:'/contacts/count',
            cb: this.fetchContactTotals.bind(this)
        }
    }
    private _app :Express
    constructor(app:Express) {
        this._app =app;
    }

    makeCall() {
       Object.keys(this.urls).forEach((key)=>{
            let tmp =this.urls[key];
             if(tmp.method=='POST') {
                this._app.post(tmp.url,tmp.cb);
             }
             if(tmp.method=='GET') {
                this._app.get(tmp.url,tmp.cb);
             }
             if(tmp.method=='PUT') {
                this._app.put(tmp.url,tmp.cb);
             }
             if(tmp.method=='DELETE') {
                this._app.delete(tmp.url,tmp.cb);
             }
       });
    }
    
    queryAllContacts(req:Request,resp:Response):void {
        let sql=`select c.UserId,  c.Title, Name, date(c.BirthDate) as BirthDate ,  floor(datediff(now(),date(c.BirthDate)) /365) as Age ,c.IsFavorite ,
        count(cd.UserID) as ContactCount
        from Expedia.Contact c 
        inner join Expedia.ContactDetail  cd on c.UserId =cd.UserId`;
        //console.log(JSON.stringify(req.body));
        //build the sql;
        let rawReq = req.body;
        if(rawReq) {
            sql =sql+ ' where';
        }
        if(rawReq.title) {
            sql=sql+` c.Title='${escape(rawReq.title)}' and`;
        }
        if(rawReq.name) {
            sql=sql+` c.Name='${escape(rawReq.name)}' and`;
        }
        if(rawReq.birthDate){
            sql=sql+` c.BirthDate='${escape(rawReq.birthDate)}' and`;
        }
        //console.log(rawReq.isFavorite);
        if(rawReq.isFavorite !=undefined || rawReq.isFavorite!='' || rawReq.isFavorite!=null) {
            sql=sql+` c.IsFavorite =${escape(rawReq.isFavorite)}`;
        }
        // remove the  last 'and'
        if(sql.lastIndexOf('and')==(sql.length-3)) {
            sql = sql.substring(0,sql.lastIndexOf('and'));
        }
        sql =sql+' group by cd.UserId'
        if(rawReq.orderBy) {
            sql=sql+ ` order by ${rawReq.orderBy} ${rawReq.descORAsc ? rawReq.descORAsc :' desc'}`
        }
        sql =sql +` limit 1000`;
        //console.log(sql);
        logger.info(`api from ${sql} queryAllContacts sql ${sql}`);
        DBHelper.query(sql,{},(result:any,fields:FieldInfo[])=>{
           //console.log(JSON.stringify(result.result));
           resp.setHeader("Access-Control-Allow-Origin", "*");
           resp.setHeader('Content-Type','applicaiton/json');
           resp.json(result.result);
           resp.end();
           // DBHelper.closeDB();
       });
   }
  
   queryContactsByUserLike(req:Request,resp:Response):void {
      let sql=`select  c.UserId,  c.Title, Name, date(c.BirthDate) as BirthDate ,  floor(datediff(now(),date(c.BirthDate)) /365) as Age ,c.IsFavorite ,
      count(cd.UserID) as ContactCount
      from Expedia.Contact c 
      inner join Expedia.ContactDetail  cd on c.UserId =cd.UserId`;
      if(req.params.name && req.params.name!='null') {
          sql =sql +` where c.Name like '%${req.params.name}%'`;
      }
      sql =sql +` group by cd.UserId`;
      if(req.params.orderBy) {
       sql =sql +` order by ${req.params.orderBy} ${req.params.descORAsc? req.params.descORAsc : ' desc'}`;
      }
      sql =sql +` limit 1000`;
      //console.log(sql);
      logger.info(`api from: ${req.originalUrl} queryContactsByUserLike sql ${sql}`);
      DBHelper.query(sql,[],(result:any,fields:FieldInfo[])=>{
           resp.json(result.result);
           resp.end();
      });
     
  }
  queryContactsByUserId (req:Request,resp:Response):void {
       let sql =`select c.UserId,  c.Title, Name, date(c.BirthDate) as BirthDate ,  floor(datediff(now(),date(c.BirthDate)) /365) as Age ,c.IsFavorite ,
       count(cd.UserID) as ContactCount
       from Contact c 
       inner join ContactDetail  cd on c.UserId =cd.UserId
       where c.UserId = '${req.params.userId}'
       group by cd.UserId`;
       if(req.params.orderBy) {
           sql =sql +` order by ${req.params.orderBy} ${req.params.descORAsc? req.params.descORAsc : ' desc'}`;
       }
       //console.log(sql);
       logger.info(`api from: ${req.originalUrl},sql: ${sql}`)
       DBHelper.query(sql,[],(result:any,fields:FieldInfo[])=>{
           console.log(JSON.stringify(result.result));
           resp.setHeader("Access-Control-Allow-Origin", "*");
           resp.setHeader('Content-Type','applicaiton/json');
           resp.json(result.result);
           resp.end();
       });
   }
   
   fetchContactTotals(req:Request,resp:Response):void {
       let sql =`select  count(UserId)  as TotalCount from Expedia.Contact`;
       console.log(req.params);
       if(req.params.userName &&(req.params.userName!='undefined' && req.params.userName!='' && req.params.userName!='null')) {
           sql = sql+` where Name like '%${req.params.userName}%'`;
       }
       //console.log(sql);
       logger.info(`api from:${req.originalUrl}, sql:${sql}`);
       DBHelper.query(sql,[req.params.userName],(result:any,fields:FieldInfo)=>{
           console.log(JSON.stringify(result.result[0]));
           resp.setHeader("Access-Control-Allow-Origin", "*");
           resp.setHeader('Content-Type','applicaiton/json');
           resp.json(result.result);
           resp.end();
       });
   }
    queryContactDetailByUserId (req:Request,resp:Response):void{
       let sql=`select * from ContactDetail where UserId='${req.params.userId}'`;
       logger.info(`api from:${req.originalUrl},sql:${sql}`);
       DBHelper.query(sql,[],(result:any,fields:FieldInfo)=>{
           console.log(JSON.stringify(result.result));
           resp.setHeader("Access-Control-Allow-Origin", "*");
           resp.setHeader('Content-Type','applicaiton/json');
           resp.json(result.result);
           resp.end();
       });
   }

}

declare function contactCtrl(app:Express): ContactCtrl
export default ContactCtrl