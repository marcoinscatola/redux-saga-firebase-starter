import React, {Component} from 'react';
import inject from 'react-jss';
import PropTypes from 'prop-types';
import itFlag from 'assets/images/it-flag.png';
import enFlag from 'assets/images/en-flag.png';

const flags = {
    it: itFlag,
    en: enFlag
}

@inject({
    flag: {
        width: 36,
        height: 36,
        padding: 8,
        boxSizing: 'border-box'
    }
})
export default class Flag extends Component {
    render() {
        let { locale, classes, sheet, ...otherProps } = this.props;
        return (
            <img 
                className={classes.flag}
                src={flags[locale]} 
                alt={`${locale}-language`} 
                {...otherProps}
            />
        )
    }
}

Flag.propTypes = {
    /**
     * The locale code (e.g. 'en')
     */
    locale: PropTypes.string
}