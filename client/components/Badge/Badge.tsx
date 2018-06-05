import * as React from 'react';
import { colorClass } from '../../utils/color-class';

declare interface props extends BaseProps {
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