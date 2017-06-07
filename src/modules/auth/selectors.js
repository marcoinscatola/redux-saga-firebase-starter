/**
 * Selects the loggedIn property from the auth state slice.
 * It will return true if the user is logged in, false otherwise
 * @param {object} state The redux store state
 * @return boolean  The value of auth.loggedIn
 */
export function loggedIn(state) {
    return state.auth.loggedIn;
}

/**
 * Selects the user property from the auth state slice.
 * It will return the user data if the user is logged in, null otherwise
 * @param {object} state The redux store state
 * @return ?object  The value of auth.user
 */
export function user(state) {
    return state.auth.user
}
