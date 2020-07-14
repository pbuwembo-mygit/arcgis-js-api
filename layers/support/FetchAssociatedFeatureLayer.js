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

define(["require","exports","tslib","../../kernel","../../request","../../core/arrayUtils","../../core/maybe","../../core/promiseUtils","../FeatureLayer","../../portal/Portal","../../portal/PortalItem"],(function(r,e,t,n,i,a,o,s,l,u,c){Object.defineProperty(e,"__esModule",{value:!0});var h=function(){function r(r,e){this.layer=r,this.signal=e,this.rootDocument=null;var t=this.layer.parsedUrl.path.match(/^(.*)\/SceneServer\/layers\/([\d]*)\/?$/i);t&&(this.urlParts={root:t[1],layerId:parseInt(t[2],10)})}return r.prototype.fetch=function(){return t.__awaiter(this,void 0,void 0,(function(){var r,e,n;return t.__generator(this,(function(t){switch(t.label){case 0:return this.urlParts?-1===["mesh-pyramids","points"].indexOf(this.layer.profile)?[2,null]:this.layer.portalItem?(e=this.layer.portalItem,[3,3]):[3,1]:[2,null];case 1:return[4,this.portalItemFromServiceItemId()];case 2:e=t.sent(),t.label=3;case 3:return r=e,o.isNone(r)?[2,this.loadFromUrl()]:[4,this.findAndLoadRelatedPortalItem(r)];case 4:return n=t.sent(),o.isNone(n)?[2,null]:[2,this.loadFeatureLayerFromPortalItem(n)]}}))}))},r.prototype.fetchRootDocument=function(){return t.__awaiter(this,void 0,void 0,(function(){var r,e,n;return t.__generator(this,(function(t){switch(t.label){case 0:if(o.isSome(this.rootDocument))return[2,this.rootDocument];if(o.isNone(this.urlParts))return this.rootDocument={},[2,{}];r={query:{f:"json"},responseType:"json",authMode:"no-prompt",signal:this.signal},e=this.urlParts.root+"/SceneServer",t.label=1;case 1:return t.trys.push([1,3,,4]),[4,i(e,r)];case 2:return n=t.sent(),this.rootDocument=n.data,[3,4];case 3:return t.sent(),this.rootDocument={},[3,4];case 4:return[2,this.rootDocument]}}))}))},r.prototype.fetchServiceOwningPortalUrl=function(){return t.__awaiter(this,void 0,void 0,(function(){var r,e,a,o,l;return t.__generator(this,(function(t){switch(t.label){case 0:if((r=n.id&&n.id.findServerInfo(this.layer.parsedUrl.path))&&r.owningSystemUrl)return[2,r.owningSystemUrl];e=this.layer.parsedUrl.path.replace(/(.*\/rest)\/.*/i,"$1")+"/info",t.label=1;case 1:return t.trys.push([1,3,,4]),[4,i(e,{query:{f:"json"},responseType:"json",signal:this.signal})];case 2:return a=t.sent(),(o=a.data.owningSystemUrl)?[2,o]:[3,4];case 3:return l=t.sent(),s.throwIfAbortError(l),[3,4];case 4:return[2,null]}}))}))},r.prototype.findAndLoadRelatedPortalItem=function(r){return t.__awaiter(this,void 0,void 0,(function(){var e,n;return t.__generator(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,r.fetchRelatedItems({relationshipType:"Service2Service",direction:"reverse"},{signal:this.signal})];case 1:return e=t.sent(),[2,a.find(e,(function(r){return"Feature Service"===r.type}))||null];case 2:return n=t.sent(),s.throwIfAbortError(n),[2,null];case 3:return[2]}}))}))},r.prototype.loadFeatureLayerFromPortalItem=function(r){return t.__awaiter(this,void 0,void 0,(function(){var e;return t.__generator(this,(function(t){switch(t.label){case 0:return[4,r.load({signal:this.signal})];case 1:return t.sent(),[4,this.findMatchingAssociatedSublayerUrl(r.url)];case 2:return e=t.sent(),[2,new l({url:e,portalItem:r}).load({signal:this.signal})]}}))}))},r.prototype.loadFromUrl=function(){return t.__awaiter(this,void 0,void 0,(function(){var r;return t.__generator(this,(function(e){switch(e.label){case 0:return[4,this.findMatchingAssociatedSublayerUrl(this.urlParts.root+"/FeatureServer")];case 1:return r=e.sent(),[2,new l({url:r}).load({signal:this.signal})]}}))}))},r.prototype.findMatchingAssociatedSublayerUrl=function(r){return t.__awaiter(this,void 0,void 0,(function(){var e,n,a,o,l,u,c,h,d,f,p;return t.__generator(this,(function(t){switch(t.label){case 0:return e=r.replace(/^(.*FeatureServer)(\/[\d]*\/?)?$/i,"$1"),n={query:{f:"json"},responseType:"json",authMode:"no-prompt",signal:this.signal},a=this.urlParts.layerId,o=this.fetchRootDocument(),l=i(e,n),[4,s.all([l,o])];case 1:if(u=t.sent(),c=u[0],h=u[1],d=h&&h.layers,f=c.data&&c.data.layers,!Array.isArray(f))throw new Error("expected layers array");if(Array.isArray(d)){for(p=0;p<Math.min(d.length,f.length);p++)if(d[p].id===a)return[2,e+"/"+f[p].id]}else if(a<f.length)return[2,e+"/"+f[a].id];throw new Error("could not find matching associated sublayer")}}))}))},r.prototype.portalItemFromServiceItemId=function(){return t.__awaiter(this,void 0,void 0,(function(){var r,e,n,i;return t.__generator(this,(function(t){switch(t.label){case 0:return[4,this.fetchRootDocument()];case 1:return r=t.sent(),(e=r.serviceItemId)?(n=new c({id:e}),[4,this.fetchServiceOwningPortalUrl()]):[2,null];case 2:i=t.sent(),o.isSome(i)&&(n.portal=new u({url:i}));try{return[2,n.load({signal:this.signal})]}catch(r){return s.throwIfAbortError(r),[2,null]}return[2]}}))}))},r}();e.FetchAssociatedFeatureLayer=h}));