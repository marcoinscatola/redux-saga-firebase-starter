import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppBar from 'containers/AppBar';
import {FlexBox, FlexItem} from 'components/Flex';
import {withRouter} from 'react-router-dom';
import flow from 'lodash/flow';
class App extends Component {
    render() {
        let {children} = this.props;
        return (
            <FlexBox direction='column'>
                <AppBar/>
                <FlexItem>
                    {children}
                </FlexItem>
            </FlexBox>
        )
    }
}

let enhance = flow(
    connect(),
    withRouter
)
export default enhance(App);
