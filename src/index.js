import 'index.css';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { configureStore } from 'store';
import { Router, Route, Switch } from 'react-router-dom'
import { history, AuthorizedRoute, UnauthorizedRoute } from 'routing';
import { authMethods } from 'modules/auth';

// route components
import App from 'containers/App';
import {Login, Signup} from 'containers/Auth';
import Dashboard from 'containers/Dashboard';
import Home from 'containers/Home';

const store = configureStore();

const render = () => ReactDOM.render(
    (
        <Provider store={store}>
            <Router history={history}>
                <App>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <UnauthorizedRoute path="/login" component={Login} />
                        <UnauthorizedRoute path="/signup" component={Signup} />
                        <AuthorizedRoute path="/dashboard" component={Dashboard} />
                    </Switch>
                </App>
            </Router>
        </Provider>
    ),
    document.getElementById('root')
);

// Dispatch auth state (i.e. check firebase auth state) before rendering.
// If a user refreshes the browser while on an AuthorizedRoute they'll be already
// logged in and the route will render without redirects
authMethods.dispatchAuthState(store.dispatch)
.then(render)
