import * as React from 'react';
import * as classNames from 'classnames';
import { setClassNames } from '../../utils/set-class-names'

declare interface AccordionItem {
    title: string;
    content: string;
    options?: string;
}

declare interface props extends BaseProps {
    items: AccordionItem[];
    options?: string;
}

export class Accordion extends React.Component<props, any> {
    render() {
        return (
            <ul className={setClassNames(this.props)}
                data-uk-accordion={this.props.options ? this.props.options : ""}
            >
                {this.renderItems()}
            </ul>
        );
    }

    private renderItems() {
        return this.props.items.map((item: AccordionItem) => (
            <li>
                <a className="uk-accordion-title" href="#">{item.title}</a>
                <div className="uk-accordion-content">{item.content}</div>
            </li>
        ));
    }
}