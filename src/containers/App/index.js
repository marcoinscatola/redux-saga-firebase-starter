import React, {Component} from 'react';
import AppBar from 'containers/AppBar';
import {FlexBox, FlexItem} from 'components/Flex';
import {withRouter} from 'react-router-dom';
import flow from 'lodash/flow';
import inject from 'react-jss';
import COLORS from 'style/colors';
const styles = {
    workarea: {
        backgroundColor: COLORS.background,
        color: COLORS.secondary
    }
}


class App extends Component {
    render() {
        let {children, classes} = this.props;
        return (
            <FlexBox direction='column'>
                <AppBar/>
                <FlexItem className={classes.workarea}>
                    {children}
                </FlexItem>
            </FlexBox>
        )
    }
}

let enhance = flow(
    inject(styles),
    withRouter
)
export default enhance(App);
