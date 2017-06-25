import * as noteSagas from './sagas';
import * as noteActions from './actions';
import * as authActions from 'modules/auth/actions';
import { call, put, takeEvery, take, fork, cancel } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { createMockTask } from 'redux-saga/utils';

let testNote = {
    testTitle: 'testTitle',
    testText: 'testText'
}
let testKey = 'testKey'

describe('addNoteSaga', () => {
    it('calls the handler.add method with the note as a parameter', () => {
        let handler = {
            add: () => {}
        }
        let action = noteActions.addNote(testNote);
        let gen = noteSagas.addNoteSaga(handler, action);
        expect(gen.next().value).toEqual(call([handler, handler.add], testNote))
    })
})

describe('editNoteSaga', () => {
    it('calls the handler.edit method with the key and note as parameters', () => {
        let handler = {
            edit: () => {}
        }
        let action = noteActions.editNote(testKey, testNote);
        let gen = noteSagas.editNoteSaga(handler, action);
        expect(gen.next().value).toEqual(call([handler, handler.edit], testKey, testNote))
    })
})

describe('removeNoteSaga', () => {
    it('calls the handler.remove method with the key and note as parameters', () => {
        let handler = {
            remove: () => {}
        }
        let action = noteActions.removeNote(testKey);
        let gen = noteSagas.removeNoteSaga(handler, action);
        expect(gen.next().value).toEqual(call([handler, handler.remove], testKey))
    })
})

describe('watchWrite', () => {
    let handler = 'testHandler';
    let values;
    beforeAll(() => {
        let gen = noteSagas.watchWrite(handler);
        values = [
            gen.next().value,
            gen.next().value,
            gen.next().value
        ]
    })
    it('forks addNoteSaga on every ADD_NOTE action ', () => {
        expect(values).toContainEqual(takeEvery(noteActions.ADD_NOTE, noteSagas.addNoteSaga, handler))
    })
    it('forks editNoteSaga on every EDIT_NOTE action ', () => {
        expect(values).toContainEqual(takeEvery(noteActions.EDIT_NOTE, noteSagas.editNoteSaga, handler))
    })
    it('forks removeNoteSaga on every REMOVE_NOTE action ', () => {
        expect(values).toContainEqual(takeEvery(noteActions.REMOVE_NOTE, noteSagas.removeNoteSaga, handler))
    })
})

describe('watchChanges', () => {
    let channel = eventChannel(() => () => {});
    it('takes the actions emitted from the chanel and dispatches it', () => {
        let gen = noteSagas.watchChanges(channel);
        let action = {
            type: 'TEST_ACTION',
            payload: { test: true}
        }
        expect(gen.next().value).toEqual(take(channel))
        expect(gen.next(action).value).toEqual(put(action))
    })
})

describe('watchAuth', () => {
    let gen;
    let handler = {
        subscribe: jest.fn(() => {})
    }
    let getUserNotesHandler = jest.fn(() => handler)
    let userData = {
        uid: 'test'
    }
    let channel = 'testchannel';
    let writeTask = createMockTask()
    let changesTask = createMockTask()
    beforeAll(() => {
        getUserNotesHandler.mockClear();
        handler.subscribe.mockClear();
        gen = noteSagas.watchAuth({getUserNotesHandler})
    })
    it('takes LOGIN_SUCCESS actions', () => {
        expect(gen.next().value).toEqual(take(authActions.LOGIN_SUCCESS))
    })
    it('calls getUserNotesHandler with the uid from the loginSuccess action', () => {
        expect(gen.next(authActions.loginSuccess(userData)).value)
        .toEqual(call(getUserNotesHandler, userData.uid))
    })

    it('forks a watchWrite saga', () => {
        // receives handler from the previous call
        expect(gen.next(handler).value)
        .toEqual(fork(noteSagas.watchWrite, handler))
    })
    it('calls getEventChannel', () => {
        // receives writeTask from the previous fork
        expect(gen.next(writeTask).value)
        .toEqual(call(noteSagas.getEventChannel, handler.subscribe))
    })
    it('forks a watchChangesSaga', () => {
        expect(gen.next(channel).value)
        .toEqual(fork(noteSagas.watchChanges, channel))
    })
    it ('waits for a LOGOUT_SUCCESS action', () => {
        // receives changesTask from the previous fork
        expect(gen.next(changesTask).value)
        .toEqual(take(authActions.LOGOUT_SUCCESS))
    })
    it ('cancels the tasks', () => {
        expect(gen.next().value).toEqual(cancel(writeTask))
        expect(gen.next().value).toEqual(cancel(changesTask))
    })
})

