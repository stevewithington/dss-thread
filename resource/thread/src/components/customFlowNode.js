import React, { memo } from 'react';
import eventBus from "../eventBus";

import { Handle } from 'react-flow-renderer';
import Common from '../common/common';

export default memo(({ data, isConnectable }) => {
  var project = "";
  var dataset = "";
  var column = "";

  console.log('customFlowNode :: data == ');
  console.log(data);

  function formatData(_project)  {
    console.log('customFlowNode :: formatData() :: _project == ');
    console.log(_project);
  
    var base_splits = _project.split(' | ');
  
    console.log('base_splits :: length == ' + base_splits.length);
    console.log(base_splits);

    switch(base_splits.length) {
      case 1:
        console.log('CASE 1');
        project = base_splits[0];
        break;
      case 2:
        console.log('CASE 2');
        project = base_splits[0];
        dataset = base_splits[1];
        break;
      case 3:
        console.log('CASE 3');
        project = base_splits[0];
        dataset = base_splits[1];
        column = base_splits[2];
        break;
      default:
        console.log('DEFAULT');
        project = _project;
        break;
    }

    console.log('customFlowNode :: formatData() :: wrap up ');
    console.log('project == ' + project);
    console.log('dataset == ' + dataset);
    console.log('column == ' + column);
  }

  function selectDataset(e) {
    e.preventDefault();
    eventBus.dispatch("datasetSelected", data.project + '|' + data.dataset);
  }

  formatData(data.project);

  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <div style={{ border: 'solid 1px #333', borderRadius: '3px', height: '100%', padding: '10px', textAlign: 'center', width: '100%' }}>
        <div style={{ fontWeight: 'bold' }}>{data.project}</div>
        <div>
          {/* <a href={Common.createDsLink2(data.project, data.dataset)} target="_blank">{data.dataset}</a> */}
          <a href='javascript:void(0)' onClick={selectDataset}>{data.dataset}</a>
        </div>
        <div>
          {data.column}
        </div>
      </div>

      <Handle
        type="source"
        position="right"
        isConnectable={isConnectable}
        style={{ background: '#555' }}
      />
      {/* <Handle
        type="source"
        position="right"
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      /> */}
    </>
  );
});