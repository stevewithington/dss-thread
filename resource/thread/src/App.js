import React, { Fragment } from "react";
import { Component } from 'react';
import { useEffect } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import eventBus from "./eventBus";

import { FaRedo } from 'react-icons/fa';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import {
    Container,
    Col,
    Row,
    Spinner,
    Button
} from 'react-bootstrap';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Routes,
    Link
} from "react-router-dom";

import Common from "./common/common";
import DataikuItem from "./components/dataikuItem";

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dataiku: undefined,
            dataikuItem: null,
            filters: {
                columns: true,
                datasets: true,
                projects: true,                
            },
            isLoading: false,
            selectedItem: null,
            selectedItemType: null,
            searchResults: [],
            loading: true
        }
    }

    formatQueryTypes = () => {
        console.log("formatQueryTypes() :: this.state.filters == ");
        console.log(this.state.filters);

        let types = [];
        Object.entries(this.state.filters).map(([key, value]) => {            
            if(value == true) {
                types[types.length] = key;
            }            
        });

        console.log("types == ");
        console.log(types);

        if(types.length > 0) {
            let strTypes = "&types=";
            strTypes += types.map((type, i, arr) => {
                console.log("i == " + i);
                console.log("type == ");
                console.log(type);
                console.log("arr == ");
                console.log(arr);
                return type;
            });
    
            console.log("strTypes == " + strTypes);
            return strTypes;
        } else {
            return null;
        }        
    }

    handleOnChange = (type) => {
        let tempFilters = this.state.filters;
        tempFilters[type] = !tempFilters[type];

        this.setState({ 
            filters: tempFilters
        });
    }

    loadItem = (item) => {
        this.setState({ loading: true });
        console.log('loadItem :: item == ');
        console.log(item);

        if (item.length > 0) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };

            fetch(window.getWebAppBackendUrl('load-item') + '?key=' + item[0].key, requestOptions)
                .then(res => res.json())
                .then((response) => {
                    console.log('response == ');
                    console.log(response);

                    this.setState({
                        loading: false,
                        selectedItem: response,
                        selectedItemType: item[0].type
                    });
                });
        }
    }

    search = (term) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        let types = this.formatQueryTypes();
        console.log('search() :: types = ' + types);

        this.setState({ loading: true });
        fetch(window.getWebAppBackendUrl('search') + '?term=' + term, requestOptions)
            .then(res => res.json())
            .then((response) => {
                var p_list = [];
                Object.keys(response).forEach(function (results) {
                    p_list[p_list.length] = response[results];
                });

                this.setState({
                    searchResults: p_list
                });
                this.setState({ loading: false });
            });
    }

    componentDidMount() {
        window.$(document).ready(() => {
            this.setState({ dataiku: window.dataiku });
            this.setState({ rendered: true });
            this.setState({ loading: false });

            // eventBus.on("dataRefresh", (data) =>
            //     this.refreshData()
            // );

            eventBus.on("datasetSelected", (ds) =>
                this.loadItem([{
                    key: ds,
                    type: 'dataset'
                }])
            );

            eventBus.on("projectSelected", (proj) =>
                this.loadItem([{
                    key: proj,
                    type: 'project'
                }])
            );

            eventBus.on("columnSelected", (proj) =>
                this.loadItem([{
                    key: proj,
                    type: 'column'
                }])
            );

            // this.search('thread');
            // this.refreshData();
        });
    }

    rescan() {
        this.setState({ loading: true });
        fetch(window.getWebAppBackendUrl('scan'))
            .then(res => res.json())
            .then((response) => {
                this.setState({ loading: false });
            });
    }

    renderMenuItemChildren(option, props) {
        return <Fragment>
            {Common.getIconForDataikuItemType(option.type)}
            <span style={{ fontWeight: 'bold', paddingLeft: '4px' }}>Name: {option.name}</span>
            <span style={{ padding: '3px' }}>|</span>
            <span>Type: {option.type}</span>
            {option.type == 'dataset' || option.type == 'column' &&
                <span>
                    <span style={{ padding: '3px' }}>|</span>
                    <span>Project: {option.key.split('.')[0]}</span>
                </span>
            }
        </Fragment>;
    }

    render() {
        // <Router>
        //     <main>
        //       <nav>
        //         <ul>
        //           <li><Link to="/">Home</Link></li>
        //           <li><a href="/about">About</a></li>
        //           <li><a href="/contact">Contact</a></li>
        //         </ul>
        //       </nav>

        //         <Routes>
        //             <Route path="/" exact component={Home} />
        //         </Routes>
        //     </main>
        // </Router>

        const { filters, isLoading, searchResults, selectedItem, selectedItemType } = this.state;
        // const ref = React.createRef();
        const filterBy = () => true;

        this.dataikuItem = <DataikuItem item={selectedItem} type={selectedItemType} />;

        return (
            <Container style={{ paddingTop: '20px' }}>
                <Row style={{ paddingBottom: '10px' }}>
                    <Col><h1>Thread</h1></Col>
                    <Col style={{ textAlign: 'right' }}>
                        <FaRedo onClick={() => this.rescan()} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                    </Col>
                </Row>

                <Row>
                    <AsyncTypeahead
                        filterBy={filterBy}
                        id="async-search"
                        isLoading={isLoading}
                        labelKey="key"
                        minLength={3}
                        onChange={this.loadItem}
                        onSearch={this.search}
                        options={searchResults}
                        placeholder='Search'
                        renderMenuItemChildren={this.renderMenuItemChildren}
                    />
                </Row>

                <Row className="filter" style={{ marginTop: "0.5em" }}>
                    <Col xs={1}>
                        <h4>Filter By: </h4>
                    </Col>
                    {Object.entries(filters).map(([key, value]) => {
                        return (
                            <Col xs={1}>
                                <div className="filter-types" key={key}>
                                    <input
                                        type="checkbox"
                                        id={`filter-${key}`}
                                        name={key}
                                        value={key}
                                        checked={value}
                                        onChange={() => this.handleOnChange(key)}
                                        style={{ marginRight:  "1.0em" }}
                                    />
                                    <label htmlFor={`filter-${key}`}>{key}</label>
                                </div>
                            </Col>                                
                        );
                    })}
                </Row>

                <Row>
                    <div style={{ padding: '10px' }}>
                        {this.state.loading ?
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            : null}
                    </div>
                </Row>
                <Row>
                    {this.dataikuItem}
                </Row>
            </Container>
        );
    }
}

export default App;