describe('getEventChannel', () => {
    let channel;
    let trigger;
    let listeners;
    let unsubscribe;
    let subscribe;
    beforeAll(() => {
        listeners = {
            child_added: [],
            child_changed: [],
            child_removed: []
        }
        trigger = (event, ...args) => {
            let evListeners = listeners[event];
            evListeners.forEach(listener => listener(...args))
        }
        let addListener, editListener, removeListener;
        unsubscribe = jest.fn(() => {
            listeners.child_added = listeners.child_added.filter(listener => listener !== addListener);
            listeners.child_changed = listeners.child_changed.filter(listener => listener !== editListener);
            listeners.child_removed = listeners.child_removed.filter(listener => listener !== removeListener);
        })
        subscribe = jest.fn((emitter, actions) => {
            addListener = (key, val) => emitter(actions.add(key, val));
            editListener = (key, val) => emitter(actions.edit(key, val));
            removeListener = (key, val) => emitter(actions.remove(key, val));
            listeners.child_added = [...listeners.child_added, addListener];
            listeners.child_changed = [...listeners.child_changed, editListener];
            listeners.child_removed = [...listeners.child_removed, removeListener];
            return () => {
                unsubscribe()
            }
        })
        channel = noteSagas.getEventChannel(subscribe);
    })
    it('calls subscribe with the correct parameters', () => {
        expect(subscribe.mock.calls.length).toBe(1);
        expect(subscribe.mock.calls[0][0]).toBeInstanceOf(Function);
        expect(subscribe.mock.calls[0][1]).toEqual({
            add: noteActions.addNoteSuccess,
            edit: noteActions.editNoteSuccess,
            remove: noteActions.removeNoteSuccess
        })
    })
    it('puts an addNoteSuccess action on child_added event', () => {
        expect.assertions(1)
        channel.take(action => {
            expect(action)
            .toEqual(noteActions.addNoteSuccess('testkey', {
                title: 'noteAdded',
                text: 'testNoteAdded'
            }))
        })
        trigger('child_added', 'testkey', {
            title: 'noteAdded',
            text: 'testNoteAdded'
        });
    })

    it('puts an editNoteSuccess action on child_changed event', () => {
        expect.assertions(1)
        channel.take(action => {
            expect(action)
            .toEqual(noteActions.editNoteSuccess('testkey', {
                title: 'noteEdited',
                text: 'testNoteEdited'
            }))
        })
        trigger('child_changed', 'testkey', {
            title: 'noteEdited',
            text: 'testNoteEdited'
        });
    })

    it('puts a removeNoteSuccess action on child_removed event', () => {
        expect.assertions(1)
        channel.take(action => {
            expect(action)
            .toEqual(noteActions.removeNoteSuccess('testkey', {
                title: 'noteRemoved',
                text: 'testNoteRemoved'
            }))
        })
        trigger('child_removed', 'testkey', {
            title: 'noteRemoved',
            text: 'testNoteRemoved'
        });
    })
    it('calls unsubscribe when the channel is closed', () => {
        channel.close();
        expect(unsubscribe.mock.calls.length).toBe(1);
    })
    it('closing the channel multiple times doesn\'t call unsubscribe again', () => {
        let channel = noteSagas.getEventChannel(subscribe);
        unsubscribe.mockClear();
        channel.close();
        channel.close();
        expect(unsubscribe.mock.calls.length).toBe(1);
    })
})
