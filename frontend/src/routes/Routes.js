import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";

export default function Routes() {
    return (
        <BrowserRouter>
			<Switch>
				<Route path='/' exact component={Login} />
				<Route path='/register' exact component={Register} />
				<Route path='/dashboard' component={Dashboard} />
			</Switch>
        </BrowserRouter>
    );
}