/**
 * Helper Component to easily set the most common flexbox css properties.
 * Classes are pre-generated for each flex property and injected via react-jss
 *
 * Example:
 * import {FlexBox, FlexItem} from 'components/Flex'
 *     <FlexBox direction="column" alignItems="center" >
 *         <div>Static height element</div>
 *         <div>Static height element</div>
 *         <FlexItem>
 *             Elastic height element
 *         </FlexItem>
 *     </FlexBox>
 */

import React from 'react';
import PropTypes from 'prop-types';
import inject from 'react-jss';
import cx from 'classnames';
import forEach from 'lodash/forEach';
const propValues= {
    direction: {
        values: ['row', 'row-reverse', 'column', 'column-reverse'],
        cssProp: 'flexDirection'
    },
    wrap: {
        values: ['nowrap', 'wrap', 'wrap-reverse'],
        cssProp: 'flexWrap'
    },
    alignItems: {
        values: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
        cssProp: 'alignItems'
    },
    alignContent: {
        values: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch',  'space-between', 'space-around', 'space-evenly' ],
        cssProp: 'alignContent'
    },
    justifyContent: {
        values: ['flex-start', 'flex-end', 'center', 'baseline', 'space-between', 'space-around', 'space-evenly' ],
        cssProp: 'justifyContent'
    }
}

let styles = {
    flexBox: {
        display: 'flex',
    },
    expand: {
        width: '100%',
        height: '100%'
    },
    expandNested: {
        width: '100%',
        flex: '1 1 0'
    }
}
// helper to generate the className corresponding to a prop/value combination,
// ex. 'direction-column' will contain the style flexDirection: 'column'
const getClassName = (prop, value) => `${prop}-${value}`

// generate the style object for each flex prop/value combination in propValues
forEach(propValues, ({values, cssProp}, param) =>
    forEach(values, value => {
        const className = getClassName(param, value);
        styles[className] = {[cssProp]:value}
    })
)

const FlexBox = ({
    children,
    nested=false,
    expand=true,
    direction="column",
    justifyContent="center",
    alignItems="stretch",
    alignContent="center",
    wrap="nowrap",
    classes,
    sheet,
    className,
    ...otherProps
}) => {
    className = cx(classes.flexBox, className, {
            [classes.expand]: expand && !nested,
            [classes.expandNested]: expand && nested,
            [classes[getClassName('wrap', wrap)]]: !!wrap,
            [classes[getClassName('direction', direction)]]: !!direction,
            [classes[getClassName('justifyContent', justifyContent)]]: !!justifyContent,
            [classes[getClassName('alignItems', alignItems)]]: !!alignItems,
            [classes[getClassName('alignContent', alignContent)]]: !!alignContent
        }
    )
    return (
        <div className={className} {...otherProps}>
            {children}
        </div>
    )
}

export default inject(styles)(FlexBox)

FlexBox.propTypes = {
    /**
     * Set to true if it's a FlexBox nested directly inside another FlexBox and
     * it needs to be expanded (expand prop: true) to 100% height and width
     */
    nested: PropTypes.bool,

    /**
     * Set to true if the FlexBox element have to take up all the space of the
     * parent element
     */
    expand: PropTypes.bool,

    /**
     * Sets the flex-direction property. Default: column
     */
    direction: PropTypes.oneOf(['column','row', 'column-reverse', 'row-reverse']),

    /**
     * Sets the justify-content property. Default: center
     */
    justifyContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'baseline', 'space-between', 'space-around', 'space-evenly' ]),

    /**
     * Sets the align-items property. Default: stretch
     */
    alignItems: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'baseline', 'stretch']),

    /**
     * Sets the align-content property. Default: center
     */
    alignContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'baseline', 'stretch',  'space-between', 'space-around', 'space-evenly']),

    /**
     * Sets the flexWrap property. Default: nowrap
     */
    wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),

    /**
     * If present it will be merged into the className of the FlexBox element
     */
    className: PropTypes.string
}
