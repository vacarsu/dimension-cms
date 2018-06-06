import * as React from 'react';
import { colorClass } from '../../utils/color-class';
import { alignClass } from '../../utils/align-class';
import { heightClass } from '../../utils/height-class';
import { widthClass } from '../../utils/width-class';

declare interface props extends BaseProps {
    content: string;
    color?: string;
    options?: string;
    isClosable?: boolean;
}

export class Alert extends React.Component<props, any> {
    render() {
        return (
            <div
                className={`
                    uk-alert-${colorClass(this.props.color)}
                    ${alignClass(this.props.align)}
                    ${heightClass(this.props.height)}
                    ${widthClass(this.props.width)}
                `}
                uk-alert={this.props.options}
            >
                {
                    this.props.isClosable ?
                    <a className="uk-alert-close" uk-close=""></a>
                    :
                    null
                }
                <span>{this.props.content}</span>
            </div>
        );
    }
}