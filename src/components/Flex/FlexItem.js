/**
 * Helper Component to easily set an elastic item inside a FlexBox component
 * Example:
 * import {FlexBox, FlexItem} from 'components/Flex'
 *     <FlexBox direction="column" alignItems="center" >
 *         <FlexItem fixed>
 *             Static height element
 *         <FlexItem fixed>
 *         <FlexItem>
 *             Elastic height element
 *         <FlexItem>
 *         <FlexItem minHeight={300}>
 *             Elastic height element with min-height: 300px
 *         </FlexItem>
 *     </FlexBox>
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import inject from 'react-jss';
import cx from 'classnames';
let style = {
    flex: {
        flex: '1 1 auto',
        overflow: 'hidden',
    },
    fixed: {
        extend: 'flex',
        flex: '0 0 auto',
    },
    minHeight: {
        flexBasis: 'auto',
        flexShrink: 0,
        height: props => props.height
    },
    minWidth: {
        flexBasis: 'auto',
        flexShrink: 0,
        width: props => props.width
    },
    maxHeight: {
        flexBasis: 'auto',
        flexGrow: 0,
        height: props => props.height
    },
    maxWidth: {
        flexBasis: 'auto',
        flexGrow: 0,
        width: props => props.width
    },
    relative: {
        position: 'relative'
    },
    scrollY: {
        overflowY: 'auto'
    },
    scrollX: {
        overflowX: 'auto'
    },
}
class FlexItem extends Component {

    render() {
        let {
            classes,
            sheet,
            className,
            scrollX=false,
            scrollY=false,
            relative=false,
            fixed=false,
            minWidth,
            minHeight,
            ...otherProps
        } = this.props;
        className = cx(className, {
            [classes.flex]: !fixed,
            [classes.fixed]: fixed,
            [classes.minWidth]: !!minWidth,
            [classes.minHeight]: !!minHeight,
            [classes.scrollX]: scrollX,
            [classes.scrollY]: scrollY,
            [classes.relative]: relative
        });
        return (
            <div className={className} {...otherProps} />
        );
    }

}

export default inject(style)(FlexItem);

FlexItem.propTypes = {
    /**
     * Set to true if it's an item that shouldn't flex-grow/flex-shrink.
     * default: false
     */
    fixed: PropTypes.bool,

    /**
     * Accepts any valid value for the height property (numbers default to px).
     * If set it will enforce flex-basis auto and flex-shrink 0, the item will grow
     * but wont shrink below the minHeight value
     */
    minHeight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    /**
     * Same as minHeight but for setting a min width
     */
    minWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    /**
     * Accepts any valid value for the height property (numbers default to px).
     * If set it will enforce flex-basis: auto and flex-shrink: 0, the item will shrink
     * but wont grow above the maxHeight value
     */
    maxHeight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    /**
     * Same as maxHeight but for setting a max width
     */
    maxWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    /**
     * Allows content of the flex item to scroll on the vertical axis by setting
     * overflowY to auto.
     */
    scrollY: PropTypes.bool,
    /**
     * Allows content of the flex item to scroll on the vertical axis by setting
     * overflowX to auto.
     */
    scrollX: PropTypes.bool,
    /**
     * Sets position:relative; on the FlexItem. Useful when the content must have
     * absolute positioning, which is needed to have a content of 100% height since
     * safari won't correctly compute the height otherwise.
     */
    relative: PropTypes.bool,
    /**
     * If present it will be merged into the className of the FlexBox element
     */
    className: PropTypes.string
}
