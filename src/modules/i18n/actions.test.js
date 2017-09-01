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
    test('accepts one or more collections of localized messages as parameters', () => {
        let collection = {
            messages: {
                en: {
                    testId: "Test translation",
                    testId2: "Test translation 2"
                },
                it: {
                    testId: "Test traduzione",
                    testId2: "Test traduzione 2"
                }
            },
            hash: 'testHash'
        }
        expect(actions.addMessages(collection))
        .toEqual({
            type: actions.ADD_MESSAGES,
            payload: {
                collections: [collection]
            }
        })
    })
    test('accepts multiple collections', () => {
        let collection1 = {
            messages: {
                en: {
                    testId: "Test translation"
                },
                it: {
                    testId: "Test traduzione"
                }
            },
            hash: 'testHash'
        }
        let collection2 = {
            messages: {
                en: {
                    testId2: "Test translation2"
                },
                it: {
                    testId2: "Test traduzione2"
                }
            },
            hash: 'testHash2'
        }
        expect(actions.addMessages(collection1, collection2))
        .toEqual({
            type: actions.ADD_MESSAGES,
            payload: {
                collections: [collection1, collection2]
            }
        })
    })
})
