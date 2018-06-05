import * as React from 'react';
import { sizeClass } from '../../utils/size-class';

declare interface props extends BaseProps {
  size?: string;
}


export class Container extends React.Component<props, any> {
    render() {
        return (
            <div className={`
                uk-container uk-container-${sizeClass(this.props.size)}
            `}>
            {this.props.children}
            </div>
        );
    }
}