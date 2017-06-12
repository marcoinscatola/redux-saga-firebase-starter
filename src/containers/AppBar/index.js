import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppBarLayout from 'components/AppBar';
import Logo from './Logo';
import LoginActions from './LoginActions';
import LoggedInActions from './LoggedInActions';
import {authSelectors} from 'modules/auth'
class AppBar extends Component {
    render() {
        let {loggedIn} = this.props;
        const logo = <Logo />
        const actions = loggedIn ? <LoggedInActions /> : <LoginActions />
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
export default connect(mapStateToProps)(AppBar);
