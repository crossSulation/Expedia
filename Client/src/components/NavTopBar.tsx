import * as React from "react";
import { Link,NavLink } from "react-router-dom";

export default class NavTopBar extends React.Component<{},{}> {
    constructor(props:any) {
        super(props);
    }
    componentDidMount() {
        //fetch the api data here
    }
    render() {
        return(
        <header className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
                <a className="navbar-brand mr-0 mr-md-2" href="/" aria-label="Bootstrap">
                 <h2>Expedia</h2>
                </a>
                <div className="navbar-nav-scroll">
                    <ul className="navbar-nav">
                        <li className="nav-item"><NavLink to={'/notifications'} className="nav-link"><i></i>Notifactions</NavLink></li>
                        <li className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" id="navbarDropdownMenuLink" role="button" aria-haspopup="true" aria-expanded="false">About me <span className="caret"></span></a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#"><i></i>Logout</a>
                        </div>
                    </li>
                   </ul>
                </div>
        </header>);
    }
}