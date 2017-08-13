import * as actions from './actions';

describe('localeActions.changeLocale', () => {
    test('creates a CHANGE_LOCALE action', () => {
        expect(actions.changeLocale().type)
        .toBe(actions.CHANGE_LOCALE)
    })
    test('accepts the locale as the only parameter', () => {
        expect(actions.changeLocale('test'))
        .toEqual({
            type: actions.CHANGE_LOCALE,
            payload: {
                locale: 'test'
            }
        })
    })
})

describe('localeActions.addMessages', () => {
    test('creates a ADD_MESSAGES action', () => {
        expect(actions.addMessages().type)
        .toBe(actions.ADD_MESSAGES)
    })
    test('accepts an object of localized messages as the only parameter', () => {
        let messages = {
            en: {
                testId: "Test translation",
                testId2: "Test translation 2"
            },
            it: {
                testId: "Test traduzione",
                testId2: "Test traduzione 2"
            },
        }
        expect(actions.addMessages(messages))
        .toEqual({
            type: actions.ADD_MESSAGES,
            payload: {
                messages
            }
        })
    })
})
