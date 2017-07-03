import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppBarLayout from 'components/AppBar';
import Logo from 'components/Logo';
import LoginActions from './LoginActions';
import LoggedInActions from './LoggedInActions';
import {authSelectors} from 'modules/auth';
import {withRouter} from 'react-router-dom';
import flow from 'lodash/flow';

class AppBar extends Component {
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
const mapStateToProps = state => ({
    loggedIn: authSelectors.loggedIn(state)
})

const enhance = flow(
    connect(mapStateToProps),
    withRouter
)

export default enhance(AppBar);
