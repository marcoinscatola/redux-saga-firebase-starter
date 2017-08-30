import React, { Component } from "react";
import { makeCollection, localize } from "./utils";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { configureStore } from "store";
import * as actions from "./actions";

describe('makeCollection', () => {
    it('should return a collection of localized messages plus a hash parameter', () => {
        const testMessages = {
            'it': {
                testId: 'Test ID (it)'
            },
            'en': {
                testId: 'Test ID (en)'
            }
        }
        let collection = makeCollection(testMessages);
        expect(collection).toEqual({
            messages: testMessages,
            hash: expect.any(String)
        })
    })
})

describe('localize', () => {
    let collection;
    let App;
    let store;
    let renderCount = 0;

    // Helper to quickly get a test component with the localize decorator applied
    function getLocalizedClass(params) {
        @localize(params)
        class Test extends Component {
            renderCount = 0;
            render() {
                renderCount++;
                let {testMessage} = this.props;
                return (
                    <div className="test-class">{testMessage && testMessage.format(this.props)}</div>
                )
            }
        }
        return Test;
    }
    
    // Create test collection
    beforeAll(() => {
        collection = makeCollection({
            'it': {
                'test.id': 'Traduzione',
                'test.id2': 'Traduzione 2',
                'complexMessage': 'Traduzione {param}'
            },
            'en': {
                'test.id': 'Translation',
                'test.id2': 'Translation 2',
                'complexMessage': 'Translation {param}'
            }
        })
    })

    // Reset render count and recreate store and App component before each test
    beforeEach(() => {
        renderCount = 0;
        store = configureStore();
        App = props => (
            <Provider store={store} >
                {props.children}
            </Provider>
        )
    })

    it('should render the base component class', () => {
        let LocalizedTest = getLocalizedClass({collections:collection})
        let wrapper = mount(
            <App>
                <LocalizedTest />
            </App>
        )
        expect(wrapper.find('.test-class').length).toBe(1);
    })

    it('should add the message collection to the store on component mount', () => {
        let LocalizedTest = getLocalizedClass({collections:collection})
        store.dispatch(actions.changeLocale('en'))
        let state = store.getState();
        let messages = state.i18n.messages;
        let loaded = state.i18n.loaded;
        expect(loaded[collection.hash]).not.toBe(true);
        expect(messages).toEqual({})
        mount(
            <App>
                <LocalizedTest />
            </App>
        )
        state = store.getState();
        messages = state.i18n.messages;
        loaded = state.i18n.loaded;
        expect(loaded[collection.hash]).toBe(true);
        expect(messages).toEqual(collection.messages)
    })

    it('shouldn\'t change state on multiple mounts with the same collection', () => {
        let LocalizedTest = getLocalizedClass({collections:collection})
        store.dispatch(actions.changeLocale('en'))
        let initialState = store.getState();
        mount(
            <App>
                <LocalizedTest />
            </App>
        )
        let firstMountState = store.getState();
        let LocalizedTest2 = getLocalizedClass({collections:collection})
        mount(
            <App>
                <LocalizedTest2 />
            </App>
        )
        let secondMountState = store.getState();

        expect(initialState).not.toBe(firstMountState);
        expect(firstMountState).toBe(secondMountState);
    })


    it('should pass the correct props', () => {
        let LocalizedTest = getLocalizedClass({collections:collection, messageIds:{testMessage:'test.id'}})
        store.dispatch(actions.changeLocale('en'))
        let wrapper = mount(
            <App>
                <LocalizedTest />
            </App>
        )
        let connectedComponentWrapper = wrapper.find('Test');
        expect(connectedComponentWrapper.props()).toEqual({testMessage:{format:expect.any(Function)}})
    })

    it('should correctly update props on locale change', () => {
        let LocalizedTest = getLocalizedClass({collections:collection, messageIds:{testMessage:'test.id'}})
        store.dispatch(actions.changeLocale('en'))
        let wrapper = mount(
            <App>
                <LocalizedTest />
            </App>
        )
        let connectedComponentWrapper = wrapper.find('Test');
        let props = connectedComponentWrapper.props();
        expect(props.testMessage.format()).toBe('Translation')
        store.dispatch(actions.changeLocale('it'))
        props = connectedComponentWrapper.props();
        expect(props.testMessage.format()).toBe('Traduzione')
    })

    it('should correctly format messages', () => {
        let LocalizedTest = getLocalizedClass({collections:collection, messageIds:{testMessage:'complexMessage'}})

        /** 
         * Wrapper that will pass test props to the LocalizedTest component.
         * The onclick handler will increment the state and pass the updated state
         * as a prop to the LocalizedTest component. 
         * (I couldn't find an easier way to change props on a mounted component
         * that is not the root component) 
         */
        class LocalizedTestWrapper extends Component {
            state = {
                test: 1
            }
            handleClick = () => {
                this.setState(s => ({test:s.test +1}))
            }
            render() {
                return (
                    <div onClick={this.handleClick}>
                        <LocalizedTest param={this.state.test} />
                    </div>
                )
            }
        }

        store.dispatch(actions.changeLocale('en'))

        let wrapper = mount(
            <App>
                <LocalizedTestWrapper />
            </App>
        )

        // get the formatted message, it should be "Translation "+ param
        let formattedMessage = wrapper.text();
        expect(formattedMessage).toBe('Translation 1')

        // changing locale should still correctly format the message in the
        // new language
        store.dispatch(actions.changeLocale('it'))
        formattedMessage = wrapper.text();
        expect(formattedMessage).toBe('Traduzione 1')

        // simulate a click to change the param prop and check that the
        // text updates
        wrapper.find('LocalizedTestWrapper').simulate('click')
        formattedMessage = wrapper.text();
        expect(formattedMessage).toBe('Traduzione 2')
    })

    it('shouldn\'t re-render on unrelated dispatches', () => {
        let LocalizedTest = getLocalizedClass({collections:collection, messageIds:{testMessage:'complexMessage'}})
        store.dispatch(actions.changeLocale('en'))
        mount(
            <App>
                <LocalizedTest param="test"/>
            </App>
        )
        let initialRenderCount = renderCount;
        store.dispatch(actions.changeLocale('it'))
        let expectedRenderCount = initialRenderCount + 1
        expect(renderCount).toBe(expectedRenderCount)
        
        // dispatch an addMessages action that adds messages unrelated to
        // the test component
        let unrelatedCollection = makeCollection({
            'it': {
                'unrelated.id': 'Traduzione',
            },
            'en': {
                'unrelated.id': 'Translation',
            }
        })
        store.dispatch(actions.addMessages(unrelatedCollection))
        
        expect(renderCount).toBe(expectedRenderCount)
    })
})

