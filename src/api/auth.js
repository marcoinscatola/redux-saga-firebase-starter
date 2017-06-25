import {firebaseApp, firebaseAuth} from 'api/firebase';

/**
 * Return the current logged in user or null
 */
export function getFirebaseCurrentUser() {
    return firebaseAuth.currentUser;
}

/**
 * Subscribe to the onAuthStateChanged event and returns a promise that will
 * resolve the next time the auth state changes. Useful to get the auth status
 * at initialization time since firebase will asynchronously trigger the event
 * with the previously logged-in user (or null) after initialization
 */
export function checkAuthState() {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(
            user => {
                unsubscribe();
                resolve(user);
            },
            error => {
                unsubscribe();
                reject(`${error.code} - ${error.message}`);
            },
        )
    })

}

/**
 * Attempt a user sign up with the provided email and password and returns a
 * promise with the user data, if successful
 */
export function firebaseSignupEmail(email, password) {
    return new Promise((resolve, reject) => {
        firebaseAuth.createUserWithEmailAndPassword(email, password)
        .catch(error => {
            reject(`${error.code} - ${error.message}`)
        })
        .then(res => {
            resolve(firebaseAuth.currentUser)
        })
    })
}

/**
 * Attempt a user log in with the provided email and password and returns a
 * promise with the user data, if successful
 */
export function firebaseLoginEmail(email, password) {
    return new Promise((resolve, reject) => {
        firebaseAuth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            reject(`${error.code} - ${error.message}`)
        })
        .then(res => {
            resolve(firebaseAuth.currentUser)
        })
    })
}

/**
 * Attempt a user log in with google. The user will be taken to a different page
 * to login with their google credential and then will be redirected to the page
 * the app. The auth result will be handled by the initialization method in
 * src/index.js
 */
export function firebaseLoginGoogle() {
    return new Promise((resolve, reject) => {
        let googleProvider = new firebaseApp.auth.GoogleAuthProvider();
        firebaseAuth.signInWithRedirect(googleProvider)
        // .catch(error => {
        //     reject(`${error.code} - ${error.message}`)
        // })
        // .then(res => {
        //     resolve(firebaseAuth.currentUser)
        // })
    })
}

/**
 * Attempt a user logout and returns a promise
 */
export function firebaseLogout() {
    return new Promise((resolve, reject) => {
        firebaseAuth.signOut()
        .catch(error => {
            reject(`${error.code} - ${error.message}`)
        })
        .then(res => {
            resolve(res)
        })
    })
}
