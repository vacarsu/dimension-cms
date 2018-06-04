import * as React from 'react';

declare interface props {
    label: string;
    color?: string;
    size?: string;
    href?: string;
}

export class Button extends React.Component<props, any> {
    render() {
        return (
            this.isLink ?
            <a 
                href={this.props.href}
                className={`uk-button uk-button-${this.setupColor()} uk-button-${this.setupSize()}`}
            >
                {this.props.label}
            </a>
            :
            <button 
                className={`uk-button uk-button-${this.setupColor()} uk-button-${this.setupSize()}`}
            >
                {this.props.label}
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

    private setupColor(): string {
        switch(this.props.color) {
            case 'default':
                return 'default';
            case 'primary':
                return 'primary';
            case 'secondary':
                return 'secondary';
            case 'danger':
                return 'danger';
            case 'text':
                return 'text';
            case 'link':
                return 'link';
            default:
                return 'default';
                
        }
    }
}