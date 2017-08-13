import React, {Component} from 'react';
import inject from 'react-jss';
import {connect} from 'react-redux';
import {noteActions} from 'modules/notes';
import {i18nSelectors, i18nActions} from 'modules/i18n';
import {FlexBox, FlexItem} from 'components/Flex';
import Input from 'components/Input';
import Button from 'components/Button';
import FormattedMessage from 'containers/FormattedMessage';
import messages from './messages';

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

const mapStateToProps = state => ({
    messages: {
        textPlaceholder: i18nSelectors.getLocalizedMessage(state, 'NoteForm.textPlaceholder'),
        titlePlaceholder: i18nSelectors.getLocalizedMessage(state, 'NoteForm.titlePlaceholder')
    }
})

const mapDispatchToProps = dispatch => ({
    addNote: note => dispatch(noteActions.addNote(note)),
    addMessages: messages => dispatch(i18nActions.addMessages(messages))
})

@connect(mapStateToProps, mapDispatchToProps)
@inject(styles)
export default class NoteForm extends Component {
    state = {
        title: '',
        text: ''
    }
    componentDidMount() {
        let {addMessages} = this.props;
        addMessages(messages);
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
        let {classes, messages:{textPlaceholder, titlePlaceholder}} = this.props;
        return (
            <FlexBox className={classes.formItem}>
                <FlexItem className={classes.inputItem}>
                    <Input
                        placeholder={titlePlaceholder}
                        name="title"
                        value={title}
                        onChange={this.handleFormChange}
                    />
                </FlexItem>
                <FlexItem className={classes.inputItem}>
                    <Input
                        placeholder={textPlaceholder}
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
                        <FormattedMessage id="NoteForm.addNew" />
                    </Button>
                </FlexItem>
            </FlexBox>
        );
    }
}