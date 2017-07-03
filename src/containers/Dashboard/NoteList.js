import React, {Component} from 'react';
import inject from 'react-jss';
import {connect} from 'react-redux';
import flow from 'lodash/flow';
import {noteSelectors} from 'modules/notes';
import {FlexBox, FlexItem} from 'components/Flex';
import Note from './Note';

let styles = {
    noteItem: {
        maxWidth: 300,
        margin: 10,
    }
}

class NoteList extends Component {

    render() {
        let {notes, classes} = this.props;
        return (
            <FlexBox
                expand
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                wrap="wrap"
            >
                {notes.map(note => (
                    <FlexItem key={`note-${note.key}`} className={classes.noteItem}>
                        <Note noteKey={note.key} />
                    </FlexItem>
                ))}
            </FlexBox>
        );
    }

}
const mapStateToProps = state => ({
    notes: noteSelectors.list(state)
})

const enhance = flow(
    connect(mapStateToProps, null),
    inject(styles)
)

export default enhance(NoteList);
