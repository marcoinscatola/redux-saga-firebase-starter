import {dispatchAuthState} from './methods';
import {__setCurrentUser} from 'api/auth';
import {loginSuccess} from './actions';

jest.mock('api/auth', () => {
    let __user = null;
    const mock = {
        checkAuthState: function() {
            return Promise.resolve(__user)
        },
        __setCurrentUser: function(user) {
            __user = user
        }
    }
    return mock;
})


describe('dispatchAuthState', () => {
    test('it returns a promise', () => {
        let res = dispatchAuthState()
        .catch(err => err) // catch rejections, they don't matter for this test
        expect(res.then).toBeDefined();
    })
    test('dispatch a loginSuccess action on user login', () => {
        expect.assertions(2);
        let user = {name:'test'};
        __setCurrentUser(user);
        let dispatch = jest.fn();
        let promise = dispatchAuthState(dispatch);
        return promise.then(res => {
            expect(dispatch.mock.calls.length).toBe(1);
            expect(dispatch.mock.calls[0][0]).toEqual(loginSuccess(user));
        })
    })
})
