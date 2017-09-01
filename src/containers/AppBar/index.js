import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppBarLayout from 'components/AppBar';
import Logo from 'components/Logo';
import LoginActions from './LoginActions';
import LoggedInActions from './LoggedInActions';
import {authSelectors} from 'modules/auth';
import {withRouter} from 'react-router-dom';

@withRouter
@connect(
    state => ({
        loggedIn: authSelectors.loggedIn(state)
    })
)
export default class AppBar extends Component {
    render() {
        let {loggedIn, location} = this.props;
        const logo = <Logo />
        const actions = loggedIn && location.pathname !== "/" ? <LoggedInActions /> : <LoginActions />
        return (
            <AppBarLayout
                logo={logo}
                actions={actions}
            />
        )
    }
}


