import * as selectors from './selectors';

test('getI18nState selects the correct state slice', () => {
    let state = {
        i18n: {
            locale: 'en'
        }
    }
    expect(selectors.getI18nState(state)).toBe(state.i18n);
})

test('getLocale selects the correct state slice', () => {
    let state = {
        i18n: {
            locale: 'en'
        }
    }
    expect(selectors.getLocale(state)).toBe('en');
})

test('getDefaultLocale selects the correct state slice', () => {
    let state = {
        i18n: {
            defaultLocale: 'en'
        }
    }
    expect(selectors.getDefaultLocale(state)).toBe('en');
})

test('getLocalizedMessages returns the messages localized in the current locale', () => {
    let state = {
        i18n: {
            defaultLocale: 'it',
            locale: 'en',
            messages: {
                en: {
                    testMessage: 'testEn',
                    testMessage2: 'testEn2',
                },
                it: {
                    testMessage: 'testIt',
                    testMessage2: 'testIt2',
                }
            }
        }
    }
    expect(selectors.getLocalizedMessages(state)).toBe(state.i18n.messages.en)
    state = {
        ...state,
        i18n: {
            ...state.i18n,
            locale: 'it'
        }
    }
    expect(selectors.getLocalizedMessages(state)).toBe(state.i18n.messages.it)
})

test('getDefaultMessages return the messages localized in the default locale', () => {
    let state = {
        i18n: {
            defaultLocale: 'en',
            locale: 'it',
            messages: {
                en: {
                    testMessage: 'testEn',
                    testMessage2: 'testEn2',
                },
                it: {
                    testMessage: 'testIt',
                    testMessage2: 'testIt2',
                }
            }
        }
    }
    expect(selectors.getDefaultMessages(state)).toBe(state.i18n.messages.en)
    state = {
        ...state,
        i18n: {
            ...state.i18n,
            locale: 'de'
        }
    }
    expect(selectors.getDefaultMessages(state)).toBe(state.i18n.messages.en)
})

test('getLocalizedMessage returns the message localized in the current locale', () => {
    let state = {
        i18n: {
            defaultLocale: 'it',
            locale: 'en',
            messages: {
                en: {
                    testMessage: 'testEn',
                    testMessage2: 'testEn2',
                },
                it: {
                    testMessage: 'testIt',
                    testMessage2: 'testIt2',
                }
            }
        }
    }
    expect(selectors.getLocalizedMessage(state, 'testMessage')).toBe('testEn')
    state = {
        ...state,
        i18n: {
            ...state.i18n,
            locale: 'it'
        }
    }
    expect(selectors.getLocalizedMessage(state, 'testMessage')).toBe('testIt')
})

test('getLocalizedMessage returns the message localized in the default locale if the translation is missing', () => {
    let state = {
        i18n: {
            defaultLocale: 'en',
            locale: 'it',
            messages: {
                en: {
                    testMessage: 'testEn',
                    testMessage2: 'testEn2',
                    testMessageMissingTranslation: 'testEn3'
                },
                it: {
                    testMessage: 'testIt',
                    testMessage2: 'testIt2',
                }
            }
        }
    }
    expect(selectors.getLocalizedMessage(state, 'testMessageMissingTranslation')).toBe('testEn3')
})

test('getLocalizedMessage returns an empty string if the localized translation and the default message are missing', () => {
    let state = {
        i18n: {
            defaultLocale: 'en',
            locale: 'it',
            messages: {
                en: {
                    testMessage: 'testEn',
                    testMessage2: 'testEn2',
                },
                it: {
                    testMessage: 'testIt',
                    testMessage2: 'testIt2',
                }
            }
        }
    }
    expect(selectors.getLocalizedMessage(state, 'testMessageNoDefault')).toBe('')
})