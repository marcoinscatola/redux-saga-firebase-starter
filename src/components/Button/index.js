import React, {Component} from 'react';
import PropTypes from 'prop-types';
import inject from 'react-jss';
import cx from 'classnames';
import COLORS from 'style/colors';
const styles = {
    button: {
        fontWeight: '500',
        textTransform: 'uppercase',
        color: COLORS.darkText.string(),
        backgroundColor:  COLORS.secondary.string(),
        display: 'inline-block',
        height: '36px',
        padding: '0 26px',
        margin: '6px 0',
        border: 'none',
        borderRadius: '2px',
        cursor: 'pointer',
        touchAction: 'manipulation',
        backgroundImage: 'none',
        textAlign: 'center',
        lineHeight: '36px',
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        fontSize: '14px',
        fontFamily: 'inherit',
        letterSpacing: '.03em',
        transition: 'all 0.3s',
        outline: 'none',
        '&+$button': {
            marginLeft: 8
        },
        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
            boxShadow: 'none'
        },
        '&:hover': {
            boxShadow: '0 0 2px rgba(0,0,0,.12), 0 2px 2px rgba(0,0,0,.2)',
            backgroundColor: COLORS.secondary.lighten(0.2).string()
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: COLORS.secondary.darken(0.2).string()
        }
    },
    outline: {
        color: COLORS.secondary.string(),
        backgroundColor: 'transparent',
        border: '1px solid ' + COLORS.secondary.string()
    },
    primary: {
        backgroundColor: COLORS.primary.string(),
        color: COLORS.lightText.string(),
        '&:hover': {
            backgroundColor: COLORS.primary.lighten(0.2).string()
        },
        '&:active': {
            backgroundColor: COLORS.primary.darken(0.2).string()
        }
    },
    danger: {
        backgroundColor: COLORS.danger.string(),
        color: COLORS.lightText.string(),
        '&:hover': {
            backgroundColor: COLORS.danger.lighten(0.2).string()
        },
        '&:active': {
            backgroundColor: COLORS.danger.darken(0.2).string()
        }
    }
}

class Button extends Component {
    render() {
        let {
            primary,
            danger,
            outline,
            classes,
            sheet,
            className,
            children,
            ...rest
        } = this.props;
        let buttonClass = cx({
            // Always apply button class
            [classes.button]: true,
            // Apply primary/danger/outline class if the related prop is set
            [classes.primary]: primary,
            [classes.danger]: danger,
            [classes.outline]: outline
            // Also add the className if it was passed as a prop
        }, className)
        return <button className={buttonClass} {...rest}>{children}</button>
    }
}

export default inject(styles)(Button);

Button.propTypes = {
    /**
     * Apply the primary theme color for buttons indicating main actions
     */
    primary: PropTypes.bool,

    /**
     * Apply the danger theme color for buttons indicating dangerous actions
     */
    danger: PropTypes.bool,

    /**
     * Use a transparent background with a border
     */
    outline: PropTypes.bool,
}
