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

define(["require","exports","tslib","../../../../core/Handles","../../../../core/MapUtils","../../../../core/maybe","../../../../core/watchUtils","../../../../core/accessorSupport/decorators","./Deconflictor","./LabelDeconflictor","../../support/geometryUtils","../../../support/Scheduler"],(function(e,t,i,r,n,a,o,s,c,l,h,p){Object.defineProperty(t,"__esModule",{value:!0});var u=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._handles=new r,t._contexts=new Map,t._viewState=new c.DeconflictorViewState,t.visibilityGroup=0,t._iconMarginFactor=-.1,t}return i.__extends(t,e),Object.defineProperty(t.prototype,"labels",{get:function(){return this._labels},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"viewState",{get:function(){return this._viewState},enumerable:!0,configurable:!0}),t.prototype.initialize=function(){var e=this;this._handles.add([this.view.watch("state.camera",(function(){e.updateViewState(),e.setDirty()})),this.view.watch("map.ground.opacity",(function(t,i){1!==t&&1!==i||e.setDirty()})),o.init(this.view,"slicePlane",(function(){e.updateSlicePlane(),e.slicePlaneChanged()}))]),this._frameTask=this.view.resourceController.scheduler.registerTask(p.Task.GRAPHICS_DECONFLICTOR,(function(t){return e.update(t)}),(function(){return e.needsUpdate()})),this._labels=new l.LabelDeconflictor({view:this.view,parent:this})},t.prototype.destroy=function(){this._labels.destroy(),this._labels=null,this._handles.destroy(),this._handles=null,this._frameTask&&(this._frameTask.remove(),this._frameTask=null)},Object.defineProperty(t.prototype,"iconMarginFactor",{get:function(){return this._iconMarginFactor},set:function(e){this._iconMarginFactor=e,this.setDirty()},enumerable:!0,configurable:!0}),t.prototype.setDirty=function(){this._contexts.size>0&&(e.prototype.setDirty.call(this),this._labels.setDirty())},t.prototype.update=function(t){e.prototype.update.call(this,t),this.needsUpdate()||this._labels.setDirty()},t.prototype.setInitialIconVisibilityFlag=function(e,t){var i=!(this._graphicSupportsDeconfliction(t)&&f(e));t.setVisibilityFlag(3,i,0)},t.prototype.updateViewState=function(){this.view&&this.view.state&&(this._viewState.camera.copyFrom(this.view.state.camera),this.updateSlicePlane())},t.prototype.updateSlicePlane=function(){var e=this.view?this.view.slicePlane:null;a.isSome(e)&&h.boundedPlane.transform(e,this._viewState.camera.viewMatrix,this._viewState.slicePlane),this._viewState.slicePlaneEnabled=a.isSome(e)},t.prototype.slicePlaneChanged=function(){n.someMap(this._contexts,(function(e,t){return t.symbolCreationContext.slicePlaneEnabled}))&&this.setDirty()},t.prototype.addGraphicsOwner=function(e){var t=this,i=this._contexts.get(e);return null==i&&(i=new Map,this._contexts.set(e,i),this.setDirty()),{addGraphic:function(r){return t.addGraphic(e,i,r)},removeGraphic:function(e){return t.removeGraphic(i,e)},labelingInfoChange:function(){return t._labels.enabledChanged(e,i)},featureReductionChange:function(){return t.enabledChanged(e,i)},slicePlaneEnabledChange:function(){return t._slicePlaneEnabledChanged(e,i)},clear:function(){return i.forEach((function(e){return t.removeGraphic(i,e.graphics3DGraphic)}))}}},t.prototype.removeGraphicsOwner=function(e){var t=this,i=this._contexts.get(e);i&&(i.forEach((function(e){return t.removeGraphic(i,e.graphics3DGraphic)})),this._contexts.delete(e),this.setDirty())},t.prototype.addGraphic=function(e,t,i){var r=i.graphic.uid,n=new c.DeconflictorGraphic(i,e.symbolCreationContext.slicePlaneEnabled);t.set(r,n),f(e)&&this.addToActiveGraphics(n),e.labelsEnabled&&this._labels.addToActiveGraphics(n)},t.prototype.removeGraphic=function(e,t){var i=t.graphic.uid,r=e.get(i);r&&(this.removeFromActiveGraphics(r),this._labels.removeFromActiveGraphics(r),e.delete(i),this.setDirty())},t.prototype.enabledChanged=function(e,t){var i=f(e);i||function(e){var t=e.graphics3DGraphics;t&&t.forEach((function(e){return e.clearVisibilityFlag(3)}))}(e),this.modifyGraphics(t,i)},t.prototype._slicePlaneEnabledChanged=function(e,t){var i=e.symbolCreationContext.slicePlaneEnabled;t.forEach((function(e){return e.slicePlaneEnabled=i})),this.setDirty()},t.prototype.getGraphicsLayers=function(e){return e._graphics},t.prototype._graphicSupportsDeconfliction=function(e){if(e.isDraped)return!1;var t=e._graphics;if(!t||!t.length)return!1;for(var i=0,r=t;i<r.length;i++){var n=r[i];if(this.layerSupportsDeconfliction(n))return!0}return!1},t=i.__decorate([s.subclass("esri.views.3d.layers.graphics.GraphicsDeconflictor")],t)}(c.Deconflictor);function f(e){var t=e.layer;return!(!t||!t.featureReduction||"selection"!==t.featureReduction.type)}t.GraphicsDeconflictor=u}));