import * as React from 'react';
import { colorClass } from '../../utils/color-class';

declare interface props extends BaseProps {
    title: string;
    content: string;
    color?: string;
}

export class Card extends React.Component<props, any> {
    render() {
        return (
            <div className={`uk-card uk-card-${colorClass(this.props.color)}`}>
                {this.props.content}
            </div>
        );
    }
}