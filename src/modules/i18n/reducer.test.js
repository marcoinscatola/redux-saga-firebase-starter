import reducer from './reducer';
import * as actions from './actions';
import {makeCollection} from './utils';
import {DEFAULT_LOCALE} from './config';

describe('The locale reducer', () => {
    it('returns the initial state', () => {
        let state = reducer(undefined, "@@INIT");
        expect(state).toEqual({
            locale: DEFAULT_LOCALE,
            defaultLocale: DEFAULT_LOCALE,
            messages: {},
            loaded: {}
        })
    })

    it('handles the changeLocale action correctly', () => {
        let state = reducer(undefined, "@@INIT");
        state = reducer(state, actions.changeLocale('test'));
        expect(state.locale).toBe('test')
    })

    it('handles the addMessages action correctly', () => {
        let state = reducer(undefined, "@@INIT");
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
        let collection = makeCollection(messages);
        state = reducer(state, actions.addMessages(collection));
        expect(state.messages).toEqual(collection.messages)
        expect(state.loaded[collection.hash]).toBe(true);
        messages = {
            en: {
                testId3: 'Test translation 3'
            },
            it: {
                testId3: 'Test traduzione 3'
            }
        }
        collection = makeCollection(messages)
        state = reducer(state, actions.addMessages(collection));
        expect(state.messages).toEqual({
            en: {
                testId: "Test translation",
                testId2: "Test translation 2",
                testId3: 'Test translation 3'
            },
            it: {
                testId: "Test traduzione",
                testId2: "Test traduzione 2",
                testId3: 'Test traduzione 3'
            }
        })
        expect(state.loaded[collection.hash]).toBe(true);
    })
    test('addMessage will return the current state if the collection was already loaded', () => {
        let state = reducer(undefined, "@@INIT");
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
        let collection = makeCollection(messages);
        state = reducer(state, actions.addMessages(collection));
        let newState = reducer(state, actions.addMessages(collection));
        expect(newState).toBe(state);
    })
})

