/**
 * Selects the slice of the store state containing the localization data
 * @param {object} state The redux store state
 * @return {object}  The i18n state slice
 */
export const getI18nState = state => state.i18n;

/**
 * Selects the locale from the i18n state slice.
 * @param {object} state The redux store state
 * @return {string} The current locale
 */
export const getLocale = state => getI18nState(state).locale;

/**
 * Selects the default locale from the i18n state slice.
 * @param {object} state The redux store state
 * @return {string} The default locale
 */
export const getDefaultLocale = state => getI18nState(state).defaultLocale;

/**
 * @typedef {Object.<string, string>} translations 
 */
/**
 * Selects all the current messages translated in the current locale 
 * from the i18n state slice.
 * @param {object} state The redux store state
 * @return {translations} The translated messages
 */
export const getLocalizedMessages = state => {
    let messages = getI18nState(state).messages;
    let locale = getLocale(state);
    return messages[locale]
}

/**
 * Selects the all the current messages translated in the current locale 
 * from the i18n state slice.
 * @param {object} state The redux store state
 * @return {translations} The translated messages
 */
export const getDefaultMessages = state => {
    let messages = getI18nState(state).messages;
    let locale = getDefaultLocale(state);
    return messages[locale]
}

/**
 * Selects a single message translated in the current locale 
 * from the i18n state slice.
 * @param {object} state The redux store state
 * @param {string} id The message id
 * @return {string} The translated message
 */
export const getLocalizedMessage = (state, id) => {
    let localizedMessages = getLocalizedMessages(state)
    if (!localizedMessages) return "";
    if (localizedMessages[id]) return localizedMessages[id];
    let defaultMessages = getDefaultMessages(state);
    return defaultMessages[id] || "";
}