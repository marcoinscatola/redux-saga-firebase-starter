import * as authApi from './auth';
import {firebaseAuth, firebaseApp} from './firebase'

jest.mock('./firebase', () => ({
    firebaseApp: {
        auth: {
            GoogleAuthProvider: jest.fn()
        }
    },
    firebaseAuth: {
        __EXISTING_EMAIL: 'testemail',
        __EXISTING_PW: 'testpw',
        __EXISTING_USER: {name: 'testuser'},
        __NEW_USER: {name: 'newuser'},
        __ERROR: {code: 0, message: 'testError'},
        __onAuthCb: [],
        __onAuthErrCb: [],
        __failNext: false,
        currentUser: null,
        __resetLocalState: function() {
            this.currentUser = null;
            this.__onAuthCb = [];
            this.__onAuthErrCb = [];
        },
        __setCurrentUser: function(user) {
            this.currentUser = user;
            this.__onAuthCb.forEach(cb => cb(this.currentUser))
        },
        __mockAuthErr: function() {
            this.__onAuthErrCb.forEach(cb => cb(this.__ERROR))
        },
        signInWithRedirect: jest.fn(),
        signInWithEmailAndPassword: jest.fn(function(email, password) {
            if(password === this.__EXISTING_PW && email === this.__EXISTING_EMAIL) {
                this.currentUser = this.__EXISTING_USER;
                return Promise.resolve(this.currentUser)
            } else {
                return Promise.reject(this.__ERROR)
            }
        }),
        onAuthStateChanged: jest.fn(function(callback, errCallback) {
            this.__onAuthCb = [...this.__onAuthCb, callback];
            this.__onAuthErrCb = [...this.__onAuthErrCb, errCallback];
            return jest.fn(() => {
                this.__onAuthCb = this.__onAuthCb.filter(cb => cb !== callback);
                this.__onAuthErrCb = this.__onAuthErrCb.filter(cb => cb !== errCallback);
            })
        }),
        createUserWithEmailAndPassword: jest.fn(function(email, password) {
            if(email !== this.__EXISTING_EMAIL) {
                this.currentUser = this.__NEW_USER
                return Promise.resolve(this.currentUser)
            } else {
                return Promise.reject(this.__ERROR)
            }
        }),
        signOut: jest.fn(function(){
            if (!this.__failNext) {
                this.currentUser = null
                return Promise.resolve()
            }
            else {
                this.__failNext = false;
                return Promise.reject(this.__ERROR);
            }
        })
    }
}))


beforeEach(() => {
    jest.clearAllMocks();
    firebaseAuth.__resetLocalState();
})

test('getFirebaseCurrentUser returns the current user', () => {
    firebaseAuth.__setCurrentUser('testuser');
    let user = authApi.getFirebaseCurrentUser();
    expect(user).toEqual('testuser');
})
describe('firebaseSignupEmail', () => {
    it('calls firebase.auth().createUserWithEmailAndPassword', () => {
        expect.assertions(2);
        authApi.firebaseSignupEmail('newemail','newpassword')
        .catch(err => err); // catch the rejection, doesn't matter for this test
        expect(firebaseAuth.createUserWithEmailAndPassword.mock.calls.length).toBe(1);
        expect(firebaseAuth.createUserWithEmailAndPassword.mock.calls[0]).toEqual(['newemail', 'newpassword']);
    })

    it('sets and resolves the current user on a successful signup', () => {
        const {__NEW_USER} = firebaseAuth;
        expect.assertions(2);
        return authApi.firebaseSignupEmail('newemail','newpassword')
        .then(res => {
            expect(res).toEqual(__NEW_USER);
            expect(authApi.getFirebaseCurrentUser()).toEqual(__NEW_USER)
        })
    })

    it('rejects on an unsuccessful signup', () => {
        const {__EXISTING_EMAIL, __ERROR} = firebaseAuth;
        expect.assertions(1);
        return authApi.firebaseSignupEmail(__EXISTING_EMAIL, 'newpassword')
        .catch(err => {
            expect(err).toEqual(`${__ERROR.code} - ${__ERROR.message}`);
        })
    })
})

