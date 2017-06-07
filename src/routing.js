import React from 'react';
import createHistory from 'history/createBrowserHistory'
import {Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import flow from 'lodash/flow';
import {authSelectors} from 'modules/auth';

// Expose the history object that will be used in the router so that we can
// access it in sagas and such.
// Alternative: react-redux-router or custom-made middleware to handle
// route changes through action dipatches.
export const history = createHistory();

/**
 * Create a Component that will either render a Route or redirect to
 * another route if a condition is not met.
 * @param  {function} condition Must resolve to true or false, will receive the
 *                              route props as the only parameter.
 * @param  {string} redirect Path to redirect if the condition fails
 * @return {Component}           Component to be used as route. Can be enhanced
 *                               with react-redux connect() or similar HOC
 */
const makeConditionalRoute = (condition, redirect) => (routeProps) => {
    let {
        render,
        children,
        exact,
        strict,
        component:Component,
        ...otherRouteProps
    } = routeProps
    return (
        <Route exact={exact} strict={strict} render={props => (
            condition(routeProps) ? (
                <Component {...otherRouteProps} {...props}/>
            ) : (
                <Redirect to={{
                    pathname: redirect,
                    state: { from: props.location }
                }}/>
            )
        )}/>
    )
}

let AuthorizedRoute = makeConditionalRoute(props => props.loggedIn, '/login');
let UnauthorizedRoute = makeConditionalRoute(props => !props.loggedIn, '/dashboard');

// connects the conditionalRoutes to the redux store, exposing the loggedIn state
const enhance = flow(
    connect(
        state => ({
            loggedIn: authSelectors.loggedIn(state)
        })
    ),
    // connect the router too, to avoid blocked updates,
    // see https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
    withRouter
)
AuthorizedRoute = enhance(AuthorizedRoute);
UnauthorizedRoute = enhance(UnauthorizedRoute);

export {AuthorizedRoute, UnauthorizedRoute}
