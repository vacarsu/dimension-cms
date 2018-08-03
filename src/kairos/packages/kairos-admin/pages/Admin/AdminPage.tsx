import * as React from "react";
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { 
    Card,
    CardBody,
    Container,
    Cover,
    Dark,
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
import { AdminSidebar } from './AdminSidebar';
import { ComponentsPage } from './ComponentsPage';
import { PackagesPage } from './PackagesPage';
import { PagesPage } from './PagesPage';
import { LayoutEditorPage } from './LayoutEditorPage';
import { LayoutsPage } from './LayoutsPage';
import { MenuContext } from './../../context/MenuContext';

export class AdminPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            menu: 'isOpen'
        }
    }

    render() {
        return (
            <React.Fragment>
                <Section position="relative">
                    <NavbarSticky style={{ zIndex: '100' }}>
                        <Light>
                            <Section color="primary" preserveColor>
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
                                        <ListItem>
                                            <NavLink to="/admin/pages">Pages</NavLink>
                                        </ListItem>
                                        <ListItem>
                                            <NavLink to="/admin/Layouts">Layouts</NavLink>
                                        </ListItem>
                                    </Navbar>
                                </NavbarContainer>
                            </Section>
                        </Light>
                    </NavbarSticky>
                </Section>
                <MenuContext.Provider value={this.state.menu}>
                <AdminSidebar onMenuToggle={this.toggleMenu.bind(this)} accordion multiple title="Components" />
                <MenuContext.Consumer>
                    {value => (
                    <Container 
                        style={{
                            marginLeft: value === 'isOpen' ? '230' : '5', 
                            marginRight: '30px'
                        }}>
                        {console.log(value)}
                        <Route path={`${this.props.match.url}/components`} component={ComponentsPage} />
                        <Route path={`${this.props.match.url}/packages`} component={PackagesPage} />
                        <Route path={`${this.props.match.url}/pages`} component={PagesPage} />
                        <Route path={`${this.props.match.url}/layouts`} component={LayoutsPage} />
                        <Route path={`${this.props.match.url}/layout-editor/:mode/:id`} component={LayoutEditorPage} />
                    </Container>)}
                </MenuContext.Consumer>
                </MenuContext.Provider>
            </React.Fragment>
        )
    }

    toggleMenu() {
        this.setState({
            menu: this.state.menu === 'isOpen' ? 'isClosed' : 'isOpen'
        })
    }
}