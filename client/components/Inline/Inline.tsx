import * as React from 'react';

declare interface props extends BaseProps {
    style?: 'dark' | 'light';
}

export class Inline extends React.Component<props, any> {
    render() {
        return (
            <div className={`
                uk-inline ${this.setStyle()}
            `}>
                {this.props.children}
            </div>
        );
    }

    private setStyle() {
        switch(this.props.style) {
            case 'dark':
                return 'uk-dark';
            case 'light':
                return 'uk-light';
            default:
                return 'uk-light';
        }
    }
}