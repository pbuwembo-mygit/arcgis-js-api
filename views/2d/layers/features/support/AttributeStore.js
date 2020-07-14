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

define(["require","exports","tslib","../../../../../core/Error","../../../../../core/has","../../../../../core/Logger","../../../../../core/mathUtils","../../../../../core/maybe","../../../../../core/promiseUtils","../../../../../layers/support/FieldsIndex","../../../../../support/arcadeOnDemand","../../../engine","../../../arcade/utils","../../../engine/webgl/definitions","../tileRenderers/support/visualVariablesUtils","@dojo/framework/shim/Promise"],(function(t,e,r,i,a,n,o,s,u,l,c,h,p,_,d){Object.defineProperty(e,"__esModule",{value:!0});var f=n.getLogger("esri.views.layers.2d.features.support.AttributeStore"),g=h.debug.createDebugLogger(h.debug.DEBUG_ATTR_UPDATES,f);e.LOCAL_ID_TYPE_AGGREGATE=1;var y=function(t){return(2147483648&t)>>>31},b=function(t){return 2147483647&t};e.isAggregateId=function(t){return y(t)===e.LOCAL_ID_TYPE_AGGREGATE};var v=function(t,e){return function(r,i,a){var n;try{n=e(r,i,a)}catch(t){n=NaN}return(null===n||isNaN(n)||n===1/0)&&t||n}},m={sharedArrayBuffer:a("esri-shared-array-buffer"),oesTextureFloat:a("esri-webgl-texture-float"),maxTextureSize:a("esri-webgl-max-texture-size"),atomics:a("esri-atomics")},T=function(){function t(t,e,r,i){this.texelSize=4;var a=i.pixelType,n=i.layout,o=i.textureOnly;this.textureOnly=o||!1,this.pixelType=a,this._ctype=e,this.layout=n,this._resetRange(),this._shared=t,o||(this.data=this._initData(a,r,t,e))}return Object.defineProperty(t.prototype,"buffer",{get:function(){return s.andThen(this.data,(function(t){return t.buffer}))},enumerable:!0,configurable:!0}),t.prototype.getData=function(t,e){var r=b(t);return s.unwrap(this.data)[r*this.texelSize+e]},t.prototype.setData=function(t,e,r){var i=b(t),a=1<<e;0!=(this.layout&a)?(this.data[i*this.texelSize+e]=r,this.dirtyStart=Math.min(this.dirtyStart,i),this.dirtyEnd=Math.max(this.dirtyEnd,i)):f.error("mapview-attributes-store","Tried to set a value for a texel's readonly component")},t.prototype.lock=function(){5121===this.pixelType?this._shared&&m.atomics&&"local"!==this._ctype&&Atomics.store(this.data,0,1):a("esri-2d-debug")&&f.error("AttributeStore-Bad-Type","Tried to unlock non integer array type with float array")},t.prototype.unlock=function(){5121===this.pixelType?this._shared&&m.atomics&&"local"!==this._ctype&&Atomics.store(this.data,0,0):a("esri-2d-debug")&&f.error("AttributeStore-Bad-Type","Tried to unlock non integer array type with float array")},t.prototype.expand=function(t){if(!this.textureOnly){var e=this._initData(this.pixelType,t,this._shared,this._ctype),r=s.unwrap(this.data);e.set(r),this.data=e}},t.prototype.toMessage=function(){var t=this.dirtyStart,e=this.dirtyEnd,r=this.texelSize;if(t>e)return null;this._resetRange();var i=!(this._shared||"local"===this._ctype),a=this.pixelType,n=this.layout,o=s.unwrap(this.data);return o.slice?{start:t,end:e,data:i&&o.slice(t*r,(e+1)*r)||null,pixelType:a,layout:n}:i?{start:t,end:e,data:new(h.Utils.getPixelArrayCtor(this.pixelType))(Array.prototype.slice.call(this.data,t*r,(e+1)*r)),pixelType:a,layout:n}:{start:t,end:e,data:null,pixelType:a,layout:n}},t.prototype._initData=function(t,e,r,i){for(var a=r&&"local"!==i?SharedArrayBuffer:ArrayBuffer,n=h.Utils.getPixelArrayCtor(t),o=new n(new a(e*e*4*n.BYTES_PER_ELEMENT)),s=0;s<o.length;s+=4)o[s+1]=255;return o},t.prototype._resetRange=function(){this.dirtyStart=2147483647,this.dirtyEnd=0},t}(),x=function(){function n(t){this._attributeComputeMap=new Map,this._blocks=new Array,this._idMap=new Map,this._localToObjectId=new Map,this._filters=new Array(h.definitions.MAX_FILTERS),this._freeTexelsList=[],this._abortController=u.createAbortController(),this._hasScaleExpr=!1,this._size=32,this._idCounter=1,this._idsToHighlight=new Set;var e=m.oesTextureFloat?5126:5121;g("Creating AttributeStore "+(m.sharedArrayBuffer?"with":"without")+" shared memory"),a("esri-2d-debug")&&m.sharedArrayBuffer&&!m.atomics&&f.warn("Browser supports SharedArrayBuffer but not Atomics. Rendering may be impacted"),this._client=t,this._blockDescriptors=[{pixelType:5121,layout:1},{pixelType:5121,layout:15,textureOnly:!0},{pixelType:e,layout:15},{pixelType:e,layout:15}],this._blocks=this._blockDescriptors.map((function(){return null}))}return n.prototype.destroy=function(){this._abortController.abort()},Object.defineProperty(n.prototype,"hasScaleExpr",{get:function(){return this._hasScaleExpr},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_signal",{get:function(){return this._abortController.signal},enumerable:!0,configurable:!0}),n.prototype.invalidateResources=function(){this._createResourcesPromise=null,this._abortController.abort(),this._abortController=u.createAbortController()},n.prototype.createLocalId=function(t,e){if(void 0===e&&(e=!1),!this._idMap.has(t)){var r=function(t,e){return((e?2147483648:0)|t)>>>0}(this._getFreeTexel(),e);this._idMap.set(t,-1===r?0:r),this._localToObjectId.set(r,t)}return this._idMap.get(t)},n.prototype.addLocalId=function(t){this._getBlock(0).setData(t,0,0),this._freeTexelsList.push(b(t))},n.prototype.removeLocalId=function(t){var e=this._idMap.get(t);return this._idMap.delete(t),this._localToObjectId.delete(e),e},n.prototype.freeLocalId=function(t){var e=this._idMap.get(t);a("esri-2d-debug")&&!e&&console.debug("Called freeLocalId for an invalid id"),this._getBlock(0).setData(e,0,0),this._idMap.delete(t),this._localToObjectId.delete(e),this._freeTexelsList.push(b(e))},n.prototype.getFeatureId=function(t){return this._localToObjectId.get(t)},n.prototype.getLocalId=function(t){return this._idMap.has(t)?this._idMap.get(t):null},n.prototype.setHighlight=function(t){return r.__awaiter(this,void 0,void 0,(function(){var e,i,a,n,o,s,u=this;return r.__generator(this,(function(r){switch(r.label){case 0:for(1,this._getBlock(0).lock(),this._idsToHighlight.forEach((function(t){var e=u.getLocalId(t);if(e){var r=u._getBlock(0).getData(e,0);u._getBlock(0).setData(e,0,-2&r)}})),this._idsToHighlight.clear(),e=0,i=t;e<i.length;e++)a=i[e],this._idsToHighlight.add(a);for(n=0;n<t.length;n++)null!=(o=this.getLocalId(t[n]))&&(s=this._getBlock(0).getData(o,0),this._getBlock(0).setData(o,0,1|s));return this._getBlock(0).unlock(),[4,this.sendUpdates()];case 1:return r.sent(),[2]}}))}))},n.prototype.addHighlight=function(){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(t){return[2]}))}))},n.prototype.removeHighlight=function(){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(t){return[2]}))}))},n.prototype.updateFilters=function(t){return r.__awaiter(this,void 0,void 0,(function(){var e,i,a,n,o,s=this;return r.__generator(this,(function(r){switch(r.label){case 0:return e=t.config,i=t.service,a=t.spatialReference,n=e.filters,o=n.map((function(e,r){return s._updateFilter(t,e,r,i,a)})),[4,u.all(o)];case 1:return r.sent(),[2]}}))}))},n.prototype.setAttributeBindings=function(t,e){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(r){switch(this._hasScaleExpr=!1,t.type){case"simple":case"class-breaks":case"unique-value":case"dictionary":return[2,this._bindVVEvaluators(t.visualVariables,e)];case"dot-density":return[2,this._bindDDEvaluators(t.attributes,e)];case"heatmap":break;default:f.error(new i("attribute-store","Found invalid renderer type: "+t))}return[2]}))}))},n.prototype.setData=function(t,e,r,i){this._getBlock(e).setData(t,r,i)},n.prototype.getData=function(t,e,r){return this._getBlock(e).getData(t,r)},n.prototype.getHighlightFlag=function(t){return this._idsToHighlight.has(t)?_.HIGHLIGHT_FLAG:0},n.prototype.setAttributeData=function(t,e,r,i){var a=this,n=t;this._getBlock(0).setData(n,0,this.getFilterFlags(e));var s=this._attributeComputeMap,u=m.oesTextureFloat?1:2;s.forEach((function(t,s){var l=s*u%4,c=Math.floor(s*u/4),p=a._getBlock(c+_.ATTRIBUTE_DATA_VV),d=t(e,{$view:i},r);if(m.oesTextureFloat)p.setData(n,l,d);else if(d===h.definitions.NAN_MAGIC_NUMBER)p.setData(n,l,255),p.setData(n,l+1,255);else{var f=o.clamp(Math.round(d),-32767,32766)+32768,g=255&f,y=(65280&f)>>8;p.setData(n,l,g),p.setData(n,l+1,y)}}))},n.prototype.sendUpdates=function(){var t=this;if(this._nextUpdate)return this._nextUpdate.promise;if(this._currUpdate)return this._nextUpdate=u.createResolver(),this._nextUpdate.promise;var e={blocks:this._blocks.map((function(t){return s.isSome(t)?t.toMessage():null}))};return this._currUpdate=this._createResources().then((function(){var r=function(){if(t._currUpdate=null,t._nextUpdate){var e=t._nextUpdate;t._nextUpdate=null,t.sendUpdates().then((function(){return e.resolve()}))}},i=t._client.update(e,t._signal).then(r).catch(r);return t._client.render(),i})).catch((function(e){return u.isAbortError(e)?(t._createResourcesPromise=null,t._createResources()):(f.error(new i("mapview-attribute-store","Encountered an error during client update",e)),u.resolve())})),this._currUpdate},n.prototype._createResources=function(){var t=this;if(s.isSome(this._createResourcesPromise))return this._createResourcesPromise;this._getBlock(_.ATTRIBUTE_DATA_ANIMATION),g("Initializing AttributeStore");var e={shared:m.sharedArrayBuffer&&!("local"===this._client.type),size:this._size,blocks:s.mapMany(this._blocks,(function(t){return{textureOnly:t.textureOnly,buffer:t.buffer,pixelType:t.pixelType}}))},r=this._client.initialize(e,this._signal).catch((function(e){u.isAbortError(e)?t._createResourcesPromise=null:f.error(new i("mapview-attribute-store","Encountered an error during client initialization",e))}));return this._createResourcesPromise=r,r.then((function(){return s.isNone(t._createResourcesPromise)?t._createResources():void 0})),r},n.prototype._getBlock=function(t){var e=this._blocks[t];if(s.isSome(e))return e;g("Initializing AttributeBlock at index "+t);var r=m.sharedArrayBuffer,i=this._client.type,a=new T(r,i,this._size,this._blockDescriptors[t]);return this._blocks[t]=a,this._createResourcesPromise=null,a},n.prototype._expand=function(){if(this._size<m.maxTextureSize){var t=this._size<<=1;return g("Expanding block size to",t,this._blocks),s.forEachSome(this._blocks,(function(e){return e.expand(t)})),this._createResourcesPromise=null,this._size=t,0}return f.error(new i("mapview-limitations","Maximum number of onscreen features exceeded.")),-1},n.prototype._getFreeTexel=function(){return this._freeTexelsList.length?this._freeTexelsList.pop():this._idCounter>=this._size*this._size&&this._expand()?-1:this._idCounter++},n.prototype._updateFilter=function(t,i,a,n,o){return r.__awaiter(this,void 0,void 0,(function(){var u,l,c,h,p,_,d,f=this;return r.__generator(this,(function(r){switch(r.label){case 0:return u=this._filters[a],(s.isSome(u)&&u.hash)===JSON.stringify(i)?[2]:(l=1<<a+1,s.isNone(i)?(this._filters[a]=null,this._idMap.forEach((function(t){var e=f._getBlock(0).getData(t,0);f._getBlock(0).setData(t,0,e|l)})),[2]):[4,t.queryObjectIds(i)]);case 1:return c=r.sent(),i.hiddenIds&&i.hiddenIds.length&&(c=c.filter((function(t){return-1===i.hiddenIds.indexOf(t)}))),h=c.map((function(t){return f._idMap.get(t)})),[4,this._getFilter(a,n)];case 2:for(r.sent().update(i,o),this._getBlock(0).lock(),this._idMap.forEach((function(t){if(y(t)!==e.LOCAL_ID_TYPE_AGGREGATE){var r=f._getBlock(0).getData(t,0);f._getBlock(0).setData(t,0,r&~l)}})),p=0;p<h.length;p++)null!=(_=h[p])&&(d=this._getBlock(0).getData(_,0),this._getBlock(0).setData(_,0,d|l));return this._getBlock(0).unlock(),[2]}}))}))},n.prototype._getFilter=function(e,i){return r.__awaiter(this,void 0,void 0,(function(){var a,n,o;return r.__generator(this,(function(r){switch(r.label){case 0:return a=this._filters[e],s.isSome(a)?[2,a]:[4,new Promise((function(e,r){t(["../../../../../layers/graphics/data/FeatureFilter"],e,r)}))];case 1:return n=r.sent().default,o=new n({geometryType:i.geometryType,hasM:!1,hasZ:!1,timeInfo:i.timeInfo,fieldsIndex:new l(i.fields)}),this._filters[e]=o,[2,o]}}))}))},n.prototype.isVisible=function(t){return!!(2&this._getBlock(0).getData(t.localId,0))},n.prototype.getFilterFlags=function(t){for(var r,i=0,a=(r=t.localId,y(r)===e.LOCAL_ID_TYPE_AGGREGATE?254:255),n=0;n<this._filters.length;n++){var o=!!(a&1<<n),u=this._filters[n];i|=(!o||s.isNone(u)||u.check(t)?1:0)<<n}var l=this.getFeatureId(t.localId);return i<<1|this.getHighlightFlag(l)},n.prototype._bindVVEvaluators=function(t,e){return r.__awaiter(this,void 0,void 0,(function(){var i=this;return r.__generator(this,(function(a){switch(a.label){case 0:return this._attributeComputeMap.clear(),s.isSome(t)?[4,u.all(t.map((function(t){return r.__awaiter(i,void 0,void 0,(function(){var i,a;return r.__generator(this,(function(r){switch(r.label){case 0:return i=h.Utils.getVVType(t.type),[4,this._createGetValueFunction(t,e)];case 1:return a=r.sent(),s.isSome(a)&&this._attributeComputeMap.set(i,a),[2]}}))}))})))]:[3,2];case 1:a.sent(),a.label=2;case 2:return[2]}}))}))},n.prototype._bindDDEvaluators=function(t,e){return r.__awaiter(this,void 0,void 0,(function(){var i,a,n,o=this;return r.__generator(this,(function(r){switch(r.label){case 0:return this._attributeComputeMap.clear(),t.length>h.definitions.DOT_DENSITY_MAX_FIELDS&&f.warn("mapview-invalid-value","DotDensityRenderer supports a maximum of "+h.definitions.DOT_DENSITY_MAX_FIELDS+" attribtues, but found "+t.length),[4,u.all(t.map((function(t){return o._createNormalizedFunction(t,e)})))];case 1:for(i=r.sent().map((function(t){return v(0,t)})),a=0;a<h.definitions.DOT_DENSITY_MAX_FIELDS;a++)(n=a<t.length&&i[a])?this._attributeComputeMap.set(a,n):this._attributeComputeMap.has(a)&&this._attributeComputeMap.delete(a);return[2]}}))}))},n.prototype._createGetValueFunction=function(t,e){return r.__awaiter(this,void 0,void 0,(function(){var i,a,n,o,s,u,l;return r.__generator(this,(function(r){switch(r.label){case 0:return"size"!==t.type?[3,2]:(i=h.getTypeOfSizeVisualVariable(t))===h.enums.WGLVVFlag.SIZE_SCALE_STOPS?[2,null]:(a=i===h.enums.WGLVVFlag.SIZE_UNIT_VALUE,n=a&&function(e){return d.getVisualVariableSizeValueRepresentationRatio(e,t.valueRepresentation)},o=v,s=[h.definitions.NAN_MAGIC_NUMBER],[4,this._createNormalizedFunction(t,e,n)]);case 1:return[2,o.apply(void 0,s.concat([r.sent()]))];case 2:return u=v,l=[h.definitions.NAN_MAGIC_NUMBER],[4,this._createNormalizedFunction(t,e)];case 3:return[2,u.apply(void 0,l.concat([r.sent()]))]}}))}))},n.prototype._createNormalizedFunction=function(t,e,a){return r.__awaiter(this,void 0,void 0,(function(){var n,o,s;return r.__generator(this,(function(r){switch(r.label){case 0:return(n=t.field)?"string"==typeof n?(o=t.normalizationField)?[2,function(t){if(t.attributes[n]&&t.attributes[o]){var e=t.attributes[n]/t.attributes[o];return a?a(e):e}}]:[2,a?function(t){return a(t.attributes[n])}:function(t){return t.attributes[n]}]:(f.error(new i("mapview-rendering:invalid-type","The field for a vv must be a string or a number, but got "+typeof n)),[2,function(){}]):t.valueExpression?(this._hasScaleExpr=this._hasScaleExpr||-1!==t.valueExpression.indexOf("scale"),[4,c.createVVExpression(t.valueExpression,e.spatialReference,e.fields)]):[3,2];case 1:return s=r.sent(),[2,p.callWithOptimizedFeature.bind(null,s)];case 2:return f.error("Unable to create a normalized function for visual variable: "+t),[2,function(){}]}}))}))},n}();e.default=x}));