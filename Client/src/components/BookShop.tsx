/**
 * 
 * List all my tech stack books I am reading now
 */

 import * as React from 'react';

 import BookFetchHelper from "../services/bookFetch";

 interface BookItemProps {
    bookimgSrc: string,
    bookimgAlt: string,
    bookAuthor: string,
    bookDesc: string
    bookTitle: string,
    bookPrice: number
}

 export default class BookStore extends React.Component<any,{}>{
    constructor(props:any) {
        super(props);
        this.state ={
            books:[]
        }
    }
    componentDidMount() {

    }
    render() {
        return(<>BookStore</>);
    }
 }


 /**
  * each item for render
  */
 
 
class BookItem extends React.PureComponent<BookItemProps,{}> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return(<div className="card border-light card-item">
        <img className="card-img-top" src={this.props.bookimgSrc} alt={this.props.bookimgAlt}/>
        <div className="card-body">
          <label htmlFor="bookTitle">Title</label>
          <p>{this.props.bookTitle}</p>
          <label htmlFor="bookAuthor">Author</label>
          <p>{this.props.bookAuthor}</p>
          <label htmlFor="bookPrice">Price</label>
          <p>{this.props.bookPrice}</p>
          <label htmlFor="bookDesc">Desc</label>
          <p>{this.props.bookPrice}</p>
        </div>
       </div>);
    }
}