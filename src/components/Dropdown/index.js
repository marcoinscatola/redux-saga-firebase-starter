import React, { Component } from 'react';
import PropTypes from 'prop-types';
import inject from 'react-jss';
import cx from 'classnames';

@inject({
    dropdown: {
        width: 'auto',
        height: 'auto',
        position: 'relative',
        display: 'inline-block'
    },
    trigger: {
        cursor: 'pointer'
    },
    menu: {
        position: 'absolute',
        top: '100%',
        zIndex: 1
    }
})
export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.startOpen || false
        };
    }

    handleTriggerClick = () => {
        let { open } = this.state;
        if (!open)
            this.open()
        else 
            this.close()
    }

    open = () => {
        this.setState({open: true})
        document.addEventListener("click", this.close)
    }

    close = () => {
        this.setState({open: false})
        document.removeEventListener("click", this.close);
    }

    handleMenuClick = () => {
        this.close()
    }

    render() {
        let { classes, sheet, trigger, menu, className, ...otherProps } = this.props;
        let { open } = this.state;
        let dropdownClass = cx(classes.dropdown, className)
        return (
            <div className={dropdownClass} ref={node => this.rootNode} {...otherProps}>
                <div 
                    className={classes.trigger} 
                    onClick={this.handleTriggerClick}
                >
                    {trigger}
                </div>
                { open && 
                    <div className={classes.menu} onClick={this.handleMenuClick}>
                        {menu}
                    </div>
                }
            </div>
        );
    }
}

Dropdown.propTypes = {
    /**
     * Setting the startOpen prop to true will mount the dropdown already in the open state
     */
    startOpen: PropTypes.bool,
    /**
     * An element that when clicked will open/close the dropdown
     */
    trigger: PropTypes.node,
    /**
     * An element containing the menu to show when the dropdown is open
     */
    menu: PropTypes.node
}