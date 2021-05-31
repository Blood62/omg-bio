import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import HomeView from "../../view/HomeView";
import ErrorView from "../../view/ErrorView";
import LoginView from "../../view/LoginView";
import OneProduct from "../Product/OneProduct";
import LineOfproductView from "../../view/LineOfproductView";
import {createBrowserHistory} from "history";

const customHistory= createBrowserHistory();

class Routes extends Component {
    render() {
        return (
            <Switch history={customHistory}>
                <Route exact path='/' component={HomeView}/>
                <Route  path='/cart' component={LineOfproductView}/>
                <Route  path='/login' component={LoginView}/>
                <Route path="/product/:id" component={OneProduct} />
                <Route component={ErrorView}/>
            </Switch>
        );
    }
}

export default Routes;
