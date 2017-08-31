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
        emailPlaceholder: 'Signup.emailPlaceholder',
        passwordPlaceholder: 'Signup.passwordPlaceholder',
        withEmailPassword: 'Signup.withEmailPassword',
        or: 'Signup.or',
        withGoogle: 'Signup.withGoogle',
        loginCTA: 'Signup.loginCTA',
        loginLink: 'Signup.loginLink'
    }
})
@connect(
    null,
    dispatch => ({
        signupEmail: (user, pw, redirect) => dispatch(authActions.signupEmail(user, pw, redirect)),
        loginGoogle: (redirect) => dispatch(authActions.loginGoogle(redirect))
    })
)
@inject(styles)
export default class Signup extends Component {
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
        let { 
            classes, 
            emailPlaceholder, 
            passwordPlaceholder, 
            withEmailPassword, 
            or, 
            withGoogle, 
            loginCTA, 
            loginLink 
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
                    {loginCTA.format()}
                    <Link to='/login'>
                        {loginLink.format()}
                    </Link>
                </FlexItem>
            </FlexBox>
        )
    }
}
