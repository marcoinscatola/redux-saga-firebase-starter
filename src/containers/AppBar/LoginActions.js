import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'components/Button';
import { localize } from 'modules/i18n';
import collection from './messages';


@withRouter
@localize({
    collections: collection,
    messageIds: {
        loginButton: 'LoginActions.loginButton',
        signupButton: 'LoginActions.signupButton'
    }
})
@withRouter
export default class LoggedInActions extends Component {

    handleLogin = () => {
        let {history} = this.props;
        history.push("/login");
    }

    handleSignup = () => {
        let {history} = this.props;
        history.push("/signup");
    }

    render() {
        let {loginButton, signupButton} = this.props;
        return (
            <div>
                <Button primary onClick={this.handleLogin}>
                    {loginButton.format()}
                </Button>
                <Button onClick={this.handleSignup}>
                    {signupButton.format()}
                </Button>
            </div>
        )
    }
}

