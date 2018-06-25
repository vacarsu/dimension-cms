/// <reference path="../../node_modules/es6-promise/es6-promise.d.ts" />
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import "es6-promise/auto";
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
import { AdminPage } from './../../src/kairos/packages/kairos-admin/pages/Admin/AdminPage';
import { IndexPage } from './IndexPage';

document.addEventListener('DOMContentLoaded', () => {
    render(
        <App />,
        document.getElementById('root')
    );
}, false);

class App extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isLoadingRouteModules: true,
            modules: null,
            packages: null,
            moduleRoutes: []
        };
    }

    componentWillMount() {
        this.setup();
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Route exact path="/" component={IndexPage} />
                    <div>
                        {this.state.isLoadingRouteModules ? "" : this.renderRoutes()}
                    </div>
                </React.Fragment>
            </Router>
        )
    }

    private renderRoutes() {
        if (!this.state.isLoadingRouteModules) {
            return this.state.moduleRoutes.map(route => {
                let Component = route.component;
                console.log(route);
                return <Route exact={route.route.exact} path={route.route.path} component={Component} />
            })
        }
    }

    private async setup() {
        let packages = await this.fetchPackages();
        localStorage.setItem('packages', JSON.stringify(packages));
        let modules = []
        for (let key in packages) {
            for (let mKey in packages[key]['modules']) {
                let module = await this.fetchPackageModule(key, mKey)
                modules.push({ module, packageName: key });
            }
        }

        this.setState({
            packages: packages,
            modules: modules,
            isLoading: false
        });
        this.importRoutes();
    }

    private fetchPackages() {
        return fetch('/api/packages')
            .then(res => res.json())
    }

    private fetchPackageModule(packageName, moduleName) {
        return fetch(`/api/packages/${packageName}/${moduleName}`)
            .then(res => res.json())
    }

    private importRoutes() {
        if (!this.state.isLoading) {
            const modules = this.state.modules;
            modules.map(async (module, mi) => {
                if (module.module.routes) {
                    module.module.routes.map(async (route, ri) => {
                        await this.importRouteComponent(module.packageName, route)
                        console.log([module.module.routes.length, ri]);
                        if (mi === modules.length - 1 && ri === module.module.routes.length - 1) {
                            this.setModuleLoadingStateComplete();
                        }
                    });
                }
                console.log([modules.length, mi]);
                if (mi === modules.length - 1) {
                    this.setModuleLoadingStateComplete();
                }
            });
        }
    }

    private setModuleLoadingStateComplete() {
        this.setState({ isLoadingRouteModules: false });
    }

    private async importRouteComponent(packageName, route) {
        this.setState({ isLoadingRouteModules: true });
        let { routeComponentRegistry } = await import(`./../../src/kairos/packages/${packageName}/route-component-registry/route-component-registry`);
        console.log(routeComponentRegistry.AdminPage);
        const Component = routeComponentRegistry[route.component];
        console.log(Component);
        let moduleRoutes = this.state.moduleRoutes;
        moduleRoutes.push({ route, component: Component });
        this.setState({ moduleRoutes });
    }
}