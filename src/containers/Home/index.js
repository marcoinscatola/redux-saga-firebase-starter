import React from 'react';
import Page from 'components/Page';
import Section from 'components/Section'
import { localize } from 'modules/i18n';
import collection from './messages';

const Home = ({message}) => (
    <Page>
        <Section>
            <h1>{message.format()}</h1>
        </Section>
    </Page>
)

export default localize({
    collections: collection,
    messageIds: {
        message: 'Home.loginToStart'
    }
})(Home)