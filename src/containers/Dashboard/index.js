import React, {Component} from 'react';
import Section from 'components/Section';
import Page from 'components/Page';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

class Dashboard extends Component {
    render() {
        return (
            <Page>
                <Section>
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
