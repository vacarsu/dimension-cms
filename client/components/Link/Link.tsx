import * as React from 'react';
import { linkType } from '../../utils/link-type';


declare interface props extends BaseProps {
  type?: string;
  href: string;
}


export class Link extends React.Component<props, any> {
    render() {
        return (
            <a href={this.props.href} className={`
                uk-link-${linkType(this.props.type)}
            `}>
            {this.props.children}
            </a>
        );
    }
}