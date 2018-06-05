import * as React from 'react';
import { colorClass } from '../../utils/color-class';

declare interface props {
    content: string;
    color?: string;
    isClosable?: boolean;
}

export class Alert extends React.Component<props, any> {
    render() {
        return (
            <div
                className={`
                    uk-alert-${colorClass(this.props.color)}
                `}
                uk-alert=""
            >
                {
                    this.props.isClosable ?
                    <a className="uk-alert-close" uk-close=""></a>
                    :
                    ""
                }
                <span>{this.props.content}</span>
            </div>
        );
    }
}