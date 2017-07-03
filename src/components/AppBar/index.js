import React, {Component} from 'react';
import PropTypes from 'prop-types';
import inject from 'react-jss';
import COLORS from 'style/colors';
import {FlexBox, FlexItem} from 'components/Flex'

const styles = {
    bar: {
        width: '100%',
        backgroundColor: COLORS.appBar.string()
    },
    inner: {
        boxSizing: 'border-box',
        padding: '10px',
        fontSize: '24px',
        fontWeight: '700',
        fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
        color:  COLORS.lightText.string(),
    },
    logo: {
        display: 'inline-block',
        marginRight: 'auto',
        lineHeight: '42px'
    },
    actions: {
        display: 'inline-block',
        marginLeft: 'auto',
    }
}
class AppBar extends Component {
    render() {
        let {classes, logo, actions} = this.props;
        return (
            <div className={classes.bar}>
                <FlexBox 
                    alignItems="center" 
                    direction="row" 
                    className={classes.inner}
                >
                    <FlexItem fixed className={classes.logo}>
                        {logo}
                    </FlexItem>
                    <FlexItem fixed className={classes.actions}>
                        {actions}
                    </FlexItem>
                </FlexBox>
            </div>
        )
    }
}

export default inject(styles)(AppBar);

AppBar.propTypes = {
    /**
     * An element containing the logo or the title of the app
     */
    logo: PropTypes.node,

    /**
     * An element (or an array of elements) containing the interactable objects
     * that will be shown on the right side of the AppBar
     */
    actions: PropTypes.node,
}
