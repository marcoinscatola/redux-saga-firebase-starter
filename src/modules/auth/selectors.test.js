import * as authSelectors from './selectors';

const state = {
    auth: {
        loggedIn: true,
        user: {
            uid: 1,
            name: 'test'
        }
    }
}

test('loggedIn selector selects the correct value from the state', () => {
    expect(authSelectors.loggedIn(state))
    .toEqual(true)
})

test('user selector selects the correct value from the state', () => {
    expect(authSelectors.user(state))
    .toEqual({
        uid: 1,
        name: 'test'
    })
})
