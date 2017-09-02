import React from 'react';
import {Switch, Route} from 'react-router-dom';

import App from '../modules/app/';
import Dashboard from '../modules/dashboard/';
import Admin from '../modules/admin/';

export default function AppContainer() {
    return (
        <App>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/admin" component={Admin} />
            </Switch>
        </App>
    );
}
