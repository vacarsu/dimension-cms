import * as React from 'react';
import { styleClass } from '../../utils/style-class';
import { inverseClass } from '../../utils/inverse-class';
import { presserveClass } from '../../utils/preserve-class';

declare interface props extends BaseProps {
  style?: string;
  preserve?: string;
  inverse?: string;
}


export class Section extends React.Component<props, any> {
    render() {
        return (
            <div className={`
                uk-section uk-section-${styleClass(this.props.style)} uk-${inverseClass(this.props.inverse)} ${presserveClass(this.props.preserve)}
            `}>
            {this.props.children}
            </div>
        );
    }
}