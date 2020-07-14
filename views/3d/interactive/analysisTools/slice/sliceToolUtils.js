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

define(["require","exports","tslib","../../../../../geometry","../../../../../core/compilerUtils","../../../../../core/Logger","../../../../../core/mathUtils","../../../../../core/maybe","../../../../../core/screenUtils","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f64","../../../../../core/libs/gl-matrix-2/quat","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../../Manipulator3D","../../manipulatorUtils","./sliceToolConfig","../../../support/geometryUtils","../../../support/stack","../../../support/geometryUtils/vector","../../../webgl-engine/lib/Geometry","../../../webgl-engine/lib/GeometryData","../../../webgl-engine/lib/GeometryUtil","../../../webgl-engine/lib/Util","../../../webgl-engine/materials/ColorMaterial","../../../webgl-engine/materials/ImageMaterial","../../../webgl-engine/materials/NativeLineMaterial","../../../webgl-engine/materials/RibbonLineMaterial","../../../webgl-engine/materials/SlicePlaneMaterial"],(function(e,t,a,r,i,n,s,o,c,l,d,v,u,g,m,p,_,R,T,f,b,y,A,E,S,h,P,I,w){Object.defineProperty(t,"__esModule",{value:!0});var O=n.getLogger("esri.views.3d.interactive.analysisTools.slice.sliceToolUtils");function L(e,t,a,r,n,s){var o=u.vec3.dot(e,t),c=T.sv3d.get(),l=T.sv3d.get(),d=0===r?Math.abs(o)>_.VERTICAL_DOT_THRESHOLD?1:2:r;switch(d){case 2:var v=Math.abs(o)<=_.SMALL_ANGLE_DOT_THRESHOLD?e:a.viewUp;u.vec3.cross(c,v,t),u.vec3.copy(l,t);break;case 1:u.vec3.cross(c,a.viewUp,t),u.vec3.cross(l,t,c);break;case 3:var g=Math.abs(o)<=_.SMALL_ANGLE_DOT_THRESHOLD?t:a.viewUp;u.vec3.cross(c,g,e),u.vec3.cross(l,e,c);break;default:i.neverReached(d)}var m=u.vec3.cross(T.sv3d.get(),c,l);u.vec3.dot(m,a.viewForward)>0&&u.vec3.scale(l,l,-1),u.vec3.normalize(n,c),u.vec3.normalize(s,l)}function D(e,t){switch(t){case 0:return{basis:e.basis1,direction:1,position:u.vec3.add(T.sv3d.get(),e.origin,e.basis1),edge:t};case 1:return{basis:e.basis2,direction:1,position:u.vec3.add(T.sv3d.get(),e.origin,e.basis2),edge:t};case 2:return{basis:e.basis1,direction:-1,position:u.vec3.subtract(T.sv3d.get(),e.origin,e.basis1),edge:t};case 3:return{basis:e.basis2,direction:-1,position:u.vec3.subtract(T.sv3d.get(),e.origin,e.basis2),edge:t}}}function M(e,t,a){var r=a.projectPoint(u.vec3.add(T.sv3d.get(),e,t),c.castRenderScreenPointArray3(T.sv3d.get())),i=a.projectPoint(u.vec3.subtract(T.sv3d.get(),e,t),c.castRenderScreenPointArray3(T.sv3d.get()));return u.vec3.squaredLength(u.vec3.subtract(r,r,i))}function F(e){var t=u.vec3.length(e.basis1),a=u.vec3.length(e.basis2);return _.RESIZE_HANDLE_EDGE_PADDING_FRAC*Math.min(t,a)}function H(e){return F(e)}function N(e){return 0!==e.direction[0]&&0!==e.direction[1]}function U(e,t,a){var r=function(r){var i=(r?t:e).slice(0),n=u.vec3.subtract(T.sv3d.get(),i[0],i[1]);u.vec3.normalize(n,n);var s=u.vec3.subtract(T.sv3d.get(),i[i.length-1],i[i.length-2]);if(u.vec3.normalize(s,s),a.padding>0){var c=u.vec3.scale(g.vec3f64.create(),s,-a.padding);if(i[i.length-1]=u.vec3.add(c,c,i[i.length-1]),a.bothEnds){var m=u.vec3.scale(g.vec3f64.create(),n,-a.padding);i[0]=u.vec3.add(m,m,i[0])}}var p=r?a.tipFocusMultiplier:1,_=a.tipLength*(a.focusTipLength?p:1),R=a.tipRadius*p,f=l.mat4.identity(T.sm4d.get());if(a.padding>0){var y=_/4,E=u.vec3.set(T.sv3d.get(),0,y,0),S=1+a.padding/y;l.mat4.translate(f,f,E),l.mat4.scale(f,f,u.vec3.set(T.sv3d.get(),S,S,S)),l.mat4.translate(f,f,u.vec3.scale(E,E,-1/S))}var h=l.mat4.identity(d.mat4f64.create()),P=g.vec3f64.fromValues(0,1,0),I=l.mat4.fromQuat(d.mat4f64.create(),v.quat.rotationTo(T.sq4d.get(),P,s));I[12]=i[i.length-1][0],I[13]=i[i.length-1][1],I[14]=i[i.length-1][2],l.mat4.multiply(I,I,f);var w,O,L=[{part:"tube",geometry:new b(function(e,t,a){var r=[];if(o.isSome(t))r.push([e,t.thickness/2],[-e,t.thickness/2],[-e,-t.thickness/2],[e,-t.thickness/2]);else for(var i=0;i<12;i++){var n=i/12*2*Math.PI;r.push([Math.cos(n)*e,Math.sin(n)*e])}return A.createPathExtrusionGeometry(r,a,[],[],!1)}(a.tubeRadius*(r?a.tubeFocusMultiplier:1)+a.padding,a.flat,i),"arrow-tube"),transform:h}];if(o.isSome(a.flat)?w=new b(A.createExtrudedTriangle(_,R,R,a.flat.thickness),"arrow-tip"):(w=new b(A.createConeGeometry(_,R,24,!1,!1,!0),"arrow-tip"),O=new b(A.createConeGeometry(_,R,24,!1,!0,!1),"arrow-cap")),L.push({part:"tip",geometry:w,transform:I}),O&&L.push({part:"cap",geometry:O,transform:I}),a.bothEnds){var D=l.mat4.fromQuat(d.mat4f64.create(),v.quat.rotationTo(T.sq4d.get(),P,n));D[12]=i[0][0],D[13]=i[0][1],D[14]=i[0][2],l.mat4.multiply(D,D,f),L.push({part:"tip",geometry:w,transform:D}),O&&L.push({part:"cap",geometry:O,transform:D})}return L};return{normal:r(!1),focused:r(!0)}}function C(e,t){var r=u.vec3.subtract(g.vec3f64.create(),e[e.length-1],e[e.length-2]);if(u.vec3.normalize(r,r),u.vec3.scale(r,r,_.ROTATE_HEADING_TIP_LENGTH),u.vec3.add(r,r,e[e.length-1]),t){var i=u.vec3.subtract(g.vec3f64.create(),e[0],e[1]);return u.vec3.normalize(i,i),u.vec3.scale(i,i,_.ROTATE_HEADING_TIP_LENGTH),u.vec3.add(i,i,e[0]),a.__spreadArrays([i],e,[r])}return a.__spreadArrays(e,[r])}function G(e,t){return f.angleAroundAxis(t,e.basis2,e.basis1)+V}t.createPlane=function(e,t,a,r,i,n,s,o){return L(t,s.worldUpAtPosition(e,T.sv3d.get()),i,n,o.basis1,o.basis2),u.vec3.scale(o.basis1,o.basis1,a),u.vec3.scale(o.basis2,o.basis2,r),u.vec3.copy(o.origin,e),R.plane.fromVectorsAndPoint(o.basis2,o.basis1,o.origin,o.plane),o},t.normalToBases=L,t.forceHorizontalOrVertical=function(e,t,a){var r=t.worldUpAtPosition(e.origin,T.sv3d.get()),i=e.basis1,n=G(e,r),s=Math.round(n/V)*V;return R.boundedPlane.rotate(e,s-n,i,a)},t.resizePlane=function(e,t,a,r,i,n){var s=u.vec3.copy(T.sv3d.get(),i.origin);u.vec3.add(s,s,u.vec3.scale(T.sv3d.get(),i.basis1,e.direction[0]<0?1:-1)),u.vec3.add(s,s,u.vec3.scale(T.sv3d.get(),i.basis2,e.direction[1]<0?1:-1));var o=u.vec3.length(i.basis1),c=u.vec3.length(i.basis2),l=u.vec3.subtract(T.sv3d.get(),a,s),d=u.vec3.subtract(T.sv3d.get(),t,s),v=0,g=0;if(N(e)){var m=H(i),p=H(n);v=o-.5*e.direction[0]*u.vec3.dot(i.basis1,d)/o,g=c-.5*e.direction[1]*u.vec3.dot(i.basis2,d)/c;var f=p/m;v*=f,g*=f}var b=v+.5*e.direction[0]*u.vec3.dot(i.basis1,l)/o,y=g+.5*e.direction[1]*u.vec3.dot(i.basis2,l)/c,A=u.vec3.scale(T.sv3d.get(),i.basis1,b/o),E=u.vec3.scale(T.sv3d.get(),i.basis2,y/c);(b<=0||M(n.origin,A,r)<=_.PLANE_MIN_BASIS_SCREEN_LEN2)&&u.vec3.copy(A,n.basis1),(y<=0||M(n.origin,E,r)<=_.PLANE_MIN_BASIS_SCREEN_LEN2)&&u.vec3.copy(E,n.basis2);var S=u.vec3.copy(T.sv3d.get(),s);return u.vec3.add(S,S,u.vec3.scale(T.sv3d.get(),A,e.direction[0]<0?-1:1)),u.vec3.add(S,S,u.vec3.scale(T.sv3d.get(),E,e.direction[1]<0?-1:1)),R.boundedPlane.fromValues(S,A,E,n)},t.calculatePlaneHalfSize=function(e,t){return _.INITIAL_PLANE_HALF_SIZE_VIEW_PROPORTION*Math.min(t.width,t.height)*t.computeRenderPixelSizeAt(e)},t.createShiftPlane=function(e,t,a,r){var i=u.vec3.cross(T.sv3d.get(),t,a);return u.vec3.cross(i,i,t),R.plane.fromPositionAndNormal(e,i,r)},t.calculateBoundedPlaneTranslateRotate=function(e,t){return p.calculateTranslateRotateFromBases(e.basis1,e.basis2,e.origin,t)},t.createRotatePlane=function(e,t,a,r){var i=t.worldUpAtPosition(e.origin,T.sv3d.get()),n=T.sv3d.get();switch(a){case 1:u.vec3.copy(n,i);break;case 2:u.vec3.copy(n,e.basis1)}return R.plane.fromPositionAndNormal(e.origin,n,r)},t.updateShiftRestartHandle=function(e,t,a,r){var i=D(a,2),n=T.sm4d.get();l.mat4.rotateZ(n,t,i.edge*Math.PI/2);var s=u.vec3.normalize(T.sv3d.get(),i.basis),o=u.vec3.scale(T.sv3d.get(),s,i.direction*r.computeScreenPixelSizeAt(i.position)*_.SHIFT_RESTART_OFFSET_DISTANCE);u.vec3.add(o,o,i.position);var d=r.projectPoint(o,c.castRenderScreenPointArray3(T.sv3d.get())),v=function(e,t){var a=e.viewport,r=a[0],i=a[1],n=a[2],s=a[3],o=Math.min(n,s)/16,c=!0;t[0]<r+o?(t[0]=r+o,c=!1):t[0]>r+n-o&&(t[0]=r+n-o,c=!1);t[1]<i+o?(t[1]=i+o,c=!1):t[1]>i+s-o&&(t[1]=i+s-o,c=!1);return c}(r,d);R.ray.fromRender(r,d,z),u.vec3.normalize(z.direction,z.direction);var m=T.sv3d.get();!v&&R.boundedPlane.intersectRay(a,z,m)&&(o=m),n[12]=0,n[13]=0,n[14]=0,e.modelTransform=n,e.renderLocation=g.vec3f64.clone(o),v?e.state|=k:e.state&=~k},t.updateResizeHandle=function(e,t,a,r){var i=u.vec3.length(r.basis1),n=u.vec3.length(r.basis2),s=F(r),o=H(r),c=u.vec3.set(T.sv3d.get(),0,0,0);u.vec3.add(c,u.vec3.scale(T.sv3d.get(),r.basis1,t.direction[0]),u.vec3.scale(T.sv3d.get(),r.basis2,t.direction[1])),u.vec3.add(c,r.origin,c);var d=0,v=1;if(N(t))1===t.direction[0]&&-1===t.direction[1]?d=V:1===t.direction[0]&&1===t.direction[1]?d=Math.PI:-1===t.direction[0]&&1===t.direction[1]&&(d=3*Math.PI/2),v=o;else{var g=0!==t.direction[0]?1:2;d=1===g?V:0,v=(1===g?n:i)-s}var m=l.mat4.identity(T.sm4d.get());l.mat4.rotateZ(m,m,d),l.mat4.scale(m,m,u.vec3.set(T.sv3d.get(),v,v,v)),l.mat4.multiply(m,a,m),m[12]=0,m[13]=0,m[14]=0,e.modelTransform=m,e.renderLocation=c},t.updateRotateHeadingHandle=function(e,t,a,r){var i=r.worldUpAtPosition(a.origin,T.sv3d.get()),n=D(a,0),s=l.mat4.identity(T.sm4d.get());l.mat4.rotateZ(s,s,n.edge*Math.PI/2),l.mat4.rotateX(s,s,-G(a,i)),l.mat4.multiply(s,t,s),s[12]=0,s[13]=0,s[14]=0,e.modelTransform=s,e.renderLocation=n.position},t.updateRotateTiltHandle=function(e,t,a){var r=D(a,1),i=l.mat4.identity(T.sm4d.get());l.mat4.rotateZ(i,i,r.edge*Math.PI/2),l.mat4.rotateX(i,i,V),l.mat4.multiply(i,t,i),i[12]=0,i[13]=0,i[14]=0,e.modelTransform=i,e.renderLocation=r.position},t.calculateScreenSpaceBasisLength2=M,t.calculateResizeHandlePadding=F,t.calculateDiagonalResizeHandleScale=H,t.isDiagonalResizeHandle=N,t.createShiftManipulator=function(e){var r=[g.vec3f64.fromValues(0,0,-_.SHIFT_RESTART_ARROW_LENGTH/2),g.vec3f64.fromValues(0,0,_.SHIFT_RESTART_ARROW_LENGTH/2)],i=C(r,!0),n=function(e,t){return U(r,r,{tubeRadius:_.SHIFT_RESTART_TUBE_RADIUS,tipRadius:_.SHIFT_RESTART_TIP_RADIUS,tipLength:_.SHIFT_RESTART_TIP_LENGTH,tubeFocusMultiplier:_.SHIFT_RESTART_TUBE_FOCUS_MULTIPLIER,tipFocusMultiplier:_.SHIFT_RESTART_TIP_FOCUS_MULTIPLIER,padding:e,bothEnds:!0,flat:null,focusTipLength:!0,addCap:t})},s=n(0,!1),o=n(_.SHIFT_RESTART_ARROW_OUTLINE_WIDTH,!0),c=new S({color:_.SHIFT_RESTART_ARROW_TIP_COLOR,cullFace:2},"slice-shift");c.renderOccluded=16;var l=new S({color:_.SHIFT_RESTART_ARROW_CAP_COLOR,cullFace:2},"slice-shift");l.renderOccluded=16;var d=new S({color:_.SHIFT_RESTART_TUBE_COLOR,cullFace:2},"slice-shift");d.renderOccluded=16;var v=new S({color:_.SHIFT_RESTART_OUTLINE_COLOR,transparent:!0,writeDepth:!1,cullFace:1},"slice-shift");v.renderOccluded=2;var u=new b(A.createPolylineGeometry([[0,0,0],[-_.SHIFT_RESTART_OFFSET_DISTANCE,0,0]]),"slice-rotate-heading"),p=new b(A.createPolylineGeometry([[0,0,0],[-_.SHIFT_RESTART_OFFSET_DISTANCE,0,0]]),"slice-rotate-heading"),R=new P({color:_.SHIFT_RESTART_CALLOUT_COLOR},"slice-rotate-heading");return R.renderOccluded=4,new m.Manipulator3D({view:e,renderObjects:a.__spreadArrays(s.normal.map((function(e){var a=e.part,r=e.geometry,i=e.transform;return{geometry:r,material:"tip"===a?c:"cap"===a?l:d,transform:i,stateMask:1|t.DidPointerMoveRecentlyFlag}})),o.normal.map((function(e){var a=e.geometry,r=e.transform;return{geometry:a,material:v,transform:r,stateMask:1|t.DidPointerMoveRecentlyFlag}})),[{geometry:u,material:R,stateMask:1|t.DidPointerMoveRecentlyFlag|k}],s.focused.map((function(e){var a=e.part,r=e.geometry,i=e.transform;return{geometry:r,material:"tip"===a?c:"cap"===a?l:d,transform:i,stateMask:2|t.DidPointerMoveRecentlyFlag}})),o.focused.map((function(e){var a=e.geometry,r=e.transform;return{geometry:a,material:v,transform:r,stateMask:2|t.DidPointerMoveRecentlyFlag}})),[{geometry:p,material:R,stateMask:2|t.DidPointerMoveRecentlyFlag|k}]),autoScaleRenderObjects:!1,collisionType:{type:"line",paths:[i]},collisionPriority:1,radius:_.SHIFT_RESTART_TIP_RADIUS,state:t.DidPointerMoveRecentlyFlag})},t.createRotateManipulator=function(e,a){var r=new h({transparent:!0,writeDepth:!1,textureId:a.id},"slice-rotate"),i=_.ROTATE_HEADING_OFFSET_DISTANCE,n=_.ROTATE_HEADING_DISC_RADIUS,s=n*_.ROTATE_HEADING_DISC_RADIUS_FOCUS_MULTIPLIER,o=function(e){var t,a,r=new Uint32Array([0,1,2,2,3,0]);return new b(new y.GeometryData(((t={})[E.VertexAttrConstants.POSITION]={size:3,data:new Float32Array([i-e,-e,0,i+e,-e,0,i+e,e,0,i-e,e,0])},t[E.VertexAttrConstants.UV0]={size:2,data:new Float32Array([0,0,1,0,1,1,0,1])},t),((a={})[E.VertexAttrConstants.POSITION]=r,a[E.VertexAttrConstants.UV0]=r,a)))};r.renderOccluded=16;var c=new b(A.createPolylineGeometry([[0,0,0],[i-n,0,0]]),"slice-rotate-heading"),l=new b(A.createPolylineGeometry([[0,0,0],[i-s,0,0]]),"slice-rotate-heading"),d=new P({color:_.ROTATE_HEADING_CALLOUT_COLOR},"slice-rotate-heading");d.renderOccluded=4;var v=[{geometry:o(n),material:r,stateMask:1|t.DidPointerMoveRecentlyFlag},{geometry:c,material:d,stateMask:1|t.DidPointerMoveRecentlyFlag},{geometry:o(s),material:r,stateMask:2|t.DidPointerMoveRecentlyFlag},{geometry:l,material:d,stateMask:2|t.DidPointerMoveRecentlyFlag}];return new m.Manipulator3D({view:e,renderObjects:v,autoScaleRenderObjects:!1,collisionType:{type:"disc",direction:[0,0,1],offset:[i,0,0]},collisionPriority:1,radius:n/2,state:t.DidPointerMoveRecentlyFlag})},t.createOutlineManipulator=function(e){var t=new b(A.createPolylineGeometry([[-1,-1,0],[1,-1,0],[1,1,0],[-1,1,0],[-1,-1,0]]),"slice-outline"),r=a.__spreadArrays(_.PLANE_OUTLINE_COLOR),i=new I({color:r,writeDepth:!1,width:_.PLANE_OUTLINE_WIDTH},"slice-outline");return i.renderOccluded=4,{manipulator:new m.Manipulator3D({view:e,renderObjects:[{geometry:t,material:i}],interactive:!1,autoScaleRenderObjects:!1,worldSized:!0}),material:i}},t.createGridManipulator=function(e){var t=new b(A.createSquareGeometry(),"slice-grid"),r=a.__spreadArrays(_.PLANE_BACKGROUND_COLOR),i=new w({backgroundColor:r,gridColor:_.GRID_COLOR,gridWidth:4},"slice-grid");return i.renderOccluded=4,{manipulator:new m.Manipulator3D({view:e,renderObjects:[{geometry:t,material:i}],interactive:!1,autoScaleRenderObjects:!1,worldSized:!0}),material:i}},t.createResizeManipulator=function(e,t){var r=N(t),i=r?[g.vec3f64.fromValues(1,0,0),g.vec3f64.fromValues(0,0,0),g.vec3f64.fromValues(0,1,0)]:[g.vec3f64.fromValues(1,0,0),g.vec3f64.fromValues(-1,0,0)],n=new b(A.createPolylineGeometry(i),"slice-resize"),s=a.__spreadArrays(_.HANDLE_COLOR,[1]),o=r?_.RESIZE_HANDLE_CORNER_WIDTH:_.RESIZE_HANDLE_EDGE_WIDTH,c=o*_.DISPLAY_FOCUS_MULTIPLIER,l=function(e){return e>1?function(e){var t=new I({color:s,width:e},"slice-resize");return t.renderOccluded=4,t}(e):((t=new P({color:s},"slice-resize")).renderOccluded=4,t);var t};return new m.Manipulator3D({view:e,renderObjects:[{geometry:n,material:l(o),stateMask:1},{geometry:n,material:l(c),stateMask:2}],collisionType:{type:"line",paths:[i]},autoScaleRenderObjects:!1,worldSized:!0,radius:r?_.RESIZE_HANDLE_CORNER_INPUT_RADIUS:_.RESIZE_HANDLE_EDGE_INPUT_RADIUS})},t.createArrowGeometry=U,t.addArrowTips=C,t.planeToShape=function(e,t,a,i){if(o.isNone(e))return null;var n=o.isSome(i.position)?i.position:new r.Point;t.fromRenderCoords(e.origin,n,a),i.position=n;var c=t.worldUpAtPosition(e.origin,T.sv3d.get()),l=t.worldBasisAtPosition(e.origin,1,T.sv3d.get());return i.width=2*u.vec3.length(e.basis1),i.height=2*u.vec3.length(e.basis2),i.tilt=s.rad2deg(G(e,c)),i.heading=s.rad2deg(function(e,t,a){return f.angleAroundAxis(e.basis1,a,t)-V}(e,c,l)),i},t.shapeToPlane=function(e,t,a){return o.isNone(e)||o.isNone(e.position)?null:t.toRenderCoords(e.position,a.origin)?(t.worldBasisAtPosition(a.origin,0,a.basis1),t.worldBasisAtPosition(a.origin,1,a.basis2),R.plane.fromVectorsAndPoint(a.basis2,a.basis1,a.origin,a.plane),R.boundedPlane.rotate(a,-s.deg2rad(e.heading),R.boundedPlane.normal(a),a),R.boundedPlane.rotate(a,s.deg2rad(e.tilt),a.basis1,a),u.vec3.scale(a.basis1,a.basis1,e.width/2),u.vec3.scale(a.basis2,a.basis2,e.height/2),R.boundedPlane.updateUnboundedPlane(a),a):(O.error("Failed to project slice plane position, projection from "+e.position.spatialReference.wkid+" is not supported"),null)},t.isAlwaysDrapedLayer=function(e){switch(e.type){case"building-scene":case"csv":case"feature":case"geo-rss":case"geojson":case"graphics":case"group":case"integrated-mesh":case"kml":case"map-notes":case"ogc-feature":case"point-cloud":case"route":case"scene":case"stream":case"unknown":case"unsupported":case null:return!1;case"base-dynamic":case"base-elevation":case"base-tile":case"bing-maps":case"elevation":case"imagery":case"imagery-tile":case"map-image":case"open-street-map":case"tile":case"vector-tile":case"web-tile":case"wms":case"wmts":return!0;default:return i.neverReached(e.type),!1}},t.DidPointerMoveRecentlyFlag=16;var k=32,z=R.ray.create(),V=Math.PI/2}));