import React, {Component} from 'react';
import PropTypes from 'prop-types';
import inject from 'react-jss';
import COLORS from 'style/colors';

const styles = {
    bar: {
        width: '100%',
        backgroundColor: COLORS.appBar.string()
    },
    inner: {
        padding: '10px',
        fontSize: '24px',
        fontWeight: '700',
        fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
        color:  COLORS.lightText.string(),
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        }
    },
    logo: {
        float: 'left',
        display: 'inline-block',
        marginLeft: '5px',
        lineHeight: '42px'
    },
    actions: {
        float: 'right',
        display: 'inline-block',
        marginRight: '5px'
    }
}
class AppBar extends Component {
    render() {
        let {classes, logo, actions} = this.props;
        return (
            <div className={classes.bar}>
                <div className={classes.inner}>
                    <div className={classes.logo}>
                        {logo}
                    </div>
                    <div className={classes.actions}>
                        {actions}
                    </div>
                </div>
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
