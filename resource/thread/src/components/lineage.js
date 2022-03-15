import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Modal, Button, Form, Toast } from "react-bootstrap";
import eventBus from "../eventBus";
import ReactFlow, { Controls } from 'react-flow-renderer';
import customFlowNode from './customFlowNode.js';

// import EditColumnModal from "./editColumnModal";

class Lineage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            elements: [],
            last_ds: '',
        };

        // this.toggleModal = this.toggleModal.bind(this);
        this.nodeTypes = {
            customFlowNode: customFlowNode,
        };
    }

    traverse = (lst, node, prop, ct = 0) => {
        var res = [];
        if (node[prop] != null && node[prop].length > 0) {
            ct = ct + 1;
            for (var x = 0; x < node[prop].length; x++) {
                this.traverse(lst, node[prop][x], prop, ct);
            }
        }
        else {
            lst[lst.length] = {
                'count': ct - 1,
                'name': node.name
            }
        }

        return res;
    }

    update = (st, base_elem) => {
        var base_splits = base_elem.name.split('.');

        var baseElementId = 'base';
        var elements = [{
            id: baseElementId,
            type: 'customFlowNode',
            data: { project: base_splits[0], dataset: base_splits[1], },
            position: { x: 250, y: 140 },
            style: { backgroundColor: '#FFF', width: '200px', borderColor: 'red', borderWidth: '2px', fontWeight: 'bold' },
            sourcePosition: 'right',
            targetPosition: 'left',
            draggable: false
        }];

        // find all the end-nodes
        var down_res = [];
        var up_res = [];

        if(this.props.type == 'column') {
            if (base_elem['lineage_downstream'] != null && base_elem['lineage_downstream'] != '') {
                if (base_elem['lineage_downstream'] != null)
                    this.traverse(down_res, base_elem, 'lineage_downstream');
                else
                    down_res = eval(base_elem['lineage_downstream']);
            }
            
            if (base_elem['lineage_upstream'] != null && base_elem['lineage_upstream'] != '') {
                if (base_elem['lineage_upstream'] != null)
                    this.traverse(up_res, base_elem, 'lineage_upstream');
                else
                    up_res = eval(base_elem['lineage_upstream']);
            }
        } else {
            if (base_elem['lineage_downstream'] != null && base_elem['lineage_downstream'] != '') {
                if (base_elem['lineage_downstream'] != null)
                    this.traverse(down_res, base_elem, 'lineage_downstream');
                else
                    down_res = eval(base_elem['lineage_downstream']);
            }
            
            if (base_elem['lineage_upstream'] != null && base_elem['lineage_upstream'] != '') {
                if (base_elem['lineage_upstream'] != null)
                    this.traverse(up_res, base_elem, 'lineage_upstream');
                else
                    up_res = eval(base_elem['lineage_upstream']);
            }
        }

        for (var x = 0; x < down_res.length; x++) {
            var lbl = down_res[x];
            if (lbl.name != null)
                lbl = down_res[x].name;

            var splits = lbl.split('.');
            var project = splits[0];
            var dataset = '';
            var col = '';
            if (splits.length > 1)
                dataset = splits[1];
            if (splits.length > 2)
                col = splits[2];

            var elementId = 'down_' + x.toString();

            var downYPosition = (300 / (up_res.length + 1) * (x + 1));
            console.log("downYPosition == ");
            console.log(downYPosition);

            elements[elements.length] = {
                id: elementId,
                type: 'customFlowNode',
                data: { project: project, dataset: dataset, column: col },
                style: { backgroundColor: '#FFF', width: '200px' },
                targetPosition: 'left',
                sourcePosition: 'right',

                position: { x: 500, y: (200 / (up_res.length + 1) * (x + 1)) },
                // position: { x: 500, y: ((300 / (down_res.length + 1)) * (x + 1)) },
                draggable: false
            }

            var edgeId = 'edge_down_' + x.toString();
            var edge = { id: edgeId, source: baseElementId, target: elementId, arrowHeadType: 'arrow' };
            if (down_res[x].count > 0) {
                edge.label = '[' + down_res[x].count + ']';
                edge.animated = true;
            }

            elements[elements.length] = edge
        }

        for (var x = 0; x < up_res.length; x++) {
            var lbl = up_res[x];
            if (lbl.name != null)
                lbl = up_res[x].name;

            var splits = lbl.split('.');
            var project = splits[0];
            var dataset = '';
            var col = '';
            if (splits.length > 1)
                dataset = splits[1];
            if (splits.length > 2)
                col = splits[2];

            var upYPosition = (300 / (up_res.length + 1) * (x + 1));
            console.log("upYPosition == ");
            console.log(upYPosition);

            var elementId = 'up_' + x.toString();
            elements[elements.length] = {
                id: elementId,
                type: 'customFlowNode',
                data: { project: project, dataset: dataset, column: col },
                style: { backgroundColor: '#FFF', width: '200px' },
                sourcePosition: 'right',
                targetPosition: 'left',
                position: { x: 0, y: (300 / (up_res.length + 1) * (x + 1)) },
                draggable: false
            }

            var edgeId = 'edge_up_' + x.toString();
            var edge = { id: edgeId, source: elementId, target: baseElementId, arrowHeadType: 'arrow' };
            if (up_res[x].count > 0) {
                edge.animated = true;
                edge.label = '[' + up_res[x].count + ']';
            }

            elements[elements.length] = edge;
        }
        var new_state = {}
        new_state[st] = elements;

        this.setState(new_state)
    }

    onLoad(rv) {
        rv.fitView();
    }

    render() {        
        if (this.props.deets.name != this.state.last_ds) {
            this.state.last_ds = this.props.deets.name;
            this.update('elements', this.props.deets);
        }
        
        return (
            <div style={{ backgroundColor: '#EEE', height: "500", width: "1030" }}>
                {this.state.elements && 
                <ReactFlow onLoad={this.onLoad} elements={this.state.elements} nodeTypes={this.nodeTypes} style={{ height: "100%", width: "100%" }} fitView>
                    <Controls showInteractive="false" />
                </ReactFlow>}
            </div>
        );
    }
}

export default Lineage;