import * as React from 'react';

declare interface AccordianItem {
    title: string;
    content: string;
}

declare interface props {
    items: AccordianItem[];
    multiple?: boolean;
    collapsible?: boolean;
}

export class Accordion extends React.Component<props, any> {
    render() {
        return (
            <ul data-uk-accordion={`
                multiple: ${this.isMultipleDropdowns()};
                collapsible: ${this.isCollapsible()}
            `}>
                {this.renderItems()}
            </ul>
        );
    }

    private isCollapsible() {
        return this.props.collapsible ? true : false;
    }

    private isMultipleDropdowns() {
        return this.props.multiple ? true : false;
    }

    private renderItems() {
        return this.props.items.map((item: AccordianItem) => (
            <li>
                <a className="uk-accordion-title" href="#">{item.title}</a>
                <div className="uk-accordion-content">{item.content}</div>
            </li>
        ));
    }
}