// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../geometry","../../geometry","../../symbols","../../TimeExtent","../../core/jsonMap","../../core/JSONSupport","../../core/lang","../../core/accessorSupport/decorators","../../core/accessorSupport/ensureType","../../geometry/support/jsonUtils","../../symbols/support/jsonUtils","./QuantizationParameters","./StatisticDefinition"],function(t,e,r,o,i,n,s,p,a,l,u,y,c,d,m,h,v){var w=new a.default({esriSpatialRelIntersects:"intersects",esriSpatialRelContains:"contains",esriSpatialRelCrosses:"crosses",esriSpatialRelDisjoint:"disjoint",esriSpatialRelEnvelopeIntersects:"envelope-intersects",esriSpatialRelIndexIntersects:"index-intersects",esriSpatialRelOverlaps:"overlaps",esriSpatialRelTouches:"touches",esriSpatialRelWithin:"within",esriSpatialRelRelation:"relation"}),f=new a.default({esriSRUnit_Meter:"meters",esriSRUnit_Kilometer:"kilometers",esriSRUnit_Foot:"feet",esriSRUnit_StatuteMile:"miles",esriSRUnit_NauticalMile:"nautical-miles",esriSRUnit_USNauticalMile:"us-nautical-miles"}),S=function(t){function e(e){var r=t.call(this,e)||this;return r.cacheHint=!1,r.datumTransformation=null,r.distance=void 0,r.gdbVersion=null,r.geometry=null,r.geometryPrecision=void 0,r.groupByFieldsForStatistics=null,r.having=null,r.historicMoment=null,r.maxAllowableOffset=void 0,r.maxRecordCountFactor=1,r.multipatchOption=null,r.num=void 0,r.objectIds=null,r.orderByFields=null,r.outFields=null,r.outSpatialReference=null,r.outStatistics=null,r.parameterValues=null,r.pixelSize=null,r.quantizationParameters=null,r.rangeValues=null,r.relationParameter=null,r.resultType=null,r.returnCentroid=!1,r.returnDistinctValues=!1,r.returnExceededLimitFeatures=!0,r.returnGeometry=!1,r.returnQueryGeometry=!1,r.returnM=void 0,r.returnZ=void 0,r.source=null,r.spatialRelationship="intersects",r.start=void 0,r.sqlFormat=null,r.text=null,r.timeExtent=null,r.units=null,r.where=null,r}r(e,t),a=e,e.prototype.castDatumTransformation=function(t){return"number"==typeof t||"object"==typeof t?t:null},e.prototype.writeHistoricMoment=function(t,e,r){e.historicMoment=t&&t.getTime()},e.prototype.writeParameterValues=function(t,e,r){if(t){var o={};for(var i in t){var n=t[i];Array.isArray(n)?o[i]=n.map(function(t){return t instanceof Date?t.getTime():t}):n instanceof Date?o[i]=n.getTime():o[i]=n}e.parameterValues=o}},e.prototype.writeStart=function(t,e,r){e.resultOffset=this.start,e.resultRecordCount=this.num||10,e.where="1=1"},e.prototype.writeWhere=function(t,e,r){e.where=t||"1=1"},e.prototype.clone=function(){return new a(u.clone({cacheHint:this.cacheHint,datumTransformation:this.datumTransformation,distance:this.distance,gdbVersion:this.gdbVersion,geometry:this.geometry,geometryPrecision:this.geometryPrecision,groupByFieldsForStatistics:this.groupByFieldsForStatistics,having:this.having,historicMoment:this.historicMoment?new Date(this.historicMoment.getTime()):null,maxAllowableOffset:this.maxAllowableOffset,maxRecordCountFactor:this.maxRecordCountFactor,multipatchOption:this.multipatchOption,num:this.num,objectIds:this.objectIds,orderByFields:this.orderByFields,outFields:this.outFields,outSpatialReference:this.outSpatialReference,outStatistics:this.outStatistics,parameterValues:this.parameterValues,pixelSize:this.pixelSize,quantizationParameters:this.quantizationParameters,rangeValues:this.rangeValues,relationParameter:this.relationParameter,resultType:this.resultType,returnDistinctValues:this.returnDistinctValues,returnGeometry:this.returnGeometry,returnCentroid:this.returnCentroid,returnExceededLimitFeatures:this.returnExceededLimitFeatures,returnQueryGeometry:this.returnQueryGeometry,returnM:this.returnM,returnZ:this.returnZ,source:this.source,spatialRelationship:this.spatialRelationship,start:this.start,sqlFormat:this.sqlFormat,text:this.text,timeExtent:this.timeExtent,units:this.units,where:this.where}))};var a;return e.MAX_MAX_RECORD_COUNT_FACTOR=5,o([y.property({type:Boolean,json:{write:!0,default:!1}})],e.prototype,"cacheHint",void 0),o([y.property({json:{write:!0}})],e.prototype,"datumTransformation",void 0),o([y.cast("datumTransformation")],e.prototype,"castDatumTransformation",null),o([y.property({type:Number,json:{write:{overridePolicy:function(t){return{enabled:t>0}}}}})],e.prototype,"distance",void 0),o([y.property({type:String,json:{write:!0}})],e.prototype,"gdbVersion",void 0),o([y.property({types:n.geometryTypes,json:{read:d.fromJSON,write:!0}})],e.prototype,"geometry",void 0),o([y.property({type:Number,json:{write:!0}})],e.prototype,"geometryPrecision",void 0),o([y.property({type:[String],json:{write:!0}})],e.prototype,"groupByFieldsForStatistics",void 0),o([y.property({type:String,json:{write:!0}})],e.prototype,"having",void 0),o([y.property({type:Date})],e.prototype,"historicMoment",void 0),o([y.writer("historicMoment")],e.prototype,"writeHistoricMoment",null),o([y.property({type:Number,json:{write:!0}})],e.prototype,"maxAllowableOffset",void 0),o([y.property({type:Number,cast:function(t){return t<1?1:t>a.MAX_MAX_RECORD_COUNT_FACTOR?a.MAX_MAX_RECORD_COUNT_FACTOR:t},json:{write:{overridePolicy:function(t){return{enabled:t>1}}}}})],e.prototype,"maxRecordCountFactor",void 0),o([y.property({type:String,json:{write:!0}})],e.prototype,"multipatchOption",void 0),o([y.property({type:Number,json:{read:{source:"resultRecordCount"}}})],e.prototype,"num",void 0),o([y.property({type:[Number],json:{write:!0}})],e.prototype,"objectIds",void 0),o([y.property({type:[String],json:{write:!0}})],e.prototype,"orderByFields",void 0),o([y.property({type:[String],json:{write:!0}})],e.prototype,"outFields",void 0),o([y.property({type:i.SpatialReference,json:{read:{source:"outSR"},write:{target:"outSR"}}})],e.prototype,"outSpatialReference",void 0),o([y.property({type:[v],json:{write:!0}})],e.prototype,"outStatistics",void 0),o([y.property({json:{write:!0}})],e.prototype,"parameterValues",void 0),o([y.writer("parameterValues")],e.prototype,"writeParameterValues",null),o([y.property({types:s.symbolTypes,json:{read:m.read,write:!0}})],e.prototype,"pixelSize",void 0),o([y.property({type:h.default,json:{write:!0}})],e.prototype,"quantizationParameters",void 0),o([y.property({type:[Object],json:{write:!0}})],e.prototype,"rangeValues",void 0),o([y.property({type:String,json:{read:{source:"relationParam"},write:{target:"relationParam",overridePolicy:function(t){return{enabled:"relation"===this.spatialRelationship}}}}})],e.prototype,"relationParameter",void 0),o([y.property({type:String,json:{write:!0}})],e.prototype,"resultType",void 0),o([y.property({type:Boolean,json:{write:{overridePolicy:function(t){return{enabled:t}}}}})],e.prototype,"returnCentroid",void 0),o([y.property({type:Boolean,json:{write:{overridePolicy:function(t){return{enabled:t}}}}})],e.prototype,"returnDistinctValues",void 0),o([y.property({type:Boolean,json:{write:{overridePolicy:function(t){return{enabled:!t}}}}})],e.prototype,"returnExceededLimitFeatures",void 0),o([y.property({type:Boolean,json:{write:!0}})],e.prototype,"returnGeometry",void 0),o([y.property({type:Boolean,json:{write:{overridePolicy:function(t){return{enabled:t}}}}})],e.prototype,"returnQueryGeometry",void 0),o([y.property({type:Boolean,json:{write:{overridePolicy:function(t){return{enabled:t}}}}})],e.prototype,"returnM",void 0),o([y.property({type:Boolean,json:{write:{overridePolicy:function(t){return{enabled:t}}}}})],e.prototype,"returnZ",void 0),o([y.property({json:{write:!0}})],e.prototype,"source",void 0),o([y.property({type:String,json:{read:{source:"spatialRel",reader:w.read},write:{target:"spatialRel",writer:w.write}}})],e.prototype,"spatialRelationship",void 0),o([y.property({type:Number,json:{read:{source:"resultOffset"}}})],e.prototype,"start",void 0),o([y.writer("start"),y.writer("num")],e.prototype,"writeStart",null),o([y.property({type:String,json:{write:!0}})],e.prototype,"sqlFormat",void 0),o([y.property({type:String,json:{write:!0}})],e.prototype,"text",void 0),o([y.property({type:p,json:{write:!0}})],e.prototype,"timeExtent",void 0),o([y.property({type:String,json:{read:f.read,write:{writer:f.write,overridePolicy:function(t){return{enabled:t&&this.distance>0}}}}})],e.prototype,"units",void 0),o([y.property({type:String,json:{write:{overridePolicy:function(t){return{enabled:null!=t||this.start>0}}}}})],e.prototype,"where",void 0),o([y.writer("where")],e.prototype,"writeWhere",null),e=a=o([y.subclass("esri.tasks.support.Query")],e)}(y.declared(l));return S.from=c.default(S),S});