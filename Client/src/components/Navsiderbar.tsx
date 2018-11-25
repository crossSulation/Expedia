import * as React from "react";
import { Link,NavLink } from "react-router-dom";

export default class NavsiderBar extends React.Component<{},{}> {
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return(
            <ul className="list-group bg-light">
                <li  className="list-group-item sidbar_item"><NavLink to={'/'}>Expedia</NavLink></li>
                <li  className="list-group-item sidbar_item"><NavLink to={'/thingsToDo'}>ThingsToDo</NavLink></li>
                <li  className="list-group-item sidbar_item"><NavLink to={'/Spark'}>Spark</NavLink></li>
            </ul>
        );
    }
}