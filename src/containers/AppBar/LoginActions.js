import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

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
                <button primary onClick={this.handleLogin}>
                    Login
                </button>
                <button onClick={this.handleSignup}>
                    Sign up
                </button>
            </div>
        )
    }
}

export default withRouter(LoggedInActions)
