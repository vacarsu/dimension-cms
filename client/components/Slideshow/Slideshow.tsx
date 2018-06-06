import * as React from 'react';

declare interface props {
    animation?: 'slide' | 'fade' | 'scale' | 'pull' | 'push';
    animationVelocity?: number;
    autoplay?: boolean;
    autoplayInterval?: number;
    infiniteScroll?: boolean;
    pauseOnHover?: boolean;
    startIndex?: number;
    ratio?: string;
    minHeight?: number;
    maxHeight?: number;
    navigation?: boolean;
    navigationStyle?: 'dark' | 'light';
}


export class Slideshow extends React.Component<props, any> {
    render() {
        return (
            <div uk-slideshow={`
                ${this.setAnimation()}
                ${this.setAnimationVelocity()}
                ${this.setAutoplay()}
                ${this.setAutoplayInterval()}
                ${this.setInfiniteScroll()}
                ${this.setMaxHeight()}
                ${this.setMinHeight()}
                ${this.setPauseOnHover()}
                ${this.setRatio()}
                ${this.setstartIndex()}
            `}>
                {this.setNavigation()}
            </div>
        );
    }

    private setAnimation(): string {
        if (this.props.animation) {
            return `animation: ${this.props.animation};`;
        } else {
            return `animation: false;`;
        }
    }

    private setAnimationVelocity(): string {
        if (this.props.animationVelocity) {
            return `velocity: ${this.props.animationVelocity};`;
        } else {
            return `velocity: 1;`;
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
            return `autoplay-interval: 7000;`;
        }
    }

    private setInfiniteScroll(): string {
        if (this.props.autoplayInterval) {
            return `finite: true;`;
        } else {
            return `finite: false`;
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

    private setRatio(): string {
        if (this.props.ratio) {
            return `ratio: ${this.props.ratio};`;
        } else {
            return `ratio: 16:9`
        }
    }

    private setMinHeight(): string {
        if (this.props.minHeight) {
            return `min-height: ${this.props.minHeight};`;
        } else {
            return `min-height: false`;
        }
    }

    private setMaxHeight(): string {
        if (this.props.maxHeight) {
            return `max-height: ${this.props.maxHeight};`;
        } else {
            return `max-height: false;`
        }
    }

    private setNavigation() {
        if (this.props.navigation) {
            return (
                <div className={`uk-position-relative uk-visible-toggle ${this.setNavigationStyle()}`}>
                    <ul className="uk-slideshow-items">
                        {this.props.children}
                    </ul>
                    <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous="" uk-slideshow-item="previous"></a>
                    <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next="" uk-slideshow-item="next"></a>
                </div>
            );
        } else {
            return (
                <ul className="uk-slideshow-items">
                    {this.props.children}
                </ul>
            );
        }
    }

    private setNavigationStyle() {
        if (this.props.navigation && this.props.navigationStyle) {
            return `uk-${this.props.navigationStyle}`;
        } else {
            return `uk-dark`;
        }
    }
}