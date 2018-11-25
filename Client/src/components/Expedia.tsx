import * as React from "react";
import ContactFecthHelper,{ContactModel,ContactDetailModel} from "../services/contactFetch";
import SearchBar from "./SearchBar";
import {Link, NavLink } from "react-router-dom";
import PageBar from "./PageBar";
import { Route } from 'react-router-dom';
interface LineProps {
    item:any
}
class Line extends React.Component<LineProps,{}> {
    constructor(props:any) {
        super(props);
    }
    render() {
        console.log(JSON.stringify(this.props));
        return (
            <tr>
                <td scope="row"><Link to={'/contactDetails/{userId}'.replace('{userId}',this.props.item.UserId)}>{this.props.item.UserId}</Link></td>
                <td>{this.props.item.Title}</td>
                <td>{this.props.item.Name}</td>
                <td>{this.props.item.BirthDate}</td>
                <td>{this.props.item.Age}</td>
                <td>{this.props.item.ContactCount}</td>
                <td>{this.props.item.IsFavorite==1?'YES':'NO'}</td>
            </tr>
        );
    }
}

interface cpageItemsProps {
    cpageItems:any[],
}
export class TableBody extends React.Component<cpageItemsProps,{}> {
    constructor(props:any) {
        super(props);
    }
    render() {
        return this.props.cpageItems.map((titem:ContactModel)=>{
            return <Line item={titem}></Line>
         })
    }
}
export interface ExpediaProps {
    items: any[]
}
export interface ExpediaState {
    defaultPageSize: number,
    items: ContactModel[],
    cpageItems: ContactModel[], // current page items //tmpitems
    cindex: number, //current page index
    searchVal:string,
    Name:string
}
export default class Expedia extends React.Component<ExpediaProps,ExpediaState> {
    constructor(props:any) {
        super(props);
        this.state={
            defaultPageSize:10,
            items:[],
            cindex: 1,
            cpageItems:[],
            searchVal:null,
            Name:null
        }
    }
    
    componentWillMount() {
        this.fetchContactsByUserName();
    }
    componentDidMount() {
       console.log('componentDidMount');
      
    }
    componentWillUnmount() {
       
    }
    fetchContactsByUserName(userName?:string):void {
       //fetch the data from backend
       console.log('api fetch....');
       if(!userName && !this.state && this.state.Name) {
           return ;
       }
       ContactFecthHelper.fetchContactByUserName(userName|| this.state && this.state.Name)
       .then((result:ContactModel[])=>{
           console.log('result....');
          console.log('result:'+JSON.stringify(result));
          this.setState({items: result});
          this.paging(1);
       })
       .catch((error)=>{
            console.log(error);
       });
    }
    /**
     * paging here
     * @param cindex current page index
     */
    paging(cindex:number) {
      let totalPage=  this.state.items.length /this.state.defaultPageSize;
       if(cindex<totalPage) {
           this.setState({cpageItems: this.state.items.slice((cindex-1)*this.state.defaultPageSize,cindex*this.state.defaultPageSize-1),cindex: cindex});
           cindex++;
       }else {
           //重新向服务器pull 数据
       }
    }
    getCpageIndex():number {
       return this.state.cindex;
    }
    setCpageIndex(cindex:number) {
        this.setState({cindex:cindex});
    }
    /**
     * bind the callback listener for page item click
     * when item clicked ,rerender the data items
     * @param e 
     */
    pageItemClickCallback(e:any) {
        console.log('item:'+e.target.innerText);
        let tmp =e.target.innerText;
        let cindex =parseInt(tmp);
        console.log('cindex:'+cindex);
        this.paging(cindex);
    }
    pNextItemClickCallback(e:any) {
        let cindex =this.state.cindex;
        this.paging(cindex+1);
    }
    pPreviouseClickCallback(e:any) {
        let cindex =this.state.cindex;
        this.paging(cindex-1);
    }
    buildQuery():string[] {
        return null;
    }
    //connect to the changeEvent of input
    typeFuc(e:any) {
       let val =e.target.value;
       this.setState({Name:val,searchVal:val});
       let cb =this.fetchContactsByUserName.bind(this);
       setTimeout(cb,1000,val);
       //this.fetchContactsByUserName(val);
       console.log(val);
    }
    sortBy(e:any) {
        console.log('sortby:'+JSON.stringify(e.target.innerText));
        let sortField =e.target.innerText;
        //update the items by given sort
        let currentCpageItems = this.state.cpageItems;
        currentCpageItems.sort((a,b)=>{
            if(sortField=='Name') {
                if(a.Name >b.Name) {
                    return 1;
                }else if(a.Name < b.Name){
                    return -1;
                }else {
                    return 0;
                }
            }
            if(sortField=='Title') {
                if(a.Title >b.Title) {
                    return 1;
                }else if(a.Title < b.Title){
                    return -1;
                }else {
                    return 0;
                }
            }
            if(sortField=='BirthDate') {
                if(a.BirthDate >b.BirthDate) {
                    return 1;
                }else if(a.BirthDate < b.BirthDate){
                    return -1;
                }else {
                    return 0;
                }
            }
            if(sortField=='Age') {
                return a.Age-b.Age;
            }
            if(sortField=='ContactCount') {
               return a.ContactCount -b.ContactCount;
            }
        });
        this.setState({cpageItems:currentCpageItems})
    }
    renderItems =()=>{return this.state.cpageItems.map((titem:ContactModel)=>{
        return <Line item={titem}></Line>
     })};
    render() {
        
        return(<div>
            <SearchBar changCallback={this.typeFuc.bind(this)}/>
            <table className="table table-sm table-hover">
                <thead className="thead-light">
                    <tr>
                        <th scope="col" className="table-th">
                        <span onClick={(e)=>{
                            this.sortBy(e);
                        }}>UserId</span>
                        </th>
                        <th scope="col" className="table-th"><span onClick={(e)=>{
                            this.sortBy(e);
                        }}>Title</span>
                        </th>
                        <th scope="col" className="table-th"><span onClick={(e)=>{
                            this.sortBy(e);
                        }}>Name</span>
                        </th>
                        <th scope="col" className="table-th"><span onClick={(e)=>{
                            this.sortBy(e);
                        }}>BirthDate</span></th>
                        <th scope="col" className="table-th"><span onClick={(e)=>{
                            this.sortBy(e);
                        }}>Age</span></th>
                        <th scope="col" className="table-th"><span onClick={(e)=>{
                            this.sortBy(e);
                        }}>ContactCount</span></th>
                        <th scope="col" className="table-th">IsFavorite</th>
                    </tr>
                </thead>
                <tbody>
                 <TableBody cpageItems={this.state.cpageItems}/>
                </tbody>
            </table>
        <PageBar 
            pageItemClickCallback={this.pageItemClickCallback.bind(this)} 
            pNextItemClickCallback={this.pNextItemClickCallback.bind(this)} 
            pPreviouseClickCallback={this.pPreviouseClickCallback.bind(this)}
            searchVal ={this.state.searchVal}
        />
        </div>);
    }
}