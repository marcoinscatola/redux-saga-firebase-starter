import React, {Component} from 'react';
import {connect} from 'react-redux';
import Note from 'components/Note'
import {noteActions} from 'modules/notes'

class NoteContainer extends Component {
    handleRemove = () => {
        let {remove, noteKey} = this.props;
        remove(noteKey)
    }
    render() {
        let {title, text} = this.props;
        return (<Note title={title} text={text} onRemove={this.handleRemove} />)
    }
}

const mapDispatchToProps = dispatch => ({
    remove: noteKey => dispatch(noteActions.removeNote(noteKey))
})

export default connect(null, mapDispatchToProps)(NoteContainer)
