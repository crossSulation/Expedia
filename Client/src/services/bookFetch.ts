import Axios from "axios";
import _appConfig from "../configs/appconfig";

export interface Book {
    imgSrc: string,
    imgAlt: string,
    author: string,
    title: string,
    price: number,
    desc: string
}

let fetchAllBooks =():Promise<Book[]>=> {
    const promise =new Promise((resolve,reject)=>{
        Axios.get(_appConfig.api.bookFetchAll,{})
        .then((result)=>{
            resolve(result.data);
        })
        .catch((error)=>{
            reject(error);
        });
    });
    return promise;
}


export default {
    getAllBooks: fetchAllBooks
}