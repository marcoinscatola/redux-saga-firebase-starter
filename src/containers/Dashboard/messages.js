import {makeCollection} from 'modules/i18n'
export default makeCollection({
    en: {
        'NoteForm.titlePlaceholder': 'Title',
        'NoteForm.textPlaceholder': 'Text',
        'NoteForm.addNew': 'Add new',
        'Note.remove': 'Remove',
        'Dashboard.youHaveNumNotes': 'You have {numNotes, plural, '
            + '=0 {no notes} ' 
            + '=1 {one note} '  
            + 'other {# notes}'
            + '}'
    },
    it: {
        'NoteForm.titlePlaceholder': 'Titolo',
        'NoteForm.textPlaceholder': 'Testo',
        'NoteForm.addNew': 'Aggiungi',
        'Note.remove': 'Elimina',
        'Dashboard.youHaveNumNotes': 'Hai {numNotes, plural, '
            + '=0 {zero note} ' 
            + '=1 {una nota} '  
            + 'other {# note}'
            + '}'
    }
})
