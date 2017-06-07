import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authActions} from 'modules/auth';
import {Link} from 'react-router-dom';

class Signup extends Component {
    state = {
        email: "",
        password: ""
    }
    handleFormChange = (e) => {
        let {name, value} = e.target;
        this.setState({[name]:value})
    }
    handleSignup = () => {
        let {email, password} = this.state;
        let {location} = this.props;
        let redirect;
        if (location.state && location.state.from) redirect = location.state.from.pathname
        this.props.signupEmail(email, password, redirect);
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
                    <button onClick={this.handleSignup}>
                        Signup with email/password
                    </button>
                </p>
                <p>
                    <button>
                        Signup with Google
                    </button>
                </p>
                <p>
                    Already have an account? Login <Link to='/login'>here</Link>
                </p>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signupEmail: (user, pw, redirect) => dispatch(authActions.signupEmail(user, pw, redirect))
})
export default connect(
    null,
    mapDispatchToProps
)(Signup);
