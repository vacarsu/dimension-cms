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

    componentDidMount() {
        this.fetchLayouts();
    }

    render() {
        return (
            <Section padding>
                <Grid gutter="large" match>
                    {this.state.layouts ? this.renderLayoutList() : null}
                    <Section>
                        <Panel className="uk-placeholder">
                            <NavLink to="/admin/layout-editor/layout/new"><Icon options="icon: plus; ratio: 2;" /></NavLink>
                        </Panel>
                    </Section>
                </Grid>
            </Section>
        )
    }

    private renderLayoutList() {
        return this.state.layouts.map((layout, index) => (
            <Section>
                <Panel className="uk-placeholder">
                    <NavLink to={`/admin/layout-editor/layout/${layout.name}`}>{layout.name}</NavLink>
                </Panel>
            </Section>
        ));
    }

    private fetchLayouts() {
        fetch('/api/layouts')
        .then(res => res.json())
        .then(res => this.setState({ layouts: res }, () => console.log(this.state.layouts)))
        .catch(err => console.error(err));
    }
}