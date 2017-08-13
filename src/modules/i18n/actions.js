export const CHANGE_LOCALE = 'CHANGE_LOCALE';
export const changeLocale = locale => ({
    type: CHANGE_LOCALE,
    payload: { locale }
})

export const ADD_MESSAGES = 'ADD_MESSAGES';
export const addMessages = messages => ({
    type: ADD_MESSAGES,
    payload: { messages }
})