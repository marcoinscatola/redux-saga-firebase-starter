import * as authSagas from './sagas';
import { call, put } from 'redux-saga/effects'
import {
    LOGOUT,
    LOGIN_EMAIL,
    LOGIN_GOOGLE,
    SIGNUP_EMAIL,
    loginSuccess,
    logoutSuccess,
    authFailure
} from './actions';

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
    const successPromise = jest.fn(() => Promise.resolve(userData));
    const failurePromise = jest.fn(() => Promise.reject(error))
    // mock login with a Promise that resolves with the userData
    const history = {push: jest.fn()};

    it('returns a generator', () => {
        expect(authSagas.loginEmailSaga().next).toBeDefined();
    })

    describe('on a successful run (implementation)', () => {
        let firebaseLoginEmail = successPromise;
        let gen = authSagas.loginEmailSaga({firebaseLoginEmail, history}, action);
        it('yields a call to firebaseLoginEmail', () => {
            expect(gen.next().value).toEqual(call(firebaseLoginEmail, action.payload.email, action.payload.password))
        })
        it('yields a dispatch of loginSuccess', () => {
            expect(gen.next(userData).value).toEqual(put(loginSuccess(userData)))
        })
        it('yields a call to history.push', () => {
            expect(gen.next().value).toEqual(call([history, history.push], action.payload.redirect))
        })
        it('terminates', () => {
            expect(gen.next().done).toBe(true);
        })
    })

    describe('on api error (implementation)', () => {
        let firebaseLoginEmail = failurePromise;
        let gen = authSagas.loginEmailSaga({firebaseLoginEmail, history}, action);
        it('yields a call to firebaseLoginEmail', () => {
            expect(gen.next().value).toEqual(call(firebaseLoginEmail, action.payload.email, action.payload.password))
        })
        it('yields a dispatch of authFailure', () => {
            expect(gen.throw(error).value).toEqual(put(authFailure(error)))
        })
        it('terminates', () => {
            expect(gen.next().done).toBe(true);
        })
    })

})

describe('loginGoogleSaga', () => {
    const userData = {name:'test'};
    const error = new Error('test');

    let action = {
        type: LOGIN_GOOGLE,
        payload: {
            redirect: "redirect"
        }
    }
    const successPromise = jest.fn(() => Promise.resolve(userData));
    const failurePromise = jest.fn(() => Promise.reject(error))
    // mock login with a Promise that resolves with the userData
    const history = {push: jest.fn()};

    it('returns a generator', () => {
        expect(authSagas.loginGoogleSaga().next).toBeDefined();
    })

    describe('on a successful run (implementation)', () => {
        let firebaseLoginGoogle = successPromise;
        let gen = authSagas.loginGoogleSaga({firebaseLoginGoogle, history}, action);
        it('yields a call to firebaseLoginGoogle', () => {
            expect(gen.next().value).toEqual(call(firebaseLoginGoogle))
        })
        it('yields a dispatch of loginSuccess', () => {
            expect(gen.next(userData).value).toEqual(put(loginSuccess(userData)))
        })
        it('yields a call to history.push', () => {
            expect(gen.next().value).toEqual(call([history, history.push], action.payload.redirect))
        })
        it('terminates', () => {
            expect(gen.next().done).toBe(true);
        })
    })

    describe('on api error (implementation)', () => {
        let firebaseLoginGoogle = failurePromise;
        let gen = authSagas.loginGoogleSaga({firebaseLoginGoogle, history}, action);
        it('yields a call to firebaseLoginGoogle', () => {
            expect(gen.next().value).toEqual(call(firebaseLoginGoogle))
        })
        it('yields a dispatch of authFailure', () => {
            expect(gen.throw(error).value).toEqual(put(authFailure(error)))
        })
        it('terminates', () => {
            expect(gen.next().done).toBe(true);
        })
    })

})

describe('signupEmailSaga', () => {
    const userData = {name:'test'};
    const error = new Error('test');

    let action = {
        type: SIGNUP_EMAIL,
        payload: {
            email: "email",
            password: "password",
            redirect: "redirect"
        }
    }
    const successPromise = jest.fn(() => Promise.resolve(userData));
    const failurePromise = jest.fn(() => Promise.reject(error))
    const history = {push: jest.fn()};

    it('returns a generator', () => {
        expect(authSagas.signupEmailSaga().next).toBeDefined();
    })

    describe('on a successful run (implementation)', () => {
        let firebaseSignupEmail = successPromise;
        let gen = authSagas.signupEmailSaga({firebaseSignupEmail, history}, action);
        it('yields a call to firebaseSignupEmail', () => {
            expect(gen.next().value).toEqual(call(firebaseSignupEmail, action.payload.email, action.payload.password))
        })
        it('yields a dispatch of loginSuccess', () => {
            expect(gen.next(userData).value).toEqual(put(loginSuccess(userData)))
        })
        it('yields a call to history.push', () => {
            expect(gen.next().value).toEqual(call([history, history.push], action.payload.redirect))
        })
        it('terminates', () => {
            expect(gen.next().done).toBe(true);
        })
    })

    describe('on api error (implementation)', () => {
        let firebaseSignupEmail = failurePromise;
        let gen = authSagas.signupEmailSaga({firebaseSignupEmail, history}, action);
        it('yields a call to firebaseSignupEmail', () => {
            expect(gen.next().value).toEqual(call(firebaseSignupEmail, action.payload.email, action.payload.password))
        })
        it('yields a dispatch of authFailure', () => {
            expect(gen.throw(error).value).toEqual(put(authFailure(error)))
        })
        it('terminates', () => {
            expect(gen.next().done).toBe(true);
        })
    })
})

describe('logoutSaga', () => {
    const userData = {name:'test'};
    const error = new Error('test');
    let action = {type: LOGOUT}
    const successPromise = jest.fn(() => Promise.resolve(userData));
    const failurePromise = jest.fn(() => Promise.reject(error))
    const history = {push: jest.fn()};

    it('returns a generator', () => {
        expect(authSagas.logoutSaga().next).toBeDefined();
    })
    describe('on a successful run (implementation)', () => {
        let firebaseLogout = successPromise;
        let gen = authSagas.logoutSaga({firebaseLogout, history}, action);
        it('yields a call to firebaseLogout', () => {
            expect(gen.next().value).toEqual(call(firebaseLogout))
        })
        it('yields a call to history.push', () => {
            expect(gen.next().value).toEqual(call([history, history.push], '/'))
        })
        it('yields a dispatch of logoutSuccess', () => {
            expect(gen.next(userData).value).toEqual(put(logoutSuccess()))
        })
        it('terminates', () => {
            expect(gen.next().done).toBe(true);
        })
    })

    describe('on api error', () => {
        let firebaseLogout = failurePromise;
        let gen = authSagas.logoutSaga({firebaseLogout, history}, action);
        it('yields a call to firebaseLogout', () => {
            expect(gen.next().value).toEqual(call(firebaseLogout))
        })
        it('yields a dispatch of authFailure', () => {
            expect(gen.throw(error).value).toEqual(put(authFailure(error)))
        })
        it('terminates', () => {
            expect(gen.next().done).toBe(true);
        })
    })
})
