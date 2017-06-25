import authReducer from './reducer';
import * as authActions from './actions';

describe('Auth reducer', () => {
    test('returns initial state', () => {
        expect(authReducer(undefined,{type:'@@INIT'})).toEqual({
            loggedIn: false,
            user: null
        })
    })

    test('handles login action', () => {
        let state = authReducer(undefined,{type:'@@INIT'});
        state = authReducer(state, authActions.loginSuccess({id:'1'}))
        expect(state).toEqual({
            loggedIn: true,
            user: {
                id: '1'
            }
        })
    })

    test('handles logout action', () => {
        let state = {loggedIn: true, user: {id:'1'}};
        state = authReducer(state, authActions.logoutSuccess())
        expect(state).toEqual({
            loggedIn: false,
            user: null
        })
    })

})
