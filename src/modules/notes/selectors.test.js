import * as noteSelectors from './selectors'
const exampleState = {
    notes: {
        list: ['1','2','xyz'],
        byKey: {
            '1': {
                title: 'title1',
                text: 'text1'
            },
            '2': {
                title: 'title2',
                text: 'text2'
            },
            xyz: {
                title: 'titlexyz',
                text: 'textxyz'
            },
        }
    }
}

test('notes returns the notes slice', () => {
    expect(noteSelectors.notes(exampleState)).toBe(exampleState.notes)
})

test('keys returns an array with the note keys', () => {
    expect(noteSelectors.keys(exampleState)).toBe(exampleState.notes.list)
})

test('byKey returns the note corresponding to the key', () => {
    expect(noteSelectors.byKey(exampleState, '2')).toBe(exampleState.notes.byKey['2'])
})

test('byKey returns null if the note doesn\'t exist', () => {
    expect(noteSelectors.byKey(exampleState, 'nosuchkey')).toBeNull()
})

test('list returns a list of the notes in the store', () => {
    expect(noteSelectors.list(exampleState)).toEqual([
        {
            title: 'title1',
            text: 'text1'
        }, {
            title: 'title2',
            text: 'text2'
        }, {
            title: 'titlexyz',
            text: 'textxyz'
        }
    ])
})
