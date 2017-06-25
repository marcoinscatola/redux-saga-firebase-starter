import { take, call, put, takeEvery, fork, cancel} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import getUserNotesHandler from 'api/notes';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from 'modules/auth/actions'
import { noteActions } from './index';

export function* addNoteSaga(handler, {payload:{note}}) {
    yield call([handler, handler.add], note)
}

export function* editNoteSaga(handler, {payload:{key, note}}) {
    yield call([handler, handler.edit], key, note)
}

export function* removeNoteSaga(handler, {payload:{key}}) {
    yield call([handler, handler.remove], key)
}

export function* watchWrite(handler) {
    yield takeEvery(noteActions.ADD_NOTE, addNoteSaga, handler)
    yield takeEvery(noteActions.EDIT_NOTE, editNoteSaga, handler)
    yield takeEvery(noteActions.REMOVE_NOTE, removeNoteSaga, handler)
}

export const getEventChannel = (subscribe) => {
    return eventChannel(emitter =>
        subscribe(emitter, {
            add: noteActions.addNoteSuccess,
            edit: noteActions.editNoteSuccess,
            remove: noteActions.removeNoteSuccess
        })
    )
}
export function* watchChanges(channel) {
    while (true) {
        let action = yield take(channel);
        yield put(action);
    }
}

export function* watchAuth({getUserNotesHandler}) {
    while(true) {
        let action = yield take(LOGIN_SUCCESS);
        let uid = action.payload.uid;
        let handler = yield call(getUserNotesHandler, uid);
        let write = yield fork(watchWrite, handler)
        let notesChannel = yield call(getEventChannel, handler.subscribe)
        let changes = yield fork(watchChanges, notesChannel);
        yield take(LOGOUT_SUCCESS);
        yield cancel(write)
        yield cancel(changes)
    }
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
        yield fork(watchAuth, libs)
    }
}

export default getRootSaga({getUserNotesHandler});
