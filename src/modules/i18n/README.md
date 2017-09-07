## modules/i18n
- [Example](#example)
- [How it works](#how)
    - [Messages with parameters](#parameters)
- [API](#API)
    - [makeCollection](#makeCollection)
    - [localize](#localize)
    - [FormattedMessage](#FormattedMessage)
    - [actions](#actions)
- [Change the default locale](#default)
- [Add locale data](#locale-data)

### <a name="example"></a>Example
The core of the i18n module is the `localize` Higher-Order Component combined with the `makeCollection` utility.  
You can define your translated messages with this structure:
```js
// messages.js
import {makeCollection} from 'modules/i18n'
export default makeCollection({
    en: {
        hello: "Hello!",
        goodbye: "Goodbye."
    },
    it: {
        hello: "Ciao!",
        goodbye: "Arrivederci."
    }
}
```
You can then use the collection with the `localize` HOC to use the translated messages in your components.
See the [localize](#localize) section for details.
<a name="localize-example"></a>
```js
import React, { Component } from 'react';
import { localize } from 'modules/i18n';
import collection from './messages';

@localize({
    collections: collection,
    messageIds: {
        helloMessage: 'hello',
        goodbyeMessage: 'goodbye'
    }
})
export default class Greeting extends Component {
    render() {
        let {helloMessage, goodbyeMessage} = this.props;
        return (
            <div>
                <p>{helloMessage.format()}</p>
                <p>{goodbyeMessage.format()}</p>
            </div>
        )
    }
}
```

### <a name="how"></a>How it works
The module keeps the current locale and all the translations in the redux store in a series of dictionary objects, one for each locale:
```js
    locale: 'en',
    messages: {
        it: {
            hello: 'Ciao!',
            goodbye: 'Arrivederci.'
        },
        en: {
            hello: 'Hello!',
            goodbye: 'Goodbye.'
        }
    }
```
You can change the locale by dispatching a `CHANGE_LOCALE` action with the new locale string, i.e. 
```js
import { changeLocale } from 'modules/i18n/actions';
/* ... */
dispatch(changeLocale('it'))
```  
Messages are added to the store by dispatching an `ADD_MESSAGES` action. The `addMessages` action creator accepts `collections` of messages, that you can create with the `makeCollection` utility.
Dispatching the `ADD_MESSAGES` action multiple times with the same collection will return the current state, so it's fine to refer to the same collection for multiple components.
> If you use the localize HOC you don't need to manually dispatch the ADD_MESSAGES action as that is done for you on component mount.

Once the messages are in the store all that is left is how to display them.
If you are using the localize HOC you can select which messages you need to use in the wrapped component by passing a dictionary object as `messageIds`, where the key is the name of the prop that will contain the message formatter and the value is the message id. In the previous example
```js
@localize({
    collections: collection,
    messageIds: {
        helloMessage: 'hello',
        goodbyeMessage: 'goodbye'
    }
})
```
The wrapped component will receive 2 additional props, `helloMessage` and `goodbyeMessage`, containing the message formatter for the messages with id `hello` and `goodbye` respectively.
In the component you can then use the `format` method of those properties to obtain the translated message.
```js 
// will return Ciao! if the locale is set to 'it' or Hello! if the locale is set to 'en'
helloMessage.format() 
```
As an alternative you can use the `FormattedMessage` component that takes an `id` prop and renders the translated message corresponding to that id:
```js
    // will render Ciao! if the locale is set to 'it' or Hello! if the locale is set to 'en'
    <FormattedMessage id="hello" />
```
Note that the `FormattedMessage` component won't add messages to the store by itself, so you have to make sure that the messages were already added either with the `localize` HOC or by manually dispatching `ADD_MESSAGES` actions.

### <a name="parameters"></a>Messages with parameters
Internally this module uses the [`intl-messageformat`](https://github.com/yahoo/intl-messageformat/) library, so it's possible to create dynamic messages that accept parameters and/or format dates and numbers: 
```js
// messages.js
import {makeCollection} from 'modules/i18n'
export default makeCollection({
    en: {
        greeting: "Hello {name}!",
        lastLogin: "Your last login was on {lastLogin, date}",
        unread: "You have {unreadNum, plural, " + 
            "=0 {zero unread notifications}" +
            "=1 {one unread notification}" +
            "other {# unread notifications}}"
    },
    en: {
        greeting: "Ciao {name}!",
        lastLogin: "Il tuo ultimo accesso risale al {lastLogin, date}",
        unread: "Hai {unreadNum, plural, " + 
            "=0 {zero notifiche da leggere}" +
            "=1 {una notifica da leggere}" +
            "other {# notifiche da leggere}}"
    },
}
```

```js
// Welcome.js
import React, { Component } from 'react';
import { localize } from 'modules/i18n';
import collection from './messages';

@localize({
    collections: collection,
    messageIds: {
        greetingMessage: 'greeting',
        lastLoginMessage: 'lastLogin',
        unreadMessage: 'unread'
    }
})
export default class Welcome extends Component {
    render() {
        let { 
            // messages
            greetingMessage, lastLoginMessage, unreadMessage, 
            // other props
            userName, lastLogin, unread
        } = this.props;
        return (
            <div>
                <p>{greetingMessage.format({name: userName)}</p>
                <p>{lastLoginmessage.format({lastLogin)}</p>
                <p>{unreadMessage.format({unread)}</p>
            </div>
        )
    }
}
```
```js 
    <Welcome 
        name="Marco" 
        lastLogin={new Date(2016, 11, 20)} 
        unread={5}
    />
    /* 
    It will render this if the locale is set to 'it'
    <div>
        <p>
            <span>Ciao Marco!</span>
        </p>
        <p>
            <span>Il tuo ultimo accesso risale al 20 novembre 2016</span>
        </p>
        <p>
            <span>Hai 5 notifiche da leggere</span>
        </p>
    </div>
    */
```
Assuming that you've already added the messages in the store you can use the `FormattedMessage` component with dynamic parameters too, just pass them to the `args` prop.
```js
    <FormattedMessage id="greeting" args={{name: 'Francesco'}} />
    // <span>Ciao Francesco!</span>
```

## <a name="API"></a>API
### <a name="makeCollection"></a>makeCollection
The `makeCollection` utility takes an object containing messages translated in various languages and returns a collection object. A collection object is basically an object containing the messages and a hash, and it can be used in the payload for the `ADD_MESSAGE` action. The hash is checked to avoid loading the same messages multiple times causing useless rerenders.
```js
import {makeCollection} from 'modules/i18n';
let collection = makeCollection({
    en: {
        happybday: 'Happy birthday!',
        merryxmas: 'Merry Christmas!'
    },
    it: {
        happybday: 'Buon compleanno!',
        merryxmas: 'Buon Natale!'
    }
})
console.log(collection)
/*{
    messages: {
        en: {
            happybday: 'Happy birthday!',
            merryxmas: 'Merry Christmas!'
        },
        it: {
            happybday: 'Buon compleanno!',
            merryxmas: 'Buon Natale!'
        }
    },
    hash: "LttOVaUcH1MZ5fW1Lg+vN1ZAPa8="
}*/
```
### <a name="localize"></a>localize
The `localize` HOC is the recommended way to add localization to your app. It accepts a configuration object as the only parameter. The configuration has the following structure: 
```js
{
    collections, // a collection object or an array of collection objects
    messageIds, // an object mapping message ids to props
}
```
In most cases you will pass the collections containing the messages that your component is going to use and then specify which message will be mapped to which prop. In the component you can then call the `format` method of those props to obtain the localized messages. See the [example](#localize-example) and also the [Messages with parameters](#parameters) section for details about advanced formatting. 

### <a name="FormattedMessage"></a>FormattedMessage
For most situations the `localize` HOC is all you need to translate your components.  
One limitation of the `localize` HOC is that you cannot change which message is associated to a prop dynamically after the component is declared.
There might be some cases where you want to localize a message but you don't know the message id before hand, for example if you are receiving translated messages from a server. In this case the `FormattedMessage` component might be a better fit since you can change the message id dynamically like with any other prop.
The `FormattedMessage` component accepts 2 props: 
```js
FormattedMessage.propTypes = {
    /**
     * The message id as declared in the collection
     */
    id: PropTypes.string,
    /**
     * Optional arguments to format the message, see https://github.com/yahoo/intl-messageformat
     * Example: 
     * message: 'Hello, {name}',
     * args: {name: 'Marco'}
     * formatted message: 'Hello, Marco'
     */
    args: PropTypes.object
}
```
Let's say that your app can receive an array of unread notifications and those notifications are structured like this
```js
{
    notificationId: 'N01',
    translations: {
        en: {
            N01: 'This is a notification'
        },
        it: {
            N01: 'Questa è una notifica'
        },
        /* other languages here ... */
}
```
You could then design a component to show the notifications like this: 
```js
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchNotifications} from 'api';
import {FormattedComponent, makeCollection, i18nActions} from 'modules/i18n';
const {addMessages} = i18nActions;

@connect(
    null,
    dispatch => ({
        addMessages: messages => {
            // create collections from messages and add them to the store
            let collections = messages.map(makeCollection);
            dispatch(addMessages(...collections))
        }
    })
)
class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        }
    }
    componentDidMount() {
        fetchNotifications()
        .then(notifications => {
            // extract the translated messages from the notifications array
            let messages = notifications.map(n => n.translations)
            // add messages to the store (see connect)
            this.props.addMessages(messages);
            // set notifications object to the state
            this.setState({notifications})
        })
    }
    render() {
        return (
            <div>
                {this.state.notifications.map(notification => (
                    <p key={notification.id}>
                        // the notification id is also the message id (see the notification structure)
                        <FormattedMessage id={notification.id} />
                    </p>
                ))}
            </div>
        )
    }
}
```

### <a name="actions"></a>actions
The i18n reducer handles only 2 actions:
The `ADD_MESSAGES` action (`addMessages` action creator) can be dispatched to add localized messages to the redux store, so that they can then be displayed with the `localize` HOC or the `FormattedMessage` component.  
The `addMessages` action creator accepts a series of collections as parameters: 
```js
import {makeCollection} from 'modules/i18n/utils';
import {addMessages} from 'modules/i18n/actions';

const holidayCollection = makeCollection({
    en: {
        happybday: 'Happy birthday!',
        merryxmas: 'Merry Christmas!'
    },
    it: {
        happybday: 'Buon compleanno!',
        merryxmas: 'Buon Natale!'
    }
})

const greetingCollection = makeCollection({
	en: {
        hello: "Hello!",
        goodbye: "Goodbye."
    },
    it: {
        hello: "Ciao!",
        goodbye: "Arrivederci."
    }
})



/* somewhere else in your code */
let action = addMessages(greetingCollection, holidayCollection)
dispatch(action)
// this will add the happybday, merryxmas, hello and goodbye messages to the store
```

The `CHANGE_LOCALE` action (`changeLocale` action creator) is straightforward, the payload is the code of the new locale. 
```js
import {changeLocale} from 'modules/i18n/actions';
dispatch(changeLocale('it'))
// changes the current locale to italian
```
The locale string must correspond to the property containing the translated messages:
```js
// if your messages are structured like this:
{
    it: {
        messageId: "Questo è un messaggio"
    },
    en: {
        messageId: "This is a message"
    }
}
// these will work
dispatch(changeLocale('en'));
dispatch(changeLocale('it'));
// but these will NOT work
dispatch(changeLocale('en-US'));
dispatch(changeLocale('it-IT'));
```
Internally the module uses the [`intl-messageformat`](https://github.com/yahoo/intl-messageformat/) library so it's better to use a locale string format that is compatible with it, otherwise you might get messed up dates and numbers formatting.

### <a name="default"></a>Change the default locale
The default locale is defined as a constant in the `modules/i18n/config.js` file.
```js 
export const DEFAULT_LOCALE = 'en'
```
You can change the default value or implement a logic that sets it according to the user's browser
### <a name="locale-data"></a>Add locale data
The starter project supports 2 languages (English and Italian), if you need to support other languages you'll need to add the corresponding locale data so that the module can correctly format dates, numbers and plurals.
To add support for more locales you can edit the `modules/i18n/index.js` file:
```js
// modules/i18n/index.js
/* ... */
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/it.js');
// add more requires here to support more locales (for number/date formatting)

require('intl-messageformat/dist/locale-data/it')
// add more requires here to support more locales (for pluralization rules)
/* ... */
```
