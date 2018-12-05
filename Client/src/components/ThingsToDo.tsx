import * as React from "react";
import { NavLink, Route } from "react-router-dom";
import BookStore from "./BookShop";
import TechStack from "./TechStack";
export default class ThingsToDo extends React.Component<{},{}> {
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
        <React.Fragment>
        <ul className='nav nav-tabs'>
          <li className="nav-item">
           <NavLink className="nav-link active" to={"/thingsToDo/books"}>Books</NavLink>
          </li>
          <li className="nav-item">
           <NavLink className="nav-link" to={"/thingsToDo/techStack"}>TechStack</NavLink>
          </li>
        </ul>
        <div>
            <Route exact path={'/thingsToDo/books'} component={BookStore}/>
            <Route path={'/thingsToDo/techStack'} component ={TechStack}/>
        </div>
        </React.Fragment>
        );
    }
}