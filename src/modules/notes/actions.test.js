import * as noteActions from './actions';

test('addNote returns an action to add a note to the database', () => {
    const note = {title:'testTitle', text:'testText'};
    expect(noteActions.addNote(note))
    .toEqual({
        type: noteActions.ADD_NOTE,
        payload: {note}
    })
})

test('addNoteSuccess returns an action to add a note to the store', () => {
    const note = {title:'testTitle', text:'testText'};
    const key = 'testKey'
    expect(noteActions.addNoteSuccess(key, note))
    .toEqual({
        type: noteActions.ADD_NOTE_SUCCESS,
        payload: {key, note}
    })
})

test('editNote returns an action to edit a note on the database', () => {
    const note = {title:'testTitle', text:'testText'};
    const key = 'testKey'
    expect(noteActions.editNote(key, note))
    .toEqual({
        type: noteActions.EDIT_NOTE,
        payload: {key, note}
    })
})

test('editNoteSuccess returns an action to edit a note in the store', () => {
    const note = {title:'testTitle', text:'testText'};
    const key = 'testKey'
    expect(noteActions.editNoteSuccess(key, note))
    .toEqual({
        type: noteActions.EDIT_NOTE_SUCCESS,
        payload: {key, note}
    })
})


test('removeNote returns an action to remove a note from the database', () => {
    const key = 'testKey'
    expect(noteActions.removeNote(key))
    .toEqual({
        type: noteActions.REMOVE_NOTE,
        payload: {key}
    })
})

test('removeNoteSuccess returns an action to remove a note from the store', () => {
    const note = {title:'testTitle', text:'testText'};
    const key = 'testKey'
    expect(noteActions.removeNoteSuccess(key, note))
    .toEqual({
        type: noteActions.REMOVE_NOTE_SUCCESS,
        payload: {key, note}
    })
})
