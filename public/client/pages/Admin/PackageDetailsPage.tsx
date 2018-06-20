import * as React from "react";
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { 
    Button,
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
    Section
} from 'uikit-react';

export class PackageDetailsPage extends React.Component<any, any> {
    render() {
        return (
            <Section size="large">
                <Card width="1-1">
                    <CardBody>
                        {this.props.match.params.name}
                    </CardBody>
                </Card>
            </Section>
        )
    }
}