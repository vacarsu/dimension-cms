import * as React from 'react';

export class KairosContainer extends React.Component<any, any> {
    render() {
        return (
            <div style={{ width: '100%' }}>
                {this.props.children}
            </div>
        );
    }
}