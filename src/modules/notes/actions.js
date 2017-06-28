export const ADD_NOTE = 'ADD_NOTE';
export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS';


export const EDIT_NOTE = 'EDIT_NOTE';
export const EDIT_NOTE_SUCCESS = 'EDIT_NOTE_SUCCESS';

export const REMOVE_NOTE = 'REMOVE_NOTE';
export const REMOVE_NOTE_SUCCESS = 'REMOVE_NOTE_SUCCESS';

export const NOTE_FAILURE = 'NOTE_FAILURE'

/**
 * Creates an action of type ADD_NOTE that signals the intention to add a note to
 * the firebase database.
 * Handled by noteSagas.
 * @param  {object} note        The note to add
 * @param  {string} note.title  The title of the note
 * @param  {string} note.text   The main text of the note
 *
 * @return object            A FSA-compliant action, the payload contains the note
 */
export const addNote = note => ({
    type: ADD_NOTE,
    payload: {note}
})

/**
 * Creates an action of type ADD_NOTE_SUCCESS that signals a successful push operation
 * on the firebase database.
 * Dispatched by noteSagas.
 * @param  {string} key         The note key on the database
 * @param  {object} note        The new note
 * @param  {string} note.title  The title of the note
 * @param  {string} note.text   The main text of the note
 *
 * @return object               A FSA-compliant action, the payload contains the
 *                              note and the key
 */
export const addNoteSuccess = (key, note) => ({
    type: ADD_NOTE_SUCCESS,
    payload: {key, note}
})

/**
 * Creates an action of type EDIT_NOTE that signals the intention to edit a note
 * on the firebase database.
 * Handled by noteSagas.
 * @param  {string} key         The note key on the database
 * @param  {object} note        The note to edit
 * @param  {string} note.title  The edited title of the note
 * @param  {string} note.text   The edited text of the note
 *
 * @return object               A FSA-compliant action, the payload contains the
 *                              key and the note
 */
export const editNote = (key, note) => ({
    type: EDIT_NOTE,
    payload: {key, note}
})

/**
 * Creates an action of type EDIT_NOTE_SUCCESS that signals a successful update
 * operation on the firebase database.
 * Dispatched by noteSagas.
 * @param  {string} key         The note key on the database
 * @param  {object} note        The edited note
 * @param  {string} note.title  The edited title of the note
 * @param  {string} note.text   The edited text of the note
 *
 * @return object               A FSA-compliant action, the payload contains the
 *                              note and the key
 */
export const editNoteSuccess = (key, note) => ({
    type: EDIT_NOTE_SUCCESS,
    payload: {key, note}
})

/**
 * Creates an action of type REMOVE_NOTE that signals the intention to delete a
 * note on the firebase database.
 * Handled by noteSagas.
 * @param  {string} key         The note key on the database
 *
 * @return object               A FSA-compliant action, the payload contains the
 *                              key of the note to delete
 */
export const removeNote = (key) => ({
    type: REMOVE_NOTE,
    payload: {key}
})

/**
 * Creates an action of type REMOVE_NOTE_SUCCESS that signals a successful remove
 * operation on the firebase database.
 * Dispatched by noteSagas.
 * @param  {string} key         The note key on the database
 * @param  {object} note        The removed note
 * @param  {string} note.title  The title of the note
 * @param  {string} note.text   The text of the note
 *
 * @return object               A FSA-compliant action, the payload contains the
 *                              note and the key
 */
export const removeNoteSuccess = (key, note) => ({
    type: REMOVE_NOTE_SUCCESS,
    payload: {key, note}
})
