import * as React from "react";
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { 
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Container,
    Cover,
    Grid,
    Icon,
    Image,
    Light,
    Link,
    List,
    ListItem,
    Offcanvas,
    OffcanvasContainer,
    Nav,
    NavItem,
    Navbar,
    NavbarContainer,
    NavbarSticky,
    Section,
    Flex
} from 'uikit-react';
import { MenuContext } from './../../context/MenuContext';

interface props {
    title: string;
    accordion?: boolean;
    multiple?: boolean;
    onMenuToggle: any;
}

export class AdminSidebar extends React.Component<props, any> {
    constructor(props) {
        super(props);
        this.state = {
            menu: 'menuOpen'
        }
    }
    render() {
        return (
            <React.Fragment>
                <div 
                    className="menu uk-section-secondary"
                    hidden
                    style={{
                        position: 'fixed',
                        overflow: 'auto',
                        top: '80px',
                        bottom: '0',
                        left: '0',
                        paddingLeft: '0',
                        paddingRight: '0'
                    }}>
                    <div>
                        <Button onClick={this.props.onMenuToggle} color="text" toggleOptions="target: .menu; animation: uk-animation-fade;">
                            <Icon options="arrow-right" />
                        </Button>
                    </div>
                </div>

                <Card 
                    className="menu"
                    color="secondary"
                    style={{
                        minHeight: '100vh',
                        position: 'fixed',
                        overflow: 'auto',
                        top: '80px',
                        width: '250px',
                        bottom: '0',
                        left: '0',
                        paddingLeft: '0',
                        paddingRight: '0'
                    }}>
                    <Light>
                        <CardHeader>
                            <CardTitle>
                                <Section className="uk-card-badge">
                                    <Button onClick={this.props.onMenuToggle} color="text" toggleOptions="target: .menu; animation: uk-animation-fade;">
                                        <Icon options="arrow-left" />
                                    </Button>
                                </Section>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Nav 
                                preset="primary"
                                accordion={this.props.accordion ? true : false}
                                options={`multiple: ${this.props.multiple ? true : false};`}>
                                <NavItem>
                                    <NavLink to="/admin/components">Components</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/admin/packages">Packages</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/admin/pages">Pages</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/admin/Layouts">Layouts</NavLink>
                                </NavItem>
                            </Nav>
                        </CardBody>
                    </Light>
                </Card>
            </React.Fragment>
        )
    }
}