import * as React from "react";
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { 
    Button,
    Card,
    CardBody,
    CardHeader,
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

export class PagesPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { pages: null };
    }

    componentDidMount() {
        this.fetchPages();
    }

    render() {
        return (
            <Section padding>
                <Grid gutter="large" match>
                    {this.state.pages ? this.renderPageList() : null}
                    <Section>
                        <Flex alignment="center middle" className="uk-placeholder">
                            <NavLink to="/admin/layout-editor/page/new">
                                <Icon options="icon: plus; ratio: 2;" />
                            </NavLink>
                        </Flex>
                    </Section>
                </Grid>
            </Section>
        )
    }

    private renderPageList() {
        return this.state.pages.map((page, index) => (
            <Section key={index}>
                <Card>
                    <CardHeader>
                        <NavLink to={`/admin/layout-editor/page/${page.name}`}>{page.name}</NavLink>
                    </CardHeader>
                    <CardBody>
                        <Flex direction="row">
                            <Button color="text">
                                <NavLink to={`/admin/layout-editor/page/${page.name}`}>
                                    <Icon style={{ padding: '5px' }} options="icon: pencil;" />
                                </NavLink>
                            </Button>
                            <Button color="text" onClick={this.deletePage.bind(this, page.name)}>
                                <Icon style={{ padding: '5px' }} options="icon: close;" />
                            </Button>
                        </Flex>
                    </CardBody>
                </Card>
            </Section>
        ));
    }

    private fetchPages() {
        fetch('/api/pages')
        .then(res => res.json())
        .then(res => this.setState({ pages: res }, () => console.log(this.state.pages)))
        .catch(err => console.error(err));
    }

    private deletePage(pageName, event) {
        fetch(`/api/pages/${pageName}`, {
            method: 'DELETE'
        })
        .then((res) => {
            this.fetchPages();
        });
    }
}