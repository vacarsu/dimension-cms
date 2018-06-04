import * as React from "react";
import { render } from 'react-dom';
import { Button } from './components/Button';

document.addEventListener('DOMContentLoaded', () => {
    render(
        <Button label="Test Button" color="primary" size="large" href="#" />,
        document.getElementById('root')
    );
}, false);