import {handleActions} from 'redux-actions'
import * as noteActions from './actions';
import omit from 'lodash/omit'


/**
 * Holds the initial state of the state.notes slice
 * @prop {string[]} list    An array containing the keys of the notes currently
 *                          loaded
 * @prop {object} byKey    A dictionary object mapping the notes keys to their
 *                         contents
 */
const initialState = {
    list: [],
    byKey: {}
}

export default handleActions({
    /**
     * Handles the ADD_NOTE_SUCCESS action.
     * Stores the note key in state.list and the note values in
     * state.byKey[key]
     */
    [noteActions.ADD_NOTE_SUCCESS](state, { payload:{key, note} }) {
        return {
            ...state,
            list: [...state.list, key],
            byKey: {
                ...state.byKey,
                [key]: {
                    ...note,
                    key
                }
            }
        }
    },

    /**
     * Handles the EDIT_NOTE_SUCCESS action.
     * Updates the note the note values in state.byKey[key]
     */
    [noteActions.EDIT_NOTE_SUCCESS](state, { payload:{key, note} }) {
        return {
            ...state,
            byKey: {
                ...state.byKey,
                [key]: {
                    ...note,
                    key
                }
            }
        }
    },

    /**
     * Handles the REMOVE_NOTE_SUCCESS action.
     * Removes the note key in state.list and the note values in
     * state.byKey[key]
     */
    [noteActions.REMOVE_NOTE_SUCCESS](state, { payload:{key, note} }) {
        return {
            ...state,
            list: state.list.filter(k => k !== key),
            byKey: omit(state.byKey, key)
        }
    },
}, initialState)
