import * as React from "react";
import { findDOMNode } from 'react-dom';
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
    Form,
    FormLabel,
    InputContainer,
    Checkbox,
    Select,
    SelectOption,
    Textarea,
    Input,
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
import { KairosContainer } from './../../layout-components/KairosContainer';

export class LayoutEditorPage extends React.Component<any, any> {
    nameInputRef;

    constructor(props) {
        super(props);
        this.state = {
            mode: null,
            package: 'kairos-base',
            name: '',
            containers: [],
            layout: '',
            editingComponent: null,
            components: null,
            componentRegistry: null,
            componentList: null,
            layoutList: null
        };

        this.nameInputRef = React.createRef();
    }

    componentDidMount() {
        let mode;
        if (this.props.match.params.id === 'new') {
            mode = `new-${this.props.match.params.mode}`;
        } else {
            mode = `edit-${this.props.match.params.mode}`;
        }
        this.setState({ mode });
        this.fetchComponents();
        this.fetchComponentRegistry();
        if (mode === 'edit-layout') {
            this.fetchLayout(this.props.match.params.id);
        }

        if (mode === 'new-page') {
            this.fetchLayouts();
        }

        if (mode === 'edit-page') {
            this.fetchPage();
            this.fetchLayouts();
        }

        UIkit.util.on('#component-settings', 'hidden', this.handleComponentSettingsClose.bind(this));
    }

