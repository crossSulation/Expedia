/**
 * Search place when people typing
 */

import * as React from "react";

export interface SearchProps {
    changCallback: React.ChangeEventHandler
}
export default class SearchBar extends React.Component<SearchProps,{}> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
        <form className="form-inline my-2 my-lg-0">
            <div className="form-group">
                <input type="search" className="form-control mr-sm-2" onChange={(e)=>{this.props.changCallback(e)}} placeholder="Search"/>
            </div>
            <button type="submit" className="btn btn-outline-success my-2 my-sm-0">Submit</button>
        </form>)
    }
}