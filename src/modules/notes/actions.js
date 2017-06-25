export const ADD_NOTE = 'ADD_NOTE';
export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS';


export const EDIT_NOTE = 'EDIT_NOTE';
export const EDIT_NOTE_SUCCESS = 'EDIT_NOTE_SUCCESS';

export const REMOVE_NOTE = 'REMOVE_NOTE';
export const REMOVE_NOTE_SUCCESS = 'REMOVE_NOTE_SUCCESS';

export const NOTE_FAILURE = 'NOTE_FAILURE'

export const addNote = note => ({
    type: ADD_NOTE,
    payload: {note}
})

export const addNoteSuccess = (key, note) => ({
    type: ADD_NOTE_SUCCESS,
    payload: {key, note}
})

export const editNote = (key, note) => ({
    type: EDIT_NOTE,
    payload: {key, note}
})

export const editNoteSuccess = (key, note) => ({
    type: EDIT_NOTE_SUCCESS,
    payload: {key, note}
})

export const removeNote = (key) => ({
    type: REMOVE_NOTE,
    payload: {key}
})

export const removeNoteSuccess = (key, note) => ({
    type: REMOVE_NOTE_SUCCESS,
    payload: {key, note}
})
