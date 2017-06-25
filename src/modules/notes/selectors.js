/**
 * Selects the slice of the store state containing the notes.
 * @param {object} state The redux store state
 * @return object  The notes state slice
 */
export function notes(state) {
    return state.notes;
}
/**
 * Selects the note list from the notes state slice.
 * @param {object} state The redux store state
 * @return Array  An array containing the notes keys
 */
export function keys(state) {
    return notes(state).list;
}

/**
 * Selects a note by the corresponding key
 * @param {object} state The redux store state
 * @param {string} key The key identifying the note
 * @return {?object}  The note object
 */
export function byKey(state, key) {
    return notes(state).byKey[key] || null;
}

/**
 * Selects the note list from the notes state slice.
 * @param {object} state The redux store state
 * @return Array  An array containing the notes
 */
export function list(state) {
    return keys(state).map(key => byKey(state, key));
}
