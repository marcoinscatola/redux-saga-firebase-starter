import React, {Component} from 'react';
import PropTypes from 'prop-types';
import inject from 'react-jss';
import cx from 'classnames';
import COLORS from 'style/colors';
const styles = {
    button: {
        fontWeight: '500',
        textTransform: 'uppercase',
        color: 'rgba(0,0,0,.87)',
        backgroundColor: '#FFF',
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
        '&+$button': {
            marginLeft: 8
        },
        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
            boxShadow: 'none'
        },
        '&:hover': {
            boxShadow: '0 0 2px rgba(0,0,0,.12), 0 2px 2px rgba(0,0,0,.2)'
        },
        '&:active': {
            boxShadow: 'none'
        }
    },
    outline: {
        color: '#a0b3b0',
        backgroundColor: 'transparent',
        border: '1px solid #a0b3b0'
    },
    primary: {
        backgroundColor: COLORS.primary,
        color: '#FFF',
        '&:hover': {
            backgroundColor: '#39a1f4'
        }
    },
    danger: {
        backgroundColor: '#9E2B25',
        color: '#FFF',
        '&:hover': {
            backgroundColor: '#f55a4e'
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
