/**
 * Error handler
 */

import * as React from "react";

let ErrorPopupHandler =(props:any) => (<div className={props.prop.msg_diss?'msg_diss':''}> 
    <div className={props.prop.erro ?'erroStyle':'noErro'}>
       {props.prop.msg}<span className="msg_close">X</span>
    </div>
    <div className={props.prop.warning?'warningStyle':'noWarning'}>
        {props.prop.msg}<span className="msg_close">X</span>
    </div>
    <div className={props.prop.sucess?'successStyle':'noSuccess'}>
       {props.prop.msg}<span onClick={(e)=>{props.prop.msgCloseCallback(e)}} className="msg_close">X</span>
    </div>
</div>);
export default ErrorPopupHandler;