import * as React from "react";
import ContactFetchHelper from "../services/contactFetch";

interface ContactDetailItemProps {
    item: any
}
class ContactDetailItem extends React.Component<ContactDetailItemProps,{}> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (<div className="card border-light card-item">
         <div className="card-header">
           <p>{this.props.item.ContactDetailType}</p>
         </div>
         <div className="card-body">
           <form>
               <div className="form-group">
                 <label htmlFor="contactType" className="form-label">ContactType</label>
                 <input type="text" id="contactType" className="form-control" value={this.props.item.ContactDetailType}/>
               </div>
               <div className="form-group">
                 <label htmlFor="contactContent" className="form-label">ContactContent</label>
                 <input type="text" id="contactContent" className="form-control" value={this.props.item.ContactDetailContent}/>
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
           details_items:[]
        }
    }
    
    componentDidMount() {
        const userId =this.props.match.params.userId;
        ContactFetchHelper.fetchContactDetailByUserId(userId)
        .then((result)=>{
            console.log(JSON.stringify(result));
            this.setState({details_items:result});
        })
        .catch((error)=>{

        });
    }
    render() {
        let itemRows:any[] =[];
        for(let i=0;i<this.state.details_items.length;i++) {
            let item =<div className="col-4">
                    <ContactDetailItem item={this.state.details_items[i]}/>
                </div>
            itemRows.push(item);
        }
        return(
            <div className="row">
              {itemRows}
            </div>
        );
    }
}



