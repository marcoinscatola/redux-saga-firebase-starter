import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authActions} from 'modules/auth';
import {Link} from 'react-router-dom';
import inject from 'react-jss';
import {FlexBox, FlexItem} from 'components/Flex';
import Input from 'components/Input';
import Button from 'components/Button';
import flow from 'lodash/flow';
import styles from './styles';

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
        let {location, signupEmail} = this.props
        let redirect;
        if (location.state && location.state.from) redirect = location.state.from.pathname
        signupEmail(email, password, redirect);
    }
    handleLoginGoogle = () => {
        let {location, loginGoogle} = this.props
        let redirect;
        if (location.state && location.state.from) redirect = location.state.from.pathname
        loginGoogle(redirect);
    }
    render() {
        let {classes} = this.props;
        let {email, password} = this.state;
        return (
            <FlexBox className={classes.formContainer}>
                <FlexItem fixed className={classes.inputItem}>
                    <Input
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={this.handleFormChange}
                    />
                </FlexItem>
                <FlexItem fixed className={classes.inputItem}>
                <Input
                    type='password'
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.handleFormChange}
                />
                </FlexItem>
                <FlexItem fixed className={classes.buttonItem}>
                    <Button
                        primary
                        className={classes.button}
                        onClick={this.handleLogin}
                    >
                        Sign up with email/password
                    </Button>
                </FlexItem>
                <FlexItem fixed className={classes.orLabel}>
                    or
                </FlexItem>
                <FlexItem fixed className={classes.buttonItem}>
                    <Button
                        className={classes.button}
                        onClick={this.handleLoginGoogle}
                    >
                        Sign up with Google
                    </Button>
                </FlexItem>
                <FlexItem fixed className={classes.smallLabel}>
                    Already have an account? Log in <Link to='/login'>here</Link>
                </FlexItem>
            </FlexBox>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signupEmail: (user, pw, redirect) => dispatch(authActions.signupEmail(user, pw, redirect)),
    loginGoogle: (redirect) => dispatch(authActions.loginGoogle(redirect))
})

const enhance = flow(
    connect(
        null,
        mapDispatchToProps
    ),
    inject(styles)
)

export default enhance(Login);
