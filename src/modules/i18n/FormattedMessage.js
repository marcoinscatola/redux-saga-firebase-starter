/**
 * The FormattedMessage component should be used to render texts that were 
 * previously added to the redux store either with the localize HOC or by 
 * dispatching an ADD_MESSAGES action.
 * The texts will be automatically synced with the current locale, choosing 
 * the appropriate translation. Parameters can be passed to the args prop to 
 * insert dynamic data into the texts, 
 * see https://github.com/yahoo/intl-messageformat#formatvalues-method 
 * This component can be useful if the messageId itself is dynamic depending 
 * on the parent component state, but you have to make sure that the 
 * collection containing the message was (or will be) added to the store
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getLocale, getLocalizedMessage} from './selectors'
import messageFormat from 'intl-messageformat';
import isString from 'lodash/isString';

@connect(
    (state, ownProps) => ({
        locale: getLocale(state),
        localizedMessage: getLocalizedMessage(state, ownProps.id)
    })
)
export default class FormattedMessage extends Component {
    constructor(props) {
        super(props);
        this.messageFormat = null;
    }
    
    componentWillMount() {
        let {localizedMessage, locale} = this.props;
        if (!isString(localizedMessage)) return;
        this.messageFormat = new messageFormat(localizedMessage, locale);
    }

    componentWillReceiveProps({localizedMessage:nextMessage, locale:nextLocale}) {
        
        let {locale, localizedMessage} = this.props;
        if (!isString(localizedMessage)) {
            this.messageFormat = null;
            return;
        }
        if (locale !== nextLocale || localizedMessage !== nextMessage)
            this.messageFormat = new messageFormat(nextMessage, nextLocale)
    }

    render() {
        const {locale, localizedMessage, ...otherProps} = this.props;
        if (!this.messageFormat) return null;
        return (
            <span>{this.messageFormat.format(otherProps)}</span>
        )
    }
}

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