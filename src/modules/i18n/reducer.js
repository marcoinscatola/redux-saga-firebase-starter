import {handleActions} from 'redux-actions';
import * as actions from './actions';
import {DEFAULT_LOCALE} from './config';

const initialState = {
    defaultLocale: DEFAULT_LOCALE,
    locale: DEFAULT_LOCALE,
    messages: {
        en: {}
    }
}

export default handleActions({
    [actions.CHANGE_LOCALE]: (state, {payload:{locale}}) => {
        return {
            ...state,
            locale
        }
    },
    [actions.ADD_MESSAGES]: (state, {payload:{messages}}) => {
        let msgLocales = Object.keys(messages);
        let mergedMessages = msgLocales.reduce((merged, msgLocale) => {
            merged[msgLocale] = {
                ...state.messages[msgLocale],
                ...messages[msgLocale]
            };
            return merged;
        }, {})
        return {
            ...state,
            messages: mergedMessages
        }
    }
}, initialState)