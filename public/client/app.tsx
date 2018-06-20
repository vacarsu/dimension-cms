import * as React from "react";
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import 'prismjs';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-tsx.min';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-css.min';
import { 
    Section
} from 'uikit-react';
import { AdminPage } from './pages/Admin/AdminPage';
import { IndexPage } from './pages/IndexPage';

document.addEventListener('DOMContentLoaded', () => {
    render(
        <App />,
        document.getElementById('root')
    );
}, false);

class App extends React.Component<any, any> {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Route exact path="/" component={IndexPage} />
                    <Route path="/admin/" component={AdminPage} />
                </React.Fragment>
            </Router>
        )
    }
}