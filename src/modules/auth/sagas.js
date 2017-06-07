import { call, put, takeLatest, all, fork } from 'redux-saga/effects'
import {
    LOGOUT,
    LOGIN_EMAIL,
    SIGNUP_EMAIL,
    loginSuccess,
    logoutSuccess,
    authFailure
} from './actions';
import {history} from 'routing';
import {
    firebaseLoginEmail,
    firebaseSignupEmail,
    firebaseLogout,
} from 'api/auth';

/**
 * Acts when the saga takes a loginEmail action and calls the firebaseLoginEmail api.
 * If successful it dispatches a loginSuccess action with the resulting data.
 * Caught errors will be dispatched in an authFailure action.
 * If successful it will also call history.push to redirect to /dashboard or to
 * the specified redirect.
 * @param  {object}  action The loginEmail action containing the email, password
 *                          and redirect
 * @return Generator
 */
export function* loginEmailSaga(libs, action) {
    const {email, password, redirect} = action.payload;
    const {firebaseLoginEmail, history} = libs;
    try {
        const userData = yield call(firebaseLoginEmail, email, password)
        yield put(loginSuccess(userData))
        if (redirect)
            yield call([history, history.push],redirect)
    }
    catch (err) {
        yield put(authFailure(err))
    }
}

/**
 * Acts when the saga takes a signupEmail action and calls the firebaseSignupEmail api.
 * If successful it dispatches a loginSuccess action with the resulting data.
 * Caught errors will be dispatched in an authFailure action.
 * If successful it will also call history.push to redirect to /dashboard or to
 * the specified redirect.
 * @param  {object}  action The loginEmail action containing the email, password
 *                          and redirect
 * @return Generator
 */
export function* signupEmailSaga(libs, action) {
    const {email, password, redirect} = action.payload;
    const {firebaseSignupEmail, history} = libs;
    try {
        const userData = yield call(firebaseSignupEmail, email, password)
        yield put(loginSuccess(userData))
        if (redirect)
            yield call([history, history.push],redirect)
    }
    catch (err) {
        yield put(authFailure(err))
    }
}

/**
 * Acts when the saga takes a logout action and calls the firebaseLogout api.
 * If successful it dispatches a logoutSuccess action.
 * Caught errors will be dispatched in an authFailure action.
 * If successful it will also call history.push to redirect to / .
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
 * On every action of type LOGIN_EMAIL spawn a loginEmailSaga. In case of
 * concurrent login attempts the latest one cancels the previous ones.
 * The loginEmailSaga will be started with the required libs as the first
 * argument and the action as the second argument
 * @return Generator
 */
export function* watchLoginEmail({firebaseLoginEmail, history}) {
    yield takeLatest(LOGIN_EMAIL, loginEmailSaga, {firebaseLoginEmail, history});
}

/**
 * On every action of type SIGNUP_EMAIL spawn a signupEmailSaga. In case of
 * concurrent signup attempts the latest one cancels the previous ones.
 * @return Generator
 */
export function* watchSignupEmail({firebaseSignupEmail, history}) {
    yield takeLatest(SIGNUP_EMAIL, signupEmailSaga, {firebaseSignupEmail, history});
}

/**
 * On every action of type LOGOUT spawn a logoutSaga. In case of
 * concurrent logout attempts the latest one cancels the previous ones.
 * @return Generator
 */
export function* watchLogout({firebaseLogout, history}) {
    yield takeLatest(LOGOUT, logoutSaga, {firebaseLogout, history});
}

/**
 * Returns the root saga, created by injecting the dependencies and passing
 * them down to the sub sagas. Injecting the dependencies makes it easier
 * to unit test the sagas without mocking every module globally.
 * @param {object} libs An object containing the dependencies needed by the
 *                      sub sagas
 * @return function*
 */
export function getRootSaga(libs) {
    return function* () {
        yield all([
            fork(watchLoginEmail, libs),
            fork(watchSignupEmail, libs),
            fork(watchLogout, libs)
        ])
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
    firebaseLogout,
    history
})
