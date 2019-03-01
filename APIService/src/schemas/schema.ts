import { Schema } from "mongoose";

/**
 * define all schema here
 * contact {
 *   username  名称
 *   shortname 简称（别名）
 *   groupId: 组别
 *   Fox: 传真
 *   registerAddr: 居住地（privacy）
 *   favicon: 头像
 * }
 */
 export =  {
     "contact": {
         id: Schema.Types.ObjectId,
         userId: {type: Schema.Types.ObjectId, ref: 'user'},
         Fox: String,
         phonenum: String,
         registerAddr: String,
         favicon: String
     },
     "user": {
        id: Schema.Types.ObjectId,
        username: String,
        shortname: String,
        pwd: String,
        contactId: {type: Schema.Types.ObjectId ,ref: 'contact'},
        groups: [{type: Schema.Types.ObjectId, ref: 'group'}],
        roomId: {type: Schema.Types.ObjectId, ref: 'room'}
     },
     "group":
     {
         id: Schema.Types.ObjectId,
         groupname: String,
         gshortname: String,
         users: [{type: Schema.Types.ObjectId, ref: 'user'}]
     },
     "room": {
         id: Schema.Types.ObjectId,
         roomname: String,
         people_count: Number,
         max_people: Number,
         min_people: Number,
         accessKey: String,
         users: [{type: Schema.Types.ObjectId, ref:'user'}]
     }
 }