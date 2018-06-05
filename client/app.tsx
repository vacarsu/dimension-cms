import * as React from "react";
import { render } from 'react-dom';
import { Alert } from './components/Alert/Alert';
import { Article } from './components/Article/Article';
import { Accordion } from './components/Accordion/Accordion';
import { Badge } from './components/Badge/Badge';
import { Breadcrumb } from './components/Breadcrumb/Breadcrumb';
import { Progress } from './components/Progress/Progress';

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

let progressValue = 0;
let progressMax = 100;
let progressInterval = setInterval(() => {
    progressValue++;
    if (progressValue === progressMax) { progressValue = 0 };
    console.log(progressValue);
}, 1000);

document.addEventListener('DOMContentLoaded', () => {
    render(
        (
            <div>
                <Alert width="1-2" content="Test" color="primary" isClosable />
                <Badge count={99} />
                <Breadcrumb items={breadcrumbItems} />
                <Accordion
                    width="1-2"
                    items={accordionItems}
                />
                <Progress value={progressValue} max={progressMax} />
            </div>
        ),
        document.getElementById('root')
    );
}, false);