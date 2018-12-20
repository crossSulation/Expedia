import * as React from "react";
import ContactFetchHelper from "../services/contactFetch";
import ErrorPopupHandler from "./ErrorPopupHandler";

interface ContactDetailItemProps {
    item: any
}
class ContactDetailItem extends React.Component<ContactDetailItemProps,any> {
    constructor(props:any) {
        super(props);
        this.state ={
            ContactDetailType : this.props.item.ContactDetailType,
            ContactDetailContent: this.props.item.ContactDetailContent
        }
    }

    render() {
        return (<div className="card border-light card-item">
         <div className="card-header">
           <p>{this.state.ContactDetailType}</p>
         </div>
         <div className="card-body">
           <form>
               <div className="form-group">
                 <label htmlFor="contactType" className="form-label">ContactType</label>
                 <input type="text"  className="form-control" value={this.state.ContactDetailType}  readOnly/>
               </div>
               <div className="form-group">
                 <label htmlFor="contactContent" className="form-label">ContactContent</label>
                 <input type="text"  className="form-control" value={this.state.ContactDetailContent}  readOnly/>
               </div>
           </form>
           <div className="card-item-btn-group">
            <a href="/" className="card-link card-item-btn-group-link">Go Back</a>
            <a href="#" className="btn btn-primary">Sure</a>
           </div>
         </div>
        </div>);
    }
}

/**
 * each row has 3 items
 */
export default class ContactDetail extends React.Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state ={
           details_items:[],
           hasError:false,
           msg:null,
           msg_diss:false
        }
    }
    
    componentDidMount() {
        const userId =this.props.match.params.userId;
        ContactFetchHelper.fetchContactDetailByUserId(userId)
        .then((result)=>{
            //console.log(JSON.stringify(result));
            this.setState({details_items:result});
        })
        .catch((error)=>{
            this.setState({hasError:true,msg:error.message});
        });
    }
    msgCloseCallback(e:any) {
       this.setState({msg_diss:true})
    }
    render() {
        const { details_items } = this.state;
        // console.log(JSON.stringify(details_items));
        return(
            <React.Fragment>
                <ErrorPopupHandler prop={{erro: this.state.hasError,msg:this.state.msg,msgCloseCallback: this.msgCloseCallback.bind(this),msg_diss:this.state.msg_diss}}/>
                <div className="row">
                {/* {itemRows} */}
                 {details_items.map((item:any,index:number) => (
                    <div key={index} className="col-4">
                        <ContactDetailItem  item={item}/>
                    </div>
                ))}
                </div>
           </React.Fragment>
        );
    }
}



