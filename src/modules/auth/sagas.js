import { call, put, takeLatest } from 'redux-saga/effects'
import {
    LOGOUT,
    LOGIN_EMAIL,
    LOGIN_GOOGLE,
    SIGNUP_EMAIL,
    LOGIN_SUCCESS,
    loginSuccess,
    logoutSuccess,
    authFailure
} from './actions';
import {history} from 'routing';
import {
    firebaseLoginEmail,
    firebaseLoginGoogle,
    firebaseSignupEmail,
    firebaseLogout,
} from 'api/auth';

/**
 * Helper used to store the redirect in session storage. On a login success the
 * app will attempt to load the redirect path from the storage and push it to
 * history. This will work for both in-app auth flows and for auth flows that
 * take the user to a different page to authenticate (most oauth providers)
 * @param  {string}  redirect The path to redirect after a successful login
 */
function setRedirectToStorage(redirect) {
    sessionStorage.setItem('authSuccessRedirect', redirect)
}

/**
 * Helper used to get the redirect from session storage. On a login success the
 * app will attempt to load the redirect path from the storage and push it to
 * history. This will work for both in-app auth flows and for auth flows that
 * take the user to a different page to authenticate (most oauth providers)
 * @return {string}  The path to redirect after a successful login
 */
function getRedirectFromStorage() {
    return sessionStorage.getItem('authSuccessRedirect')
}

/**
 * Helper used to get the clear redirect from session storage.
 */
function removeRedirectFromStorage() {
    sessionStorage.removeItem('authSuccessRedirect')
}

/**
 * This process runs when the saga takes a loginEmail action. It will call the
 * firebaseLoginEmail api.
 * If successful it dispatches a loginSuccess action with the resulting data.
 * Caught errors will be dispatched in an authFailure action.
 * If a redirect is specified it will be set to session storage for use in the
 * login success saga
 * @param {object}   libs   Dependencies injected by the watcher
 * @param  {object}  action The loginEmail action containing the email, password
 *                          and redirect
 * @return Generator
 */
export function* loginEmailSaga(libs, action) {
    const {email, password, redirect} = action.payload;
    const {firebaseLoginEmail, setRedirectToStorage} = libs;
    try {
        if (redirect)
            yield call(setRedirectToStorage, redirect)
        const userData = yield call(firebaseLoginEmail, email, password)
        yield put(loginSuccess(userData))
    }
    catch (err) {
        yield put(authFailure(err))
    }
}

/**
 * This process runs when the saga takes a loginGoogle action. It will call the
 * firebaseLoginGoogle api.
 * The user will be redirected to another page to login with their google credentials
 * and will be redirected to the app when successful. The app will then dispatch a
 * a login success action before rendering the main component.
 * If a redirect is specified it will be set to session storage for use in the
 * login success saga
 * @param  {object}  libs   Dependencies injected by the watcher
 * @param  {object}  action The loginGoogle action containing the redirect
 * @return Generator
 */
export function* loginGoogleSaga(libs, action) {
    const {redirect} = action.payload;
    const {firebaseLoginGoogle, setRedirectToStorage} = libs;
    try {
        if (redirect)
            yield call(setRedirectToStorage, redirect)
        yield call(firebaseLoginGoogle)
    }
    catch (err) {
        yield put(authFailure(err))
    }
}

/**
 * This process runs when the saga takes a signupEmail action. It will call the
 * firebaseSignupEmail api.
 * If successful it dispatches a loginSuccess action with the resulting data.
 * Caught errors will be dispatched in an authFailure action.
 * If a redirect is specified it will be set to session storage for use in the
 * login success saga
 * @param  {object}  libs   Dependencies injected by the watcher
 * @param  {object}  action The signupEmail action containing the email, password
 *                          and redirect
 * @return Generator
 */
export function* signupEmailSaga(libs, action) {
    const {email, password, redirect} = action.payload;
    const {firebaseSignupEmail, setRedirectToStorage} = libs;
    try {
        if (redirect)
            yield call(setRedirectToStorage, redirect)
        const userData = yield call(firebaseSignupEmail, email, password)
        yield put(loginSuccess(userData))
    }
    catch (err) {
        yield put(authFailure(err))
    }
}

/**
 * This process runs when the saga takes a logout action. It will call the
 * firebaseLogout api.
 * If successful it dispatches a logoutSuccess action.
 * Caught errors will be dispatched in an authFailure action.
 * If successful it will also call history.push to redirect to / .
 * @param  {object}  libs   Dependencies injected by the watcher
 * @param  {object}  action The loginEmail action containing the email, password
 *                          and redirect
 * @return Generator
 */
export function* logoutSaga(libs, action) {
    const {firebaseLogout, history} = libs;
    try {
        yield call(firebaseLogout)
        yield call([history, history.push],'/')
        yield put(logoutSuccess())
    }
    catch (err) {
        yield put(authFailure(err))
    }
}

/**
 * This process runs when the saga takes a logout action. It will handle the
 * redirect after the login (since we're not integrated with react-router-redux
 * it's technically a side-effect).
 * @param  {object}  libs   Dependencies injected by the watcher
 * @return Generator
 */
export function* loginSuccessSaga(libs) {
    const {
        getRedirectFromStorage,
        removeRedirectFromStorage,
        history
    } = libs;

    let redirect = yield call (getRedirectFromStorage);
    if (redirect) {
        yield call([history, history.push], redirect)
        yield call(removeRedirectFromStorage)
    }
}

/**
 * Returns the root saga, created by injecting the dependencies and passing
 * them down to the sub sagas. Injecting the dependencies makes it easier
 * to unit test the sagas without mocking every module globally.
 * The root saga watches for LOGOUT, SIGNUP_EMAIL, LOGIN_GOOGLE, LOGIN_EMAIL,
 * LOGIN_SUCCESS actions and forks the corresponding saga.
 * @param {object} libs An object containing the dependencies needed by the
 *                      sub sagas
 * @return function*
 */
export function getRootSaga(libs) {
    return function* () {
        yield takeLatest(LOGOUT, logoutSaga, libs);
        yield takeLatest(SIGNUP_EMAIL, signupEmailSaga, libs);
        yield takeLatest(LOGIN_GOOGLE, loginGoogleSaga, libs);
        yield takeLatest(LOGIN_EMAIL, loginEmailSaga, libs);
        yield takeLatest(LOGIN_SUCCESS, loginSuccessSaga, libs);
    }
}

/**
 * Combine all the watchers in a single generator and export it for use
 * in the saga middleware. Inject firebaseLoginEmail, firebaseSignupEmail
 * and firebaseLogout for use in the sub sagas.
 */
export default getRootSaga({
    firebaseSignupEmail,
    firebaseLoginEmail,
    firebaseLoginGoogle,
    firebaseLogout,
    history,
    getRedirectFromStorage,
    removeRedirectFromStorage,
    setRedirectToStorage
})