describe('firebaseLoginEmail', () => {
    it('calls firebase.auth().signInWithEmailAndPassword', () => {
        authApi.firebaseLoginEmail('email','password')
        .catch(err => err) //catch the rejection, it doesn't matter for this test
        expect(firebaseAuth.signInWithEmailAndPassword.mock.calls.length).toBe(1);
        expect(firebaseAuth.signInWithEmailAndPassword.mock.calls[0]).toEqual(['email', 'password']);
    })

    it('sets and resolves the current user on a successful login', () => {
        const {__EXISTING_USER, __EXISTING_EMAIL, __EXISTING_PW} = firebaseAuth;
        expect.assertions(2);
        return authApi.firebaseLoginEmail(__EXISTING_EMAIL, __EXISTING_PW)
        .then(res => {
            expect(res).toEqual(__EXISTING_USER);
            expect(authApi.getFirebaseCurrentUser()).toEqual(__EXISTING_USER)
        })
    })

    it('rejects on an unsuccessful login', () => {
        const {__EXISTING_EMAIL, __ERROR} = firebaseAuth;
        expect.assertions(1);
        return authApi.firebaseLoginEmail(__EXISTING_EMAIL, 'wrongpassword')
        .catch(err => {
            expect(err).toEqual(`${__ERROR.code} - ${__ERROR.message}`);
        })
    })
})

describe('firebaseLoginGoogle', () => {
    it('calls firebase.auth().signInWithPopup', () => {
        authApi.firebaseLoginGoogle()
        .catch(err => err) //catch the rejection, it doesn't matter for this test
        expect(firebaseAuth.signInWithRedirect.mock.calls.length).toBe(1);
        expect(firebaseAuth.signInWithRedirect.mock.calls[0][0]).toBeInstanceOf(firebaseApp.auth.GoogleAuthProvider);
    })
})


describe('firebaseLogout', () => {
    it('calls firebase.auth().signOut', () => {
        authApi.firebaseLogout()
        .catch(err => err) //catch the rejection, it doesn't matter for this test
        expect(firebaseAuth.signOut.mock.calls.length).toBe(1);
    })
    it('resolves after the current user is set to null', () => {
        firebaseAuth.__setCurrentUser("notNull");
        expect.assertions(1);
        return authApi.firebaseLogout()
        .then(res => expect(firebaseAuth.currentUser).toEqual(null))
    })
    it('rejects if an error occurs while logging out', () => {
        const {__ERROR} = firebaseAuth;
        firebaseAuth.__failNext = true;
        expect.assertions(1);
        return authApi.firebaseLogout()
        .catch(err => {
            expect(err).toEqual(`${__ERROR.code} - ${__ERROR.message}`);
        })
    })
})

describe('checkAuthState', () => {
    it('calls firebase.onAuthStateChanged', () => {
        authApi.checkAuthState()
        .catch(err => err) //catch the rejection, it doesn't matter for this test
        expect(firebaseAuth.onAuthStateChanged.mock.calls.length).toBe(1);
        expect(firebaseAuth.onAuthStateChanged.mock.calls[0].length).toBe(2);
    })
    it('resolves on user login', () => {
        const user = {name:'user'};
        expect.assertions(2);
        let promise = authApi.checkAuthState();
        firebaseAuth.__setCurrentUser(user);
        return promise.then(res => {
            expect(firebaseAuth.currentUser).toEqual(user);
            expect(res).toEqual(user);
        })
        .catch(err => err);
    })
    it('unsubscribe after resolve', () => {
        const user = {name:'user'};
        expect.assertions(1);
        let promise = authApi.checkAuthState();
        firebaseAuth.__setCurrentUser(user);
        promise.then(() => {
            expect(firebaseAuth.__onAuthCb.length).toBe(0);
        })
        .catch(err => err)
    })
    it('resolves on user logout', () => {
        expect.assertions(2);
        let promise = authApi.checkAuthState();
        firebaseAuth.__setCurrentUser(null)
        return promise.then(res => {
            expect(firebaseAuth.currentUser).toEqual(null);
            expect(res).toEqual(null);
        })
    })
    it('rejects on auth error', () => {
        const {__ERROR} = firebaseAuth;
        expect.assertions(1);
        let promise = authApi.checkAuthState();
        firebaseAuth.__mockAuthErr();
        return promise.catch(err => {
            expect(err).toEqual(`${__ERROR.code} - ${__ERROR.message}`)
        })
    })
})
