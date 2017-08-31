import React, { Component } from "react";
import inject from "react-jss";
import { connect } from "react-redux";
import { noteActions } from "modules/notes";
import { localize } from "modules/i18n";
import { FlexBox, FlexItem } from "components/Flex";
import Input from "components/Input";
import Button from "components/Button";
import messageCollection from "./messages";

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

const mapDispatchToProps = dispatch => ({
    addNote: note => dispatch(noteActions.addNote(note))
})

@connect(null, mapDispatchToProps)
@localize({
    collections: messageCollection,
    messageIds: {
        textPlaceholder: 'NoteForm.textPlaceholder',
        titlePlaceholder: 'NoteForm.titlePlaceholder',
        addNew: 'NoteForm.addNew'
    }
})
@inject(styles)
export default class NoteForm extends Component {
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
        let {classes, textPlaceholder, titlePlaceholder, addNew} = this.props;
        return (
            <FlexBox className={classes.formItem}>    
                <FlexItem className={classes.inputItem}>
                    <Input
                        placeholder={titlePlaceholder.format()}
                        name="title"
                        value={title}
                        onChange={this.handleFormChange}
                    />
                </FlexItem>
                <FlexItem className={classes.inputItem}>
                    <Input
                        placeholder={textPlaceholder.format()}
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
                        {addNew.format()}
                    </Button>
                </FlexItem>
            </FlexBox>
        );
    }
}