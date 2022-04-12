import React from "react";
import { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import eventBus from "./eventBus";
import { Button } from "react-bootstrap";

import { FaRedo } from 'react-icons/fa';

import {
    Container,
    Row,
    Spinner,
} from 'react-bootstrap';

// import {
//     Route,
//     Routes,
//     Link
// } from "react-router-dom";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Routes
} from "react-router-dom";

import logo from "./assets/images/icon_thread.png";
import Home from "./pages/home";
import Catalog from "./pages/catalog";

class App extends Component {
    static CURRENT_URL = window.location.pathname;

    static HOME = "HOME";
    static CATALOG = "CATALOG";

    constructor(props) {
        super(props)

        this.state = {
            activeTab: 'HOME',
            dataiku: undefined,
            currentUser: '',
            loading: true,
            loggedIn: null,
            scanning: false
        }

        console.log("window.location.href == " + window.location.href);
        console.log("window.location == " + window.location);
        console.log("window.location.pathname == " + window.location.pathname);

        this.buildBaseUrl();
        this.checkActiveTab();
    }

    buildBaseUrl()  {
        console.log('buildBaseUrl() :: START :: ');

        let arrayUrlPath = App.CURRENT_URL.split('/');
        console.log('arrayUrlPath == ');
        console.log(arrayUrlPath);

        let urlBuilder = arrayUrlPath.map((path, index) => {
            console.log('index == ' + index);
            console.log('path == ' + path);

            if(path.length > 0) {
                return path;
            }
        });

        console.log('urlBuilder == ');
        console.log(urlBuilder);

        console.log('buildBaseUrl() :: END :: ');
    }

    checkActiveTab() {
        console.log('checkActiveTab() :: START :: App.CURRENT_URL.indexOf(App.CATALOG) === ' + App.CURRENT_URL.indexOf(App.CATALOG));
        let activeTab = App.HOME;
        if (App.CURRENT_URL.indexOf(App.CATALOG) !== -1) {
            console.log('CHANGE TO CATALOG :: ');
            activeTab = App.CATALOG;
        } else {
            console.log('CHANGE TO HOME :: ');
            activeTab = App.HOME;
        }

        console.log('checkActiveTab() :: END :: activeTab == ' + activeTab);
        // this.setState({
        //     activeTab: activeTab
        // });
    }

    componentDidMount() {
        window.$(document).ready(() => {
            this.refreshUser();
        });
    }

    refreshUser() {
        fetch(window.getWebAppBackendUrl('get-user'))
            .then(res => res.json())
            .then((response) => {

                if (response.status == 'ok') {

                    this.setState({
                        dataiku: window.dataiku,
                        currentUser: response['you_are'],
                        scanning: false,
                        loggedIn: true
                    });

                    eventBus.on("loading", (isLoading) =>
                        this.setState({ "loading": isLoading })
                    );
                }
                else
                    this.setState({
                        scanning: false,
                        loggedIn: false
                    })
            });
    }

    rescan() {
        if (!this.state.scanning) {
            this.setState({ scanning: true });
            fetch(window.getWebAppBackendUrl('scan'))
                .then(res => res.json())
                .then((response) => {
                    // this.setState({ scanning: false });
                    // this.refreshUser();
                    window.location.reload();
                });
        }
    }

    checkPublic() {
        if (window.location.href.toLowerCase().indexOf('/webapps/view') > -1) {
            const queryParams = new URLSearchParams(window.location.search)
            // not accessing the public app
            var proj = queryParams.get("projectKey");
            var id = queryParams.get("webAppId");
            var url = window.location.origin + '/public-webapps/' + proj + '/' + id;

            return <div>
                <h4>Please access Thread through the <a target="_parent" href={url}>public web URL</a></h4>
                <div style={{ paddingTop: '15px' }}>
                    <span style={{ fontWeight: 'bold' }}>Public App Key:</span> {proj}.{id}
                </div>
            </div>
        }

        return '';
    }

    render() {
        const { activeTab, loading, scanning } = this.state;

        var publicApp = this.checkPublic();

        return (
            <Container style={{ paddingTop: '10px' }}>
                {this.state.loggedIn != null && this.state.loggedIn === false &&
                    <div>Unauthorized</div>
                }
                <div hidden={!this.state.loggedIn}>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div class="container-fluid">
                            <img src={logo} className="app-logo" alt="logo" />
                            <a class="navbar-brand" style={{ fontWeight: "bold", fontSize: "27px" }}>Thread</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarContent">
                                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                    {/* <li class="nav-item">
                                        <Link className={activeTab == App.HOME ?  'active' : ''} 
                                            onClick={() => this.setState({ activeTab: App.HOME })} 
                                            to={App.CURRENT_URL}>Home</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link className={activeTab == App.CATALOG ?  'active' : ''} 
                                            onClick={() => this.setState({ activeTab: App.CATALOG })} 
                                            to={App.CURRENT_URL + "/catalog"}>Catalog</Link>
                                    </li> */}
                                    <li class="nav-item">
                                        <Link className={activeTab == App.HOME ? 'active' : ''}
                                            onClick={() => this.setState({ activeTab: App.HOME })}
                                            to="/">Home</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link className={activeTab == App.CATALOG ? 'active' : ''}
                                            onClick={() => this.setState({ activeTab: App.CATALOG })}
                                            to="/catalog">Catalog</Link>
                                    </li>
                                </ul>
                            </div>
                            <ul class="navbar-nav">
                                <li style={{ padding: '12px' }}>
                                    <FaRedo onClick={() => this.rescan()} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link">{this.state.currentUser}</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    {scanning ?
                        <Row>
                            <div style={{ padding: '10px' }}>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        </Row>
                        : null}

                    {publicApp.length == 0 ?
                        <Row>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/catalog" element={<Catalog />} />

                                {/* <Route path="/">
                                        <Home />
                                    </Route>
                                    <Route path="/catalog">
                                        <Catalog />
                                    </Route> */}
                            </Routes>
                        </Row>
                        : <Row>
                            {publicApp}
                        </Row>
                    }

                    {/* <Row> */}
                    {/* <Routes>
                            <Route path={App.CURRENT_URL} element={<Home />} />
                            <Route path={App.CURRENT_URL + "/catalog"} element={<Catalog />} />
                        </Routes> */}

                    {/* <Routes>
                            <Route path="/" element={<App />}>
                                <Route index element={<Home />} />
                                <Route path="/catalog" element={<Catalog />} />
                            </Route>
                        </Routes> */}

                    {/* <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalog" element={<Catalog />} />
                        </Routes> */}

                    {/* <Switch>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalog" element={<Catalog />} />
                        </Switch> */}

                    {/* <Routes>
                            <Route path="/" element={<App />}>
                                <Route index element={<Home />} />
                                <Route path="/catalog" element={<Catalog />} />
                            </Route>
                        </Routes> */}
                    {/* </Row> */}

                </div>
            </Container>
        );
    }
}

export default App;
