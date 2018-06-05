import * as React from 'react';

declare interface props {
    title: string;
    meta?: string;
    lead?: string
    content: string;
}

export class Article extends React.Component<props, any> {
    render() {
        return (
            <article className="uk-article">
                <h1 className="uk-article-title">{this.props.title}</h1>
                { this.props.meta ? <p className="uk-article-meta">{this.props.meta}</p> : '' }
                { this.props.lead ? <p className="uk-text-lead">{this.props.lead}</p> : '' }
                <p>{this.props.content}</p>
            </article>
        );
    }
}