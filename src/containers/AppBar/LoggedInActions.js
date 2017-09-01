import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {authActions} from 'modules/auth';
import Button from 'components/Button';
import { localize } from 'modules/i18n';
import collection from './messages';
import LanguageSelector from 'containers/LanguageSelector';

@withRouter
@localize({
    collections: collection,
    messageIds: {
        logoutButton: 'LoggedInActions.logoutButton'
    }
})
@connect(
    null,
    dispatch => ({
        logout: () => dispatch(authActions.logout())
    })
)
export default class LoggedInActions extends Component {
    
        handleLogout = () => {
            let {history, logout} = this.props;
            logout();
            history.push("/");
        }
    
        render() {
            let {logoutButton} = this.props;
            return (
                <div>
                    <Button onClick={this.handleLogout}>
                        {logoutButton.format()}
                    </Button>
                    <LanguageSelector />
                </div>
            )
        }
    }
