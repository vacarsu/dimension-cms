import * as React from 'react';
import { alignClass } from '../../utils/align-class';
import { heightClass } from '../../utils/height-class';
import { widthClass } from '../../utils/width-class';

declare interface props extends BaseProps {
    src: string;
    alt?: string;
    type: 'video' | 'image';
    videoFormat?: string;
}

export class Cover extends React.Component<props, any> {
    render() {
        return (
            <div className={`
                uk-cover-container
                ${alignClass(this.props.align)}
                ${heightClass(this.props.height)}
                ${widthClass(this.props.width)}
            `}>
                { 
                    this.props.type === 'image' ?
                    <img src={this.props.src} alt={this.props.alt} uk-cover="" />
                    :
                    <video uk-cover="">
                        <source src={this.props.src} type={`${this.props.type}/${this.props.videoFormat}`} />
                    </video>
                }
            </div>
        );
    }
}