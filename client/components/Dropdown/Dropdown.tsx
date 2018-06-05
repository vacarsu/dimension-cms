import * as React from 'react';

declare interface props {
    mode?: 'hover' | 'click';
    position?: string;
}

export class Dropdown extends React.Component<props, any> {
    render() {
        return (
            <div uk-dropdown={`
                ${this.setMode()}
                ${this.setPosition()}
            `}>
                <ul className="uk-nav uk-dropdown-nav">
                    {this.props.children}
                </ul>
            </div>
        );
    }

    private setMode(): string {
        if (this.props.mode) {
            return `mode: ${this.props.mode};`;
        }
    }

    private setPosition(): string {
        if (this.props.position) {
            return `pos: ${this.props.position};`;
        }
    }
}