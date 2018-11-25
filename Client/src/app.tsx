import * as React from "react";
import * as ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './css/site.css';
import * as RoutesModule from "./routers"
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";

let routes =RoutesModule.routes;

function renderApp() {
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
    ReactDOM.render(
        <AppContainer>
            <BrowserRouter children={ routes } basename={ baseUrl } />
        </AppContainer>,
        document.getElementById('root')
    );
}

renderApp();

//Use the HRM
if(module.hot) {
    module.hot.accept('./routers', () => {
        routes = require<typeof RoutesModule>('./routers').routes;
        renderApp();
    });
}