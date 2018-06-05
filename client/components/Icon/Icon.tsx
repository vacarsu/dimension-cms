import * as React from 'react';

declare interface props {
    name: string;
}

export class Icon extends React.Component<props, any> {
    render() {
        return (
            <em uk-icon={this.props.name}></em>
        );
    }
}