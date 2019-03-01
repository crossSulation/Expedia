import { Schema } from "mongoose";

export interface Contact {
    id: Schema.Types.ObjectId,
    user: User,
    Fox:String,
    phoneNum:String,
    registerAddr: String,
    Favicon:String
}

export interface User {
    id:Schema.Types.ObjectId,
    userName:String,
    shortName:String,
    pwd: String,
    contact: Contact,
    Groups: Array<Group>
    room: Room
}

export interface Group {
    id: Schema.Types.ObjectId,
    groupName:String,
    gshortName:String,
    users: Array<User>
}

export interface Room {
  id:Schema.Types.ObjectId,
  roomName:String,
  people_count: Number,
  max_count: Number,
  min_count: Number,
  accessKey: String,
  users: Array<User>
}
