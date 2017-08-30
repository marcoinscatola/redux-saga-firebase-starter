import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addMessages} from './actions';
import {getLocalizedMessage, getLocale} from './selectors';
import hash from 'object-hash';
import castArray from 'lodash/castArray'
import messageFormat from 'intl-messageformat';
import isEqual from 'lodash/isEqual';

/**
 * @typedef {Object.<string, string>} translations 
 * @typedef {Object.<string, translations>} localizedMessages 
 * @typedef {messages: localizedMessages, hash: string} collection
 */
/**
 * Creates a collection from a messages object. The collection contains the 
 * messages and the hash of the messages, so that we can avoid loading the 
 * same collection multiple times
 * @param {localizedMessages} messages The object containing the messages 
 *                                     in the different languages
 * @return {collection} The collection with the messages and the hash
 */
export const makeCollection = messages => ({
    messages,
    hash: hash(messages, {encoding:'base64'})
})

/**
 * The localize HOC connects a component to the redux store specifying which
 * message collections the component will use. 
 * The messages can then be used with the FormattedMessage component or by assigning
 * a message ID to a prop in the messageIds parameter.
 * @param {object} param
 * @param {collection[]} param.collections an array of message collections
 * @param {Object.<string, string>} param.messageIds a dictionary {propName: message ID}
 */
export const localize = ({collections=[], messageIds={}}) => WrappedComponent => {
    collections = castArray(collections);
    @connect(
        state => {
            let i18nLocale = getLocale(state);
            let i18nMessages = Object.keys(messageIds).reduce((props, propName) => {
                let messageId = messageIds[propName];
                if (!messageId) return props;
                let message = getLocalizedMessage(state, messageId);
                props[propName] = message;
                return props;
            },{})
            return {
                i18nLocale,
                i18nMessages
            }
        },
        dispatch => ({
            addLocalizedMessages: (...collections) => dispatch(addMessages(...collections))
        })
    )
    class LocalizedComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                messageFormats: this.getMessageFormats(props.i18nMessages, props.i18nLocale)
            }
        }

        getMessageFormats(messages, locale) {
            return Object.keys(messages).reduce((formats, propName) => {
                let message = messages[propName]
                formats[propName] = new messageFormat(message, locale);
                return formats;
            }, {})
        } 

        // before component mount add the collections to the store
        componentWillMount() {
            this.props.addLocalizedMessages(...collections)
        }

        shouldComponentUpdate(nextProps, nextState) {
            let {i18nMessages, ...otherProps} = this.props;
            let {i18nMessages:i18nMextMessages, ...nextOtherProps} = nextProps;
            let messagesChanged = !isEqual(i18nMessages, i18nMextMessages);
            let otherPropsChanged = !isEqual(otherProps, nextOtherProps);
            let stateChanged = this.state !== nextState;
            return otherPropsChanged || messagesChanged || stateChanged
        }

        componentWillReceiveProps(nextProps) {
            let localeChanged = nextProps.i18nLocale !== this.props.i18nLocale;
            let messagesChanged = Object.keys(nextProps.i18nMessages).filter((propName) => {
                let message = nextProps.i18nMessages[propName]
                return this.props.i18nMessages[propName] !== message
            }).length > 0;
            if (localeChanged || messagesChanged)
                this.setState({
                    messageFormats: this.getMessageFormats(nextProps.i18nMessages, nextProps.i18nLocale)
                })
        }

        render() {
            let {addLocalizedMessages, i18nMessages, i18nLocale, ...otherProps} = this.props;
            let {messageFormats} = this.state;
            return <WrappedComponent {...messageFormats} {...otherProps} />
        }
    }
    return LocalizedComponent;
}