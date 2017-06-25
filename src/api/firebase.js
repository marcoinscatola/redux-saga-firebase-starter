import firebase from 'firebase';

/**
 * Config your firebase parameters in a .env.development.local file or a
 * .env.production.local file with the following variables.
 * Make sure their names start with REACT_APP_ otherwise they'll
 * be filtered out during the build step by the create-react-app scripts
 */
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
firebase.initializeApp(config);
export const firebaseApp = firebase
export const firebaseAuth = firebase.auth();
export const firebaseDb = firebase.database();

window.firebase = firebase
