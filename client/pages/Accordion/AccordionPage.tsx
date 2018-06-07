import * as React from 'react';
import * as Prism from 'prismjs';

import { Accordion } from '../../components/Accordion/Accordion';
import { Article } from '../../components/Article/Article';
import { Container } from '../../components/Container/Container';
import { Section } from '../../components/Section/Section';
import { Table } from '../../components/Table/Table';
import { TableBody } from '../../components/Table/TableBody';
import { TableData } from '../../components/Table/TableData';
import { TableFoot } from '../../components/Table/TableFoot';
import { TableHead } from '../../components/Table/TableHead';
import { TableHeader } from '../../components/Table/TableHeader';
import { TableRow } from '../../components/Table/TableRow';

import { BasicExample } from './BasicExample';
import { DisableCollapseExample } from './DisableCollapseExample';
import { ExpandMultipleExample } from './ExpandMultipleExample';

export class AccordionPage extends React.Component {
    componentDidUpdate() {
        Prism.highlightElement(document.getElementById('elements'));
    }

    render() {
        const articleTitle = 'Accordion';
        const articleContent = `Create a list of items that can be shown individually by clicking an item's header.`;
        
        return (
            <Container size="small">
                <Article title={articleTitle}>
                    <p>
                        {articleContent}
                    </p>
                    <h3>Properties</h3>
                    <Table divider size="small">
                        <TableHead>
                            <TableRow>
                                <TableHeader shrink>Property</TableHeader>
                                <TableHeader width="small">Type</TableHeader>
                                <TableHeader width="small">Required</TableHeader>
                                <TableHeader>Description</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableData shrink>Items</TableData>
                                <TableData width="small">
                                    <code>{`[ {
                                        title: string;
                                        content: string;
                                    } ]`}</code>
                                </TableData>
                                <TableData><code>true</code></TableData>
                                <TableData>
                                    An array of AccordionItems to be rendered inside the Accordian tag.
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Options</TableData>
                                <TableData><code>string</code></TableData>
                                <TableData><code>false</code></TableData>
                                <TableData>
                                    A string of component modifiers.
                                    For a list of all modifiers see <a href="https://getuikit.com/docs/accordion#component-options">UIkit Accordian</a>
                                </TableData>
                            </TableRow>
                        </TableBody>
                        <TableFoot></TableFoot>
                    </Table>
                    <h3>Elements</h3>
                    <pre>
                        <code id="elements" className="language-jsx">
                            {`<Accordion />`}
                        </code>
                    </pre>
                    <Section>
                        <h3>Basic Usage</h3>
                        <BasicExample />
                    </Section>
                    <Section>
                        <h3>Disable Collapse</h3>
                        <DisableCollapseExample />
                    </Section>
                    <Section>
                        <h3>Expand Multiple</h3>
                        <ExpandMultipleExample />
                    </Section>
                </Article>
            </Container>
        );
    }
}