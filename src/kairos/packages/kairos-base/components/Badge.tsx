import * as React from 'react';
import {
    Badge
} from 'uikit-react';

interface props {
    className?: string;
    style?: any;
    count: number;
};

export class KaiBadge extends React.Component<props, any> {
    render() {
        return (
            <div style={this.props.style ? this.props.style : null}>
                <Badge
                    className={this.props.className ? this.props.className : null}
                    count={this.props.count} />
            </div>
        );
    }
}