import React, {Component} from 'react';
import PropTypes from 'prop-types';
import inject from 'react-jss';

const styles = {
    note: {
        padding: '12px 12px 24px',
        position: 'relative',
        boxSizing: 'border-box',
        borderRadius: '4px',
        transition: 'all 0.3s',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.25)',
            boxShadow: '0 0 2px rgba(0,0,0,.12), 0 2px 2px rgba(0,0,0,.2)',
        },
        '&:hover $actions': {
            display: 'block'
        }
    },
    body: {
        whiteSpace: 'pre',
        maxWidth: '100%',
        maxHeight: '300px',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    title: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: '100%'
    },
    actions: {
        position: 'absolute',
        bottom: '4px',
        right: '4px',
        fontSize: '11px',
        display:'none',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}

class Note extends Component {
    render() {
        let {title, text, classes, onRemove} = this.props;
        return (
            <div className={classes.note}>
                <h2 className={classes.title}>{title}</h2>
                <p className={classes.body}>{text}</p>
                <div className={classes.actions} onClick={onRemove}>Remove</div>
            </div>
        )
    }
}

export default inject(styles)(Note)

Note.propTypes = {
    /**
     * The note title
     */
    title: PropTypes.string,

    /**
     * The note main text
     */
    text: PropTypes.string,
    /**
     * The function to call when the user clicks on the 'remove' link
     */
    onRemove: PropTypes.func,
}
