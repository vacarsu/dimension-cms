import * as React from 'react';

declare interface props {
}

export class NavbarSticky extends React.Component<props, any> {
    render() {
        return (
            <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
                {this.props.children}
            </div>
        );
    }
}