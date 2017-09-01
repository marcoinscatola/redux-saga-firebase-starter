import React, { Component } from "react";
import { makeCollection, localize } from "./utils";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import { configureStore } from "store";
import * as actions from "./actions";
import ConnectedFormattedMessage from './FormattedMessage';

const FormattedMessage = ConnectedFormattedMessage.WrappedComponent;

describe('FormattedMessage', () => {

    it('should render without errors', () => {
        shallow(<FormattedMessage />)
    })

    it('should accept a localizedMessage prop', () => {
        const localizedMessage = 'Test message'
        let wrapper = shallow(<FormattedMessage localizedMessage={localizedMessage}/>)
        expect(wrapper.text()).toBe(localizedMessage)
    })

    it('should accept a locale prop', () => {
        const localizedMessage = 'Test message'
        let wrapper = shallow(
            <FormattedMessage 
                localizedMessage={localizedMessage}
                locale="it"
            />)
        expect(wrapper.text()).toBe(localizedMessage)
    })

    it('should format messages with params', () => {
        const localizedMessage = 'Hello, {name}'
        let wrapper = shallow(
            <FormattedMessage 
                localizedMessage={localizedMessage}
                name="Marco"
            />)
        expect(wrapper.text()).toBe('Hello, Marco')
        wrapper.setProps({name: 'Francesco'})
        expect(wrapper.text()).toBe('Hello, Francesco')
    })

    it('should format numbers according to locale', () => {
        const localizedMessage = 'Your score is {score, number}'
        let wrapper = shallow(
            <FormattedMessage 
                localizedMessage={localizedMessage}
                locale="en"
                score={13000.5}
            />)
        expect(wrapper.text()).toBe('Your score is 13,000.5')
        wrapper.setProps({locale:'it'})
        expect(wrapper.text()).toBe('Your score is 13.000,5')
    })
    
    it('should format messages with the correct plural form', () => {
        let localizedMessageEn = `You have {numMessages, plural, =0 {no messages.} =1 {one message.} other {# messages.}}`
        let localizedMessageIt = `{numMessages, plural, =0 {Non hai nessun messaggio.} =1 {Hai un messaggio.} other {Hai # messaggi.}}`
        let wrapper = shallow(
            <FormattedMessage 
                localizedMessage={localizedMessageEn}
                locale="en"
                numMessages={0}
            />);
        expect(wrapper.text()).toBe('You have no messages.')
        wrapper.setProps({
            locale: 'it',
            localizedMessage: localizedMessageIt,
            numMessages: 1
        })
        expect(wrapper.text()).toBe('Hai un messaggio.')
        wrapper.setProps({
            numMessages: 10
        })
        expect(wrapper.text()).toBe('Hai 10 messaggi.')
    })
})