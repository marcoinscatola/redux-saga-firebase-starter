import React, {Component} from 'react';
import inject from 'react-jss';
import cx from 'classnames';
let style = {
    section: {
        maxWidth: 1250,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '20px 12px 0',
        boxSizing: 'border-box',
    }
}
class Section extends Component {

    render() {
        let {classes, sheet, className, ...otherProps} = this.props;
        className = cx(classes.section, className);
        return (
            <div className={className} {...otherProps} />
        );
    }

}

export default inject(style)(Section);
