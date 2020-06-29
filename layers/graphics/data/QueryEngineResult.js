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
// See http://js.arcgis.com/4.15/esri/copyright.txt for details.

define(["require","exports","../../../core/tsSupport/assignHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../core/MapUtils","../../../core/maybe","../../../core/promiseUtils","../../../core/SetUtils","../../../geometry/support/quantizationUtils","../../../geometry/support/spatialReferenceUtils","../featureConversionUtils","./AttributesBuilder","./attributeSupport","./projectionSupport","./timeSupport","./utils"],(function(e,t,r,i,s,a,n,o,u,l,h,f,c,p,d,m,y){Object.defineProperty(t,"__esModule",{value:!0});var g=function(){function e(e,t,r){this.items=e,this.queryGeometry=t,this.definitionExpression=r.definitionExpression,this.geometryType=r.geometryType,this.hasM=r.hasM,this.hasZ=r.hasZ,this.objectIdField=r.objectIdField,this.spatialReference=r.spatialReference,this.fieldsIndex=r.fieldsIndex,this.timeInfo=r.timeInfo,this.featureAdapter=r.featureAdapter}return Object.defineProperty(e.prototype,"size",{get:function(){return this.items.length},enumerable:!0,configurable:!0}),e.prototype.createQueryResponse=function(e){var t;e.outStatistics?t=e.outStatistics.some((function(e){return"exceedslimit"===e.statisticType}))?this._createExceedsLimitQueryResponse(e):this._createStatisticsQueryResponse(e):t=this._createFeatureQueryResponse(e);return e.returnQueryGeometry&&(h.isValid(e.outSR)&&!h.equals(this.queryGeometry.spatialReference,e.outSR)?t.queryGeometry=y.cleanFromGeometryEngine(r({spatialReference:e.outSR},d.project(this.queryGeometry,this.queryGeometry.spatialReference,e.outSR))):t.queryGeometry=y.cleanFromGeometryEngine(r({spatialReference:e.outSR},this.queryGeometry))),t},e.prototype.executeAttributesQuery=function(t){var r=p.getWhereClause(t.where,this.fieldsIndex);if(!r)return o.resolve(this);if(r.isStandardized){for(var i=0,s=[],a=0,n=this.items;a<n.length;a++){var u=n[a];r.testFeature(u,this.featureAdapter)&&(s[i++]=u)}var l=new e(s,this.queryGeometry,this);return l.definitionExpression=t.where,o.resolve(l)}return o.reject(new TypeError("Where clause is not standardized"))},e.prototype.executeObjectIdsQuery=function(t){if(!t.objectIds||!t.objectIds.length)return o.resolve(this);var r=u.createSetFromValues(t.objectIds),i=this.featureAdapter.getObjectId;return o.resolve(new e(this.items.filter((function(e){return r.has(i(e))})),this.queryGeometry,this))},e.prototype.executeTimeQuery=function(t){var r=m.getTimeOperator(this.timeInfo,t.timeExtent,this.featureAdapter);if(!n.isSome(r))return o.resolve(this);var i=this.items.filter(r);return o.resolve(new e(i,this.queryGeometry,this))},e.prototype.filterLatest=function(){for(var t=this.timeInfo,r=t.trackIdField,i=t.startTimeField,s=t.endTimeField||i,n=new Map,u=this.featureAdapter.getAttribute,l=0,h=this.items;l<h.length;l++){var f=h[l],c=u(f,r),p=u(f,s),d=n.get(c);(!d||p>u(d,s))&&n.set(c,f)}var m=a.valuesOfMap(n);return o.resolve(new e(m,this.queryGeometry,this))},e.prototype.project=function(t){return s(this,void 0,void 0,(function(){var r,s,a=this;return i(this,(function(i){switch(i.label){case 0:return!t||h.equals(this.spatialReference,t)?[2,this]:(r=this.featureAdapter,[4,d.projectMany(this.items.map((function(e){return y.getGeometry(a,r.getGeometry(e))})),this.spatialReference,t)]);case 1:return s=i.sent(),[2,new e(s.map((function(e,t){return r.cloneWithGeometry(a.items[t],f.convertFromGeometry(e,a.hasZ,a.hasM))})),this.queryGeometry,{definitionExpression:this.definitionExpression,geometryType:this.geometryType,hasM:this.hasM,hasZ:this.hasZ,objectIdField:this.objectIdField,spatialReference:t,fieldsIndex:this.fieldsIndex,timeInfo:this.timeInfo,featureAdapter:this.featureAdapter})]}}))}))},e.prototype._createFeatureQueryResponse=function(e){var t=this,r=this.items,i=this,s=i.geometryType,a=i.hasM,n=i.hasZ,o=i.objectIdField,u=i.spatialReference,h=e.outFields,f=e.outSR,c=e.quantizationParameters,p=e.resultRecordCount,d=e.resultOffset,m=e.returnZ,g=e.returnM,I=!1;if(null!=p&&null!=d){var v=d+p;I=r.length>v,r=r.slice(d,Math.min(r.length,v))}var b=h&&(h.indexOf("*")>-1?this.fieldsIndex.fields.slice():h.map((function(e){return t.fieldsIndex.get(e)})));return{exceededTransferLimit:I,features:this._createFeatures(e,r),fields:b,geometryType:s,hasM:a&&g,hasZ:n&&m,objectIdFieldName:o,spatialReference:y.cleanFromGeometryEngine(f||u),transform:c&&l.toQuantizationTransform(c)||null}},e.prototype._createFeatures=function(e,t){var r=new c.default(e,this.featureAdapter,this.fieldsIndex),i=this.hasM,s=this.hasZ,a=e.orderByFields,n=e.quantizationParameters,o=e.returnGeometry,u=e.returnCentroid,h=e.maxAllowableOffset,f=e.returnZ,p=void 0!==f&&f,d=e.returnM,m=s&&p,g=i&&(void 0!==d&&d),I=[],v=0;if(t.length&&a&&a.length){var b=a[0].split(" "),x=b[0],F=this.fieldsIndex.get(x),T=b[1]&&"desc"===b[1].toLowerCase();t.sort((function(e,t){var i=r.getFieldValue(e,x,F),s=r.getFieldValue(t,x,F);if("number"==typeof i&&"number"==typeof s)return T?s-i:i-s;if("string"==typeof i&&"string"==typeof s){var a=i.toUpperCase(),n=s.toUpperCase();return(T?a>n:a<n)?-1:(T?a<n:a>n)?1:0}}))}if(o||u){var S=l.toQuantizationTransform(n);if(o&&!u)for(var N=0,R=t;N<R.length;N++){V=R[N];I[v++]={attributes:r.getAttributes(V),geometry:y.getGeometry(this,this.featureAdapter.getGeometry(V),h,S,m,g)}}else if(!o&&u)for(var G=0,A=t;G<A.length;G++){V=A[G];I[v++]={attributes:r.getAttributes(V),centroid:y.transformCentroid(this,this.featureAdapter.getCentroid(V,this),S)}}else for(var _=0,q=t;_<q.length;_++){V=q[_];I[v++]={attributes:r.getAttributes(V),centroid:y.transformCentroid(this,this.featureAdapter.getCentroid(V,this),S),geometry:y.getGeometry(this,this.featureAdapter.getGeometry(V),h,S,m,g)}}}else for(var E=0,M=t;E<M.length;E++){var V=M[E],j=r.getAttributes(V);j&&(I[v++]={attributes:j})}return I},e.prototype._createExceedsLimitQueryResponse=function(e){for(var t=!1,r=Number.POSITIVE_INFINITY,i=Number.POSITIVE_INFINITY,s=Number.POSITIVE_INFINITY,a=0,n=e.outStatistics;a<n.length;a++){var o=n[a];if("exceedslimit"===o.statisticType){r=null!=o.maxPointCount?o.maxPointCount:Number.POSITIVE_INFINITY,i=null!=o.maxRecordCount?o.maxRecordCount:Number.POSITIVE_INFINITY,s=null!=o.maxVertexCount?o.maxVertexCount:Number.POSITIVE_INFINITY;break}}if("esriGeometryPoint"===this.geometryType)t=this.items.length>r;else if(this.items.length>i)t=!0;else{var u=this.hasZ?this.hasM?4:3:this.hasM?3:2,l=this.featureAdapter;t=this.items.reduce((function(e,t){var r=l.getGeometry(t);return e+(r&&r.coords.length||0)}),0)/u>s}return{fields:[{name:"exceedslimit",type:"esriFieldTypeInteger",alias:"exceedslimit",sqlType:"sqlTypeInteger",domain:null,defaultValue:null}],features:[{attributes:{exceedslimit:Number(t)}}]}},e.prototype._createStatisticsQueryResponse=function(e){for(var t=new c.default(e,this.featureAdapter,this.fieldsIndex),r=e.outStatistics,i=[],s=[],a=e.groupByFieldsForStatistics,n=e.having,o=a&&a.length,u=o&&a[0],l=this.fieldsIndex.get(u),h=!l,f={},p={},d={},m={attributes:{}},y=0,g=r;y<g.length;y++){var I=g[y],v=I.outStatisticFieldName,b=I.statisticType,x="exceedslimit"!==b?I.onStatisticField:void 0,F=this.fieldsIndex.get(x),T=o&&(x===u||h)&&"count"===b;if(o){f[x]||(f[x]=this._calculateUniqueValues(t,u,l));var S=f[x];for(var N in S){var R=S[N],G=R.count,A=R.data,_=R.items;if(!n||t.validateItems(_,n)){var q=p[A]||{attributes:{}},E=null;if(T)E=G;else E=(M=this._calculateStatistics(_,t,x,F))[V="var"===b?"variance":b];q.attributes[v]=E,q.attributes[h?"EXPR_1":u]=A,p[A]=q}}}else{d[x]||(d[x]=this._calculateStatistics(this.items,t,x,F));var M=d[x],V="var"===b?"variance":b;m.attributes[v]=M[V]}s.push({name:v,alias:v,type:"esriFieldTypeDouble"})}if(o)for(var j in p)i.push(p[j]);else i.push(m);return{fields:s,features:i}},e.prototype._calculateStatistics=function(e,t,r,i){for(var s=Number.POSITIVE_INFINITY,a=Number.NEGATIVE_INFINITY,n=null,o=null,u=null,l=null,h=[],f=0,c=0;c<e.length;c++){var p=e[c];"string"==typeof(g=t.getFieldValue(p,r,i))?f++:null==g||isNaN(g)||(n+=g,s=Math.min(s,g),a=Math.max(a,g),h.push(g),f++)}if(f){o=n/f;for(var d=0,m=0,y=h;m<y.length;m++){var g=y[m];d+=Math.pow(g-o,2)}l=f>1?d/(f-1):0,u=Math.sqrt(l)}else s=null,a=null;return{avg:o,count:f,max:a,min:s,stddev:u,sum:n,variance:l}},e.prototype._calculateUniqueValues=function(e,t,r){for(var i={},s=0,a=this.items;s<a.length;s++){var n=a[s],o=e.getFieldValue(n,t,r);(null==o||"string"==typeof o&&""===o.trim())&&(o=null),null==i[o]?i[o]={count:1,data:o,items:[n]}:(i[o].count++,i[o].items.push(n))}return i},e}();t.default=g}));