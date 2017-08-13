export const getI18nState = state => state.i18n;

export const getLocale = state => getI18nState(state).locale;

export const getDefaultLocale = state => getI18nState(state).defaultLocale;


export const getLocalizedMessages = state => {
    let messages = getI18nState(state).messages;
    let locale = getLocale(state);
    return messages[locale]
}

export const getDefaultMessages = state => {
    let messages = getI18nState(state).messages;
    let locale = getDefaultLocale(state);
    return messages[locale]
}

export const getLocalizedMessage = (state, id) => {
    let localizedMessages = getLocalizedMessages(state)
    if (localizedMessages[id]) return localizedMessages[id];
    let defaultMessages = getDefaultMessages(state);
    return defaultMessages[id] || "";
}