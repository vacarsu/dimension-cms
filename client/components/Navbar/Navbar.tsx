import * as React from 'react';

declare interface props {
    align?: string;
    dropbar?: boolean;
    dropbarDuration?: number;
    dropbarMode?: 'slide' | 'push';
    dropdownAlign?: string;
    dropdownMode?: 'hover' | 'click';
    transparent?: boolean;
}

export class Navbar extends React.Component<props, any> {
    render() {
        return (
            <div>
                <nav className={`uk-navbar-container ${this.setTransparent()}`}
                    uk-navbar={`
                        ${this.setDropbar()}
                        ${this.setDropbarDuration()}
                        ${this.setDropbarMode()}
                        ${this.setDropdownAlign()}
                        ${this.setDropdownMode()}
                    `}>
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

    private setDropbar(): string {
        if (this.props.dropbar) {
            return `dropbar: true;`
        }
    }

    private setDropbarDuration(): string | void {
        if (this.props.dropbarDuration) {
            if (!this.props.dropbar) {
                return console.warn('Please set the dropbar property to use dropbarDuration on the navbar component.');
            }

            return `dropbarDuration: ${this.props.dropbarDuration};`;
        }
    }

    private setDropbarMode(): string | void {
        if (this.props.dropbarDuration) {
            if (!this.props.dropbar) {
                return console.warn('Please set the dropbar property to use dropbarMode on the navbar component.');
            }

            return `dropbarMode: ${this.props.dropbarMode};`;
        }
    }

    private setDropdownAlign(): string {
        if (this.props.align) {
            return `boundary-align: true; align: ${this.props.align};`
        }
    }

    private setDropdownMode(): string {
        if (this.props.dropdownMode) {
            return `mode: ${this.props.dropdownMode};`
        }
    }

    private setTransparent(): string {
        if (this.props.transparent) {
            return `uk-navbar-transparent`;
        }
    }
}