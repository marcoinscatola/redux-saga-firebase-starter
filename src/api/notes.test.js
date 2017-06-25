// doesn't work
import * as notes from './notes';

describe ('getNotesPath', () => {
    it('returns the path to the user notes', () => {
        expect(notes.getNotesPath(1)).toBe('users/1/notes')
    })
})
describe('createNotesHandler', () => {
    const notesRef = 'notesRef';
    const addNote = jest.fn();
    const editNote = jest.fn();
    const removeNote = jest.fn();
    const subscribe = jest.fn();
    let handler = notes.createNotesHandler(
        notesRef,
        addNote,
        editNote,
        removeNote,
        subscribe
    )
    it('returns an object with the methods needed to manage the user notes', () => {
        expect(handler.add).toBeDefined();
        expect(handler.edit).toBeDefined();
        expect(handler.remove).toBeDefined();
        expect(handler.subscribe).toBeDefined();
    })
    it('returns methods bound to the ref pointing to the user notes', () => {
        let testArg = 'testArg';
        handler.add(testArg)
        expect(addNote.mock.calls.length).toBe(1)
        expect(addNote.mock.calls[0]).toEqual([notesRef, testArg])
        handler.edit(testArg)
        expect(editNote.mock.calls.length).toBe(1)
        expect(editNote.mock.calls[0]).toEqual([notesRef, testArg])
        handler.remove(testArg)
        expect(removeNote.mock.calls.length).toBe(1)
        expect(removeNote.mock.calls[0]).toEqual([notesRef, testArg])
        handler.subscribe(testArg)
        expect(subscribe.mock.calls.length).toBe(1)
        expect(subscribe.mock.calls[0]).toEqual([notesRef, testArg])
    })

})

describe('subscribe', () => {
    let callbacks = {}
    let notesRef = {
        on: jest.fn((event, cb) => callbacks[event] = jest.fn(cb)),
        off: jest.fn()
    }
    let emitter = jest.fn();
    let addAction = jest.fn((val, key) => ({action:'add', val, key}));
    let editAction = jest.fn((val, key) => ({action:'edit', val, key}));
    let removeAction = jest.fn((val, key) => ({action:'remove', val, key}));
    let testNote = {
        key: 'testKey',
        val: () => 'testVal'
    }
    let unsubscribe = notes.subscribe(notesRef, emitter, {
        add: addAction,
        edit: editAction,
        remove: removeAction
    })
    it('returns an unsubscribe method that invokes the database ref.off method', () => {
        unsubscribe()
        expect(notesRef.off.mock.calls.length).toBe(1);
    })
    it('subscribes to firebase events', () => {
        expect(notesRef.on.mock.calls.length).toBe(3);
        let firstArgs = notesRef.on.mock.calls.map(args => args[0]);
        expect(firstArgs).toContain('child_added')
        expect(firstArgs).toContain('child_changed')
        expect(firstArgs).toContain('child_removed')
    })
    it('the callback for the child_added event emits the correct action', () => {
        emitter.mockClear();
        callbacks['child_added'](testNote);
        expect(emitter.mock.calls.length).toBe(1);
        expect(emitter.mock.calls[0][0]).toEqual(addAction(testNote.key, testNote.val()))
    })
    it('the callback for the child_changed event emits the correct action', () => {
        emitter.mockClear();
        callbacks['child_changed'](testNote);
        expect(emitter.mock.calls.length).toBe(1);
        expect(emitter.mock.calls[0][0]).toEqual(editAction(testNote.key, testNote.val()))
    })
    it('the callback for the child_removed event emits the correct action', () => {
        emitter.mockClear();
        callbacks['child_removed'](testNote);
        expect(emitter.mock.calls.length).toBe(1);
        expect(emitter.mock.calls[0][0]).toEqual(removeAction(testNote.key, testNote.val()))
    })
})

let childRef = {
    update: jest.fn(),
    remove: jest.fn()
}
let notesRef = {
    push: jest.fn(),
    child: jest.fn(() => childRef)
}
let testNote = {
    title: 'testTitle',
    text: 'testText'
}
let testKey = 'x';

describe('addNote', () => {
    beforeAll(() => {
        jest.clearAllMocks()
        notes.addNote(notesRef, testNote)
    })
    it('invokes the database ref.push method', () => {
        expect(notesRef.push.mock.calls.length).toBe(1);
        expect(notesRef.push.mock.calls[0]).toEqual([testNote]);
    })
})

describe('editNote', () => {
    beforeAll(() => {
        jest.clearAllMocks()
        notes.editNote(notesRef, testKey, testNote)
    })
    it('invokes the database ref.child method with the note key as parameter', () => {
        expect(notesRef.child.mock.calls.length).toBe(1);
        expect(notesRef.child.mock.calls[0]).toEqual([testKey]);
    })
    it('invokes the database ref.update method on the notes/{key} reference ', () => {
        expect(childRef.update.mock.calls.length).toBe(1);
        expect(childRef.update.mock.calls[0]).toEqual([testNote]);
    })
})

describe('removeNote', () => {
    beforeAll(() => {
        jest.clearAllMocks()
        notes.removeNote(notesRef, testKey)
    })
    it('invokes the database ref.remove method on the notes/{key} reference ', () => {
        expect(notesRef.child.mock.calls.length).toBe(1);
        expect(notesRef.child.mock.calls[0]).toEqual([testKey]);
        expect(childRef.remove.mock.calls.length).toBe(1);
    })
})
