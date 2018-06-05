import * as React from 'react';
import { colorClass } from '../../utils/color-class';
import { alignClass } from '../../utils/align-class';

declare interface props extends BaseProps {
    color?: string;
    size?: string;
    href?: string;
}

export class Button extends React.Component<props, any> {
    render() {
        return (
            this.isLink() ?
            <a 
                href={this.props.href}
                className={`
                    uk-button uk-button-${colorClass(this.props.color)}
                    uk-button-${this.setupSize()}
                    ${alignClass(this.props.align)}
                `}
            >
                {this.props.children}
            </a>
            :
            <button 
                className={`
                    uk-button uk-button-${colorClass(this.props.color)}
                    uk-button-${this.setupSize()}
                `}
            >
                {this.props.children}
            </button>
        )
    }

    private isLink(): boolean {
        return this.props.href ? true : false;
    }

    private setupSize(): string {
        switch(this.props.size) {
            case 'small':
                return 'small';
            case 'large':
                return 'large';
            default:
                return 'small';
        }
    }
}