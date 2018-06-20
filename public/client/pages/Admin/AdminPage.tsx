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
import { ComponentsPage } from './ComponentsPage';
import { PackagesPage } from './PackagesPage';

export class AdminPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Section position="relative">
                <Section color="primary">
                    <NavbarContainer transparent>
                        <Navbar>
                            <ListItem>
                                <Link href="#">
                                    <Image
                                        width="32"
                                        height="32"
                                        src="/client/images/DimensionSymbolWhite.png"
                                    />
                                </Link>
                            </ListItem>
                            <ListItem>
                                <NavLink to="/admin/components">Components</NavLink>
                            </ListItem>
                            <ListItem>
                                <NavLink to="/admin/packages">Packages</NavLink>
                            </ListItem>
                        </Navbar>
                    </NavbarContainer>
                </Section>
                <Section>
                    <Route path={`${this.props.match.url}/components`} component={ComponentsPage} />
                    <Route path={`${this.props.match.url}/packages`} component={PackagesPage} />
                </Section>
            </Section>
        )
    }
}