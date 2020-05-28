/*! searchinghost-easy v0.1.0 (https://github.com/gmfmi/searchinghost-easy#readme) license MIT */
var SearchinGhostEasy=function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return r}));const i="https://cdn.jsdelivr.net/npm/searchinghost@{{version}}/dist/searchinghost.min.js";class r{constructor(e){this.parseArgs(e),this.createIframeElement(),this.initSearchEngine(),this.addListeners()}parseArgs(e){this.contentKey=e.contentApiKey,this.apiUrl=e.apiUrl||window.location.origin,this.searchEngineOptions=e.searchEngineOptions||{},this.version=e.version||"1.3.3"}createIframeElement(){this.iframeElement=document.createElement("iframe"),this.iframeElement.setAttribute("id","searchinghost-easy"),this.iframeElement.setAttribute("width","100%"),this.iframeElement.setAttribute("height","100%"),this.iframeElement.style="visibility:hidden;border:none;position:fixed;z-index:10000;top:0;left:0;",document.body.appendChild(this.iframeElement),this.iframeDom=this.iframeElement.contentWindow.document,this.iframeDom.open(),this.iframeDom.write(this.getHtmlTemplate()),this.iframeDom.close()}initSearchEngine(){const e={key:this.contentKey,url:this.apiUrl,inputId:"sg-easy-input",outputId:"sg-easy-results",outputChildsType:"li"},t=this.mergeConfigs(e,this.searchEngineOptions),n=document.createElement("script"),r=i.replace("{{version}}",this.version);n.setAttribute("src",r),this.iframeDom.body.appendChild(n);const s=document.createElement("script");s.textContent=`new SearchinGhost(${JSON.stringify(t)});`;const o=this;n.onload=function(){o.iframeDom.body.appendChild(s)}}addListeners(){document.querySelectorAll('a[href*="#searchinghost-easy"]').forEach(e=>{e.addEventListener("click",e=>{e.preventDefault(),this.openOverlay()})});const e=this;function t(t){"Escape"!==t.key&&27!==t.keyCode||e.closeOverlay()}document.addEventListener("keyup",t),this.iframeDom.addEventListener("keyup",t);this.iframeDom.getElementById("sg-easy-close").addEventListener("click",e=>{e.preventDefault(),this.closeOverlay()})}openOverlay(){this.iframeElement.style.visibility="visible",document.documentElement.style.overflow="hidden",this.iframeDom.getElementById("sg-easy-input").focus()}closeOverlay(){this.iframeElement.style.visibility="hidden",document.documentElement.style.overflow="auto"}getHtmlTemplate(){return"<head><style>.searchinghost-easy-overlay{display:block;position:absolute;top:0;bottom:0;left:0;right:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;background-color:#fff}#sg-easy-close{display:block;width:20px}</style></head><body><div class=searchinghost-easy-overlay><a id=sg-easy-close href=#><svg xmlns=http://www.w3.org/2000/svg viewBox=\"0 0 512 512\"><path d=\"M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717 L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859 c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287 l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285 L284.286,256.002z\"/></svg></a><form autocomplete=off><input id=sg-easy-input type=text placeholder=search></form><ol id=sg-easy-results></ol></div></body>"}mergeConfigs(e,t){const n=Object.assign({},e);for(let[e,i]of Object.entries(t))n[e]=i;return n}}}]).default;