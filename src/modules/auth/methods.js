import {loginSuccess} from './actions';
import {checkAuthState} from 'api/auth'

/**
 * dispatchAuthState should be called at app initialization and will resolve
 * when firebase updates its auth state. If the user is logged in it will
 * resolve and dispatch a loginSuccess action containing the user data.
 * @param  {function} dispatch The store.dispatch method. It will be used to
 *                             dispatch a loginSuccess action if the user is
 *                             logged in.
 * @return Promise
 */
export function dispatchAuthState(dispatch) {
    return checkAuthState()
    .then(user => {
        if (user)
            dispatch(loginSuccess(user))

    })
}
