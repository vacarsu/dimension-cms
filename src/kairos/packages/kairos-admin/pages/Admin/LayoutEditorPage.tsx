import * as React from "react";
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Resizable from 're-resizable';
import { 
    Accordion,
    AccordionItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Container,
    Cover,
    Dropdown,
    Flex,
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
    TabContainer,
    TabContent,
    Tab,
} from 'uikit-react';
import { AdminSidebar } from './AdminSidebar';
import { KairosContainer } from './../../layout-components/KairosContainer';
import { componentRegistry } from './../../../kairos-base/components/component-registry';

export class LayoutEditorPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            package: 'kairos-base',
            containers: [],
            components: null,
            componentList: null
        };
    }

    componentDidMount() {
        this.fetchComponents();
    }

    render() {
        return (
            <Flex direction="row">
                <NavbarSticky options="offset: 80;">
                    <Section 
                        color="muted"
                        style={{
                            minHeight: '89vh',
                            maxHeight: '89vh',
                            overflow: 'auto',
                            width: '180px',
                            padding: '15px 25px 15px 10px',
                            marginLeft: '-19px'
                        }}>
                        <Nav>
                            {this.renderComponentList()}
                        </Nav>
                    </Section>
                </NavbarSticky>
                <Section 
                    width="1-1"
                    padding
                    style={{ marginLeft: '225px', }}>
                    <Card width="1-1">
                        <NavbarSticky style={{ zIndex: '99' }} options="offset: 80;">
                            <CardHeader style={{ backgroundColor: 'white' }}>
                                <Flex direction="row">
                                    <Flex direction="column">
                                        <CardTitle>
                                            Layout Editor
                                        </CardTitle>
                                        <Flex>
                                            <ul style={{ marginBottom: '-21' }} uk-tab="connect: .uk-switcher;">
                                                <Tab key="tab">Editor</Tab>
                                                <Tab key="tab">Preview</Tab>
                                            </ul>
                                        </Flex>
                                    </Flex>
                                    <Section className="uk-card-badge">
                                        <Container>
                                            <Icon options="plus" />
                                            <Dropdown options="mode: hover">
                                                <List>
                                                    <ListItem>
                                                        <Button
                                                            color="text"
                                                            onClick={this.addContainer.bind(this)}>
                                                            Add Container
                                                        </Button>
                                                    </ListItem>
                                                </List>
                                            </Dropdown>
                                        </Container>
                                    </Section>
                                </Flex>
                            </CardHeader>
                        </NavbarSticky>
                        <CardBody>
                            <ul className="uk-switcher">
                                <li>{this.renderContainers()}</li>
                                <li>{this.renderPreview()}</li>
                            </ul>
                        </CardBody>
                    </Card>
                </Section>
                {/* <div id="modal-close-default" uk-modal>
                    <div className="uk-modal-dialog uk-modal-body">
                        <button className="uk-modal-close-default" type="button" uk-close></button>
                        <h2 className="uk-modal-title">Default</h2>
                        <p>
                            Lorem ipsum dolor sit amet.
                        </p>
                    </div>
                </div> */}
            </Flex>
        )
    }

    private fetchComponents() {
        fetch(`/api/components/${this.state.package}`)
            .then((res) => res.json())
            .then(res => {
                this.setState({
                    componentList: res
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    private addContainer() {
        this.setState({
            containers: [ ...this.state.containers, { children: [] } ]
        });
    }

    private renderComponentList() {
        if (this.state.componentList) {
            let components = this.state.componentList.components
            return Object.keys(components).map((key, i) => (
                <li key={i} draggable onDragStart={this.handleComponentListDragStart.bind(this, i)}>
                    <Icon
                        style={{ paddingRight: '5px' }}
                        options="table" />
                    {components[key].name}
                </li>
            ));
        }
    }

    private renderContainers() {
        return this.state.containers.map((container, i) => (
            <KairosContainer>
                <div 
                    uk-grid=""
                    className="uk-list uk-placeholder uk-grid"
                    key={i}
                    onDragOver={this.handleDragOver.bind(this, i)}
                    onDrop={this.handleDrop.bind(this, i)}
                    style={{ display: 'relative', width: '100%' }}>
                    {this.renderContainerComponents(container, i)}
                </div>
            </KairosContainer>
        ));
    }

    private renderContainerComponents(container, containerIndex) {
        return container.children.map((component, componentIndex) => (
            <Resizable
                defaultSize={{
                    width: '100%',
                    height: 50,
                }}
                maxHeight="50"
                onResizeStop={this.handleContainerComponentResizeStop.bind(this, containerIndex, componentIndex)}
                className="uk-section-muted"
                style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                <div
                    className="uk-section-muted uk-width-expand"
                    style={{ width: '100%' }}
                    draggable={!!this.state.isResizing}
                    onDragStart={
                        this.handleContainerComponentDragStart.bind(this,containerIndex, componentIndex)
                    }>
                    {component.name}
                </div>
            </Resizable>
        ));
    }

    private renderPreview() {
        return this.state.containers.map((container, i) => (
            <Grid key={i}>
                {container.children.map((child, idx) => {
                    let Component = componentRegistry[child.name];
                    let ChildComponent = componentRegistry['AccordionItem'];
                    return (
                        <Component key={idx} {...child.settings}>
                            <ChildComponent />
                        </Component>
                    );
                })}
            </Grid>
        ));
    }

    private handleComponentListDragStart(i, event) {
        event.dataTransfer.setData(
            'component',
            JSON.stringify({ type: 'component', component: this.state.componentList.components[i] })
        );
        event.dataTransfer.dropEffect = 'move';
    }

    private handleContainerComponentDragStart(containerIndex, componentIndex, event) {
        let containerChildren = this.state.containers[containerIndex].children;
        event.dataTransfer.setData(
            'component',
            JSON.stringify({
                type: 'child',
                containerIndex: containerIndex,
                componentIndex: componentIndex,
                containerChild: containerChildren[componentIndex]
            })
        );
    }

    private handleContainerComponentResizeStop(
        containerIndex,
        componentIndex,
        event,
        direction,
        element,
        delta
    ) {
        let containers = this.state.containers;
        let eleWidth = 
        containers[containerIndex].children[componentIndex].settings = {
            style: { width: element.style.width }
        };
        this.setState({
            containers
        });
    }

    private handleDragOver(i, event) {
        event.preventDefault();
    }

    private handleDrop(i, event) {
        event.preventDefault();
        const containers = this.state.containers;
        const componentData = JSON.parse(event.dataTransfer.getData('component'));
        componentData.type === 'component';
        if (componentData.type === 'component') {
            containers[i].children.push(componentData.component);
            this.setState({ containers });
        } else {
            containers[componentData.containerIndex].children.splice(componentData.componentIndex);
            containers[i].children.push(componentData.containerChild);
            this.setState({ containers });
        }
    }

    private handleDragEnd(i, event) {
        event.preventDefault();
    }
}