import * as React from 'react';
import {
    Alert
} from 'uikit-react';

interface props {
    className?: string;
    style?: any;
    color?: string;
    closable?: boolean;
    content: string;
};

export class KaiAlert extends React.Component<props, any> {
    render() {
        return (
            <div style={this.props.style ? this.props.style : null}>
                <Alert
                    className={this.props.className ? this.props.className : null}
                    color={this.props.color}
                    isClosable={this.props.closable}
                    content={this.props.content} />
            </div>
        );
    }
}