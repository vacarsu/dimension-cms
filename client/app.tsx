import * as React from "react";
import { render } from 'react-dom';
import { Alert } from './components/Alert/Alert';
import { Article } from './components/Article/Article';
import { Accordion } from './components/Accordion/Accordion';
import { Badge } from './components/Badge/Badge';
import { Breadcrumb } from './components/Breadcrumb/Breadcrumb'; 
import { Labels } from './components/Labels/Labels'; 

const accordionItems = [
    { title: "Test", content: "Test" },
    { title: "Test", content: "Test" },
    { title: "Test", content: "Test" }
];

const breadcrumbItems = [
    { href: "#", label: "Test" },
    { href: "#", label: "Test" },
    { href: "#", label: "Test" }
];

document.addEventListener('DOMContentLoaded', () => {
    render(
        (
            <div>
                <Labels content="Testing this Label" color="warning" />
                <Alert width="1-2" content="Test" color="primary" isClosable />
                <Badge count={99} />
                <Breadcrumb items={breadcrumbItems} />
                <Accordion
                    width="1-2"
                    items={accordionItems}
                
                />
            </div>
        ),
        document.getElementById('root')
    );
}, false);