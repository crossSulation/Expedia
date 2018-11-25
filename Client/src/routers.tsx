import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout }from "./layout";
import Expedia from "./components/Expedia";
import ThingsToDo from "./components/ThingsToDo";
import Spark from "./components/Spark";
import ContactDetail from "./components/ContactDetail";
export const routes=<Layout>
    <Route exact path='/' component={Expedia}/>
    <Route path='/thingsToDo' component ={ThingsToDo}/>
    <Route path ='/spark' component={ Spark }/>
    <Route path ='/contactDetails/:userId' component={ContactDetail}/>
</Layout>