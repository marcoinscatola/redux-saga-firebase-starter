import {handleActions} from 'redux-actions'
import * as noteActions from './actions';
import omit from 'lodash/omit'

const initialState = {
    list: [],
    byKey: {}
}

export default handleActions({
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

    [noteActions.REMOVE_NOTE_SUCCESS](state, { payload:{key, note} }) {
        return {
            ...state,
            list: state.list.filter(k => k !== key),
            byKey: omit(state.byKey, key)
        }
    },
}, initialState)
