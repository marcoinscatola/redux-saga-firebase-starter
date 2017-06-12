import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'components/Button';


class LoggedInActions extends Component {

    handleLogin = () => {
        let {history} = this.props;
        history.push("/login");
    }

    handleSignup = () => {
        let {history} = this.props;
        history.push("/signup");
    }

    render() {
        return (
            <div>
                <Button primary onClick={this.handleLogin}>
                    Login
                </Button>
                <Button onClick={this.handleSignup}>
                    Sign up
                </Button>
            </div>
        )
    }
}

export default withRouter(LoggedInActions)
