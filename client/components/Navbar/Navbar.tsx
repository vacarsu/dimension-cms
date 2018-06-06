import * as React from 'react';

declare interface props {
    align?: string;
    options?: string;
    dropbar?: boolean;
    transparent?: boolean;
}

export class Navbar extends React.Component<props, any> {
    render() {
        return (
            <div>
                <nav className={`uk-navbar-container ${this.setTransparent()}`}
                    uk-navbar={this.props.options ? this.props.options : ""}>
                    <div className={`${this.setAlign()}`}>
                        <ul className="uk-navbar-nav">
                            {this.props.children}
                        </ul>
                    </div>
                </nav>
                {
                    this.props.dropbar ? 
                    <div className="uk-navbar-dropbar"></div>
                    :
                    ''
                }
            </div>
        );
    }

    private setAlign(): string {
        if (this.props.align) {
            return `uk-navbar-left-${this.props.align}`;
        } else {
            return `uk-navbar-left`;
        }
    }

    private setTransparent(): string {
        if (this.props.transparent) {
            return `uk-navbar-transparent`;
        }
    }
}