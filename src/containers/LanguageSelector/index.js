import React, {Component} from 'react';
import {connect} from 'react-redux';
import inject from 'react-jss';
import Dropdown from 'components/Dropdown';
import Flag from 'components/Flag';
import { i18nSelectors , i18nActions} from 'modules/i18n';
import COLORS from 'style/colors';

const supportedLocales = ['en', 'it']

@inject({
    languageSelector: {
        height: 36,
        verticalAlign: 'middle',
        margin: '6px 0 6px 10px'
    },
    ul: {
        listStyleType: 'none',
        padding: '0',
        margin: '0px',
        backgroundColor: COLORS.appBar.string(),
        width: '56px',
        position: 'relative',
        left: '-10px',
        top: '16px',
        border: '1px solid ' + COLORS.appBar.lighten(0.3).string(),
        boxSizing: 'border-box',
        textAlign: 'center',
        fontSize: '0px',
    },
    li: {
        cursor: 'pointer',
        borderBottom: '1px solid ' + COLORS.appBar.lighten(0.3).string(),
        '&:last-child': {
            border: 'none'
        },
        '&:hover': {
            backgroundColor: COLORS.appBar.lighten(0.2).string(),
        }
    }
})
@connect(
    state => ({
        currentLocale: i18nSelectors.getLocale(state)
    }),
    dispatch => ({
        changeLocale: locale => dispatch(i18nActions.changeLocale(locale))
    })
)
export default class LanguageSelector extends Component {

    render() {
        let { currentLocale, changeLocale, classes, sheet, ...otherProps } = this.props;
        
        const trigger = <Flag locale={currentLocale} />
        const menu = (
            <ul className={classes.ul}>
                {supportedLocales.map(locale => (
                    <li className={classes.li} key={locale} >
                        <Flag 
                            locale={locale} 
                            onClick={() => changeLocale(locale)}
                        />
                    </li>
                ))}
            </ul>
        )
        return (
            <Dropdown
                className={classes.languageSelector}
                {...otherProps}
                trigger={trigger}
                menu={menu}
            />
        )
    }
}