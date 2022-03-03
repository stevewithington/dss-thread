(this.webpackJsonpthread=this.webpackJsonpthread||[]).push([[0],{57:function(e,t,a){e.exports=a(90)},62:function(e,t,a){},63:function(e,t,a){},90:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(23),o=a.n(c),l=(a(62),a(24)),s=a(25),i=a(28),m=a(27),u=(a(63),a(64),a(55)),p=a(94),d=a(93),h=a(18);var y={getIconForDataikuItemType:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"14px";switch(e){case"project":return r.a.createElement(h.d,{size:t});case"dataset":return r.a.createElement(h.b,{size:t});case"column":return r.a.createElement(h.a,{size:t});case"definition":return r.a.createElement(h.c,{size:t});default:return r.a.createElement(h.e,{size:t})}}},E=a(53),f=a.n(E),g=a(95),v=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={},n}return Object(s.a)(a,[{key:"renderItemDetailsByType",value:function(){switch(this.props.type){case"dataset":case"project":return this.renderDataset();case"dataset":return r.a.createElement(g.a,null,r.a.createElement("p",null,"No rendering has been setup for this item."))}}},{key:"renderDataset",value:function(){return this.props.item.meta.tags.forEach((function(e){console.log("element == "),console.log(e)})),r.a.createElement(g.a,null,r.a.createElement("p",{class:"name"},r.a.createElement("b",null,"Name: "),this.props.item.name),r.a.createElement("p",{class:"project"},r.a.createElement("b",null,"Project: "),this.props.item.project),r.a.createElement("div",{class:"schema-content"},r.a.createElement("p",{class:"schema"},r.a.createElement("b",null,"Project: ")),r.a.createElement(f.a,{data:this.props.item.schema,columns:[{Header:"Name",accessor:"name"},{Header:"Type",accessor:"type"}],defaultPageSize:2,pageSizeOptions:[2,4,6]})),r.a.createElement("div",{class:"tags"},void 0))}},{key:"renderProject",value:function(){return r.a.createElement(g.a,null,r.a.createElement("p",{class:"name"},r.a.createElement("b",null,"Name: "),this.props.item.name),r.a.createElement("p",{class:"project"},r.a.createElement("b",null,"Project: "),this.props.item.project))}},{key:"render",value:function(){var e;console.log("render() :: this.props == "),console.log(this.props);var t=this.renderItemDetailsByType();return e=null!=this.props.item?r.a.createElement(d.a,null,r.a.createElement(g.a,{xs:1},y.getIconForDataikuItemType(this.props.type,"100%")),t):r.a.createElement(d.a,null,r.a.createElement("p",null,"No Item to display...")),r.a.createElement("div",{class:"dataiku-item",style:{paddingTop:"20px"}},e)}}]),a}(n.Component),k=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).loadItem=function(e){if(console.log("loadItem :: item == "),console.log(e),e.length>0){fetch(window.getWebAppBackendUrl("load-item")+"?key="+e[0].key,{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(t){console.log("response == "),console.log(t),n.setState({selectedItem:t,selectedItemType:e[0].type})}))}},n.search=function(e){fetch(window.getWebAppBackendUrl("search")+"?term="+e,{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){var t=[];Object.keys(e).forEach((function(a){t[t.length]=e[a]})),n.setState({searchResults:t})}))},n.state={dataiku:void 0,dataikuItem:null,isLoading:!1,selectedItem:null,selectedItemType:null,searchResults:[]},n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;window.$(document).ready((function(){e.setState({dataiku:window.dataiku}),e.setState({rendered:!0})}))}},{key:"renderMenuItemChildren",value:function(e,t){return r.a.createElement(n.Fragment,null,y.getIconForDataikuItemType(e.type),r.a.createElement("span",{style:{marginLeft:".5rem",marginRight:".5rem"}},"Type: ",e.type,"; "),r.a.createElement("span",null,"Name: ",e.name,"; "))}},{key:"render",value:function(){var e=this.state,t=e.isLoading,a=e.searchResults,n=e.selectedItem,c=e.selectedItemType;return this.dataikuItem=r.a.createElement(v,{item:n,type:c}),r.a.createElement(p.a,{style:{paddingTop:"20px"}},r.a.createElement(d.a,null,r.a.createElement(u.a,{filterBy:function(){return!0},id:"async-search",isLoading:t,labelKey:"name",minLength:3,onChange:this.loadItem,onSearch:this.search,options:a,placeholder:"Search for Datase",renderMenuItemChildren:this.renderMenuItemChildren})),this.dataikuItem)}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[57,1,2]]]);
//# sourceMappingURL=main.40c2c74a.chunk.js.map