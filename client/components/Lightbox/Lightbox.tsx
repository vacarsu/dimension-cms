import * as React from 'react';

declare interface props extends BaseProps {
    animation?: 'slide' | 'fade' | 'scale';
    autoplay?: boolean;
    autoplayInterval?: number;
    pauseOnHover?: boolean;
    startIndex?: number;
}

export class Lightbox extends React.Component<props, any> {
    render() {
        return (
            <div uk-grid uk-lightbox={`
                ${this.setAnimation()}
                ${this.setAutoplay()}
                ${this.setAutoplayInterval()}
                ${this.setPauseOnHover()}
                ${this.setstartIndex()}
            `}>
                {this.props.children}
            </div>
        );
    }

    private setAnimation(): string {
        if (this.props.animation) {
            return `animation: ${this.props.animation};`;
        } else {
            return `animation: slide;`;
        }
    }

    private setAutoplay(): string {
        if (this.props.autoplay) {
            return `autoplay: true;`;
        } else {
            return `autoplay: false`;
        }
    }

    private setAutoplayInterval(): string {
        if (this.props.autoplayInterval) {
            return `autoplay-interval: ${this.props.autoplayInterval};`;
        } else {
            return `autoplay-interval: 0;`;
        }
    }

    private setPauseOnHover(): string {
        if (this.props.pauseOnHover) {
            return `autoplay-interval: ${this.props.pauseOnHover};`;
        } else {
            return `autoplay-interval: true;`
        }
    }

    private setstartIndex(): string {
        if (this.props.startIndex) {
            return `index: ${this.props.startIndex};`;
        } else {
            return `index: 0;`;
        }
    }
}