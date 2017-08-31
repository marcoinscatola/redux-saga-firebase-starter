import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authActions} from 'modules/auth';
import {Link} from 'react-router-dom';
import inject from 'react-jss';
import {FlexBox, FlexItem} from 'components/Flex';
import Input from 'components/Input';
import Button from 'components/Button';
import styles from './styles';
import { localize } from 'modules/i18n';
import collection from './messages';

@localize({
    collections: collection,
    messageIds: {
        emailPlaceholder: 'Login.emailPlaceholder',
        passwordPlaceholder: 'Login.passwordPlaceholder',
        withEmailPassword: 'Login.withEmailPassword',
        or: 'Login.or',
        withGoogle: 'Login.withGoogle',
        signupCTA: 'Login.signupCTA',
        signupLink: 'Login.signupLink'
    }
})
@connect(
    null,
    dispatch => ({
        loginEmail: (user, pw, redirect) => dispatch(authActions.loginEmail(user, pw, redirect)),
        loginGoogle: (redirect) => dispatch(authActions.loginGoogle(redirect))
    })
)
@inject(styles)
export default class Login extends Component {
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
        let {location, loginEmail} = this.props
        let redirect;
        if (location.state && location.state.from) redirect = location.state.from.pathname
        loginEmail(email, password, redirect);
    }
    handleLoginGoogle = () => {
        let {location, loginGoogle} = this.props
        let redirect;
        if (location.state && location.state.from) redirect = location.state.from.pathname
        loginGoogle(redirect);
    }
    render() {
        let { 
            classes, 
            emailPlaceholder, 
            passwordPlaceholder, 
            withEmailPassword, 
            or, 
            withGoogle, 
            signupCTA, 
            signupLink 
        } = this.props;
        let {email, password} = this.state;
        return (
            <FlexBox className={classes.formContainer}>
                <FlexItem fixed className={classes.inputItem}>
                    <Input
                        placeholder={emailPlaceholder.format()}
                        name="email"
                        value={email}
                        onChange={this.handleFormChange}
                    />
                </FlexItem>
                <FlexItem fixed className={classes.inputItem}>
                    <Input
                        type='password'
                        placeholder={passwordPlaceholder.format()}
                        value={password}
                        name="password"
                        onChange={this.handleFormChange}
                    />
                </FlexItem>
                <FlexItem fixed className={classes.buttonItem}>
                    <Button
                        primary
                        className={classes.button}
                        onClick={this.handleLogin}
                    >
                         {withEmailPassword.format()}
                    </Button>
                </FlexItem>
                <FlexItem fixed className={classes.orLabel}>
                    {or.format()}
                </FlexItem>
                <FlexItem fixed className={classes.buttonItem}>
                    <Button
                        className={classes.button}
                        onClick={this.handleLoginGoogle}
                    >
                        {withGoogle.format()}
                    </Button>
                </FlexItem>
                <FlexItem fixed className={classes.smallLabel}>
                    {signupCTA.format()}
                    <Link to='/signup'>
                        {signupLink.format()}
                    </Link>
                </FlexItem>
            </FlexBox>
        )
    }
}
