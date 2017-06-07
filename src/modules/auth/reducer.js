import {handleActions} from 'redux-actions'
import * as authActions from './actions';

/**
 * Hold the initial state of the state.auth slice.
 * @prop {boolean} loggedIn True if the user is authenticated, false otherwise
 * @prop {?object} user contains the user data if the user is authenticated
 */
const initialState = {
    loggedIn: false,
    user: null
}

export default handleActions({

    /**
     * Handles the LOGIN_SUCCESS action.
     * Stores the userData and sets the loggedIn value to true.
     */
    [authActions.LOGIN_SUCCESS](state, { payload:user }) {
        return {
            ...state,
            loggedIn: true,
            user: user
        }
    },

    /**
     * Handles the LOGOUT_SUCCESS action.
     * Clears the userData and sets the loggedIn value to false.
     */
    [authActions.LOGOUT_SUCCESS](state) {
        return {
            ...state,
            loggedIn: false,
            user: null
        }
    }
}, initialState)
