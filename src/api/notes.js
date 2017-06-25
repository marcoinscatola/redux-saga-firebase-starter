import {firebaseDb} from './firebase';

export function addNote(notesRef, note) {
    return notesRef.push(note);
}

export function editNote(notesRef, key, note) {
    return notesRef.child(key).update(note);
}

export function removeNote(notesRef, key) {
    return notesRef.child(key).remove();
}

/**
 * Use this function to subscribe to database changes
 * @param  {Reference} notesRef A reference to the database pointing at the user notes
 * @param  {function} emitter The emitter will called with the action containing the
 *                            data relative to the change that was observed.
 * @param  {Action} add     The action to emit for a newly created note
 * @param  {Action} edit    The action to emit for a note edit
 * @param  {Action} remove  The action to emit for a note removal
 * @return {function}         A function to unsubscribe
 */
export function subscribe(notesRef, emitter, {add, edit, remove}) {
    notesRef.on('child_added', (note) => emitter(add(note.key, note.val())));
    notesRef.on('child_changed', (note) => emitter(edit(note.key, note.val())));
    notesRef.on('child_removed', (note) => emitter(remove(note.key, note.val())));
    return () => notesRef.off();
}

export function getNotesPath(uid) {
    return `users/${uid}/notes`
}

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

export default function getNotesHandlerByUserId(uid) {
    let notesRef = firebaseDb.ref(getNotesPath(uid));
    return createNotesHandler(notesRef, addNote, editNote, removeNote, subscribe)
}
