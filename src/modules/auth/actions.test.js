import * as authActions from './actions';

test('signupEmail returns an action to attempt a sign up with email and password', () => {
    const email = 'email';
    const password = 'password';
    const redirect = '/redirect';
    expect(authActions.signupEmail(email, password, redirect))
    .toEqual({
        type: authActions.SIGNUP_EMAIL,
        payload: {
            email,
            password,
            redirect
        }
    })
})

test('signupEmail uses /dashboard as a default redirect', () => {
    const email = 'email';
    const password = 'password';
    expect(authActions.signupEmail(email, password))
    .toEqual({
        type: authActions.SIGNUP_EMAIL,
        payload: {
            email,
            password,
            redirect: '/dashboard'
        }
    })
})

test('loginEmail returns an action to attempt a login with email and password', () => {
    const email = 'email';
    const password = 'password';
    const redirect = '/redirect';
    expect(authActions.loginEmail(email, password, redirect))
    .toEqual({
        type: authActions.LOGIN_EMAIL,
        payload: {
            email,
            password,
            redirect
        }
    })
})


test('loginEmail uses /dashboard as a default redirect', () => {
    const email = 'email';
    const password = 'password';
    expect(authActions.loginEmail(email, password))
    .toEqual({
        type: authActions.LOGIN_EMAIL,
        payload: {
            email,
            password,
            redirect: '/dashboard'
        }
    })
})


test('loginGoogle returns an action to attempt a login with google', () => {
    const redirect = '/redirect';
    expect(authActions.loginGoogle(redirect))
    .toEqual({
        type: authActions.LOGIN_GOOGLE,
        payload: {
            redirect
        }
    })
})


test('loginGoogle uses /dashboard as a default redirect', () => {
    expect(authActions.loginGoogle())
    .toEqual({
        type: authActions.LOGIN_GOOGLE,
        payload: {
            redirect: '/dashboard'
        }
    })
})

test('loginSuccess returns an action with the user data', () => {
    const userData = {
        name: 'test',
        uid: 1
    }
    expect(authActions.loginSuccess(userData))
    .toEqual({
        type: authActions.LOGIN_SUCCESS,
        payload: userData
    })
})

test('logout returns an action to attempt a logout', () => {
    expect(authActions.logout())
    .toEqual({
        type: authActions.LOGOUT
    })
})

test('logoutSuccess returns an action confirming the logout succeded', () => {
    expect(authActions.logoutSuccess())
    .toEqual({
        type: authActions.LOGOUT_SUCCESS
    })
})

test('authFailure returns an action with the error data', () => {
    const err = new Error('test')
    expect(authActions.authFailure(err))
    .toEqual({
        type: authActions.AUTH_FAILURE,
        payload: err,
        error: true
    })
})
