import * as React from 'react';
import { alignClass } from '../../utils/align-class';
import { widthClass } from '../../utils/width-class';

declare interface props extends BaseProps {
    value: number;
    max: number;
}

declare interface state {
    value: number;
}

export class Progress extends React.Component<props, state> {
    constructor(props) {
        super(props);

        this.state = { value: props.value };
    }

    static getDerivedStateFromProps(props, currentState) {
        console.log([props, currentState]);
        if (currentState !== props.value) {
            return {
                value: props.value,
            }
        }
    }

    render() {
        return (
            <progress 
                className={`
                    uk-progress
                    ${alignClass(this.props.align)}
                    ${widthClass(this.props.width)}
                `}
                value={this.state.value}
                max={this.props.max}
            ></progress>
        );
    }
}