import React, {Component} from 'react';
import AppBar from 'containers/AppBar';
import {FlexBox, FlexItem} from 'components/Flex';
import {withRouter} from 'react-router-dom';
import flow from 'lodash/flow';
import inject from 'react-jss';
import COLORS from 'style/colors';
const styles = {
    workarea: {
        backgroundColor: COLORS.background.string(),
        color: COLORS.lightText.string(),
        boxSizing: 'border-box',
        display: 'flex',
        position: 'relative'
    },
    innerWorkarea: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        overflow: 'hidden',
        overflowY: 'auto'
    },
}


class App extends Component {
    render() {
        let {children, classes} = this.props;
        return (
            <FlexBox direction='column'>
                <AppBar/>
                <FlexItem className={classes.workarea}>
                    <div className={classes.innerWorkarea}>
                        {children}
                    </div>
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
