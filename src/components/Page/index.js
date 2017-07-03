import React, {Component} from 'react';
import inject from 'react-jss';
import cx from 'classnames';
let style = {
    page: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        overflow: 'hidden'
    },
    scrollable: {
        overflowY: 'auto',
        '-webkit-overflow-scrolling': 'touch'
    }
}
class Section extends Component {

    render() {
        let {classes, sheet, className, scrollable=true, ...otherProps} = this.props;
        className = cx(classes.page, className, {
            [classes.scrollable]: scrollable
        });
        return (
            <div className={className} {...otherProps} />
        );
    }

}

export default inject(style)(Section);
