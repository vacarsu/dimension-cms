import * as React from 'react';

declare interface props {
    count: number;
}

export class Badge extends React.Component<props, any> {
    render() {
        return (
            <div className="uk-badge">
                {this.props.count}
            </div>
        );
    }
}