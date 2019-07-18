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

define(["require","exports","../factories/vec3f64","./common"],function(t,n,r,a){function u(t){var n=t[0],r=t[1],a=t[2];return Math.sqrt(n*n+r*r+a*a)}function e(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t}function o(t,n,r,a){return t[0]=n,t[1]=r,t[2]=a,t}function i(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t}function c(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t}function s(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t}function M(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t}function h(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t}function f(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t}function v(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t}function l(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t}function d(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t}function m(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t}function b(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t}function q(t,n){var r=n[0]-t[0],a=n[1]-t[1],u=n[2]-t[2];return Math.sqrt(r*r+a*a+u*u)}function x(t,n){var r=n[0]-t[0],a=n[1]-t[1],u=n[2]-t[2];return r*r+a*a+u*u}function O(t){var n=t[0],r=t[1],a=t[2];return n*n+r*r+a*a}function P(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t}function p(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t}function I(t,n){var r=n[0],a=n[1],u=n[2],e=r*r+a*a+u*u;return e>0&&(e=1/Math.sqrt(e),t[0]=n[0]*e,t[1]=n[1]*e,t[2]=n[2]*e),t}function L(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function N(t,n,r){var a=n[0],u=n[1],e=n[2],o=r[0],i=r[1],c=r[2];return t[0]=u*c-e*i,t[1]=e*o-a*c,t[2]=a*i-u*o,t}function g(t,n,r,a){var u=n[0],e=n[1],o=n[2];return t[0]=u+a*(r[0]-u),t[1]=e+a*(r[1]-e),t[2]=o+a*(r[2]-o),t}function A(t,n,r,a,u,e){var o=e*e,i=o*(2*e-3)+1,c=o*(e-2)+e,s=o*(e-1),M=o*(3-2*e);return t[0]=n[0]*i+r[0]*c+a[0]*s+u[0]*M,t[1]=n[1]*i+r[1]*c+a[1]*s+u[1]*M,t[2]=n[2]*i+r[2]*c+a[2]*s+u[2]*M,t}function D(t,n,r,a,u,e){var o=1-e,i=o*o,c=e*e,s=i*o,M=3*e*i,h=3*c*o,f=c*e;return t[0]=n[0]*s+r[0]*M+a[0]*h+u[0]*f,t[1]=n[1]*s+r[1]*M+a[1]*h+u[1]*f,t[2]=n[2]*s+r[2]*M+a[2]*h+u[2]*f,t}function E(t,n){n=n||1;var r=2*a.RANDOM()*Math.PI,u=2*a.RANDOM()-1,e=Math.sqrt(1-u*u)*n;return t[0]=Math.cos(r)*e,t[1]=Math.sin(r)*e,t[2]=u*n,t}function y(t,n,r){var a=n[0],u=n[1],e=n[2];return t[0]=r[0]*a+r[4]*u+r[8]*e+r[12],t[1]=r[1]*a+r[5]*u+r[9]*e+r[13],t[2]=r[2]*a+r[6]*u+r[10]*e+r[14],t}function S(t,n,r){var a=n[0],u=n[1],e=n[2];return t[0]=a*r[0]+u*r[3]+e*r[6],t[1]=a*r[1]+u*r[4]+e*r[7],t[2]=a*r[2]+u*r[5]+e*r[8],t}function z(t,n,r){var a=r[0],u=r[1],e=r[2],o=r[3],i=n[0],c=n[1],s=n[2],M=u*s-e*c,h=e*i-a*s,f=a*c-u*i,v=u*f-e*h,l=e*M-a*f,d=a*h-u*M,m=2*o;return M*=m,h*=m,f*=m,v*=2,l*=2,d*=2,t[0]=i+M+v,t[1]=c+h+l,t[2]=s+f+d,t}function R(t,n,r,a){var u=[],e=[];return u[0]=n[0]-r[0],u[1]=n[1]-r[1],u[2]=n[2]-r[2],e[0]=u[0],e[1]=u[1]*Math.cos(a)-u[2]*Math.sin(a),e[2]=u[1]*Math.sin(a)+u[2]*Math.cos(a),t[0]=e[0]+r[0],t[1]=e[1]+r[1],t[2]=e[2]+r[2],t}function _(t,n,r,a){var u=[],e=[];return u[0]=n[0]-r[0],u[1]=n[1]-r[1],u[2]=n[2]-r[2],e[0]=u[2]*Math.sin(a)+u[0]*Math.cos(a),e[1]=u[1],e[2]=u[2]*Math.cos(a)-u[0]*Math.sin(a),t[0]=e[0]+r[0],t[1]=e[1]+r[1],t[2]=e[2]+r[2],t}function j(t,n,r,a){var u=[],e=[];return u[0]=n[0]-r[0],u[1]=n[1]-r[1],u[2]=n[2]-r[2],e[0]=u[0]*Math.cos(a)-u[1]*Math.sin(a),e[1]=u[0]*Math.sin(a)+u[1]*Math.cos(a),e[2]=u[2],t[0]=e[0]+r[0],t[1]=e[1]+r[1],t[2]=e[2]+r[2],t}function Q(t,n){e(k,t),e(w,n),I(k,k),I(w,w);var r=L(k,w);return r>1?0:r<-1?Math.PI:Math.acos(r)}function X(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")"}function Y(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]}function Z(t,n){var r=t[0],u=t[1],e=t[2],o=n[0],i=n[1],c=n[2];return Math.abs(r-o)<=a.EPSILON*Math.max(1,Math.abs(r),Math.abs(o))&&Math.abs(u-i)<=a.EPSILON*Math.max(1,Math.abs(u),Math.abs(i))&&Math.abs(e-c)<=a.EPSILON*Math.max(1,Math.abs(e),Math.abs(c))}Object.defineProperty(n,"__esModule",{value:!0}),n.length=u,n.copy=e,n.set=o,n.add=i,n.subtract=c,n.multiply=s,n.divide=M,n.ceil=h,n.floor=f,n.min=v,n.max=l,n.round=d,n.scale=m,n.scaleAndAdd=b,n.distance=q,n.squaredDistance=x,n.squaredLength=O,n.negate=P,n.inverse=p,n.normalize=I,n.dot=L,n.cross=N,n.lerp=g,n.hermite=A,n.bezier=D,n.random=E,n.transformMat4=y,n.transformMat3=S,n.transformQuat=z,n.rotateX=R,n.rotateY=_,n.rotateZ=j,n.angle=Q;var k=r.create(),w=r.create();n.str=X,n.exactEquals=Y,n.equals=Z,n.sub=c,n.mul=s,n.div=M,n.dist=q,n.sqrDist=x,n.len=u,n.sqrLen=O});