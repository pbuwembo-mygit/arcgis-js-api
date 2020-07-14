// COPYRIGHT © 2020 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.16/esri/copyright.txt for details.

define(["require","exports","tslib","../../core/Collection","../../core/Evented","../../core/HandleOwner","../../core/watchUtils","../../core/accessorSupport/decorators","../LayerList/ListItem"],(function(e,t,i,r,s,a,n,o,c){var p="view",m="basemap",l="base-layers",y="reference-layers",d="reference-layers-list-mode",f="base-layers-list-mode",h="base-layer-views",u="reference-layer-views",v=r.ofType(c);return function(e){function t(t){var i=e.call(this,t)||this;return i.baseItems=new v,i.baseListItemCreatedFunction=null,i.referenceListItemCreatedFunction=null,i.referenceItems=new v,i.view=null,i._compileBaseList=i._compileBaseList.bind(i),i._compileReferenceList=i._compileReferenceList.bind(i),i}return i.__extends(t,e),t.prototype.initialize=function(){var e=this;this.handles.add(n.init(this,["view.map.basemap","view","view.ready","view.basemapView"],(function(){return e._watchBasemapLayers()})),p)},t.prototype.destroy=function(){this.view=null,this.baseItems.removeAll(),this.referenceItems.removeAll()},Object.defineProperty(t.prototype,"basemapTitle",{get:function(){return this.get("view.map.basemap.title")||null},set:function(e){void 0!==e?this._override("basemapTitle",e):this._clearOverride("basemapTitle")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"state",{get:function(){return this.get("view.ready")?"ready":this.get("view")?"loading":"disabled"},enumerable:!0,configurable:!0}),t.prototype.triggerAction=function(e,t){e&&this.emit("trigger-action",{action:e,item:t})},t.prototype.transferListItem=function(e){var t=e.listItem,i=e.from,r=e.to,s=e.newIndex,a=this.referenceItems,n=this.baseItems,o=t.layer,c=this.get("view.map.basemap.baseLayers"),p=this.get("view.map.basemap.referenceLayers");if(c&&p&&i!==r){var m="reference"===r?a:n,l="reference"===i?p:c,y="reference"===r?p:c;("reference"===i?a:n).remove(t),l.remove(o),m.add(t,s),y.add(o,s)}},t.prototype._createItemChangeHandles=function(e){var t=e.items,i=e.key,r=e.callback,s=this.handles;s.remove(i),r(),t&&s.add(t.on("change",(function(){return r()})),i)},t.prototype._watchItemProperties=function(e){var t=this,i=e.item,r=e.type;this.handles.add([i.children.on("change",(function(){t._modifyListItemChildren({type:r,childItems:i.children})}))],"children-change-"+i.uid)},t.prototype._modifyListItemChildren=function(e){var t=this,i=e.childItems,r=e.type;i.forEach((function(e){return t._modifyListItem({type:r,item:e})}))},t.prototype._modifyListItem=function(e){var t=e.item,i=e.type,r={item:t};"base"===i&&"function"==typeof this.baseListItemCreatedFunction&&this.baseListItemCreatedFunction.call(null,r),"reference"===i&&"function"==typeof this.referenceListItemCreatedFunction&&this.referenceListItemCreatedFunction.call(null,r),this._modifyListItemChildren({type:i,childItems:t.children})},t.prototype._createListItem=function(e){var t=e.layer,i=e.type,r=this.view,s=new c({layer:t,view:r});return this._watchItemProperties({type:i,item:s}),s},t.prototype._watchLayersListMode=function(e){var t=e.layers,i=e.key,r=e.callback,s=this.handles;s.remove(i),t&&t.forEach((function(e){s.add(n.watch(e,"listMode",(function(){return r()})),i)}))},t.prototype._compileListItems=function(e){var t=e.layers,i=e.items,r=e.key,s=e.type,a=e.callback;this._watchLayersListMode({layers:t,key:r,callback:a}),this._createNewItems({type:s,items:i,layers:t}),this._modifyOrRemoveItems({type:s,items:i,layers:t}),this._sortItems(i,t)},t.prototype._compileReferenceList=function(){var e=this.referenceItems,t=this.get("view.map.basemap.referenceLayers");this._compileListItems({type:"reference",layers:t,items:e,key:f,callback:this._compileReferenceList})},t.prototype._compileBaseList=function(){var e=this.baseItems,t=this.get("view.map.basemap.baseLayers");this._compileListItems({type:"base",layers:t,items:e,key:d,callback:this._compileBaseList})},t.prototype._compileLists=function(){this._compileReferenceList(),this._compileBaseList()},t.prototype._createNewItems=function(e){var t=this,i=e.items,r=e.layers,s=e.type;r&&r.forEach((function(e){i.find((function(t){return t.layer===e}))||i.add(t._createListItem({type:s,layer:e}))}))},t.prototype._modifyOrRemoveItems=function(e){var t=this,i=e.items,r=e.layers,s=e.type,a=this.handles;i&&i.forEach((function(e){e&&(r&&r.find((function(t){return e.layer===t}))?t._modifyListItem({type:s,item:e}):(a.remove("children-change-"+e.uid),i.remove(e)))}))},t.prototype._sortItems=function(e,t){e&&e.sort((function(e,i){var r=t.indexOf(e.layer),s=t.indexOf(i.layer);return r>s?-1:r<s?1:0}))},t.prototype._watchBasemapLayers=function(){var e=this,t=this.handles,i=this.view;t.remove([l,y,m,h,u]),this._compileLists(),i&&i.ready&&t.add([n.init(this,"view.map.basemap.baseLayers",(function(t){return e._createItemChangeHandles({items:t,key:l,callback:e._compileBaseList})})),n.init(this,"view.map.basemap.referenceLayers",(function(t){return e._createItemChangeHandles({items:t,key:y,callback:e._compileReferenceList})})),n.init(this,"view.basemapView.baseLayerViews",(function(t){return e._createItemChangeHandles({items:t,key:h,callback:e._compileBaseList})})),n.init(this,"view.basemapView.referenceLayerViews",(function(t){return e._createItemChangeHandles({items:t,key:u,callback:e._compileReferenceList})})),n.init(this,"baseListItemCreatedFunction",(function(){return e._compileBaseList()})),n.init(this,"referenceListItemCreatedFunction",(function(){return e._compileReferenceList()}))],m)},i.__decorate([o.property({type:v})],t.prototype,"baseItems",void 0),i.__decorate([o.property({dependsOn:["view","view.map","view.map.basemap","view.map.basemap.title"]})],t.prototype,"basemapTitle",null),i.__decorate([o.property()],t.prototype,"baseListItemCreatedFunction",void 0),i.__decorate([o.property()],t.prototype,"referenceListItemCreatedFunction",void 0),i.__decorate([o.property({type:v})],t.prototype,"referenceItems",void 0),i.__decorate([o.property({dependsOn:["view.ready"],readOnly:!0})],t.prototype,"state",null),i.__decorate([o.property()],t.prototype,"view",void 0),i.__decorate([o.property()],t.prototype,"transferListItem",null),t=i.__decorate([o.subclass("esri.widgets.BasemapLayerList.BasemapLayerListViewModel")],t)}(a.HandleOwnerMixin(s.EventedAccessor))}));