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

define(["require","exports","tslib","../../../../../core/maybe","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../shaderModules/interfaces"],(function(e,s,i,n,a,l,c){function o(e,s){if(s.slicePlaneEnabled){e.extensions.add("GL_OES_standard_derivatives"),s.sliceEnabledForVertexPrograms&&(e.vertex.uniforms.add("slicePlaneOrigin","vec3"),e.vertex.uniforms.add("slicePlaneBasis1","vec3"),e.vertex.uniforms.add("slicePlaneBasis2","vec3")),e.fragment.uniforms.add("slicePlaneOrigin","vec3"),e.fragment.uniforms.add("slicePlaneBasis1","vec3"),e.fragment.uniforms.add("slicePlaneBasis2","vec3");var n=c.glsl(t||(t=i.__makeTemplateObject(["\n      struct SliceFactors {\n        float front;\n        float side0;\n        float side1;\n        float side2;\n        float side3;\n      };\n\n      SliceFactors calculateSliceFactors(vec3 pos) {\n        vec3 rel = pos - slicePlaneOrigin;\n\n        vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);\n        float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);\n\n        float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);\n        float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);\n\n        float basis1Dot = dot(slicePlaneBasis1, rel);\n        float basis2Dot = dot(slicePlaneBasis2, rel);\n\n        return SliceFactors(\n          dot(slicePlaneNormal, pos) + slicePlaneW,\n          -basis1Dot - basis1Len2,\n          basis1Dot - basis1Len2,\n          -basis2Dot - basis2Len2,\n          basis2Dot - basis2Len2\n        );\n      }\n\n      bool sliceByFactors(SliceFactors factors) {\n        return factors.front < 0.0\n          && factors.side0 < 0.0\n          && factors.side1 < 0.0\n          && factors.side2 < 0.0\n          && factors.side3 < 0.0;\n      }\n      \n      bool sliceEnabled() {\n        // a slicePlaneBasis1 vector of zero length is used to disable slicing in the shader during draped rendering.\n        return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;\n      }\n\n      bool sliceByPlane(vec3 pos) {\n        return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));\n      }\n\n      #define rejectBySlice(_pos_) sliceByPlane(_pos_)\n      #define discardBySlice(_pos_) { if (sliceByPlane(_pos_)) discard; }\n    "],["\n      struct SliceFactors {\n        float front;\n        float side0;\n        float side1;\n        float side2;\n        float side3;\n      };\n\n      SliceFactors calculateSliceFactors(vec3 pos) {\n        vec3 rel = pos - slicePlaneOrigin;\n\n        vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);\n        float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);\n\n        float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);\n        float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);\n\n        float basis1Dot = dot(slicePlaneBasis1, rel);\n        float basis2Dot = dot(slicePlaneBasis2, rel);\n\n        return SliceFactors(\n          dot(slicePlaneNormal, pos) + slicePlaneW,\n          -basis1Dot - basis1Len2,\n          basis1Dot - basis1Len2,\n          -basis2Dot - basis2Len2,\n          basis2Dot - basis2Len2\n        );\n      }\n\n      bool sliceByFactors(SliceFactors factors) {\n        return factors.front < 0.0\n          && factors.side0 < 0.0\n          && factors.side1 < 0.0\n          && factors.side2 < 0.0\n          && factors.side3 < 0.0;\n      }\n      \n      bool sliceEnabled() {\n        // a slicePlaneBasis1 vector of zero length is used to disable slicing in the shader during draped rendering.\n        return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;\n      }\n\n      bool sliceByPlane(vec3 pos) {\n        return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));\n      }\n\n      #define rejectBySlice(_pos_) sliceByPlane(_pos_)\n      #define discardBySlice(_pos_) { if (sliceByPlane(_pos_)) discard; }\n    "]))),a=c.glsl(r||(r=i.__makeTemplateObject(["\n      vec4 applySliceHighlight(vec4 color, vec3 pos) {\n        SliceFactors factors = calculateSliceFactors(pos);\n\n        if (sliceByFactors(factors)) {\n          return color;\n        }\n\n        const float HIGHLIGHT_WIDTH = 1.0;\n        const vec4 HIGHLIGHT_COLOR = vec4(0.0, 0.0, 0.0, 0.3);\n\n        factors.front /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.front);\n        factors.side0 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side0);\n        factors.side1 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side1);\n        factors.side2 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side2);\n        factors.side3 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side3);\n\n        float highlightFactor = (1.0 - step(0.5, factors.front))\n          * (1.0 - step(0.5, factors.side0))\n          * (1.0 - step(0.5, factors.side1))\n          * (1.0 - step(0.5, factors.side2))\n          * (1.0 - step(0.5, factors.side3));\n\n        return mix(color, vec4(HIGHLIGHT_COLOR.rgb, color.a), highlightFactor * HIGHLIGHT_COLOR.a);\n      }\n    "],["\n      vec4 applySliceHighlight(vec4 color, vec3 pos) {\n        SliceFactors factors = calculateSliceFactors(pos);\n\n        if (sliceByFactors(factors)) {\n          return color;\n        }\n\n        const float HIGHLIGHT_WIDTH = 1.0;\n        const vec4 HIGHLIGHT_COLOR = vec4(0.0, 0.0, 0.0, 0.3);\n\n        factors.front /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.front);\n        factors.side0 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side0);\n        factors.side1 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side1);\n        factors.side2 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side2);\n        factors.side3 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side3);\n\n        float highlightFactor = (1.0 - step(0.5, factors.front))\n          * (1.0 - step(0.5, factors.side0))\n          * (1.0 - step(0.5, factors.side1))\n          * (1.0 - step(0.5, factors.side2))\n          * (1.0 - step(0.5, factors.side3));\n\n        return mix(color, vec4(HIGHLIGHT_COLOR.rgb, color.a), highlightFactor * HIGHLIGHT_COLOR.a);\n      }\n    "]))),l=s.sliceHighlightDisabled?c.glsl(d||(d=i.__makeTemplateObject(["#define highlightSlice(_color_, _pos_) (_color_)"],["#define highlightSlice(_color_, _pos_) (_color_)"]))):c.glsl(f||(f=i.__makeTemplateObject(["\n        "," \n        #define highlightSlice(_color_, _pos_) (sliceEnabled() ? applySliceHighlight(_color_, _pos_) : (_color_))\n      "],["\n        "," \n        #define highlightSlice(_color_, _pos_) (sliceEnabled() ? applySliceHighlight(_color_, _pos_) : (_color_))\n      "])),a);s.sliceEnabledForVertexPrograms&&e.vertex.code.add(n),e.fragment.code.add(n),e.fragment.code.add(l)}else{var o=c.glsl(_||(_=i.__makeTemplateObject(["\n      #define rejectBySlice(_pos_) false\n      #define discardBySlice(_pos_) {}\n      #define highlightSlice(_color_, _pos_) (_color_)\n    "],["\n      #define rejectBySlice(_pos_) false\n      #define discardBySlice(_pos_) {}\n      #define highlightSlice(_color_, _pos_) (_color_)\n    "])));s.sliceEnabledForVertexPrograms&&e.vertex.code.add(o),e.fragment.code.add(o)}}Object.defineProperty(s,"__esModule",{value:!0}),s.Slice=o,function(e){e.bindUniformsWithOrigin=function(s,i,n){e.bindUniforms(s,i,n.slicePlane,n.origin)},e.bindUniforms=function(e,s,i,c){s.slicePlaneEnabled&&(n.isSome(i)?(c?(a.vec3.subtract(H,i.origin,c),e.setUniform3fv("slicePlaneOrigin",H)):e.setUniform3fv("slicePlaneOrigin",i.origin),e.setUniform3fv("slicePlaneBasis1",i.basis1),e.setUniform3fv("slicePlaneBasis2",i.basis2)):(e.setUniform3fv("slicePlaneBasis1",l.vec3f64.ZEROS),e.setUniform3fv("slicePlaneBasis2",l.vec3f64.ZEROS),e.setUniform3fv("slicePlaneOrigin",l.vec3f64.ZEROS)))}}(o=s.Slice||(s.Slice={}));var t,r,d,f,_,H=l.vec3f64.create()}));