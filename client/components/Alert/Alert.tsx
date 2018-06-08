import * as React from 'react';
import * as classNames from 'classnames';

import { setClassNames } from '../../utils/set-class-names';
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
                className={this.setClassNames()}
                uk-alert={this.props.options ? this.props.options : ""}
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

    private setClassNames(): string {
        return classNames({
            [`uk-alert-${this.props.color}`]: !!this.props.color,
            [setClassNames(this.props)]: true
        });
    }
}