import * as React from 'react';
import { colorClass } from '../../utils/color-class';

declare interface BreadcrumbItem {
    href: string;
    label: string;
}

declare interface props extends BaseProps {
    items: BreadcrumbItem[];
}

export class Breadcrumb extends React.Component<props, any> {
    render() {
        return (
            <ul className="uk-breadcrumb">
                {this.renderItems()}
            </ul>
        );
    }

    private renderItems() {
        return this.props.items.map((item: BreadcrumbItem) => (
            <li><a href={item.href}>{item.label}</a></li>
        ));
    }
}