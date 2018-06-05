import * as React from 'react';
import { colorClass } from '../../utils/color-class';
import { alignClass } from '../../utils/align-class';
import { widthClass } from '../../utils/width-class';

declare interface props extends BaseProps {
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
                    ${alignClass(this.props.align)}
                    ${widthClass(this.props.width)}
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