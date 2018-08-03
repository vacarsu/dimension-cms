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
        let packages = JSON.parse(localStorage.getItem('packages'));
        let modules = JSON.parse(localStorage.getItem('modules'));
        this.setState({ packages, modules });
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

    private updateSassVariables(packageName, sassVariables) {
        return fetch('/api/sass/variables', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                packageName,
                sassVariables
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
                            {this.renderModuleList(key)}
                        </Nav>
                    </NavItem>
                    <NavItem type="divider" />
                </React.Fragment>
            ));
        }
    }

    private renderModuleList(packageName) {
        return this.state.modules.map((module, moduleIndex) => {
            if (module.packageName === packageName) {
                return (
                    <NavItem key={moduleIndex}>
                        <List style={{ width: '100%' }}>
                            {module.module.type === 'sass' ? 
                                this.renderSassModule(module.module, packageName, moduleIndex)
                                : null}
                        </List>
                    </NavItem>
                );
            }
        });
    }

    private renderSassModule(module, packageName, moduleIndex) {
        return (
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
                                                    packageName,
                                                    module.variables
                                                )}>
                                                Save Sass
                                            </Button>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={this.recompileCSS.bind(this, packageName)}>
                                                Recompile Sass
                                            </Button>
                                        </Container>
                                    </NavbarSticky>
                                </Section>
                            </Flex>
                        </ListItem>
                        {this.renderSassList(module, packageName, moduleIndex)}
                    </List>
                </Section>
            </ListItem>
        );
    }

    private renderSassList(module, packageName, moduleIndex) {
        return Object.keys(module.variables).map(key => (
            <ListItem key={key}>
                <Flex>
                    <Section width="1-2" align="left">{key}</Section>
                    <Section width="1-2">
                        <Container align="right">
                            <Container className="uk-inline">
                                <Badge style={{
                                    border: '1px solid black', backgroundColor: module.variables[key]
                                }} count={null}/>
                                <div
                                    style={{ width: '200px' }}
                                    uk-drop="
                                        mode: click;
                                        boundary: .uk-inline;
                                        pos: left-center;">
                                    <SketchPicker
                                        color={module[key]}
                                        onChangeComplete={this.updateVariableColor.bind(
                                            this, module, key, moduleIndex
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

    private updateVariableColor(module, key, moduleIndex, color, event) {
        let modules = this.state.modules
        modules[moduleIndex].module.variables[key] = color.hex;
        this.setState({
            modules
        }, () => console.log(modules[moduleIndex].module.variables[key]));
    }
}