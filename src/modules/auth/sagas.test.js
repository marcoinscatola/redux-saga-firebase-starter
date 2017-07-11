import * as authSagas from './sagas';
import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils';

import {
    LOGOUT,
    LOGIN_EMAIL,
    LOGIN_GOOGLE,
    SIGNUP_EMAIL,
    loginSuccess,
    logoutSuccess,
    authFailure
} from './actions';

jest.mock('api/auth', () =>({
    firebaseLoginEmail: jest.fn(),
    firebaseLoginGoogle: jest.fn(),
    firebaseSignupEmail: jest.fn(),
    firebaseLogout: jest.fn(),
}))

describe('loginEmailSaga', () => {
    const userData = {name:'test'};
    const error = new Error('test');

    let action = {
        type: LOGIN_EMAIL,
        payload: {
            email: "email",
            password: "password",
            redirect: "redirect"
        }
    }
    let actionNoRedirect = {
        type: LOGIN_EMAIL,
        payload: {
            email: "email",
            password: "password"
        }
    }
    const firebaseLoginEmail = jest.fn();
    const setRedirectToStorage = jest.fn();

    let loginEmailSaga = cloneableGenerator(authSagas.loginEmailSaga);
    let gen = loginEmailSaga({
        firebaseLoginEmail,
        setRedirectToStorage
    }, action);
    let genNoRedirect =  loginEmailSaga({
        firebaseLoginEmail,
        setRedirectToStorage
    }, actionNoRedirect);
    it('returns a generator', () => {
        expect(gen.next).toBeDefined();
    })
    it('yields a call to setRedirectToStorage if a redirect is specified', () => {
         expect(gen.next().value).toEqual(call(setRedirectToStorage, action.payload.redirect))
         expect(genNoRedirect.next().value).not.toEqual(call(setRedirectToStorage, action.payload.redirect))
    })
    it('yields a call to firebaseLoginEmail', () => {
        expect(gen.next().value).toEqual(call(firebaseLoginEmail, action.payload.email, action.payload.password))
    })


    it('if successful yields a dispatch of loginSuccess and terminates', () => {
        let successGen = gen.clone();
        expect(successGen.next(userData).value).toEqual(put(loginSuccess(userData)))
        expect(successGen.next().done).toBe(true);
    })


    it('on api error yields a dispatch of authFailure and terminates', () => {
        let failureGen = gen.clone();
        expect(failureGen.throw(error).value).toEqual(put(authFailure(error)))
        expect(failureGen.next().done).toBe(true);
    })

})

describe('loginGoogleSaga', () => {
    const error = new Error('test');

    let action = {
        type: LOGIN_GOOGLE,
        payload: {
            redirect: "redirect"
        }
    }
    let actionNoRedirect = {
        type: LOGIN_GOOGLE,
        payload: {}
    }
    const setRedirectToStorage = jest.fn();
    let firebaseLoginGoogle = jest.fn();
    let loginGoogleSaga = cloneableGenerator(authSagas.loginGoogleSaga)
    let gen = loginGoogleSaga({
        firebaseLoginGoogle,
        setRedirectToStorage
    }, action);
    let genNoRedirect =  loginGoogleSaga({
        firebaseLoginGoogle,
        setRedirectToStorage
    }, actionNoRedirect);

    it('returns a generator', () => {
        expect(gen.next).toBeDefined();
    })
    it('yields a call to setRedirectToStorage if a redirect is specified', () => {
        expect(gen.next().value).toEqual(call(setRedirectToStorage, action.payload.redirect))
        expect(genNoRedirect.next().value).not.toEqual(call(setRedirectToStorage, action.payload.redirect))
    })
    it('yields a call to firebaseLoginGoogle', () => {
        expect(gen.next().value).toEqual(call(firebaseLoginGoogle))
    })

    it('terminates on a successful run', () => {
        let successGen = gen.clone();
        expect(successGen.next().done).toBe(true);
    })

    it('on api error yields a dispatch of authFailure and terminates', () => {
        let failureGen = gen.clone();
        expect(failureGen.throw(error).value).toEqual(put(authFailure(error)))
        expect(failureGen.next().done).toBe(true);
    })


})

