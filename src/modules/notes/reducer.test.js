import noteReducer from './reducer';
import * as noteActions from './actions';

describe('Auth reducer', () => {
    test('returns initial state', () => {
        expect(noteReducer(undefined,{type:'@@INIT'})).toEqual({
            list: [],
            byKey: {}
        })
    })

    test('handles addNoteSuccess actions', () => {
        let note = {title:'testTitle', text:'testText'};
        let key = "testKey";
        let state = noteReducer(undefined,{type:'@@INIT'});
        state = noteReducer(state, noteActions.addNoteSuccess(key, note))
        expect(state).toEqual({
            list: ['testKey'],
            byKey: {
                testKey: {
                    title: 'testTitle',
                    text: 'testText',
                    key: 'testKey'
                }
            }
        })
    })

    test('handles editNoteSuccess actions', () => {
        let state = {
            list: ['testKey'],
            byKey: {
                testKey: {
                    title: 'testTitle',
                    text: 'testText',
                    key: 'testKey'
                }
            }
        }
        let updates = {title:'testTitleEdited', text:'testTextEdited'};
        let key = "testKey";
        state = noteReducer(state, noteActions.editNoteSuccess(key, updates))
        expect(state).toEqual({
            list: ['testKey'],
            byKey: {
                testKey: {
                    title: 'testTitleEdited',
                    text: 'testTextEdited',
                    key: 'testKey'
                }
            }
        })
    })

    test('handles removeNoteSuccess action', () => {
        let state = {
            list: ['testKey'],
            byKey: {
                testKey: {
                    title: 'testTitle',
                    text: 'testText',
                    key: 'testKey'
                }
            }
        }

        state = noteReducer(state, noteActions.removeNoteSuccess('testKey'))
        expect(state).toEqual({
            list: [],
            byKey: {}
        })
    })

})
