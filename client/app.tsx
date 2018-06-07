import * as React from "react";
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import 'prismjs';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-css';

import { Button } from './components/Button/Button';
import { Container } from './components/Container/Container';
import { Icon } from './components/Icon/Icon';
import { Link } from './components/Link/Link';
import { List } from './components/List/List';
import { ListItem } from './components/List/ListItem';
import { Offcanvas } from './components/Offcanvas/Offcanvas';
import { OffcanvasContainer } from './components/Offcanvas/OffcanvasContainer';
import { Navbar } from './components/Navbar/Navbar';
import { NavbarContainer } from './components/Navbar/NavbarContainer';
import { NavbarSticky } from './components/Navbar/NavbarSticky';
import { Scrollspy } from './components/Scrollspy/Scrollspy';

import { AccordionPage } from './pages/Accordion/AccordionPage';
import { IconPage } from './pages/Icon/IconPage';

document.addEventListener('DOMContentLoaded', () => {
    render(
        <ExamplePage />,
        document.getElementById('root')
    );
}, false);

class ExamplePage extends React.Component<any, any> {
    render() {
        return (
            <OffcanvasContainer>
                <NavbarSticky>
                    <NavbarContainer>
                        <Navbar>
                            <ListItem>
                                <Link toggleOptions="target: #menu;" href="#">
                                    <Icon options="menu" button />
                                </Link>
                            </ListItem>
                        </Navbar>
                        <Navbar align="right">
                            <ListItem>
                                <Link href="https://github.com/vacarsu/dimension-cms">
                                    <Icon options="github" button />
                                </Link>
                            </ListItem>
                        </Navbar>
                    </NavbarContainer>
                </NavbarSticky>
                
                <Router>
                    <Container size="medium">
                        <Offcanvas id="menu" options="overlay: true">
                            <List type="divider">
                                <ListItem>
                                    <NavLink to="/client/accordion">Accordion</NavLink>
                                </ListItem>
                                <ListItem>
                                    <NavLink to="/client/icon">Icon</NavLink>
                                </ListItem>
                            </List>
                        </Offcanvas>
                        <Route exact path="/client/accordion" component={AccordionPage}/>
                        <Route exact path="/client/icon" component={IconPage}/>
                    </Container>
                </Router>
            </OffcanvasContainer>
        )
    }
}