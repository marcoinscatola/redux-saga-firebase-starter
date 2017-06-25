import React, {Component} from 'react';
import {connect} from 'react-redux';
import inject from 'react-jss';
import {FlexBox, FlexItem} from 'components/Flex';
import Input from 'components/Input';
import Button from 'components/Button';
import flow from 'lodash/flow';
import {noteSelectors, noteActions} from 'modules/notes'
import Note from 'containers/Note'

const styles = {
    formItem: {
        height: 'auto',
        flex: '0 0 auto'
    },
    inputItem: {
        minHeight: 48,
        height: 'auto',
        '&+$inputItem': {
            marginTop: 12
        }
    },
    buttonItem: {
        margin: '6px 0'
    },
    button: {
        width: '100%',
        height: 48
    },
    noteItem: {
        maxWidth: 300,
        margin: 10,
    }
}

class Dashboard extends Component {
    state = {
        title: '',
        text: ''
    }
    handleFormChange = (e) => {
        let {name, value} = e.target;
        this.setState({[name]:value})
    }
    handleAddNote = () => {
        let {title, text} = this.state;
        let {addNote} = this.props;
        addNote({title, text})
        this.setState({
            title: '',
            text: ''
        })
    }
    render() {
        let {title, text} = this.state;
        let {notes, classes} = this.props;
        return (
            <FlexBox>
                <FlexItem className={classes.formItem}>
                    <FlexItem className={classes.inputItem}>
                        <Input
                            placeholder="Title"
                            name="title"
                            value={title}
                            onChange={this.handleFormChange}
                        />
                    </FlexItem>
                    <FlexItem className={classes.inputItem}>
                        <Input
                            placeholder="Text"
                            name="text"
                            value={text}
                            textarea
                            rows="4"
                            onChange={this.handleFormChange}
                        />
                    </FlexItem>
                    <FlexItem className={classes.buttonItem}>
                        <Button
                            primary
                            onClick={this.handleAddNote}
                        >
                            Add note
                        </Button>
                    </FlexItem>
                </FlexItem>
                <FlexItem scrollY>
                    <FlexBox expand direction="row" alignItems="center" justifyContent="flex-start" wrap="wrap">
                        {notes.map(note => (
                            <FlexItem key={`note-${note.key}`} className={classes.noteItem}>
                                <Note
                                    text={note.text}
                                    title={note.title}

                                    noteKey={note.key}
                                />
                            </FlexItem>
                        ))}
                    </FlexBox>
                </FlexItem>
            </FlexBox>
        )
    }
}
const mapStateToProps = state => ({
    notes: noteSelectors.list(state)
})
const mapDispatchToProps = dispatch => ({
    addNote: note => dispatch(noteActions.addNote(note))
})

const enhance = flow(
    connect(mapStateToProps, mapDispatchToProps),
    inject(styles)
)

export default enhance(Dashboard)
