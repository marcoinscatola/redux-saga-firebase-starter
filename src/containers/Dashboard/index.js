import React, {Component} from 'react';
import { connect } from 'react-redux';
import Section from 'components/Section';
import Page from 'components/Page';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import { localize } from "modules/i18n";
import { noteSelectors } from 'modules/notes'
import collection from './messages';

@connect(
    state => ({
        numNotes: noteSelectors.list(state).length
    })
)
@localize({
    collections: collection,
    messageIds: {
        youHaveNumNotes: 'Dashboard.youHaveNumNotes'
    }
})
class Dashboard extends Component {
    render() {
        let {numNotes, youHaveNumNotes} = this.props;
        return (
            <Page>
                <Section>
                    <h2>
                        {youHaveNumNotes.format({numNotes})}
                    </h2>
                    <NoteForm/>
                </Section>
                <Section>
                    <NoteList/>
                </Section>
            </Page>
        )
    }
}

export default Dashboard
