// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/accessorSupport/decorators","./Print/PrintViewModel","../tasks/support/PrintTemplate","../core/watchUtils","./Widget","./Print/FileLink","../core/urlUtils","./support/widget","dojo/i18n!./Print/nls/Print"],function(e,t,i,n,a,o,r,s,l,c,d,p,h){var _={base:"esri-print esri-widget",headerTitle:"esri-print__header-title",inputText:"esri-print__input-text",layoutTabList:"esri-print__layout-tab-list",layoutTab:"esri-print__layout-tab",layoutSection:"esri-print__layout-section",mapOnlySection:"esri-print__map-only-section",scaleInput:"esri-print__scale-input",advancedOptionsButton:"esri-print__advanced-options-button",advancedOptionsButtonContainer:"esri-print__advanced-options-button-container",advancedOptionsButtonTitle:"esri-print__advanced-options-button-title",advancedOptionsButtonIconOpened:"esri-print__advanced-options-button-icon--opened",advancedOptionsButtonIconClosed:"esri-print__advanced-options-button-icon--closed",advancedOptionsButtonIconClosed_RTL:"esri-print__advanced-options-button-icon--closed-rtl",refreshButton:"esri-print__refresh-button",swapButton:"esri-print__swap-button",linkButton:"esri-print__link-button",printButton:"esri-print__export-button",formSectionContainer:"esri-print__form-section-container",advancedOptionsSection:"esri-print__advanced-options-section",advancedOptionsContainer:"esri-print__advanced-options-container",authorInfoContainer:"esri-print__author-info-container",copyrightInfoContainer:"esri-print__copyright-info-container",exportedFilesContainer:"esri-print__export-panel-container",exportedFilesTitle:"esri-print__export-title",exportedFile:"esri-print__exported-file",exportedFileLink:"esri-print__exported-file-link",exportedFileLinkTitle:"esri-print__exported-file-link-title",heightContainer:"esri-print__height-container",legendInfoContainer:"esri-print__legend-info-container",printWidgetContainer:"esri-print__container",panelContainer:"esri-print__panel-container",scaleInfoContainer:"esri-print__scale-info-container",scaleInputContainer:"esri-print__scale-input-container",sizeContainer:"esri-print__size-container",widthContainer:"esri-print__width-container",button:"esri-widget-button",disabled:"esri-disabled",panelError:"esri-print__panel--error",exportedFileError:"esri-print__exported-file--error",hide:"esri-hidden",rotate:"esri-rotating",iconCheckMark:"esri-icon-check-mark",iconDownload:"esri-icon-download",iconError:"esri-icon-error",iconPrinter:"esri-icon-printer",iconRightTriangleArrow:"esri-icon-right-triangle-arrow",iconLeftTriangleArrow:"esri-icon-left-triangle-arrow",iconDownArrow:"esri-icon-down-arrow",iconRefresh:"esri-icon-refresh",iconSpinner:"esri-icon-loading-indicator",iconSwap:"esri-icon-swap",iconLinked:"esri-icon-link-horizontal",iconUnlinked:"esri-icon-unlocked-link-horizontal"},u=function(e){function t(){var t=e.call(this)||this;return t._attribution=!0,t._exportedFileNameMap={},t._layoutTabSelected=!0,t._legend=!0,t._advancedOptionsVisible=!1,t._pendingExportScroll=!1,t._selectedTemplate=new r,t._scaleEnabled=!1,t._templatesInfo=null,t.view=null,t.viewModel=new o,t.printServiceUrl=null,t}return i(t,e),t.prototype.postInitialize=function(){var e=this;s.init(this,"viewModel.templatesInfo",function(t){t&&(e._templatesInfo=t,e._selectedTemplate.layout=e._templatesInfo.layout.defaultValue,e._selectedTemplate.format=e._templatesInfo.format.defaultValue,"MAP_ONLY"===e._selectedTemplate.layout&&(e._layoutTabSelected=!1))}),s.init(this,"viewModel.view.scale",function(t){e._scaleEnabled||(e._scale=t,e.scheduleRender())}),this._width=this._selectedTemplate.exportOptions.width,this._height=this._selectedTemplate.exportOptions.height},t.prototype.render=function(){var e=this,t=p.jsxFactory.createElement("div",{key:"title-section","class":_.formSectionContainer},p.jsxFactory.createElement("label",{"for":this.id+"__title"},this._layoutTabSelected?h.title:h.fileName),p.jsxFactory.createElement("input",{key:this.id+"__title",name:"title",type:"text",tabIndex:0,placeholder:this._layoutTabSelected?h.titlePlaceHolder:h.fileNamePlaceHolder,"class":_.inputText,oninput:this._updateInputValue,bind:this})),i=this.get("_templatesInfo.format.choiceList")||[],n=i.length>0?i.map(function(e){return p.jsxFactory.createElement("option",{key:e},e)}):p.jsxFactory.createElement("option",{key:"format-default-option"},h.formatDefaultOption),a=p.jsxFactory.createElement("div",{key:"file-format-section","class":_.formSectionContainer},p.jsxFactory.createElement("label",{"for":this.id+"__formats"},h.fileFormatTitle),p.jsxFactory.createElement("select",{key:this.id+"__formats",onchange:this._updateFromOption,"data-target-property":"format",bind:this},n)),o=this.get("_templatesInfo.layout.choiceList")||[],r=o.length>0?o.map(function(t){return p.jsxFactory.createElement("option",{key:t,bind:e},t)}):p.jsxFactory.createElement("option",{key:"layout-default-option"},h.layoutDefaultOption),s=p.jsxFactory.createElement("div",{key:"page-setup-section","class":_.formSectionContainer},p.jsxFactory.createElement("label",{"for":this.id+"__layouts"},h.layoutTitle),p.jsxFactory.createElement("select",{key:this.id+"__layouts",onchange:this._updateFromOption,"data-target-property":"layout",bind:this},r)),l=this._advancedOptionsVisible?p.jsxFactory.createElement("div",{"aria-labelledby":this.id+"__advancedOptions","class":_.advancedOptionsContainer},p.jsxFactory.createElement("div",{"class":p.join(_.scaleInfoContainer,_.formSectionContainer)},p.jsxFactory.createElement("input",{key:this.id+"__scaleEnabled",name:"scaleEnabled",type:"checkbox",tabIndex:0,onchange:this._toggleInputValue,bind:this}),p.jsxFactory.createElement("label",{"for":this.id+"__scaleEnabled"},h.scale),p.jsxFactory.createElement("div",{"class":_.scaleInputContainer},p.jsxFactory.createElement("input",{key:this.id+"__scale","aria-label":h.scaleLabel,type:"number",name:"scale","class":p.join(_.inputText,_.scaleInput),tabIndex:0,oninput:this._updateInputValue,disabled:!this._scaleEnabled,value:""+this._scale,bind:this}),p.jsxFactory.createElement("button",{role:"button","aria-label":h.reset,"class":p.join(_.button,_.refreshButton,_.iconRefresh),tabIndex:0,onclick:this._resetToCurrentScale,bind:this}))),p.jsxFactory.createElement("div",{"class":p.join(_.authorInfoContainer,_.formSectionContainer)},p.jsxFactory.createElement("label",{"for":this.id+"__author"},h.author),p.jsxFactory.createElement("input",{key:this.id+"__author",type:"text",name:"author","class":_.inputText,tabIndex:0,oninput:this._updateInputValue,bind:this})),p.jsxFactory.createElement("div",{"class":p.join(_.copyrightInfoContainer,_.formSectionContainer)},p.jsxFactory.createElement("label",{"for":this.id+"__copyright"},h.copyright),p.jsxFactory.createElement("input",{key:this.id+"__copyright",type:"text",name:"copyright","class":_.inputText,tabIndex:0,oninput:this._updateInputValue,bind:this})),p.jsxFactory.createElement("div",{"class":p.join(_.legendInfoContainer,_.formSectionContainer)},p.jsxFactory.createElement("input",{key:this.id+"__legend",type:"checkbox",name:"legend",tabIndex:0,checked:!0,onchange:this._toggleInputValue,bind:this}),p.jsxFactory.createElement("label",{"for":this.id+"__legend"},h.legend))):null,c=this._layoutTabSelected?p.jsxFactory.createElement("section",{key:this.id+"__layoutContent","aria-labelledby":this.id+"__layoutTab","class":_.layoutSection},p.jsxFactory.createElement("div",{key:"layout","class":_.panelContainer},t,s,this._layoutTabSelected?a:null),p.jsxFactory.createElement("div",{key:"advanced-section","class":p.join(_.panelContainer,_.advancedOptionsSection)},p.jsxFactory.createElement("button",{key:this.id+"__advancedOptions","aria-label":h.advancedOptions,"aria-expanded":this._advancedOptionsVisible?"true":"false",role:"button","class":_.advancedOptionsButton,onclick:this._showAdvancedOptions,bind:this},p.jsxFactory.createElement("div",{"class":_.advancedOptionsButtonContainer},p.jsxFactory.createElement("span",{"aria-hidden":"true","class":p.join(_.iconRightTriangleArrow,_.advancedOptionsButtonIconClosed)}),p.jsxFactory.createElement("span",{"aria-hidden":"true","class":p.join(_.iconLeftTriangleArrow,_.advancedOptionsButtonIconClosed_RTL)}),p.jsxFactory.createElement("span",{"aria-hidden":"true","class":p.join(_.iconDownArrow,_.advancedOptionsButtonIconOpened)}),p.jsxFactory.createElement("span",{"class":_.advancedOptionsButtonTitle},h.advancedOptions))),l)):p.jsxFactory.createElement("section",{key:this.id+"__mapOnlyContent","aria-labelledby":this.id+"__mapOnlyTab","class":_.mapOnlySection},p.jsxFactory.createElement("div",{key:"mapOnly","class":_.panelContainer},t,this._layoutTabSelected?null:a,p.jsxFactory.createElement("div",{"class":p.join(_.sizeContainer,_.formSectionContainer)},p.jsxFactory.createElement("div",{"class":_.widthContainer},p.jsxFactory.createElement("label",{"for":"width"},h.width),p.jsxFactory.createElement("input",{key:this.id+"__width",type:"text",name:"width","class":_.inputText,onchange:this._updateInputValue,value:""+this._width,tabIndex:0,bind:this})),p.jsxFactory.createElement("div",{"class":_.heightContainer},p.jsxFactory.createElement("label",{"for":"height"},h.height),p.jsxFactory.createElement("input",{key:this.id+"__height",type:"text",name:"height","class":_.inputText,onchange:this._updateInputValue,value:""+this._height,tabIndex:0,bind:this})),p.jsxFactory.createElement("button",{role:"button","aria-label":h.swap,"class":p.join(_.button,_.swapButton,_.iconSwap),onclick:this._switchInput,tabIndex:0,bind:this})),p.jsxFactory.createElement("div",{key:"attribution-container","class":_.formSectionContainer},p.jsxFactory.createElement("input",{key:this.id+"__attribution",name:"attribution",type:"checkbox",onchange:this._toggleInputValue,tabIndex:0,checked:!0,bind:this}),p.jsxFactory.createElement("label",{"for":"attribution"},h.attribution)))),d=this.exportedLinks.toArray(),u=this._renderExportedLink(d),y=(v={},v[_.disabled]=!this._selectedTemplate.layout&&!this._selectedTemplate.format,v),m="2d"!==this.get("view.type"),x=p.jsxFactory.createElement("div",{key:this.id+"__errorPanel","class":_.panelError},m?h.sceneViewError:h.serviceError),b=p.jsxFactory.createElement("div",{key:this.id+"__printPanel"},p.jsxFactory.createElement("ul",{"class":_.layoutTabList,role:"tablist",onclick:this._toggleLayoutPanel,onkeydown:this._toggleLayoutPanel,bind:this},p.jsxFactory.createElement("li",{key:this.id+"__layoutTab","data-tab-id":"layoutTab","class":_.layoutTab,role:"tab",tabIndex:0,"aria-selected":""+this._layoutTabSelected,bind:this},h.layoutTab),p.jsxFactory.createElement("li",{key:this.id+"__mapOnlyTab","data-tab-id":"mapOnlyTab","class":_.layoutTab,role:"tab",tabIndex:0,"aria-selected":""+!this._layoutTabSelected,bind:this},h.mapOnlyTab)),c,p.jsxFactory.createElement("button",{"aria-label":h.exportDescription,role:"button","class":_.printButton,tabIndex:0,classes:y,onclick:this._handlePrintMap,bind:this},h["export"]),p.jsxFactory.createElement("div",{key:this.id+"__exportedFilesContainer","class":_.exportedFilesContainer,afterUpdate:this._scrollExportIntoView,onclick:this._removeLink,bind:this},p.jsxFactory.createElement("h2",{"class":_.exportedFilesTitle},h.exportText),d.length>0?null:p.jsxFactory.createElement("div",{key:"exported-section-hints"},p.jsxFactory.createElement("div",null,h.exportHint)),u)),f=p.jsxFactory.createElement("div",{key:this.id+"__printContainer"},p.jsxFactory.createElement("div",{"class":_.printWidgetContainer},p.jsxFactory.createElement("header",{"class":_.headerTitle},h["export"]),this.error||!this.printServiceUrl||m?x:b));return p.jsxFactory.createElement("div",{"class":_.base},f);var v},t.prototype._configurePrintTemplate=function(){this._selectedTemplate.attributionVisible=this._attribution,this._width&&(this._selectedTemplate.exportOptions.width=this._width),this._height&&(this._selectedTemplate.exportOptions.height=this._height),this._selectedTemplate.layoutOptions={titleText:this._title||"",authorText:this._author||"",copyrightText:this._copyright||""},this._legend||(this._selectedTemplate.layoutOptions.legendLayers=[]),this.scale=this._scale;var e=this._title||h.untitled,t=this._selectedTemplate.format.toLowerCase(),i=t.indexOf("png")>-1?"png":t,n=e+i,a=void 0!==this._exportedFileNameMap[n];a?this._exportedFileNameMap[n]++:this._exportedFileNameMap[n]=0,this.exportedLinks.add(new c({name:e,extension:i,count:this._exportedFileNameMap[n]}))},t.prototype._resetToCurrentScale=function(){this._scale=this.viewModel.view.scale},t.prototype._updateInputValue=function(e){var t=e.target,i="_"+t.name;this[i]=t.value},t.prototype._handlePrintMap=function(){this._configurePrintTemplate(),this._pendingExportScroll=!0,this.viewModel.print(this._selectedTemplate)},t.prototype._updateFromOption=function(e){var t=e.target,i=t.selectedOptions[0].value,n=this._selectedTemplate,a=t.getAttribute("data-target-property");n[a]=i},t.prototype._switchInput=function(){e=[this._height,this._width],this._width=e[0],this._height=e[1];var e},t.prototype._showAdvancedOptions=function(){this._advancedOptionsVisible=!this._advancedOptionsVisible},t.prototype._scrollExportIntoView=function(e){this._pendingExportScroll&&(this._pendingExportScroll=!1,e.scrollIntoView())},t.prototype._toggleInputValue=function(e){var t=e.target,i="_"+t.name;this[i]=t.checked,"_scaleEnabled"===i&&(this.viewModel.scaleEnabled=this[i],this[i]||this._resetToCurrentScale())},t.prototype._removeLink=function(e){var t=e.target,i=t["data-item"];i&&"error"===i.state&&this.exportedLinks.remove(i)},t.prototype._renderExportedLink=function(e){return e.map(function(e){var t=(o={},o[_.iconSpinner]="pending"===e.state,o[_.rotate]="pending"===e.state,o[_.iconDownload]="ready"===e.state,o[_.iconError]="error"===e.state,o[_.exportedFileError]="error"===e.state,o),i=(r={},r[_.disabled]="pending"===e.state,r[_.exportedFileError]="error"===e.state,r),n=""===e.url?null:e.url;n&&(n=d.addProxy(n));var a;return a="pending"===e.state?h.pending:"ready"===e.state?h.ready:h.error,p.jsxFactory.createElement("div",{"aria-label":a,key:e.formattedName,"class":_.exportedFile},p.jsxFactory.createElement("a",{href:n,tabIndex:0,target:"_blank","class":_.exportedFileLink},p.jsxFactory.createElement("span",{"data-item":e,classes:t}),p.jsxFactory.createElement("span",{"data-item":e,"class":_.exportedFileLinkTitle,classes:i},e.formattedName)));var o,r})},t.prototype._resetInputValue=function(){this._title="",this._selectedTemplate.format=this._templatesInfo.format.defaultValue},t.prototype._toggleLayoutPanel=function(e){this._resetInputValue();var t=e.target;if(this._layoutTabSelected="layoutTab"===t.getAttribute("data-tab-id"),this._layoutTabSelected){var i=this.get("_templatesInfo.layout.choiceList");this._selectedTemplate.layout=i&&i[0]}else this._selectedTemplate.layout="MAP_ONLY"},t}(a.declared(l));return n([a.aliasOf("viewModel.view"),p.renderable()],u.prototype,"view",void 0),n([a.property({type:o}),p.renderable(["viewModel.templatesInfo","viewModel.state"])],u.prototype,"viewModel",void 0),n([a.aliasOf("viewModel.printServiceUrl")],u.prototype,"printServiceUrl",void 0),n([a.aliasOf("viewModel.scale"),p.renderable()],u.prototype,"scale",void 0),n([a.aliasOf("viewModel.exportedLinks"),p.renderable()],u.prototype,"exportedLinks",void 0),n([a.aliasOf("viewModel.error")],u.prototype,"error",void 0),n([p.accessibleHandler()],u.prototype,"_toggleLayoutPanel",null),u=n([a.subclass("esri.widgets.Print")],u)});