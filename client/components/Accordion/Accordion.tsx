import * as React from 'react';
import { alignClass } from '../../utils/align-class';
import { heightClass } from '../../utils/height-class';
import { widthClass } from '../../utils/width-class';

declare interface AccordianItem {
    title: string;
    content: string;
    options?: string;
}

declare interface props extends BaseProps {
    items: AccordianItem[];
    options?: string;
}

export class Accordion extends React.Component<props, any> {
    render() {
        return (
            <ul className={`
                    ${heightClass(this.props.height)}
                    ${widthClass(this.props.width)}
                    ${alignClass(this.props.align)}
                `}
                data-uk-accordion={this.props.options ? this.props.options : ""}
            >
                {this.renderItems()}
            </ul>
        );
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