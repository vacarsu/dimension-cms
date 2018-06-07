import * as React from 'react';

declare interface props {
    options?: string;
    dropbar?: boolean;
    transparent?: boolean;
}

export class NavbarContainer extends React.Component<props, any> {
    render() {
        return (
            <div>
                <nav
                    className={`
                        uk-navbar-container
                        ${this.setTransparent()}
                    `}
                    uk-navbar={
                        this.props.options ? this.props.options : ""
                    }
                >
                    {this.props.children}
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

    private setTransparent(): string {
        if (this.props.transparent) {
            return `uk-navbar-transparent`;
        }
    }
}