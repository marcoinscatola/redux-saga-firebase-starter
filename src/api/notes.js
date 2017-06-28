import {firebaseDb} from './firebase';

/**
 * Calls the push method on a database reference. Used to push
 * a note in the user's notes on the database.
 * @param  {Reference} notesRef    A reference to the database pointing at the user notes
 * @param  {object} note    The note to push to the database
 * @return {thenable}    A promise resolved when the write on the database
 * 				is complete
 */
export function addNote(notesRef, note) {
    return notesRef.push(note);
}

/**
 * Calls the edit method on a database reference. Used to update
 * a note in the user's notes on the database.
 * @param  {Reference} notesRef    A reference to the database pointing at the user notes
 * @param  {object} key	   The key of the note to edit on the database
 * @param  {object} note    The note object containing the updated data
 * @return {thenable}    A promise resolved when the update on the database
 * 				is complete
 */
export function editNote(notesRef, key, note) {
    return notesRef.child(key).update(note);
}

/**
 * Calls the remove method on a database reference. Used to delete
 * a note from the user's notes on the database.
 * @param  {Reference} notesRef    A reference to the database pointing at the user notes
 * @param  {object} key    The key of the note to edit on the database
 * @return {thenable}    A promise resolved when the update on the database
 * 				is complete
 */

export function removeNote(notesRef, key) {
    return notesRef.child(key).remove();
}

/**
 * Use this function to subscribe to database changes
 * @param  {Reference} notesRef    A reference to the database pointing at the
 *                                 user notes
 * @param  {function} emitter    The emitter will called with the action containing
 *                               the data relative to the change that was observed.
 * @param  {Action} add    The action to emit for a newly created note
 * @param  {Action} edit    The action to emit for a note edit
 * @param  {Action} remove    The action to emit for a note removal
 * @return {function}   A function to unsubscribe
 */
export function subscribe(notesRef, emitter, {add, edit, remove}) {
    notesRef.on('child_added', (note) => emitter(add(note.key, note.val())));
    notesRef.on('child_changed', (note) => emitter(edit(note.key, note.val())));
    notesRef.on('child_removed', (note) => emitter(remove(note.key, note.val())));
    return () => notesRef.off();
}

/**
 * Returns the path to the users notes on the database given a user id
 * @param {string} uid    The user uid as returned from a successful login
 * @return {string}    The path to create a reference to the user notes
 */
export function getNotesPath(uid) {
    return `users/${uid}/notes`
}

/**
 * Returns an object with the methods needed to add, edit and remove notes
 * already bound to the correct database reference. Also includes a subscribe
 * methodkj to connect external channels or streams to the firebase events.
 * @param {Reference} notesRef    A database reference to the user notes
 * @param {function} addNoteMethod    The method used to add notes on the database
 * @param {function} editNoteMethod    The method used to update notes on the database
 * @param {function} removeNoteMethod    The method used to delete notes on the database
 * @param {function} subscribeMethod    The method used to subscribe an external
 * 					channel or stream to the firebase events
 * @return {object}    An object with add, edit, remove and subscribe methods
 */
export function createNotesHandler(
    notesRef,
    addNoteMethod,
    editNoteMethod,
    removeNoteMethod,
    subscribeMethod
) {

    return {
        add: addNoteMethod.bind(null, notesRef),
        edit: editNoteMethod.bind(null, notesRef),
        remove: removeNoteMethod.bind(null, notesRef),
        subscribe: subscribeMethod.bind(null, notesRef)
    }
}

/**
 * Returns an handler created with createNotesHandler, with its methods bound
 * to the database reference pointing at the user notes.
 * @param {string} uid    The user uid as returned from a successful login
 * @return {object}    The handler bound to the correct database reference
 */
export default function getNotesHandlerByUserId(uid) {
    let notesRef = firebaseDb.ref(getNotesPath(uid));
    return createNotesHandler(notesRef, addNote, editNote, removeNote, subscribe)
}
