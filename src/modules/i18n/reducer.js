import {handleActions} from 'redux-actions';
import * as actions from './actions';
import {DEFAULT_LOCALE} from './config';

const initialState = {
    defaultLocale: DEFAULT_LOCALE,
    locale: DEFAULT_LOCALE,
    messages: {},
    loaded: {}
}

/**
 * Merges the new messages with the ones already loaded in the store and returns
 * a new state.
 * @param {object} state The redux store state
 * @param {object} newMessages The messages to add to the store
 * 
 * @return {object} The resulting state
 */
function mergeMessages(state, newMessages) {
    let msgLocales = Object.keys(newMessages);
    let mergedMessages = msgLocales.reduce((merged, msgLocale) => {
        merged[msgLocale] = {
            ...state.messages[msgLocale],
            ...newMessages[msgLocale]
        };
        return merged;
    }, {})
    return {
        ...state,
        messages: mergedMessages
    }
}

/**
 * Add a collection of messages to the store if it wasn't previously added and
 * returns a new state (or the previous state if the collection is present)
 * @param {object} state The redux store state
 * @param {object} collection The collection of localized messages
 * 
 * @return {object} The resulting state
 */
function addCollection(state, collection) {
    // check if the collection was already loaded
    if (state.loaded[collection.hash])
        return state;
    let stateWithMessages = mergeMessages(state, collection.messages)
    return {
        ...stateWithMessages,
        loaded: {
            ...stateWithMessages.loaded,
            [collection.hash]: true
        }
    }
}

export default handleActions({
    [actions.CHANGE_LOCALE]: (state, {payload:{locale}}) => {
        return {
            ...state,
            locale
        }
    },
    [actions.ADD_MESSAGES]: (state, {payload:{collections}}) => {
        return collections.reduce(addCollection, state)
    }
}, initialState)