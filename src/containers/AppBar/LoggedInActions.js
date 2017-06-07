import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {authActions} from 'modules/auth';
import flow from 'lodash/flow';
class LoggedInActions extends Component {

    handleLogout = () => {
        let {history, logout} = this.props;
        logout();
        history.push("/");
    }

    render() {
        return (
            <div>
                <button onClick={this.handleLogout}>
                    Log out
                </button>
            </div>
        )
    }
}
const enhance = flow(
    withRouter,
    connect(
        null,
        dispatch => ({
            logout: () => dispatch(authActions.logout())
        })
    )
)
export default enhance(LoggedInActions)
