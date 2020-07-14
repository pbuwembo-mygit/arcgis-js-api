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

define(["require","exports","../../../support/buffer/BufferView","../../lib/Util"],(function(e,r,f,t){function a(e,r,f,t,a){var i=f.typedBuffer,s=f.typedBufferStride,o=e.length;if(t*=s,null==a||1===a)for(var u=0;u<o;++u){var n=2*e[u];i[t]=r[n],i[t+1]=r[n+1],t+=s}else for(u=0;u<o;++u){n=2*e[u];for(var l=0;l<a;++l)i[t]=r[n],i[t+1]=r[n+1],t+=s}}function i(e,r,f,t,a){var i=f.typedBuffer,s=f.typedBufferStride,o=e.length;if(t*=s,null==a||1===a)for(var u=0;u<o;++u){var n=3*e[u];i[t]=r[n],i[t+1]=r[n+1],i[t+2]=r[n+2],t+=s}else for(u=0;u<o;++u){n=3*e[u];for(var l=0;l<a;++l)i[t]=r[n],i[t+1]=r[n+1],i[t+2]=r[n+2],t+=s}}function s(e,r,f,t,a){var i=f.typedBuffer,s=f.typedBufferStride,o=e.length;if(t*=s,null==a||1===a)for(var u=0;u<o;++u){var n=4*e[u];i[t]=r[n],i[t+1]=r[n+1],i[t+2]=r[n+2],i[t+3]=r[n+3],t+=s}else for(u=0;u<o;++u){n=4*e[u];for(var l=0;l<a;++l)i[t]=r[n],i[t+1]=r[n+1],i[t+2]=r[n+2],i[t+3]=r[n+3],t+=s}}function o(e,r,f,t,a,s){if(f){var o=f,u=t.typedBuffer,n=t.typedBufferStride,l=e.length;if(a*=n,null==s||1===s)for(var v=0;v<l;++v){var d=r[p=3*e[v]],B=r[p+1],c=r[p+2];u[a]=o[0]*d+o[4]*B+o[8]*c+o[12],u[a+1]=o[1]*d+o[5]*B+o[9]*c+o[13],u[a+2]=o[2]*d+o[6]*B+o[10]*c+o[14],a+=n}else for(v=0;v<l;++v){d=r[p=3*e[v]],B=r[p+1],c=r[p+2];for(var p,V=o[0]*d+o[4]*B+o[8]*c+o[12],y=o[1]*d+o[5]*B+o[9]*c+o[13],w=o[2]*d+o[6]*B+o[10]*c+o[14],g=0;g<s;++g)u[a]=V,u[a+1]=y,u[a+2]=w,a+=n}}else i(e,r,t,a,s)}function u(e,r,f,t,a,s){if(f){var o=f,u=t.typedBuffer,n=t.typedBufferStride,l=e.length,v=o[0],d=o[1],B=o[2],c=o[4],p=o[5],V=o[6],y=o[8],w=o[9],g=o[10],h=Math.abs(1-v*v+c*c+y*y)>1e-5||Math.abs(1-d*d+p*p+w*w)>1e-5||Math.abs(1-B*B+V*V+g*g)>1e-5;if(a*=n,null==s||1===s)for(var b=0;b<l;++b){var M=v*(C=r[A=3*e[b]])+c*(O=r[A+1])+y*(x=r[A+2]),S=d*C+p*O+w*x,z=B*C+V*O+g*x;if(h)if((F=M*M+S*S+z*z)<1-1e-6&&F>1e-6)M/=N=Math.sqrt(F),S/=N,z/=N;u[a+0]=M,u[a+1]=S,u[a+2]=z,a+=n}else for(b=0;b<l;++b){var A,C,O,x,F,N,k=v*(C=r[A=3*e[b]])+c*(O=r[A+1])+y*(x=r[A+2]),L=d*C+p*O+w*x,q=B*C+V*O+g*x;if(h)if((F=k*k+L*L+q*q)<1-1e-6&&F>1e-6)k/=N=Math.sqrt(F),L/=N,q/=N;for(var P=0;P<s;++P)u[a+0]=k,u[a+1]=L,u[a+2]=q,a+=n}}else i(e,r,t,a,s)}function n(e,r,f,t,a,i){var s=t.typedBuffer,o=t.typedBufferStride,u=e.length;if(a*=o,null==i||1===i){if(4===f)for(var n=0;n<u;++n){var l=4*e[n];s[a]=r[l],s[a+1]=r[l+1],s[a+2]=r[l+2],s[a+3]=r[l+3],a+=o}else if(3===f)for(n=0;n<u;++n){l=3*e[n];s[a]=r[l],s[a+1]=r[l+1],s[a+2]=r[l+2],s[a+3]=255,a+=o}}else if(4===f)for(n=0;n<u;++n){l=4*e[n];for(var v=0;v<i;++v)s[a]=r[l],s[a+1]=r[l+1],s[a+2]=r[l+2],s[a+3]=r[l+3],a+=o}else if(3===f)for(n=0;n<u;++n)for(l=3*e[n],v=0;v<i;++v)s[a]=r[l],s[a+1]=r[l+1],s[a+2]=r[l+2],s[a+3]=255,a+=o}Object.defineProperty(r,"__esModule",{value:!0}),r.writeBufferVec2=a,r.writeBufferVec3=i,r.writeBufferVec4=s,r.writeBufferMat3f=function(e,r,f,t){var a=f.typedBuffer,i=f.typedBufferStride,s=e.length;t*=i;for(var o=0;o<s;++o){for(var u=9*e[o],n=0;n<9;++n)a[t+n]=r[u+n];t+=i}},r.writeBufferMat4f=function(e,r,f,t){var a=f.typedBuffer,i=f.typedBufferStride,s=e.length;t*=i;for(var o=0;o<s;++o){for(var u=16*e[o],n=0;n<16;++n)a[t+n]=r[u+n];t+=i}},r.writePosition=o,r.writeNormal=u,r.writeColor=n,r.writeMultipliedColor=function(e,r,f,t,a,i,s){var o=a.typedBuffer,u=a.typedBufferStride,n=e.length;if(i*=u,null==s||1===s){if(4===f)for(var l=0;l<n;++l){var v=4*e[l];o[i]=r[v]*t[0],o[i+1]=r[v+1]*t[1],o[i+2]=r[v+2]*t[2],o[i+3]=r[v+3]*t[3],i+=u}else if(3===f){var d=255*t[3];for(l=0;l<n;++l){v=3*e[l];o[i]=r[v]*t[0],o[i+1]=r[v+1]*t[1],o[i+2]=r[v+2]*t[2],o[i+3]=d,i+=u}}}else if(4===f)for(l=0;l<n;++l){v=4*e[l];for(var B=0;B<s;++B)o[i]=r[v]*t[0],o[i+1]=r[v+1]*t[1],o[i+2]=r[v+2]*t[2],o[i+3]=r[v+3]*t[3],i+=u}else if(3===f)for(d=255*t[3],l=0;l<n;++l)for(v=3*e[l],B=0;B<s;++B)o[i]=r[v]*t[0],o[i+1]=r[v+1]*t[1],o[i+2]=r[v+2]*t[2],o[i+3]=d,i+=u},r.writeDefaultAttributes=function(e,r,i,l,v,d){for(var B=0,c=r.fieldNames;B<c.length;B++){var p=c[B],V=e.vertexAttr[p],y=e.indices[p];if(V&&y)switch(p){case t.VertexAttrConstants.POSITION:t.assert(3===V.size);var w=v.getField(p,f.BufferViewVec3f);w&&o(y,V.data,i,w,d);break;case t.VertexAttrConstants.NORMAL:t.assert(3===V.size);var g=v.getField(p,f.BufferViewVec3f);g&&u(y,V.data,l,g,d);break;case t.VertexAttrConstants.UV0:t.assert(2===V.size);var h=v.getField(p,f.BufferViewVec2f);h&&a(y,V.data,h,d);break;case t.VertexAttrConstants.COLOR:t.assert(3===V.size||4===V.size);var b=v.getField(p,f.BufferViewVec4u8);b&&n(y,V.data,V.size,b,d);break;case t.VertexAttrConstants.SYMBOLCOLOR:t.assert(3===V.size||4===V.size);var M=v.getField(p,f.BufferViewVec4u8);M&&n(y,V.data,V.size,M,d);break;case t.VertexAttrConstants.TANGENT:t.assert(4===V.size);var S=v.getField(p,f.BufferViewVec4f);S&&s(y,V.data,S,d)}}}}));