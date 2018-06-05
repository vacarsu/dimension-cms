import * as React from 'react';
import { alignClass } from '../../utils/align-class';
import { widthClass } from '../../utils/width-class';

declare interface AccordianItem {
    title: string;
    content: string;
}

declare interface props extends BaseProps {
    items: AccordianItem[];
    multiple?: boolean;
    collapsible?: boolean;
}

export class Accordion extends React.Component<props, any> {
    render() {
        return (
            <ul className={`${widthClass(this.props.width)}  ${alignClass(this.props.align)}`}
                data-uk-accordion={`
                    multiple: ${this.isMultipleDropdowns()};
                    collapsible: ${this.isCollapsible()}
                `}
            >
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