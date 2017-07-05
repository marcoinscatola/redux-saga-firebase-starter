##### Demo: [redux-saga-firebase-starter.firebaseapp.com](https://redux-saga-firebase-starter.firebaseapp.com)
This project aims to be a simple starting point in implementing redux and firebase in a react app. Redux-saga is used to handle side-effects.
At this moment it's just a learning project but I'm hoping to make it into something that can be useful for people that are looking into adopting a similar stack.
Even if not suitable for production, reading the comments and the tests should give you some ideas on how to make your own implementation.

### Setup
1. Clone this repo with `git clone https://github.com/marcoinscatola/redux-saga-firebase-starter.git`
2. Move to the directory: `cd redux-saga-firebase-starter`.
3. Create a `.env` file containing your firebase config. Example:
    ```
    REACT_APP_API_KEY=<YOUR_API_KEY>
    REACT_APP_AUTH_DOMAIN=<YOUR_PROJECT_ID>.firebaseapp.com
    REACT_APP_DATABASE_URL=https://<DATABASE_NAME>.firebaseio.com
    REACT_APP_PROJECT_ID=<YOUR_PROJECT_ID>
    REACT_APP_STORAGE_BUCKET=<YOUR_BUCKET>.appspot.com
    REACT_APP_MESSAGING_SENDER_ID=<YOUR_SENDER_ID>
    ```
    You can find your configuration by following the firebase docs [here](https://firebase.google.com/docs/web/setup).
4. Run `npm install` in order to install dependencies.

5. Run `npm start` to launch the app on the local development server

### Deploy
1. Run `npm run build`. This will create the files for your production app in the `/build` folder
2. Create a `.firebaserc` file with the following configuration:
```js
{
  "projects": {
    "default": "YOUR_PROJECT_ID"
  }
}
```
3. Install firebase CLI with `npm install -g firebase-tools`
4. Run `firebase login` and access with your account
5. Run `firebase use default`. This will select the project you specified in the `.firebaserc` file
6. Run `firebase deploy`.
7. After this setup, every time you need to deploy just run `npm run build` and `firebase deploy`

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and uses its basic scripts for starting a development server, building and testing.

The NODE_PATH env variable is set to ./src in every script to allow for absolute imports (e.g. ```import Button from 'components/Button'``` instead of ```import Button from '../../components/Button'```)
