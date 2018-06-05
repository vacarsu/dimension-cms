import * as React from "react";
import { render } from 'react-dom';
import { Alert } from './components/Alert/Alert';
import { Article } from './components/Article/Article';
import { Accordion } from './components/Accordion/Accordion';
import { Badge } from './components/Badge/Badge';
import { Breadcrumb } from './components/Breadcrumb/Breadcrumb';
import { Button } from './components/Button/Button';
import { Dropdown } from './components/Dropdown/Dropdown';
import { Flex } from './components/Flex/Flex';
import { Grid } from './components/Grid/Grid';
import { Inline } from './components/Inline/Inline';
import { Navbar } from './components/Navbar/Navbar';
import { NavbarDropdown } from './components/Navbar/NavbarDropdown';
import { NavbarSticky } from './components/Navbar/NavbarSticky';
import { Overlay } from './components/Overlay/Overlay';
import { Panel } from './components/Panel/Panel';
import { Progress } from './components/Progress/Progress';
import { Labels } from './components/Labels/Labels'; 
import { Link } from './components/Link/Link'; 

document.addEventListener('DOMContentLoaded', () => {
    render(
        <ExamplePage />,
        document.getElementById('root')
    );
}, false);

class ExamplePage extends React.Component<any, any> {
    accordionItems = [
        { title: "Test", content: "Test" },
        { title: "Test", content: "Test" },
        { title: "Test", content: "Test" }
    ];
    breadcrumbItems = [
        { href: "#", label: "Test" },
        { href: "#", label: "Test" },
        { href: "#", label: "Test" }
    ];
    badgeCount: number = 99;
    progressMax: number = 100;
    progressInterval: number;

    constructor(props) {
        super(props);
        this.state = {
            progressValue: 0
        }
    }

    componentDidMount() {
        this.progressInterval = setInterval(() => {
            this.setState({ progressValue: this.state.progressValue + 1 })
            if (this.state.progressValue === this.progressMax) {
                this.setState({ progressValue: 0 })
            };
        }, 1000);
    }

    render() {
        return (
            <div>
                <NavbarSticky>
                    <Navbar dropdownAlign="left">
                        <li>
                            <a href="#">Parent</a>
                            <NavbarDropdown>
                                <li className="uk-active"><a href="#">Active</a></li>
                                <li><a href="#">Item</a></li>
                                <li className="uk-nav-header">Header</li>
                                <li><a href="#">Item</a></li>
                                <li><a href="#">Item</a></li>
                                <li className="uk-nav-divider"></li>
                                <li><a href="#">Item</a></li>
                            </NavbarDropdown>
                        </li>
                    </Navbar>
                </NavbarSticky>
                <h3><Link href="#" type="muted">Test Heading</Link></h3>
                <Labels content="Testing this Label" color="warning" />
                <Alert width="1-2" content="Test" color="primary" isClosable />
                <Badge count={this.badgeCount} />
                <Breadcrumb items={this.breadcrumbItems} />
                <div>Accordion and Panel in a Flex container.</div>
                <Flex alignment="center middle" direction="row">
                    <Accordion
                        width="1-2"
                        items={this.accordionItems}
                    />
                    <Panel width="1-2" height="medium" align="right" isScrollable>
                        <span>Test Panel</span>
                    </Panel>
                </Flex>
                <div>Dropdown buttons in a grid.</div>
                <Grid>
                    <Inline style="dark">
                        <Button>Test</Button>
                        <Dropdown position="top-justify">
                            <li className="uk-active"><a href="#">Active</a></li>
                            <li><a href="#">Item</a></li>
                            <li className="uk-nav-header">Header</li>
                            <li><a href="#">Item</a></li>
                            <li><a href="#">Item</a></li>
                            <li className="uk-nav-divider"></li>
                            <li><a href="#">Item</a></li>
                        </Dropdown>
                    </Inline>
                    <Inline style="dark">
                        <Button>Test</Button>
                        <Dropdown position="top-justify">
                            <li className="uk-active"><a href="#">Active</a></li>
                            <li><a href="#">Item</a></li>
                            <li className="uk-nav-header">Header</li>
                            <li><a href="#">Item</a></li>
                            <li><a href="#">Item</a></li>
                            <li className="uk-nav-divider"></li>
                            <li><a href="#">Item</a></li>
                        </Dropdown>
                    </Inline>
                    <Inline style="dark">
                        <Button>Test</Button>
                        <Dropdown position="top-justify">
                            <li className="uk-active"><a href="#">Active</a></li>
                            <li><a href="#">Item</a></li>
                            <li className="uk-nav-header">Header</li>
                            <li><a href="#">Item</a></li>
                            <li><a href="#">Item</a></li>
                            <li className="uk-nav-divider"></li>
                            <li><a href="#">Item</a></li>
                        </Dropdown>
                    </Inline>
                    <Inline style="dark">
                        <Button>Test</Button>
                        <Dropdown position="top-justify">
                            <li className="uk-active"><a href="#">Active</a></li>
                            <li><a href="#">Item</a></li>
                            <li className="uk-nav-header">Header</li>
                            <li><a href="#">Item</a></li>
                            <li><a href="#">Item</a></li>
                            <li className="uk-nav-divider"></li>
                            <li><a href="#">Item</a></li>
                        </Dropdown>
                    </Inline>
                </Grid>
                <Progress value={this.state.progressValue} max={this.progressMax} />
            </div>
        )
    }
}