    render() {
        return (
            <Flex direction="row">
                <Section 
                    color="muted"
                    style={{
                        position: 'fixed',
                        top: '80',
                        bottom: '0',
                        overflow: 'auto',
                        width: '180px',
                        padding: '15px 25px 0px 10px',
                        marginLeft: '-19px'
                    }}>
                    <Nav>
                        <InputContainer>
                            <FormLabel>Component Module</FormLabel>
                            <Select onChange={this.handleComponentModuleChange.bind(this)}>
                                {this.renderComponentModuleOptions()}
                            </Select>
                        </InputContainer>
                        <NavItem type="divider" />
                        {this.renderComponentList()}
                    </Nav>
                </Section>
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
                            <Flex direction="row">
                                { this.state.mode === 'edit-page' || this.state.mode === 'new-page' ?
                                <Container style={{ paddingBottom: '25px' }}>
                                    <InputContainer>
                                        <Select value={this.state.layout} onChange={this.handlePageLayoutChange.bind(this)}>
                                            <SelectOption value="">Select Layout</SelectOption>
                                            {this.renderLayoutOptions()}
                                        </Select>
                                    </InputContainer>
                                </Container> : null
                                }
                                <Container style={{ paddingBottom: '25px' }}>
                                    <input 
                                        ref={this.nameInputRef}
                                        className="uk-input"
                                        type="text"
                                        placeholder="Name"
                                        value={this.state.name}
                                        onBlur={this.validateNameInput.bind(this)}
                                        onChange={this.handleNameChange.bind(this)} />
                                </Container>
                                <Container>
                                    <Button
                                        onClick={this.save.bind(this)}>
                                        Save
                                    </Button>
                                </Container>
                            </Flex>
                            <ul className="uk-switcher">
                                <li>
                                    {this.renderContainers()}
                                </li>
                                <li>
                                    {this.state.componentRegistry ? this.renderPreview() : null}
                                </li>
                            </ul>
                        </CardBody>
                    </Card>
                    <div id="component-settings" className="uk-modal-full" uk-modal="" style={{ zIndex: '1000' }}>
                        <div className="uk-modal-dialog">
                            <button className="uk-modal-close-full uk-close-large" type="button" uk-close></button>
                            <div className="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" uk-grid>
                                <div className="uk-background-cover" uk-height-viewport></div>
                                <div className="uk-padding-large">
                                    { this.state.editingComponent ?
                                    <React.Fragment>
                                        <h1>{this.state.editingComponent.name}</h1>
                                        <Form>
                                            {this.renderSettingsOptions()}
                                        </Form>
                                    </React.Fragment>
                                    : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
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

    private async fetchComponentRegistry() {
        let module = await import(`./../../../${this.state.package}/components/component-registry`);
        this.setState({ componentRegistry: module.componentRegistry });
    }

    private fetchLayout(layoutName) {
        fetch(`/api/layouts/${layoutName}`)
        .then(res => res.json())
        .then(res => {
            if (this.state.mode === 'edit-layout') {
                this.setState({ name: res.name, containers: res.containers });
            } else if (this.state.mode === 'edit-page' || this.state.mode === 'new-page') {
                this.setState({ containers: this.mergeContainers(res.containers) });
            }
        });
    }

    private fetchLayouts() {
        fetch(`/api/layouts`)
        .then(res => res.json())
        .then(res => this.setState({ layoutList: res }));
    }

    private fetchPage() {
        fetch(`/api/pages/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(res => 
            this.setState({ name: res.name, layout: res.layout ? res.layout : '' }, () =>
                res.layout ? this.fetchLayout(res.layout) : null
            )
        );
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

    private renderComponentModuleOptions() {
        let modules = JSON.parse(localStorage.getItem('modules'));
        return modules.map((module, index) => {
            if (module.type === 'components') {
                return <SelectOption value={module.packageName}>{module.packageName}</SelectOption>
            }
        });
    }

    private renderLayoutOptions() {
        if (this.state.layoutList) {
            return this.state.layoutList.map((layout, index) => (
                <SelectOption key={index} value={layout.name}>{layout.name}</SelectOption>
            ));
        }
    }

    private renderContainers() {
        return this.state.containers.map((container, i) => (
            <div key={i} className="uk-inline" style={{ width: '100%' }}>
                <div className="uk-placeholder">
                    <KairosContainer>
                        <div 
                            uk-grid=""
                            className="uk-grid uk-section-muted"
                            onDragOver={this.handleDragOver.bind(this, i)}
                            onDrop={this.handleDrop.bind(this, i)}
                            style={{
                                width: '100%',
                                minHeight: '50px',
                                marginLeft: '0'
                            }}>
                            {this.renderContainerComponents(container, i)}
                        </div>
                    </KairosContainer>
                </div>
                <span className="uk-position-top-left uk-label">Basic Container</span>
            </div>
        ));
    }

    private renderContainerComponents(container, containerIndex) {
        return container.children.map((component, componentIndex) => (
            <Resizable
                key={`${containerIndex}-${componentIndex}`}
                defaultSize={{
                    width: component.settings.style.width,
                    height: 50,
                }}
                maxWidth="100%"
                minHeight="50"
                maxHeight="50"
                onResizeStop={this.handleContainerComponentResizeStop.bind(this, containerIndex, componentIndex)}
                className="uk-section-primary"
                uk-tooltip={`${component.settings.style.width}`}
                style={{ margin: '5px 5px 5px 5px' }}>
                <div
                    className="uk-section-primary uk-width-expand"
                    style={{ width: '100%' }}
                    draggable
                    onDragStart={
                        this.handleContainerComponentDragStart.bind(this,containerIndex, componentIndex)
                    }>
                    {component.name}
                    <div className="uk-align-right">
                        <Button 
                            color="link"
                            toggleOptions="target: #component-settings;"
                            onClick={this.setEditingComponent.bind(this, component)}>
                            <Icon options="pencil" />
                        </Button>
                    </div>
                </div>
            </Resizable>
        ));
    }

    private renderPreview() {
        return this.state.containers.map((container, i) => (
            <Grid gutter="collapse" key={`${i}-container`} style={{ width: '100%' }}>
                {this.renderPreviewComponents(container)}
            </Grid>
        ));
    }

    private renderPreviewComponents(container) {
        return container.children.map((child, i) => {
            console.log(child.settings);
            let Component = this.state.componentRegistry[child.name];
            return (
                <Component key={`${i}-child`} {...child.settings} />
            );
        })
    }

    private renderSettingsOptions() {
        console.log(this.state.editingComponent);
        let props = this.state.editingComponent.props;
        return Object.keys(props).map((propName, i) => {
            let prop = props[propName];
            switch(prop.type) {
                case 'text':
                    return (
                        <InputContainer key={i}>
                            <Input
                                placeholder={propName}
                                onChange={this.handlePropSettingChange.bind(this, propName)}
                                value={this.state.editingComponent.settings[propName]} />
                        </InputContainer>
                    );
                case 'textarea':
                    return (
                        <InputContainer key={i}>
                            <Textarea 
                                placeholder={propName}
                                onChange={this.handlePropSettingChange.bind(this, propName)}>
                                {props[propName].parseJson ?
                                    JSON.stringify(this.state.editingComponent.settings[propName])
                                    : this.state.editingComponent.settings[propName]}
                            </Textarea>
                        </InputContainer>
                    );
                case 'select':
                    return (
                        <InputContainer key={i}>
                            <Select onChange={this.handlePropSettingChange.bind(this, propName)}>
                                {props[propName].options.map((option) => (
                                    <SelectOption value={option}>{option}</SelectOption>
                                ))}
                            </Select>
                        </InputContainer>
                    );
                case 'checkbox':
                    return (
                        <InputContainer key={i}>
                            <FormLabel>{propName}</FormLabel>
                            <Checkbox 
                                value={this.state.editingComponent.settings[propName]}
                                onChange={this.handlePropSettingChange.bind(this, propName)} />
                        </InputContainer>
                    );
                case 'number':
                    return (
                        <InputContainer key={i}>
                            <FormLabel>{propName}</FormLabel>
                            <input
                                type="number"
                                value={this.state.editingComponent.settings[propName]}
                                onChange={this.handlePropSettingChange.bind(this, propName)} />
                        </InputContainer>
                    );
                case 'child':
                    return (
                        <List key={i}>
                            <ListItem>
                                <Button onClick={this.addChildField.bind(this, propName)}><Icon options="plus" /></Button>
                            </ListItem>
                            {this.state.editingComponent.settings[propName].map((child, childIndex) => (
                                Object.keys(child).map((childPropName) => (
                                    <ListItem key={childIndex}>
                                        {this.renderChildSettingsOptions(prop, propName, childPropName, childIndex)}
                                    </ListItem>
                                ))
                            ))}
                        </List>
                    );
                default:
                    break
            }
        })
    }

    private renderChildSettingsOptions(prop, propName, childPropName, index) {
        let propField = prop.props[childPropName];
        console.log(propField);
        console.log(prop);
        switch(propField.type) {
            case 'text':
                return (
                    <InputContainer key={childPropName}>
                        <Input
                            placeholder={childPropName}
                            onChange={this.handleChildPropSettingChange.bind(this, propName, childPropName, index)}
                            value={this.state.editingComponent.settings[propName][index][childPropName]} />
                    </InputContainer>
                );
            case 'textarea':
                return (
                    <InputContainer key={childPropName}>
                        <Textarea
                            placeholder={childPropName}
                            onChange={this.handleChildPropSettingChange.bind(this, propName, childPropName, index)}>
                            {this.state.editingComponent.settings[propName][index][childPropName]}
                        </Textarea>
                    </InputContainer>
                );
            default:
                break;
        }
    }

    private setEditingComponent(component) {
        let editingComponent = component;
        this.setState({ editingComponent });
    }

    private addChildField(key, event) {
        let editingComponent = this.state.editingComponent;
        let childProps;
        let child = {};
        Object.keys(editingComponent.props[key].props).forEach((key) => child[key] = null);
        editingComponent.settings[key].push(child);

        this.setState({ editingComponent });
    }

    private mergeContainers(layoutContainers) {
        let mergedContainers = this.state.containers;
        layoutContainers.forEach((container, index) => {
            if (mergedContainers[index]) {
                container.children.forEach((child, childIndex) => {
                    mergedContainers[index].children.unshift(child);
                });
            }
        });

        return mergedContainers;
    }

    private handleComponentSettingsClose() {
        console.log('event fired');
        this.setState({ editingComponent: null });
    }

    private handleComponentModuleChange(event) {
        this.setState({ package: event.target.value },
            () => this.fetchComponents());
    }

    private handlePageLayoutChange(event) {
        if (event.target.value) {
            let layoutName = event.target.value;
            let selectedLayout;
            this.state.layoutList.forEach((layout, index) => {
                if (layout.name === layoutName) {
                    selectedLayout = layout;
                }
            });
            this.setState({
                layout: layoutName,
                containers: this.mergeContainers(selectedLayout.containers)
            });
        }
    }

    private handleNameChange(event) {
        this.setState({ name: event.target.value},
            () => this.fetchComponentRegistry());
    }

    private handlePropSettingChange(propName, event) {
        let editingComponent = this.state.editingComponent;
        console.log(event.target.value);
        if (editingComponent.props[propName].parseJson) {
            editingComponent.settings[propName] = JSON.parse(event.target.value);
        } else if (editingComponent.props[propName].type === 'checkbox') {
            editingComponent.settings[propName] = !!event.target.value;
        } else {
            editingComponent.settings[propName] = event.target.value;
        }
        this.setState({ editingComponent });
    }

    private handleChildPropSettingChange(propName, childPropName, index, event) {
        let editingComponent = this.state.editingComponent;
        editingComponent.settings[propName][index][childPropName] = event.target.value;
        this.setState({ editingComponent });
    }

    private handleComponentListDragStart(i, event) {
        event.dataTransfer.setData(
            'component',
            JSON.stringify({ type: 'component', component: this.state.componentList.components[i] })
        );
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
        containers[containerIndex].children[componentIndex].settings.style = { width: element.style.width };
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
        if (componentData.type === 'component') {
            componentData.component.settings = this.setupDefaultPropSettings(componentData.component);
            containers[i].children.push(componentData.component);
            this.setState({ containers }, () => console.log(this.state.containers[i]));
        } else {
            containers[i].children.push(componentData.containerChild);
            containers[componentData.containerIndex].children.splice(componentData.componentIndex, 1);
            this.setState({ containers });
        }
    }

    private handleDragEnd(i, event) {
        event.preventDefault();
    }

    private setupDefaultPropSettings(component) {
        let componentSettings = {};
        for (let key in component.props) {
            let type = component.props[key].type;
            let defaultValue = component.props[key].default;
            if (type !== 'child' && !componentSettings[key]) {
                componentSettings = { ...componentSettings, [key]: defaultValue };
            }

            if (type === 'child' && !componentSettings[key]) {
                componentSettings = {
                    ...componentSettings,
                    [key]: []
                };
            }
        }

        return componentSettings;
    }

    private validateNameInput() {
        if (!this.state.name) {
            this.nameInputRef.current.className = `${this.nameInputRef.current.className} uk-form-danger`;
            this.nameInputRef.current.focus;
            return false;
        } else {
            this.nameInputRef.current.className = `uk-input`;
            return true;
        }
    }

    private save() {
        if (!this.validateNameInput()) return;
        if (this.state.mode === 'new-layout' || this.state.mode === 'edit-layout') {
            this.saveLayout();
        }
        if (this.state.mode === 'new-page' || this.state.mode === 'edit-page') {
            this.savePage();
        }
    }

    private savePage() {
        let page = {
            name: this.state.name,
            layout: this.state.layout ? this.state.layout : null,
            containers: this.state.containers
        }

        fetch('/api/pages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page })
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }

    private saveLayout() {
        let layout = {
            name: this.state.name,
            containers: this.state.containers
        }

        fetch('/api/layouts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ layout })
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
}