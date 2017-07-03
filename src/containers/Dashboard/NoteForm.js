import React, {Component} from 'react';
import inject from 'react-jss';
import {connect} from 'react-redux';
import flow from 'lodash/flow';
import {noteActions} from 'modules/notes';
import {FlexBox, FlexItem} from 'components/Flex';
import Input from 'components/Input';
import Button from 'components/Button';

let styles = {
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
}

class NoteForm extends Component {
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
        let {classes} = this.props;
        return (
            <FlexBox className={classes.formItem}>
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
            </FlexBox>
        );
    }

}

const mapDispatchToProps = dispatch => ({
    addNote: note => dispatch(noteActions.addNote(note))
})

const enhance = flow(
    connect(null, mapDispatchToProps),
    inject(styles)
)

export default enhance(NoteForm);
