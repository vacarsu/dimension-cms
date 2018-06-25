import * as React from 'react';

export class KairosContainer extends React.Component<any, any> {
    render() {
        return (
            <div className="uk-width-1-1">
                {this.props.children}
            </div>
        );
    }
}