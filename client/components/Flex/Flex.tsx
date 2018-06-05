import * as React from 'react';

declare interface props {
    alignment?: string;
    direction?: string;
    wrap?: string;
}

export class Flex extends React.Component<props, any> {
    render() {
        return (
            <div className={`
                uk-flex
                ${this.setAlignment()}
                ${this.setDirection()}
                ${this.setWrap()}
            `}>
                {this.props.children}
            </div>
        );
    }

    private setAlignment(): string {
        if (this.props.alignment) {
            let stringArray = this.props.alignment.split(' ');
            return `uk-flex-${stringArray[0]} uk-flex-${stringArray[1]}`
        }
    }

    private setDirection(): string {
        if (this.props.direction) {
            return `uk-flex-${this.props.direction}`;
        }
    }

    private setWrap(): string {
        if (this.props.wrap) {
            return `uk-flex-${this.props.wrap}`;
        }
    }
}