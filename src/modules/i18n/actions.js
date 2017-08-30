/**
 * Creates an action of type CHANGE_LOCALE that contains the new selected locale
 * @param {string} locale The code of the selected locale
 * 
 * @return {object} A FSA-compliant action, the payload contains the new locale
 */
export const changeLocale = locale => ({
    type: CHANGE_LOCALE,
    payload: { locale }
})
export const CHANGE_LOCALE = 'CHANGE_LOCALE';

/**
 * @typedef {Object.<string, string>} translations 
 * @typedef {Object.<string, translations>} localizedMessages 
 * @typedef {messages: localizedMessages, hash: string} collection
 */
/**
 * Creates an action of type ADD_MESSAGES that contains one or more collections
 * of messages to add to the store. Collections are created with the makeCollection
 * methods from i18n/utils
 * @param {...collection} collections A series of collection objects containins
 *                                    the messages to add to the store
 * 
 * @return {object} A FSA-compliant action, the payload contains an array of collections
 */
export const addMessages = (...collections) => ({
    type: ADD_MESSAGES,
    payload: { collections }
})
export const ADD_MESSAGES = 'ADD_MESSAGES';