describe('signupEmailSaga', () => {
    const error = new Error('test');
    const userData = {name:'test'};

    let action = {
        type: SIGNUP_EMAIL,
        payload: {
            email: "email",
            password: "password",
            redirect: "redirect"
        }
    }
    let actionNoRedirect = {
        type: SIGNUP_EMAIL,
        payload: {
            email: "email",
            password: "password",
        }
    }
    let firebaseSignupEmail = jest.fn();
    const setRedirectToStorage = jest.fn();
    const signupEmailSaga = cloneableGenerator(authSagas.signupEmailSaga)
    let gen = signupEmailSaga({
        firebaseSignupEmail,
        setRedirectToStorage
    }, action);
    let genNoRedirect =  signupEmailSaga({
        firebaseSignupEmail,
        setRedirectToStorage
    }, actionNoRedirect);
    it('returns a generator', () => {
        expect(gen.next).toBeDefined();
    })
    it('yields a call to setRedirectToStorage if a redirect is specified', () => {
        expect(gen.next().value).toEqual(call(setRedirectToStorage, action.payload.redirect))
        expect(genNoRedirect.next().value).not.toEqual(call(setRedirectToStorage, action.payload.redirect))
    })
    it('yields a call to firebaseSignupEmail', () => {
        expect(gen.next().value).toEqual(call(firebaseSignupEmail, action.payload.email, action.payload.password))
    })

    it('if successful yields a dispatch of loginSuccess and terminates', () => {
        let successGen = gen.clone();
        expect(successGen.next(userData).value).toEqual(put(loginSuccess(userData)))
        expect(successGen.next().done).toBe(true);
    })


    it('on api error yields a dispatch of authFailure and terminates', () => {
        let failureGen = gen.clone();
        expect(failureGen.throw(error).value).toEqual(put(authFailure(error)))
        expect(failureGen.next().done).toBe(true);
    })
})

describe('logoutSaga', () => {
    const userData = {name:'test'};
    const error = new Error('test');
    let action = {type: LOGOUT}

    const history = {push: jest.fn()};
    let firebaseLogout = jest.fn();
    const logoutSaga = cloneableGenerator(authSagas.logoutSaga)
    let successGen, failureGen;
    let gen = logoutSaga({
        firebaseLogout,
        history
    }, action);

    it('returns a generator', () => {
        expect(gen.next).toBeDefined();
    })

    it('yields a call to firebaseLogout', () => {
        expect(gen.next().value).toEqual(call(firebaseLogout))
    })
    describe('on a successful run', () => {
        it('yields a call to history.push', () => {
            successGen = gen.clone();
            expect(successGen.next().value).toEqual(call([history, history.push], '/'))
        })
        it('yields a dispatch of logoutSuccess', () => {
            expect(successGen.next(userData).value).toEqual(put(logoutSuccess()))
        })
        it('terminates', () => {
            expect(successGen.next().done).toBe(true);
        })
    })

    describe('on api error', () => {
        it('yields a dispatch of authFailure', () => {
            failureGen = gen.clone();
            expect(failureGen.throw(error).value).toEqual(put(authFailure(error)))
        })
        it('terminates', () => {
            expect(failureGen.next().done).toBe(true);
        })
    })
})

describe('loginSuccessSaga', () => {
    const getRedirectFromStorage = jest.fn();
    const removeRedirectFromStorage = jest.fn();
    const history = {push: jest.fn()};
    const loginSuccessSaga = cloneableGenerator(authSagas.loginSuccessSaga)
    let gen = loginSuccessSaga({
        getRedirectFromStorage,
        removeRedirectFromStorage,
        history
    })
    let redirectClone, noRedirectClone;
    it('returns a generator', () => {
        expect(gen.next).toBeDefined();
    })
    it('yields a call to getRedirectFromStorage', () => {
        expect(gen.next().value).toEqual(call(getRedirectFromStorage))
    })
    it ('terminates if no redirect was found in storage', () => {
        noRedirectClone = gen.clone();
        expect(noRedirectClone.next().done).toBe(true)
    })
    it ('yields a call to history.push with the redirect value', () => {
        redirectClone = gen.clone();
        expect(redirectClone.next('redirect').value).toEqual(call([history, history.push], 'redirect'))
    })
    it ('yields a call to removeRedirectFromStorage and terminates', () => {
        expect(redirectClone.next().value).toEqual(call(removeRedirectFromStorage))
        expect(redirectClone.next().done).toBe(true);
    })

})
