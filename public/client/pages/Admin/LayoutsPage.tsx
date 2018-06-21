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
    Panel,
    Nav,
    NavItem,
    Navbar,
    NavbarContainer,
    NavbarSticky,
    Section,
    Flex
} from 'uikit-react';
import { AdminSidebar } from './AdminSidebar';

export class LayoutsPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { layouts: null };
    }

    render() {
        return (
            <Section padding>
                <Grid gutter="large" match>
                    <Section>
                        <Panel className="uk-placeholder">Hi</Panel>
                    </Section>
                    <Section>
                        <Panel className="uk-placeholder">Hi</Panel>
                    </Section>
                    <Section>
                        <Panel className="uk-placeholder">
                            <NavLink to="/admin/layout-editor/new"><Icon options="icon: plus; ratio: 2;" /></NavLink>
                        </Panel>
                    </Section>
                </Grid>
            </Section>
        )
    }
}