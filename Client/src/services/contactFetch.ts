/**
 * consumer for contact resources
 */
 import Axios from "axios";
 import _appConfig from "../configs/appconfig";
import { resolve } from "url";
 export interface ContactModel {
     UserId:number,
     Title:string,
     Name:string,
     BirthDate:Date,
     Age: number,
     IsFavorite: boolean,
     ContactCount: number
 }

 export interface ContactDetailModel {
     UserId:number,
     ContactDetailType: number,
     ContactDetailContent: string
 }
      
      /**
       * 
       * @param query 查询条件
       */
    let  fetchAllContact =(query ?:ContactModel):Promise<ContactModel[]> =>{
         const promise = new Promise((resolve,reject)=>{
             Axios.post(_appConfig.api.contactFetchAllUrl,{
                 data: query,
                 headers:{
                    'Content-Type':'application/json'
                }
             })
             .then((result)=>{
                resolve(result.data);
             })
             .catch((error)=>{
                reject(error);
             });
         });
         return promise;
      }
     
    let  fetchContactByUserName =(userName:string):Promise<ContactModel[]> =>{
           console.log('promise....');
           const promise = new Promise((resolve,reject)=>{
               console.log(`url ${_appConfig.api.contactFecthByUserName.replace('{userName}',userName)}`);
               Axios.get(_appConfig.api.contactFecthByUserName.replace('{userName}',userName),{
                   headers:{
                       'Content-Type':'application/json'
                   }
               })
               .then((result)=>{
                   resolve(result.data);
               })
               .catch((error)=>{
                   reject(error);
               })
           });
           return promise;
      }
      /**
       * 
       * @param userId 根据Id 返回一条
       */
    let  fethContactByUserId =(userId:string):Promise<ContactModel>=> {
          const promise =new Promise((resolve,reject)=>{
             Axios.get(_appConfig.api.contactFetchByUserIdUrl.replace('{userId}',userId),{
                 headers:{
                    'Content-Type':'application/json'
                }
             })
             .then((result)=>{
                 resolve(result.data);
             })
             .catch((error)=>{
                 reject(error);
             });
          });
          return promise;
      }

     let fetchContactDetailByUserId =(userId:string):Promise<ContactDetailModel[]> =>{
          const promise =new Promise((resolve,reject)=>{
             Axios.get(_appConfig.api.contactFecthDetalsUrl.replace('{userId}',userId),{})
             .then((result)=>{
                resolve(result.data);
             })
             .catch((error)=>{
                reject(error);
             })
          });
          return promise;
      }
    
    let fetchContactTotals =(name?:string):Promise<any> => {
        const promise =new Promise((resolve,reject)=>{
            Axios.get(_appConfig.api.contactFetchCount.replace('{userName}',!!name?'':name),{})
            .then((result)=>{
                resolve(result.data);
            })
            .catch((error)=>{
                reject(error);
            })
         });
         return promise;
    }
    let  addNewOne =(model:any):Promise<any> =>{
         return null;
      }

     let delOneContactByUserId =(userId:string):Promise<boolean>=> {
          return null;
      }

     let modifyOneContactByUserId =(userId:string):Promise<ContactModel> => {
          return null;
      }

 export default  {
    fetchAllContact : fetchAllContact,
    fetchContactByUserName : fetchContactByUserName,
    fethContactByUserId : fethContactByUserId,
    fetchContactDetailByUserId: fetchContactDetailByUserId,
    addNewOne : addNewOne,
    delOneContactByUserId: delOneContactByUserId,
    getContactTotalCounts: fetchContactTotals,
    modifyOneContactByUserId : modifyOneContactByUserId
 }