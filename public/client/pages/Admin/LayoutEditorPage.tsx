import * as React from "react";
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
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
import { KairosContainer } from './../../layout-components/kairos-container';

export class LayoutEditorPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            containers: [],
            components: null
        };
    }

    render() {
        return (
            <Section>
                <Section width="1-1" padding>
                    <Card width="1-1">
                        <NavbarSticky style={{ zIndex: '99' }} options="offset: 80;">
                            <CardHeader style={{ backgroundColor: 'white' }}>
                                <Flex direction="row">
                                    <CardTitle>
                                        Layout Editor
                                    </CardTitle>
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
                                                    <ListItem>
                                                        <Button
                                                            color="text"
                                                            onClick={this.addAccordion.bind(this)}>
                                                            Add Accordion
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
                            {this.renderContainers()}
                        </CardBody>
                    </Card>
                </Section>
            </Section>
        )
    }

    private addAccordion() {
        if (this.state.containers.length > 0) {
            let containers = this.state.containers;
            containers[0].children[0] = (
                <Accordion>
                    <AccordionItem title="Test" content="First Component Rendered!!!">test</AccordionItem>
                </Accordion>
            );
            this.setState({
                container: containers
            });
        }
    }

    private addContainer() {
        this.setState({
            containers: [ ...this.state.containers, { children: [] } ]
        }, () => console.log(this.state));
    }

    private renderContainers() {
        return this.state.containers.map((container) => <KairosContainer>{this.renderContainerComponents(container)}</KairosContainer>);
    }

    private renderContainerComponents(container) {
        return container.children.map((component) => component);
    }
}