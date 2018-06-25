import * as React from "react";
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { SketchPicker } from 'react-color';
import {
    Alert,
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Container,
    Cover,
    Dark,
    Dropdown,
    Grid,
    Icon,
    Image,
    Label,
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

export class PackagesPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { packages: null };
    }
    
    componentDidMount() {
        this.fetchPackages();
    }

    componentDidUpdate() {
        console.log(this.state.packages);
    }

    render() {
        return (
            <Section>
                <Section width="1-1" padding>
                    <Card width="1-1">
                        <NavbarSticky style={{ zIndex: '98' }} options="offset: 80;">
                            <CardHeader style={{ backgroundColor: 'white' }}>
                                <Flex direction="row">
                                    <CardTitle>
                                        Packages
                                    </CardTitle>
                                    <Section className="uk-card-badge">
                                        <Button color="text" onClick={this.reloadPackages.bind(this)}>
                                            <Icon options="refresh" />
                                        </Button>
                                    </Section>
                                </Flex>
                            </CardHeader>
                        </NavbarSticky>
                        <CardBody>
                            <Nav accordion options="multiple: true;">
                                {this.renderPackageList()}
                            </Nav>
                        </CardBody>
                    </Card>
                </Section>
            </Section>
        )
    }

    private fetchPackages() {
        return fetch('/api/packages')
            .then((res) => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    packages: res
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    private reloadPackages() {
        return fetch('/api/packages/reload');
    }

    private recompileCSS(packageName) {
        return fetch('/api/sass/compile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ packageName })
        })
    }

    private updateSassVariables(packageName, sass) {
        return fetch('/api/sass/variables', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                packageName,
                sass
            })
        })
    }

    private renderPackageList() {
        if (this.state.packages) {
            const packages = this.state.packages;
            return Object.keys(packages).map((key) => (
                <React.Fragment>
                    <NavItem parent key={key}>
                        <Link href="#">{key}</Link>
                        <Nav child>
                            <NavItem>
                                <List width="1-1">
                                    {packages[key].modules.sass ?
                                    <ListItem>
                                        <Section>
                                            <List>
                                                <ListItem>
                                                    <Flex>
                                                        <Section width="1-2" align="left" />
                                                        <Section width="1-2">
                                                            <NavbarSticky style={{ zIndex: '99' }} options="offset: 160">
                                                                <Container align="right">
                                                                    <Button
                                                                        size="small"
                                                                        color="primary"
                                                                        onClick={this.updateSassVariables.bind(
                                                                            this,
                                                                            key,
                                                                            packages[key].modules.sass
                                                                        )}>
                                                                        Save Sass
                                                                    </Button>
                                                                    <Button
                                                                        size="small"
                                                                        color="primary"
                                                                        onClick={this.recompileCSS.bind(this, key)}>
                                                                        Recompile Sass
                                                                    </Button>
                                                                </Container>
                                                            </NavbarSticky>
                                                        </Section>
                                                    </Flex>
                                                </ListItem>
                                                {this.renderSassList(key, packages[key].modules.sass)}
                                            </List>
                                        </Section>
                                    </ListItem> : null}
                                </List>
                            </NavItem>
                        </Nav>
                    </NavItem>
                    <NavItem type="divider" />
                </React.Fragment>
            ));
        }
    }

    private renderSassList(packageName, sass) {
        return Object.keys(sass).map(key => (
            <ListItem key={key}>
                <Flex>
                    <Section width="1-2" align="left">{key}</Section>
                    <Section width="1-2">
                        <Container align="right">
                            <Container className="uk-inline">
                                <Badge style={{
                                    border: '1px solid black', backgroundColor: sass[key]
                                }}/>
                                <div
                                    style={{ width: '200px' }}
                                    uk-drop="
                                        mode: click;
                                        boundary: .uk-inline;
                                        pos: left-center;">
                                    <SketchPicker
                                        color={this.state.packages[packageName].modules.sass[key]}
                                        onChangeComplete={this.updateVariableColor.bind(
                                            this, packageName, key
                                        )}
                                    />
                                </div>
                            </Container>
                        </Container>
                    </Section>
                </Flex>
            </ListItem>
        ));
    }

    private updateVariableColor(packageName, key, color, event) {
        let packages = this.state.packages;
        packages[packageName].modules.sass[key] = color.hex;
        console.log([packageName, key, color, event])
        this.setState({
            packages
        }, () => { console.log(this.state.packages[packageName][key]) });
    }
}