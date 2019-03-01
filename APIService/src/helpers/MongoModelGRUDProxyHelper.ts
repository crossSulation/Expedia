/**
 * Proxy for model GRUD
 */
import mongoose from "mongoose";
import { BulkWriteOpResultObject } from "mongodb";

class MongoModelGRUDProxyHelper {
    private _model: mongoose.Model<mongoose.Document,any>;
    constructor(model: mongoose.Model<mongoose.Document,any>) {
        this._model =model;
    }
    
    throwError() {
        if(!this._model) throw new Error('model is null');
    }
    /**
     * 
     * @param id  the value of _id
     * @param callback 
     */
    findById(id:any,callback:(eror:any,res:mongoose.Document)=>void) {
      this.throwError();
      this._model.findById(id,callback);
    }
    
    /**
     * 
     * @param id the value of _id
     * @param callback 
     */
    findByIdAndDelete(id:any,callback:(eror:any,res:mongoose.Document)=>void) {
        this.throwError();
        this._model.findByIdAndDelete(id,callback);
    }
    
    findByIdAndRemove(id:any,callback:(eror:any,res:mongoose.Document)=>void) {
        this.throwError();
        this._model.findByIdAndRemove(id,callback);
    }

    /**
     * 
     * @param id  _id
     * @param update  fields of need update
     * @param callback 
     */
    findByIdAndUpdate(id:any,update: any,callback:(eror:any,res:mongoose.Document)=>void) {
        this.throwError();
        this._model.findByIdAndUpdate(id,update,callback);
    }

    /**
     * 
     * @param coditions  query conditions
     * @param callback 
     */
    findOne(coditions: any,callback:(eror:any,res:mongoose.Document)=>void) {
        this.throwError();
        this._model.findOne(coditions,callback);
    }

    /**
     * 
     * @param coditions 
     * @param callback 
     */
    findOneAndDelete(coditions:any, callback:(eror:any,res:mongoose.Document)=>void) {
        this.throwError();
        this._model.findOneAndDelete(coditions,callback);
    }

    /**
     * 
     * @param conditions 
     * @param callback 
     */
    findOneAndRemove(conditions:any,callback:(eror:any,res:mongoose.Document)=>void) {
        this.throwError();
        this._model.findOneAndRemove(conditions,callback);
    }

    /**
     * 
     * @param coditions 
     * @param update 
     * @param callback 
     */
    findOneAndUpdate(coditions:any, update:any, callback:(eror:any,res:mongoose.Document)=>void) {
        this.throwError();
        this._model.findOneAndUpdate(coditions,update,callback);
    }

    /**
     * 
     * @param coditions 
     * @param callback 
     */
    findByConditions(coditions:any, callback:(eror:any,res:mongoose.Document[])=>void) {
        this.throwError();
        this._model.find(coditions,callback);
    }

    findByConditionsAndProjection(conditions: any, projection?: any | null,callback?: (err: any, res: mongoose.Document[]) => void): mongoose.DocumentQuery< mongoose.Document[],  mongoose.Document> & {} {
      this.throwError();
      return   this._model.find(conditions,projection,callback);
    }
  
    


    /**
     * 
     * @param writes --operations
     * @param cb --callback functions
     * @description Sends multiple insertOne, updateOne, updateMany, replaceOne, deleteOne, and/or deleteMany operations to the MongoDB server in one command. This is faster than sending multiple independent operations (like) if you use create()) because with bulkWrite() there is only one round trip to MongoDB. Mongoose will perform casting on all operations you provide. This function does not trigger any middleware, not save() nor update(). If you need to trigger save() middleware for every document use create() instead.
     */
     bulkWrite(writes:any[],cb?:(error:any,res:BulkWriteOpResultObject)=>void):Promise<BulkWriteOpResultObject> {
       this.throwError();
      return this._model.bulkWrite(writes,cb);
    }

    count(conditions: any, callback?: (err: any, count: number) => void): mongoose.Query<number> & {} {
       this.throwError();
       return this._model.count(conditions,callback);
    }

    /**
     * Implements $geoSearch functionality for Mongoose
     * @param conditions an object that specifies the match condition (required)
     * @param options for the geoSearch, some (near, maxDistance) are required
     * @param callback optional callback
     */
    geoSearch(conditions: any, options: {
        /** x,y point to search for */
        near: number[];
        /** the maximum distance from the point near that a result can be */
        maxDistance: number;
        /** The maximum number of results to return */
        limit?: number;
        /** return the raw object instead of the Mongoose Model */
        lean?: boolean;
      }, callback?: (err: any, res: mongoose.Document[]) => void): mongoose.DocumentQuery<any[], any> & {} {
        this.throwError();
       return this._model.geoSearch(conditions,options,callback);
      }
     
      

}
