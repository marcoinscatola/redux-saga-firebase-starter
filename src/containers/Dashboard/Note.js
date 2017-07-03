import React, {Component} from 'react';
import {connect} from 'react-redux';
import Note from 'components/Note'
import {noteActions, noteSelectors} from 'modules/notes'

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
const mapStateToProps = (state, ownProps) => {
    let note = noteSelectors.byKey(state, ownProps.noteKey);
    return {
        title: note.title,
        text: note.text
    }
}
const mapDispatchToProps = dispatch => ({
    remove: noteKey => dispatch(noteActions.removeNote(noteKey))
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer)
