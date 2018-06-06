import * as React from 'react';
import { Accordion } from '../../components/Accordion/Accordion';

export class AccordionPage extends React.Component {
    render() {
        const accordionItems = [
            { title: "Test", content: "Test" },
            { title: "Test", content: "Test" },
            { title: "Test", content: "Test" }
        ];

        return (
            <Accordion
                width="1-2"
                items={accordionItems}
            />
        );
    }
}