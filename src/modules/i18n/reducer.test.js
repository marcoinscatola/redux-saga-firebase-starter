import reducer from './reducer';
import * as actions from './actions';
import {DEFAULT_LOCALE} from './config';

describe('The locale reducer', () => {
    it('returns the initial state', () => {
        let state = reducer(undefined, "@@INIT");
        expect(state).toEqual({
            locale: DEFAULT_LOCALE,
            defaultLocale: DEFAULT_LOCALE,
            messages: {
                en: {}
            }
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
        state = reducer(state, actions.addMessages(messages));
        expect(state.messages).toEqual(messages)
        messages = {
            en: {
                testId3: 'Test translation 3'
            },
            it: {
                testId3: 'Test traduzione 3'
            }
        }
        state = reducer(state, actions.addMessages(messages));
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
    })

})

