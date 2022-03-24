(this.webpackJsonpthread=this.webpackJsonpthread||[]).push([[0],{103:function(e,t,a){e.exports=a(138)},108:function(e,t,a){},109:function(e,t,a){},138:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(16),s=a.n(r),i=(a(108),a(11)),o=a(18),c=a(19),d=a(32),_=a(31),p=(a(109),a(110),a(17)),u=a(67),m=a(37),h=a(147),E=a(145),f=a(101),g=a(149),v=a(35),b=a(81),y=a(73),D=a(52),k=a(146),w=a(150),T=a(151),I=a(148),j=a(59),O=function(e){Object(d.a)(a,e);var t=Object(_.a)(a);function a(e){return Object(o.a)(this,a),t.call(this,e)}return Object(c.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("div",{style:{maxWidth:"300px",border:"solid 1px #999",borderRadius:"2px",padding:"10px"}},l.a.createElement(E.a,null,l.a.createElement(f.a,null,l.a.createElement("span",{style:{fontWeight:"bold",paddingRight:"10px"}},"ID"),l.a.createElement("span",null,this.props.definition.id))),l.a.createElement(E.a,null,l.a.createElement(f.a,null,l.a.createElement("span",{style:{fontWeight:"bold",paddingRight:"10px"}},"Name"),l.a.createElement("span",null,this.props.definition.name))),l.a.createElement(E.a,null,l.a.createElement(f.a,null,l.a.createElement("span",{style:{fontWeight:"bold",paddingRight:"10px"}},"Description"),l.a.createElement("span",null,this.props.definition.description)))))}}]),a}(n.Component),x=function(e){Object(d.a)(a,e);var t=Object(_.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).defSearch=function(e){var t=window.getWebAppBackendUrl("def-search")+"?term="+e;n.setState({loading:!0}),fetch(t,{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){n.state.defSearchResults=e}))},n.selectDef=function(e){n.setState({tempSelDef:e[0],newDefSelected:!0})},n.toggleNew=function(e){n.setState({newDefSelected:e}),e?n.setState({selectedDef:{name:n.props.item.name,description:n.props.item.comment,applied_to:[n.props.item.key],id:-1}}):n.setState({selectedDef:{name:n.props.item.definition.name,applied_to:n.props.item.definition.applied_to,description:n.props.item.definition.description,id:n.props.item.definition.id}})},n.state={lineage:null,newDefModal:!1,selectedDef:{id:-1},tempSelDef:{},newDefSelected:!0,defSearchResults:[]},n}return Object(c.a)(a,[{key:"flattenArray",value:function(e,t){for(var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=0;n<e[t].length;n++){var l=e[t][n];a.push(l.name),l[t].length>0&&(a=this.flattenArray(l,t,a))}return a}},{key:"saveCol",value:function(e,t){var a=this,n=[this.props.item.key];e&&(n=n.concat(this.flattenArray(this.props.item,"lineage_upstream"))),t&&(n=n.concat(this.flattenArray(this.props.item,"lineage_downstream")));var l="";null!=this.state.tempSelDef.description&&(l=this.state.tempSelDef.description);var r={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({name:this.state.tempSelDef.name,description:l,applied_to:n,id:this.state.tempSelDef.id})};p.a.dispatch("loading",!0),fetch(window.getWebAppBackendUrl("update-desc"),r).then((function(e){return e.json()})).then((function(e){a.props.item.definition=e.value,a.setState({newDefModal:!1,selectedDef:e.value}),p.a.dispatch("loading",!1)}))}},{key:"buildLineage",value:function(){return l.a.createElement(E.a,null,l.a.createElement(j.a,{deets:this.props.item,full_ds_name:this.props.item.name,type:this.props.type}))}},{key:"buildTagsString",value:function(e){if(null!=e){var t=[];return e.forEach((function(e){t[t.length]=l.a.createElement(k.a,{variant:"primary",size:"sm"},e)})),t}}},{key:"openExternalProject",value:function(e){alert(e)}},{key:"renderItemDetailsByType",value:function(){switch(this.props.object_type){case"dataset":return this.renderDataset();case"project":return this.renderProject();case"column":return this.renderColumn();case"dataset":return l.a.createElement(f.a,null,l.a.createElement("p",null,"No rendering has been setup for this item."))}}},{key:"componentDidUpdate",value:function(e,t){"column"==this.props.object_type&&(null==e.item&&null!=this.props.item||null!=e.item&&null!=this.props.item&&e.item.id!=this.props.item.id)&&this.resetSelectedDef()}},{key:"newDef",value:function(){this.setState({newDefModal:!0,tempSelDef:{description:this.props.comment,name:this.props.item.name,id:-1}})}},{key:"resetSelectedDef",value:function(){this.state.tempSelDef={id:-1},-1==this.props.item.definition.id?this.setState({selectedDef:{name:this.props.item.name,description:this.props.item.comment,id:-1}}):this.setState({selectedDef:{name:this.props.item.definition.name,description:this.props.item.definition.description,id:this.props.item.definition.id,applied_to:this.props.item.definition.applied_to}})}},{key:"editDef",value:function(){this.resetSelectedDef(),this.setState({tempSelDef:{name:this.props.item.definition.name,description:this.props.item.definition.description,id:this.props.item.definition.id,applied_to:this.props.item.definition.applied_to}}),this.setState({newDefModal:!0})}},{key:"openColumn",value:function(e){p.a.dispatch("columnSelected",e)}},{key:"openDataset",value:function(e){p.a.dispatch("datasetSelected",e)}},{key:"openProject",value:function(e){p.a.dispatch("projectSelected",e)}},{key:"renderDefSearchMenuItem",value:function(e,t){return l.a.createElement(n.Fragment,null,l.a.createElement("div",{style:{fontWeight:"bold"}},e.name),l.a.createElement("div",null,e.description))}},{key:"refreshLineage",value:function(){console.log("refreshLineage() :: ")}},{key:"renderColumn",value:function(){var e=this,t=this.state.defSearchResults,a=this.buildLineage();return l.a.createElement(f.a,null,l.a.createElement(w.a,{size:"lg",show:this.state.newDefModal,animation:!1,onHide:function(){return e.setState({newDefModal:!1})}},l.a.createElement(w.a.Header,{closeButton:!0},l.a.createElement(w.a.Title,null,"Apply Definition")),l.a.createElement(w.a.Body,null,l.a.createElement(h.a,null,l.a.createElement(E.a,null,l.a.createElement(f.a,null,!this.state.newDefSelected&&l.a.createElement("div",null,l.a.createElement(u.a,{id:"def-search",labelKey:"name",filterBy:["name","description"],caseSensitive:"false",minLength:3,onChange:this.selectDef,onSearch:this.defSearch,options:t,placeholder:"Search for existing Definition",renderMenuItemChildren:this.renderDefSearchMenuItem})),this.state.newDefSelected&&l.a.createElement("div",null,l.a.createElement(T.a,{style:{paddingTop:"10px"}},l.a.createElement(T.a.Group,{className:"mb-3"},this.state.selectedDef.id>-1&&l.a.createElement("div",{style:{padding:"10px 0px"}},l.a.createElement(T.a.Label,null,"Definition ID"),l.a.createElement(T.a.Control,{disabled:"true",type:"text",defaultValue:this.state.tempSelDef.id})),-1==this.state.selectedDef.id&&l.a.createElement("h3",null,"New Defintion"),l.a.createElement(T.a.Label,null,"Name"),l.a.createElement(T.a.Control,{type:"text",defaultValue:this.state.tempSelDef.name,onChange:function(t){return e.state.tempSelDef.name=t.target.value}}),l.a.createElement("div",{style:{padding:"10px 0px"}},l.a.createElement(T.a.Label,null,"Applied To"),this.buildTagsString(this.state.tempSelDef.applied_to)),l.a.createElement(T.a.Label,null,"Description"),l.a.createElement(T.a.Control,{as:"textarea",rows:"3",defaultValue:this.state.tempSelDef.description,onChange:function(t){return e.state.tempSelDef.description=t.target.value}}),l.a.createElement(T.a.Text,{className:"text-muted"},"Will appear in the Dataiku Dataset's column description.")))))))),l.a.createElement(w.a.Footer,null,l.a.createElement(f.a,{style:{textAlign:"left"}},l.a.createElement(k.a,{variant:"dark",onClick:function(){return e.toggleNew(!0)}},"New"),l.a.createElement(k.a,{variant:"dark",onClick:function(){return e.toggleNew(!1)}},"Search")),l.a.createElement(f.a,{"ms-auto":!0},l.a.createElement(k.a,{disabled:"true",variant:"secondary",onClick:function(){return e.saveCol(!0,!0)}},"Apply to Lineage"),l.a.createElement(k.a,{disabled:!this.state.newDefSelected,variant:"primary",onClick:function(){return e.saveCol(!1,!1)}},"Apply")))),l.a.createElement(E.a,null,l.a.createElement(f.a,{xs:"auto"},l.a.createElement("div",{class:"icon"},v.a.getIconForDataikuItemType(this.props.object_type,"100%"))),l.a.createElement(f.a,null,l.a.createElement("h1",null,this.props.item.name),l.a.createElement("p",{class:"name"},l.a.createElement("b",null,this.props.item.type)," column in ",l.a.createElement("span",{className:"app-link",onClick:function(){return e.openProject(e.props.item.project)}},this.props.item.project),l.a.createElement("span",{style:{padding:"0px 3px"}},"|"),l.a.createElement("span",{className:"app-link",onClick:function(){return e.openDataset(e.props.item.project+"|"+e.props.item.dataset)}},this.props.item.dataset)))),l.a.createElement(E.a,null,l.a.createElement("div",{style:{paddingTop:"10px"}},l.a.createElement(y.a,{defaultActiveKey:"definition",className:"mb-3",destroyInactiveTabPane:!0},l.a.createElement(D.a,{eventKey:"definition",title:"Definition",def:!0},-1==this.props.item.definition.id&&l.a.createElement("div",null,l.a.createElement(k.a,{variant:"primary",onClick:function(){return e.newDef()}},"Add Definition")," "),this.props.item.definition.id>0&&l.a.createElement("div",null,l.a.createElement(k.a,{variant:"primary",onClick:function(){return e.editDef()}},"Edit Definition")," ",l.a.createElement("div",{style:{padding:"10px"}},l.a.createElement(O,{definition:this.state.selectedDef})))),l.a.createElement(D.a,{eventKey:"lineage",title:"Lineage",def:!0,onSelect:this.refreshLineage},l.a.createElement("div",{class:"lineage"},a))))))}},{key:"renderDataset",value:function(){var e=this,t=this.buildTagsString(this.props.item.meta.tags),a=this.buildLineage(),n=this.props.item.schema.map((function(t){return l.a.createElement("tr",{onClick:function(){return e.openColumn(t.key)}},l.a.createElement("td",null,t.name),l.a.createElement("td",null,t.type),l.a.createElement("td",null,t.comment))}));return l.a.createElement(f.a,null,l.a.createElement(E.a,null,l.a.createElement(f.a,{xs:"auto"},l.a.createElement("div",{class:"icon"},v.a.getIconForDataikuItemType(this.props.object_type,"100%"))),l.a.createElement(f.a,null,l.a.createElement("h1",null,this.props.item.id),l.a.createElement("p",null,"Dataset in ",l.a.createElement("span",{className:"app-link",onClick:function(){return e.openProject(e.props.item.project)}},this.props.item.project)),l.a.createElement("div",{class:"tags"},t))),l.a.createElement(E.a,{style:{paddingTop:"20px"}},l.a.createElement(y.a,{defaultActiveKey:"lineage",id:"uncontrolled-tab-example",className:"mb-3"},l.a.createElement(D.a,{eventKey:"lineage",title:"Lineage"},l.a.createElement("div",{class:"lineage"},a)),l.a.createElement(D.a,{eventKey:"columns",title:"Columns",def:!0},l.a.createElement(b.a,{striped:!0,bordered:!0,hover:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Name"),l.a.createElement("th",null,"Type"),l.a.createElement("th",null,"Definition"))),l.a.createElement("tbody",null,n))))))}},{key:"renderProject",value:function(){var e=this,t=this.buildTagsString(this.props.item.tags),a=this.props.item.datasets.map((function(t){return l.a.createElement("tr",null,l.a.createElement("td",{class:"cellLink",onClick:function(){return e.openDataset(t)}},t.split("|")[1]))}));return l.a.createElement(f.a,null,l.a.createElement(E.a,null,l.a.createElement(f.a,{xs:"auto"},l.a.createElement("div",{class:"icon"},v.a.getIconForDataikuItemType(this.props.object_type,"100%"))),l.a.createElement(f.a,null,l.a.createElement("h1",null,this.props.item.name,l.a.createElement("span",{style:{paddingLeft:"6px",paddingBottom:"2px"}},l.a.createElement("a",{href:v.a.createProjectLink(this.props.item.projectKey),target:"_blank"},l.a.createElement(I.a,{size:22})))),l.a.createElement("p",null,"Project",l.a.createElement("span",{style:{paddingLeft:"4px"}},"in ",this.props.item.folder," folder")),l.a.createElement("div",{class:"tags"},t))),l.a.createElement(E.a,null,l.a.createElement("div",{style:{paddingTop:"10px"}},l.a.createElement(y.a,{defaultActiveKey:"datasets",className:"mb-3",id:"project-tabs"},l.a.createElement(D.a,{eventKey:"datasets",title:"Datasets",def:!0},l.a.createElement(b.a,{striped:!0,bordered:!0,hover:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Name"))),l.a.createElement("tbody",null,a)))))))}},{key:"render",value:function(){var e,t=this.renderItemDetailsByType();return e=null!=this.props.item?l.a.createElement(E.a,{className:"align-items-start"},t):l.a.createElement(E.a,null),l.a.createElement("div",{class:"dataiku-item"},e)}}]),a}(n.Component),C=function(e){Object(d.a)(a,e);var t=Object(_.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).filterDataikuItems=function(e){var t=n.formatQueryTypes(),a=[];return Object.keys(e).forEach((function(n){var l=e[n];t.indexOf(l.object_type.toString())>=0&&(a[a.length]=l)})),a},n.formatQueryTypes=function(){var e=[];return Object.entries(n.state.filters).sort().map((function(t){var a=Object(i.a)(t,2),n=a[0];1==a[1]&&(e[e.length]=n.toString())})),e},n.handleOnChange=function(e){var t=n.state.filters;t[e]=!t[e],n.setState({filters:t})},n.loadItem=function(e){n.setState({loading:!0}),e.length>0&&(n.loadItemByKey(e[0].key),n.navToObject(e[0].key))},n.loadItemByKey=function(e){var t="project",a=e.split("|").length-1;1==a?t="dataset":2==a&&(t="column"),fetch(window.getWebAppBackendUrl("load-item")+"?key="+e,{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log("response == "),console.log(e),n.setState({loading:!1,selectedItem:e,selectedItemType:t})}))},n.search=function(e){var t=window.getWebAppBackendUrl("search")+"?term="+e;n.setState({loading:!0}),fetch(t,{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){var t=n.filterDataikuItems(e);n.setState({searchResults:t,loading:!1})}))},n.state={dataiku:void 0,dataikuItem:null,filters:{column:!0,dataset:!0,project:!0},currentUser:"",loading:!0,openFilter:!0,selectedItem:null,selectedItemType:null,searchResults:[]},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;window.$(document).ready((function(){fetch(window.getWebAppBackendUrl("get-user")).then((function(e){return e.json()})).then((function(t){e.setState({dataiku:window.dataiku,currentUser:t.you_are}),e.setState({rendered:!0}),e.setState({loading:!1}),e.navDeepLink(),p.a.on("datasetSelected",(function(t){e.loadItem([{key:t,object_type:"dataset"}]),e.navToObject(t)})),p.a.on("projectSelected",(function(t){e.loadItem([{key:t,object_type:"project"}]),e.navToObject(t)})),p.a.on("columnSelected",(function(t){e.loadItem([{key:t,object_type:"column"}]),e.navToObject(t)})),p.a.on("loading",(function(t){return e.setState({loading:t})}))}))}))}},{key:"navDeepLink",value:function(){var e=window.top.location.href.split("#o=");e.length>1&&(this.setState({loading:!0}),this.loadItemByKey(e[1]))}},{key:"navToObject",value:function(e){var t=window.top.location.href.split("#")[0];window.top.location.href=t+"#o="+e}},{key:"rescan",value:function(){var e=this;this.setState({loading:!0}),fetch(window.getWebAppBackendUrl("scan")).then((function(e){return e.json()})).then((function(t){e.setState({loading:!1})}))}},{key:"renderMenuItemChildren",value:function(e,t){return l.a.createElement(n.Fragment,null,l.a.createElement("span",{style:{paddingRight:"5px"}},v.a.getIconForDataikuItemType(e.object_type,"13px")),"column"==e.object_type&&l.a.createElement("span",null,l.a.createElement("span",{style:{}},"Project:"),l.a.createElement("span",{style:{}},e.key.split("|")[0]),l.a.createElement("span",{style:{padding:"0px 4px"}},"|"),l.a.createElement("span",{style:{}},"Dataset:"),l.a.createElement("span",{style:{padding:"0px 4px"}},e.key.split("|")[1]),l.a.createElement("span",{style:{padding:"0px 4px"}},"|"),l.a.createElement("span",null,"Column:"),l.a.createElement("span",{style:{fontWeight:"bold",padding:"0px 4px"}},e.name)),"dataset"==e.object_type&&l.a.createElement("span",null,l.a.createElement("span",{style:{}},"Project:"),l.a.createElement("span",{style:{}},e.key.split("|")[0]),l.a.createElement("span",{style:{padding:"0px 4px"}},"|"),l.a.createElement("span",{style:{}},"Dataset:"),l.a.createElement("span",{style:{padding:"0px 4px",fontWeight:"bold"}},e.name)),"project"==e.object_type&&l.a.createElement("span",null,l.a.createElement("span",null,"Project: "),l.a.createElement("span",{style:{fontWeight:"bold",padding:"0px 4px"}},e.name)))}},{key:"toggleFilter",value:function(){this.setState({openFilter:!this.state.openFilter})}},{key:"render",value:function(){var e=this;this.searchRef=l.a.createRef();var t=this.state,a=t.filters,n=(t.loading,t.openFilter),r=t.searchResults,s=t.selectedItem,o=t.selectedItemType;return this.dataikuItem=l.a.createElement(x,{item:s,object_type:o}),l.a.createElement(h.a,{style:{paddingTop:"10px"}},l.a.createElement("nav",{class:"navbar navbar-expand-lg navbar-dark bg-dark"},l.a.createElement("div",{class:"container-fluid"},l.a.createElement("a",{class:"navbar-brand",style:{fontWeight:"bold",fontSize:"27px"}},"Thread"),l.a.createElement("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},l.a.createElement("span",{class:"navbar-toggler-icon"})),l.a.createElement("div",{class:"collapse navbar-collapse",id:"navbarContent"},l.a.createElement("ul",{class:"navbar-nav me-auto mb-2 mb-lg-0"}),l.a.createElement("ul",{class:"navbar-nav"},l.a.createElement("li",{style:{padding:"12px"}},l.a.createElement(m.g,{onClick:function(){return e.rescan()},style:{width:"20px",height:"20px",cursor:"pointer"}})),l.a.createElement("li",{class:"nav-item"},l.a.createElement("a",{class:"nav-link"},this.state.currentUser)))))),l.a.createElement(E.a,null,l.a.createElement(f.a,null,l.a.createElement("div",{className:"input-group",style:{width:"100%"}},l.a.createElement(u.a,{filterBy:function(){return!0},id:"async-search",delay:300,labelKey:function(e){return e.key.replaceAll("|"," | ")},ref:this.searchRef,minLength:3,onChange:this.loadItem,onSearch:this.search,options:r,placeholder:"Search",renderMenuItemChildren:this.renderMenuItemChildren,style:{width:"97.5%"}}),l.a.createElement("div",{className:"input-group-btn"},l.a.createElement(m.c,{onClick:function(){return e.toggleFilter()},style:{backgroundColor:"#66a3ff",color:"#FFFFFF",cursor:"pointer",height:"34px",padding:"8px",width:"34px"}}))))),n?l.a.createElement(E.a,{className:"filter",style:{marginTop:"0.5em"}},Object.entries(a).map((function(t){var a=Object(i.a)(t,2),n=a[0],r=a[1];return l.a.createElement(f.a,{xs:1},l.a.createElement("div",{className:"filter-types",key:n},l.a.createElement("input",{type:"checkbox",id:"filter-".concat(n),name:n,value:n,checked:r,onChange:function(){return e.handleOnChange(n)},style:{marginRight:"5px"}}),l.a.createElement("label",{htmlFor:"filter-".concat(n)},n,"s")))}))):null,l.a.createElement(E.a,null,l.a.createElement("div",{style:{padding:"10px"}},this.state.loading?l.a.createElement(g.a,{animation:"border",role:"status"},l.a.createElement("span",{className:"visually-hidden"},"Loading...")):null)),l.a.createElement(E.a,null,this.dataikuItem))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},17:function(e,t,a){"use strict";var n={on:function(e,t){document.addEventListener(e,(function(e){return t(e.detail)}))},dispatch:function(e,t){document.dispatchEvent(new CustomEvent(e,{detail:t}))},remove:function(e,t){document.removeEventListener(e,t)}};t.a=n},35:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(37);var s={createDatasetLink:function(e,t){return"/projects/"+e+"/datasets/"+t+"/explore/"},createProjectLink:function(e){return"/projects/"+e+"/flow/"},createDatasetLinkTag:function(e,t){return'<a href="'+this.createDatasetLink(e,t)+'" target="_blank">'+e+"."+t+"</a>"},getIconForDataikuItemType:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"11px";switch(e){case"project":return l.a.createElement(r.e,{size:t});case"dataset":return l.a.createElement(r.b,{size:t});case"column":return l.a.createElement(r.a,{size:t});case"definition":return l.a.createElement(r.d,{size:t});default:return l.a.createElement(r.f,{size:t})}}};t.a=s},59:function(module,__webpack_exports__,__webpack_require__){"use strict";var _Users_ryan_Documents_Documents_Ryan_s_MacBook_Pro_source_code_dss_thread_resource_thread_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(18),_Users_ryan_Documents_Documents_Ryan_s_MacBook_Pro_source_code_dss_thread_resource_thread_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(19),_Users_ryan_Documents_Documents_Ryan_s_MacBook_Pro_source_code_dss_thread_resource_thread_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(32),_Users_ryan_Documents_Documents_Ryan_s_MacBook_Pro_source_code_dss_thread_resource_thread_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(31),react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__),react_flow_renderer__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(33),_customFlowNode_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(97),_common_layout_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(98),Lineage=function(_Component){Object(_Users_ryan_Documents_Documents_Ryan_s_MacBook_Pro_source_code_dss_thread_resource_thread_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.a)(Lineage,_Component);var _super=Object(_Users_ryan_Documents_Documents_Ryan_s_MacBook_Pro_source_code_dss_thread_resource_thread_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.a)(Lineage);function Lineage(props){var _this;return Object(_Users_ryan_Documents_Documents_Ryan_s_MacBook_Pro_source_code_dss_thread_resource_thread_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__.a)(this,Lineage),_this=_super.call(this,props),_this.traverse=function(e,t,a){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,l=[];if(null!=t[a]&&t[a].length>0){n+=1;for(var r=0;r<t[a].length;r++)_this.traverse(e,t[a][r],a,n)}else e[e.length]={count:n-1,name:t.name};return l},_this.update=function(st,base_elem){var base_splits=base_elem.name.split("."),basePositionX=0,basePositionY=0,baseElementId="base",baseNode={id:baseElementId,className:"thread-node-base",type:"customFlowNode",data:{project:base_splits[0],dataset:base_splits[1]},position:{x:basePositionX,y:basePositionY},style:{height:Lineage.DEFAULT_NODE_HEIGHT,width:Lineage.DEFAULT_NODE_WIDTH},sourcePosition:"right",targetPosition:"left",draggable:!1},elements=[baseNode],_nodes=[baseNode],_edges=[],down_res=[];null!=base_elem.lineage_downstream&&""!=base_elem.lineage_downstream&&(null!=base_elem.lineage_downstream?_this.traverse(down_res,base_elem,"lineage_downstream"):down_res=eval(base_elem.lineage_downstream));var up_res=[];null!=base_elem.lineage_upstream&&""!=base_elem.lineage_upstream&&(null!=base_elem.lineage_upstream?_this.traverse(up_res,base_elem,"lineage_upstream"):up_res=eval(base_elem.lineage_upstream));for(var x=0;x<down_res.length;x++){var lbl=down_res[x];null!=lbl.name&&(lbl=down_res[x].name);var splits=lbl.split("."),project=splits[0],dataset="",col="";splits.length>1&&(dataset=splits[1]),splits.length>2&&(col=splits[2]);var elementId="down_"+x.toString(),node={id:elementId,className:"thread-node",type:"customFlowNode",data:{project:project,dataset:dataset,column:col},style:{height:Lineage.DEFAULT_NODE_HEIGHT,width:Lineage.DEFAULT_NODE_WIDTH},targetPosition:"left",sourcePosition:"right",position:{x:basePositionX,y:basePositionY},draggable:!1};elements[elements.length]=node,_nodes[_nodes.length]=node;var edgeId="edge_down_"+x.toString(),edge={id:edgeId,source:baseElementId,target:elementId,arrowHeadType:"arrow"};console.log("down_res == "),console.log(down_res),down_res[x].count>0&&(edge.label="["+down_res[x].count+"]",edge.animated=!0),elements[elements.length]=edge,_edges[_edges.length]=edge}for(var x=0;x<up_res.length;x++){var lbl=up_res[x];null!=lbl.name&&(lbl=up_res[x].name);var splits=lbl.split("."),project=splits[0],dataset="",col="";splits.length>1&&(dataset=splits[1]),splits.length>2&&(col=splits[2]);var elementId="up_"+x.toString(),node={id:elementId,className:"thread-node",type:"customFlowNode",data:{project:project,dataset:dataset,column:col},style:{height:Lineage.DEFAULT_NODE_HEIGHT,width:Lineage.DEFAULT_NODE_WIDTH},sourcePosition:"right",targetPosition:"left",position:{x:basePositionX,y:basePositionY},draggable:!1};elements[elements.length]=node,_nodes[_nodes.length]=node;var edgeId="edge_up_"+x.toString(),edge={id:edgeId,source:elementId,target:baseElementId,arrowHeadType:"arrow"};console.log("up_res == "),console.log(up_res),up_res[x].count>0&&(edge.animated=!0,edge.label="["+up_res[x].count+"]"),elements[elements.length]=edge,_edges[_edges.length]=edge}_this.setState({edges:_edges,elements:elements,nodes:_nodes}),Object(_common_layout_js__WEBPACK_IMPORTED_MODULE_7__.a)(elements).then((function(e){return _this.setState({elements:e})})).catch((function(e){return console.error(e)}))},_this.state={elements:[],last_ds:"",nodes:[],edges:[],flowInstance:null},_this.nodeTypes={customFlowNode:_customFlowNode_js__WEBPACK_IMPORTED_MODULE_6__.a},_this.reactFlowInstance=null,_this}return Object(_Users_ryan_Documents_Documents_Ryan_s_MacBook_Pro_source_code_dss_thread_resource_thread_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__.a)(Lineage,[{key:"onLoad",value:function(e){console.log("onLoad() :: rv == "),console.log(e),setTimeout((function(){return e.fitView()}),1e3)}},{key:"onElementsRemove",value:function(e){console.log("onElementsRemove() :: elements == "),console.log(e)}},{key:"onFitView",value:function(e){console.log("onFitView() :: rv == "),console.log(e)}},{key:"render",value:function(){return this.props.deets.name!=this.state.last_ds&&(this.state.last_ds=this.props.deets.name,this.update("elements",this.props.deets)),console.log("render() :: state == "),console.log(this.state),react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",{className:"REACT-FLOW-CONTAINER",style:{backgroundColor:"#EEE",height:Lineage.DEFAULT_CONTAINER_HEIGHT,width:"100%"}},this.state.elements&&react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_flow_renderer__WEBPACK_IMPORTED_MODULE_5__.c,null,react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_flow_renderer__WEBPACK_IMPORTED_MODULE_5__.d,{onLoad:this.onLoad,elements:this.state.elements,nodeTypes:this.nodeTypes,style:{height:"100%",width:"100%"}},react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_flow_renderer__WEBPACK_IMPORTED_MODULE_5__.a,{showInteractive:"false"}))))}}]),Lineage}(react__WEBPACK_IMPORTED_MODULE_4__.Component);Lineage.DEFAULT_CONTAINER_HEIGHT=500,Lineage.DEFAULT_CONTAINER_WIDTH=1030,Lineage.DEFAULT_NODE_HEIGHT=75,Lineage.DEFAULT_NODE_WIDTH=250,__webpack_exports__.a=Lineage},97:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(17),s=a(33);a(35);t.a=Object(n.memo)((function(e){var t=e.data,a=e.isConnectable,n="",i="",o="";return function(e){var t=e.project.split("|");switch(t.length){case 1:n=e.project,i=e.dataset;break;case 2:n=t[0],i=t[1];break;case 3:n=t[0],i=t[1],o=t[2];break;default:n=e.project,i=e.dataset}}(t),l.a.createElement(l.a.Fragment,null,l.a.createElement(s.b,{className:"thread-handle",type:"target",position:"left",isConnectable:a}),l.a.createElement("div",null,l.a.createElement("div",null,l.a.createElement("h6",null,n)),l.a.createElement("div",null,l.a.createElement("a",{href:"javascript:void(0)",onClick:function(e){e.preventDefault(),r.a.dispatch("datasetSelected",n+"|"+i)}},i)),l.a.createElement("div",null,l.a.createElement("p",null,o))),l.a.createElement(s.b,{type:"source",position:"right",isConnectable:a}))}))},98:function(e,t,a){"use strict";a.d(t,"a",(function(){return d}));var n=a(50),l=a.n(n),r=a(99),s=a(100),i=a.n(s),o=a(33),c=a(59),d=function(){var e=Object(r.a)(l.a.mark((function e(t){var a,n,r,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],n=[],r=new i.a({defaultLayoutOptions:{"elk.algorithm":"layered","elk.contentAlignment":"V_CENTER","elk.direction":"RIGHT","elk.edgeRouting":"SPLINES","elk.layered.spacing.nodeNodeBetweenLayers":50,"elk.padding":"[top=50,left=150,bottom=25,right=25]","elk.spacing.nodeNode":25}}),t.forEach((function(e){var t,l,r,s;Object(o.e)(e)?a.push({id:e.id,width:null!==(t=null===(l=e.__rf)||void 0===l?void 0:l.width)&&void 0!==t?t:c.a.DEFAULT_NODE_WIDTH,height:null!==(r=null===(s=e.__rf)||void 0===s?void 0:s.height)&&void 0!==r?r:c.a.DEFAULT_NODE_HEIGHT}):n.push({id:e.id,target:e.target,source:e.source})})),e.next=6,r.layout({id:"root",children:a,edges:n});case 6:return s=e.sent,e.abrupt("return",t.map((function(e){if(Object(o.e)(e)){var t,a=null===s||void 0===s||null===(t=s.children)||void 0===t?void 0:t.find((function(t){return t.id===e.id}));e.sourcePosition="right",e.targetPosition="left",(null===a||void 0===a?void 0:a.x)&&(null===a||void 0===a?void 0:a.y)&&(null===a||void 0===a?void 0:a.width)&&(null===a||void 0===a?void 0:a.height)&&(e.position={x:a.x-a.width/2+Math.random()/1e3,y:a.y-a.height/2})}return e})));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}},[[103,1,2]]]);
//# sourceMappingURL=main.00c88349.chunk.js.map