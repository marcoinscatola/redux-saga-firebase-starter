import React, {Component} from 'react';
import PropTypes from 'prop-types';
import inject from 'react-jss';
import cx from 'classnames';
import COLORS from 'style/colors';

const styles = {
    input: {
        fontSize: '22px',
        display: 'block',
        width: '100%',
        height: '100%',
        padding: '5px 10px',
        background: 'none',
        backgroundImage: 'none',
        border: '1px solid '+ COLORS.inactive.string(),
        color: COLORS.secondary.string(),
        borderRadius: '0',
        transition: 'border-color .25s ease, box-shadow .25s ease',
        '&:focus': {
            borderColor: COLORS.primary.string()
        },
        '&::placeholder': {
            opacity: 0.6,
            color: COLORS.inactive.string()
        },
        boxSizing: 'border-box',
        minHeight: 32,
        outline: 'none',
        resize: 'none'
    },
    'inverted': {
        border: '1px solid #454545',
        color: '1px solid #454545',
    },

}

class Input extends Component {
    render() {
        let {
            inverted,
            classes,
            sheet,
            className,
            children,
            textarea = false,
            ...rest
        } = this.props;
        let Element = textarea? 'textarea' : 'input';
        let inputClass = cx({
            // Always apply input class
            [classes.input]: true,
            // Apply inverted class if the inverted prop is set
            [classes.inverted]: inverted,
            // Also add the className if it was passed as a prop
        }, className)
        return <Element className={inputClass} {...rest} />
    }
}

export default inject(styles)(Input);

Input.propTypes = {
    /**
     * Apply an inverted theme for light backgrounds
     */
    inverted: PropTypes.bool,

    /**
     * The className prop will be merged with the other classes generated
     * by react-jss
     */
    className: PropTypes.string,
}
