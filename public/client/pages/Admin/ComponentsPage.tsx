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
import { AdminSidebar } from './AdminSidebar';

export class ComponentsPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { navOptions: null };
    }
    
    componentDidMount() {
        fetch('/api/components')
            .then((res) => res.json())
            .then(res => {
                this.setState({
                    navOptions: res
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        return (
            <Grid gutter="medium">
                <AdminSidebar accordion multiple title="Components">
                    {this.renderMenu()}
                </AdminSidebar>
                <Section size="small">
                    <Section padding>
                        <p>Hi</p>
                    </Section>
                </Section>
            </Grid>
        )
    }

    private renderMenu() {
        if (this.state.navOptions) {
            return this.state.navOptions.map((option, index) => {
                return (
                    <NavItem parent key={index}>
                        <Link href="#">{option}</Link>
                        <Nav child>
                            <NavItem>
                                <Link href="#">
                                    <Icon options="plus" /> Create Prefab
                                </Link>
                            </NavItem>
                        </Nav>
                    </NavItem>
                );
            });
        }
    }
}