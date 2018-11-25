
/**
 * 
 */
import DBHelper from "../helpers/DBHelper";
import { FieldInfo, raw } from "mysql";
import {Request ,Response} from 'express';
    //CURD
   let queryAllContacts =(req:Request,resp:Response):void =>{
         let sql=`select c.UserId,  c.Title, Name, date(c.BirthDate) as BirthDate ,  floor(datediff(now(),date(c.BirthDate)) /365) as Age ,c.IsFavorite ,
         count(cd.UserID) as ContactCount
         from Expedia.Contact c 
         inner join Expedia.ContactDetail  cd on c.UserId =cd.UserId`;
         console.log(JSON.stringify(req.body));
         //build the sql;
         let rawReq = req.body;
         if(rawReq) {
             sql =sql+ ' where';
         }
         if(rawReq.title) {
             sql=sql+` c.Title='${rawReq.title}' and`;
         }
         if(rawReq.name) {
             sql=sql+` c.Name='${rawReq.name}' and`;
         }
         if(rawReq.birthDate){
             sql=sql+` c.BirthDate='${rawReq.birthDate}' and`;
         }
         console.log(rawReq.isFavorite);
         if(rawReq.isFavorite !=undefined || rawReq.isFavorite!='' || rawReq.isFavorite!=null) {
             sql=sql+` c.IsFavorite =${rawReq.isFavorite}`;
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
         console.log(sql);
         DBHelper.query(sql,{},(result:any,fields:FieldInfo[])=>{
            //console.log(JSON.stringify(result.result));
            resp.setHeader("Access-Control-Allow-Origin", "*");
            resp.setHeader('Content-Type','applicaiton/json');
            resp.json(result.result);
            resp.end();
            // DBHelper.closeDB();
        });
    }
   
   let queryContactsByUserLike =(req:Request,resp:Response):void=> {
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
       console.log(sql);
       DBHelper.query(sql,[],(result:any,fields:FieldInfo[])=>{
            resp.json(result.result);
            resp.end();
       });
      
   }
   let queryContactsByUserId =(req:Request,resp:Response):void => {
        let sql =`select c.UserId,  c.Title, Name, date(c.BirthDate) as BirthDate ,  floor(datediff(now(),date(c.BirthDate)) /365) as Age ,c.IsFavorite ,
        count(cd.UserID) as ContactCount
        from Contact c 
        inner join ContactDetail  cd on c.UserId =cd.UserId
        where c.UserId = '${req.params.userId}'
        group by cd.UserId`;
        if(req.params.orderBy) {
            sql =sql +` order by ${req.params.orderBy} ${req.params.descORAsc? req.params.descORAsc : ' desc'}`;
        }
        sql =sql +` limit 1000`;
        console.log(sql);
        DBHelper.query(sql,[],(result:any,fields:FieldInfo[])=>{
            console.log(JSON.stringify(result.result));
            resp.setHeader("Access-Control-Allow-Origin", "*");
            resp.setHeader('Content-Type','applicaiton/json');
            resp.json(result.result);
            resp.end();
        });
    }
    
    let fetchContactTotals=(req:Request,resp:Response):void=> {
        let sql =`select  count(UserId)  as TotalCount from Expedia.Contact`;
        console.log(req.params);
        if(req.params.userName &&(req.params.userName!='undefined' && req.params.userName!='' && req.params.userName!='null')) {
            sql = sql+` where Name like '%${req.params.userName}%'`;
        }
        console.log(sql);
        DBHelper.query(sql,[req.params.userName],(result:any,fields:FieldInfo)=>{
            console.log(JSON.stringify(result.result[0]));
            resp.setHeader("Access-Control-Allow-Origin", "*");
            resp.setHeader('Content-Type','applicaiton/json');
            resp.json(result.result);
            resp.end();
        });
    }
    let queryContactDetailByUserId =(req:Request,resp:Response):void => {
        let sql=`select * from ContactDetail where UserId='${req.params.userId}'`;
        DBHelper.query(sql,[],(result:any,fields:FieldInfo)=>{
            console.log(JSON.stringify(result.result));
            resp.setHeader("Access-Control-Allow-Origin", "*");
            resp.setHeader('Content-Type','applicaiton/json');
            resp.json(result.result);
            resp.end();
        });
    }

 export default {
     getAllContacts: queryAllContacts,
     getContactsByUserId: queryContactsByUserId,
     getContactsByUserLike: queryContactsByUserLike,
     getContactTotalCount: fetchContactTotals,
     getContactDetailByUserId: queryContactDetailByUserId
 }