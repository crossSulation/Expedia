/**
 * chat backend service here
 */
import SocketIO from "socket.io";
import * as Http from "http";
import { Express } from "express";
 class ChatCtrl {
     private _socketIO: SocketIO.Server;
     private _httpServer: Http.Server;
     constructor(app:Express) {
        this._httpServer =new Http.Server(app);
        this._socketIO = SocketIO(this._httpServer);
        app.get('/chat',(req,res,next)=>{
            console.log('....chat....');
            // res.setHeader('Content-Type','text/html');
            res.render('index',{data: {
                contactList : [],
                headerCfgs: {},
                mBoxCfgs: {}
            }});
        });
     }

     connect() {
        if(!this._socketIO) return;
        this._socketIO.on('connect',(socket:SocketIO.Socket)=>{
            console.log(`a user connected!`);
            socket.on('recieveMsg',(msg)=>{
              console.log(`get the message from client`);
            })
        });

     }

     recieveMessage() {

     }

     sendMessage(data:any) {
        if(!this._socketIO) return;
        this._socketIO.send(data);
     }

     /**
      * get all users
      */
     getAllUsers() {
            
     }
 }

 declare function chatCtrl(app:Express): ChatCtrl;

 export default ChatCtrl