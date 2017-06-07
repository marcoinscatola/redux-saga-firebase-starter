import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authActions} from 'modules/auth';
import {Link} from 'react-router-dom';

class Login extends Component {
    state = {
        email: "",
        password: ""
    }
    handleFormChange = (e) => {
        let {name, value} = e.target;
        this.setState({[name]:value})
    }
    handleLogin = () => {
        let {email, password} = this.state;
        let {location} = this.props
        let redirect;
        if (location.state && location.state.from) redirect = location.state.from.pathname
        this.props.loginEmail(email, password, redirect);
    }
    render() {
        return (
            <div>
                <p>
                <input
                    placeholder="Email"
                    name="email"
                    onChange={this.handleFormChange}
                /><br/>
                <input
                    type='password'
                    placeholder="Password"
                    name="password"
                    onChange={this.handleFormChange}
                /><br/>
                    <button onClick={this.handleLogin}>
                        Login with email/password
                    </button>
                </p>
                <p>
                    <button>
                        Login with Google
                    </button>
                </p>
                <p>
                    Don't have an account? Sign up <Link to='/signup'>here</Link>
                </p>
            </div>
        )
    }
}
console.log(authActions);
const mapDispatchToProps = dispatch => ({
    loginEmail: (user, pw, redirect) => dispatch(authActions.loginEmail(user, pw, redirect))
})
export default connect(
    null,
    mapDispatchToProps
)(Login);
