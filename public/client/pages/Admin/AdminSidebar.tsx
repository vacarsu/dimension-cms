import * as React from "react";
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { 
    Card,
    CardBody,
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

interface props {
    title: string;
    accordion?: boolean;
    multiple?: boolean;
}

export class AdminSidebar extends React.Component<props, any> {
    render() {
        return (
            <Card color="secondary" style={{
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
                    <CardBody>
                        <Nav 
                            preset="default"
                            accordion={this.props.accordion ? true : false}
                            options={`multiple: ${this.props.multiple ? true : false};`}>
                            <NavItem type="header">
                                {this.props.title}
                            </NavItem>
                            <NavItem type="divider" />
                            {this.props.children}
                        </Nav>
                    </CardBody>
                </Light>
            </Card>
        )
    }
}