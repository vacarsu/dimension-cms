import * as React from "react";
import { render } from 'react-dom';
import Button from './components/Button';

document.addEventListener('DOMContentLoaded', () => { 
    render(
        <Button />,
        document.getElementById('root')
    );
}, false);