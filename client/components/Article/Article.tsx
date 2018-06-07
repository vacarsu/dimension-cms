import * as React from 'react';
import { alignClass } from '../../utils/align-class';
import { heightClass } from '../../utils/height-class';
import { widthClass } from '../../utils/width-class';

declare interface props extends BaseProps {
    title: string;
    meta?: string;
    lead?: string
}

export class Article extends React.Component<props, any> {
    render() {
        return (
            <article className={`
                uk-article
                ${alignClass(this.props.align)}
                ${heightClass(this.props.height)}
                ${widthClass(this.props.width)}
            `}>
                <h1 className="uk-article-title">{this.props.title}</h1>
                { this.props.meta ? <p className="uk-article-meta">{this.props.meta}</p> : '' }
                { this.props.lead ? <p className="uk-text-lead">{this.props.lead}</p> : '' }
                <p>{this.props.children}</p>
            </article>
        );
    }
}