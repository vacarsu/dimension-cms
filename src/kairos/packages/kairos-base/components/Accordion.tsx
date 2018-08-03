import * as React from 'react';
import {
    Accordion,
    AccordionItem
} from 'uikit-react';

interface items {
    title: string;
    content: string;
}

interface props {
    className: string;
    style: any;
    items: items[];
};

export class KaiAccordion extends React.Component<props, any> {
    render() {
        return (
            <Accordion
                className={this.props.className ? this.props.className : null}
                style={this.props.style ? this.props.style : null}>
                {this.renderItems()}
            </Accordion>
        );
    }

    private renderItems() {
        return this.props.items.map(item =>
            <AccordionItem title={item.title} content={item.content} />);
    }
}