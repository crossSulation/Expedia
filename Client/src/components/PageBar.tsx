import * as React from "react";
import { Link,NavLink } from "react-router-dom";
import ContactFecthHelper from "../services/contactFetch";


interface PageNavProps {
    items: any[],
    totalPageCount: number,
    clickCallback:Function
}
class PageNav extends React.Component<PageNavProps,{}> {
    render() {
        console.log(this.props.items);
        let constItems =this.props.items.length && this.props.items.map((item:any)=>{
            return <li className="page-item" key={item} onClick={(e)=>{this.props.clickCallback(e)}}><NavLink to={'/'} className="page-link">{item}</NavLink></li>
        });
        if(this.props.totalPageCount>15) {
           //add more
           let moreItmes =[
            <li className="page-item" key={'pmore'}><NavLink to={'/'} className="page-link">{'....'}</NavLink></li>,
            <li className="page-item" key={'ptotal'}><NavLink to={'/'} className="page-link">{this.props.totalPageCount}</NavLink></li>
           ];
           constItems =constItems.concat(moreItmes);
        }
        return (constItems);
    }
}
interface PageBarProps {
    pageItemClickCallback: Function, // item click callback
    pNextItemClickCallback: Function, // next click callback
    pPreviouseClickCallback:Function,  // previouse click callback
    searchVal:string  //search name, get the current data
}
export default class PageBar extends React.Component<PageBarProps,{}> {
    constructor(props:any) {
        super(props);
        this.state ={
            defaultPageSize: 10, //
            cTotalPaginCount: 0,
            items: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] // fix to 15 to render
        }
    }
   
    componentWillMount() {
        ContactFecthHelper.getContactTotalCounts(this.props.searchVal)
        .then((result)=> {
            console.log(JSON.stringify(result[0]));
            let totalPageCount =parseInt(result[0].TotalCount) /this.state.defaultPageSize;
            this.setState({cTotalPaginCount: totalPageCount});
        })
        .catch((error)=>{

        });
    }
    componentDidMount() {
        //fetch the records,caculate the counts
    }
    
    render() {
        return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
            <li className="page-item" onClick={(e)=>{this.props.pPreviouseClickCallback(e)}}>
                <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <PageNav items={this.state.items} totalPageCount={this.state.cTotalPaginCount} clickCallback={(e:any)=>{this.props.pageItemClickCallback(e)}}/>
            <li className="page-item" onClick={(e)=>{this.props.pNextItemClickCallback(e)}}>
                <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
            </ul>
      </nav>
      );
    }
}