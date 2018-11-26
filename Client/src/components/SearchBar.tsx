/**
 * Search place when people typing
 */

import * as React from "react";
import { debounce ,throttle,Cancelable} from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export interface SearchProps {
    changCallback: React.ChangeEventHandler
}
export default class SearchBar extends React.Component<SearchProps,{}> {
    private emitChangeDebounced: Cancelable
    constructor(props:any) {
        super(props);
        this.handleChange =this.handleChange.bind(this);
        this.emitChangeDebounced = debounce(this.emitChange, 2500);
    }

    componentWillUnmount() {
        this.emitChangeDebounced.cancel();
    }
    handleChange(e:any) {
        this.emitChangeDebounced(e.target.value);
    }
    emitChange(value:any) {
        this.props.changCallback(value);
    }
    render() {
        return (
        <form className="form-inline my-2 my-lg-0">
            <div className="form-group">
                <input type="search" className="form-control mr-sm-2" onChange={this.handleChange} placeholder="Search"/>
                <FontAwesomeIcon icon={faSearch}/>
            </div>
        </form>)
    }
}