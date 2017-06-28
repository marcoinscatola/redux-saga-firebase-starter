import { take, call, put, takeEvery, fork, cancel} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import getUserNotesHandler from 'api/notes';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from 'modules/auth/actions'
import { noteActions } from './index';

/**
 * Calls the handler 'add' method when the user requests to add a note, which
 * will push the note to the database.
 * @param  {object} handler    The handler returned by getUserNotesHandler
 * @param  {object} payload    The action payload
 * @param  {object} payload.note    The note to add
 * @return {Generator}
 */
export function* addNoteSaga(handler, {payload:{note}}) {
    yield call([handler, handler.add], note)
}

/**
 * Calls the handler 'edit' method when the user requests to edit a note, which
 * will update the note on the database
 * @param  {object} handler    The handler returned by getUserNotesHandler
 * @param  {object} payload    The action payload
 * @param  {object} payload.note    The edited note
 * @param  {object} payload.key     The note key on the database
 * @return {Generator}
 */
export function* editNoteSaga(handler, {payload:{key, note}}) {
    yield call([handler, handler.edit], key, note)
}

/**
 * Calls the handler 'remove' method when the user requests to remove a note, which
 * will remove the note from the database
 * @param  {object} handler    The handler returned by getUserNotesHandler
 * @param  {object} payload    The action payload
 * @param  {object} payload.key    The note key on the database
 * @return {Generator}
 */
export function* removeNoteSaga(handler, {payload:{key}}) {
    yield call([handler, handler.remove], key)
}

/**
 * When watchWrite is running, every ADD_NOTE, EDIT_NOTE, REMOVE_NOTE action will
 * fork the correct saga to handle that kind of database operation.
 * Cancelling the task associated with watchWrite will stop monitoring the actions
 * @param  {object} handler    The handler returned by getUserNotesHandler
 * @return {Generator}
 */
export function* watchWrite(handler) {
    yield takeEvery(noteActions.ADD_NOTE, addNoteSaga, handler)
    yield takeEvery(noteActions.EDIT_NOTE, editNoteSaga, handler)
    yield takeEvery(noteActions.REMOVE_NOTE, removeNoteSaga, handler)
}

/**
 * Returns a redux saga event channel that will subscribe using the specified
 * method. The subscribe method is expected to return an unsubscribe method.
 * @param {function} subscribe     The method that will be used to subscribe the
 *                                 emitter to custom events
 * @return {EventChannel}
 */
export const getEventChannel = (subscribe) => {
    return eventChannel(emitter =>
        subscribe(emitter, {
            add: noteActions.addNoteSuccess,
            edit: noteActions.editNoteSuccess,
            remove: noteActions.removeNoteSuccess
        })
    )
}

/**
 * While this saga is running it will take the actions emitted from an event
 * channel and dispatch them to the redux store.
 * @param {object} channel    The channel that will emit the actions to dispatch
 * @return {Generator}
 */
export function* watchChanges(channel) {
    while (true) {
        let action = yield take(channel);
        yield put(action);
    }
}

/**
 * Running this saga will start a process that waits on a LOGIN_SUCCESS action.
 * When the LOGIN_SUCCESS action is dispatched, following a user login, the user
 * uid will be passed to getUserNotesHandler to instantiate an handler with the
 * methods necessary to modify the user notes and to subscribe to the changes.
 * The watchWrite and watchChanges sagas will be forked at this point, reacting
 * to changes on the database and to actions signaling that the user wants to
 * modify data.
 * At this point the saga will wait for a LOGOUT_SUCCESS action, and if one is
 * dispatched it will cancel the previously forked sagas and start the process
 * again.
 * @param {object} libs    An object containing the dependencies used by the saga.
 * @param {function} libs.getUserNotesHandler    The method used to get the note
 *                                               handler
 * @return {Generator}
 */
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
 * @param {object} libs    An object containing the dependencies needed by the
 *                         sub sagas
 * @return function*
 */
export function getRootSaga(libs) {
    return function* () {
        yield fork(watchAuth, libs)
    }
}

export default getRootSaga({getUserNotesHandler});
