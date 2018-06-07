import * as React from "react";
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import 'prismjs';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-tsx.min';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-css.min';

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
import { Section } from './components/Section/Section';
import { Light } from './components/Light/Light';
import { Flex } from './components/Flex/Flex';
import { Parallax } from './components/Parallax/Parallax';

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
                    <NavbarContainer className="uk-background-primary">
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
                <Light>
                    <Section style="primary">
                        <Container size="large">
                            <Container size="small">
                                    <Flex alignment="center">
                                            <img src="/client/images/kairos-logo-white.png" />
                                    </Flex>
                                <Flex alignment="center">
                                    <h2>Welcome To Dimension</h2>
                                </Flex>
                                <Flex alignment="center">
                                 <Button size="large" color="primary">Get Started</Button>
                                </Flex>
                            </Container>
                        </Container>
                    </Section>
                </Light>
                    <Section style="default">
                        <Container>
                            <Flex alignment="center" direction="row">
                                <List type="divider">
                                    <ListItem>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>. Praesent mauris. Fusce nec tellus sed augue semper porta. <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>. Sed dignissim lacinia nunc. </p>
                                    </ListItem>
                                    <ListItem> 
                                        <p>Curabitur tortor. Pellentesque nibh. <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit</i>. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit</i>. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. </p>
                                    </ListItem>
                                    <ListItem>
                                        <p><i>Lorem ipsum dolor sit amet, consectetur adipiscing elit</i>. Quisque volutpat condimentum velit. <i>Sed dignissim lacinia nunc</i>. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. <b>Proin ut ligula vel nunc egestas porttitor</b>. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. </p>
                                    </ListItem>
                                    <ListItem>
                                        <p>Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. <b>Suspendisse in justo eu magna luctus suscipit</b>. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. <b>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui</b>. Nulla facilisi. Integer lacinia sollicitudin massa. </p>
                                    </ListItem>
                                </List>
                            </Flex>
                        </Container>
                    </Section>
                
                
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