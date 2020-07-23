/*! searchinghost-easy v1.1.0 (https://github.com/gmfmi/searchinghost-easy#readme) license MIT */
var SearchinGhostEasy=function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t),i.d(t,"default",(function(){return s}));const n="https://cdn.jsdelivr.net/npm/searchinghost@{{version}}/dist/searchinghost.min.js";class s{constructor(e){this.isOpen=!1,this.parseArgs(e),this.createIframeElement(),this.initSearchEngine(),this.addListeners()}parseArgs(e){this.contentKey=e.contentApiKey,this.apiUrl=e.apiUrl||window.location.origin,this.searchinghostOptions=e.searchinghostOptions||{},this.searchinghostVersion=e.searchinghostVersion||"1.4.0",this.placeholder=e.placeholder||"Search",this.zIndex=e.zIndex||2147483647,this.debug=e.debug||!1}createIframeElement(){this.iframeElement=document.createElement("iframe"),this.iframeElement.setAttribute("id","searchinghost-easy"),this.iframeElement.style="visibility:hidden;border:none;position:fixed;z-index:-1;top:0;left:0;width:100vw;height:100%;",document.body.appendChild(this.iframeElement),this.iframeWindow=this.iframeElement.contentWindow,this.iframeDocument=this.iframeWindow.document,this.iframeDocument.open(),this.iframeDocument.write(this.getHtmlTemplate()),this.iframeDocument.close();const e=document.createElement("base");e.setAttribute("target","_parent"),this.iframeDocument.head.appendChild(e),this.themeOptions=this.iframeWindow.searchinghostOptions,this.themeCloseDelay=this.iframeWindow.closeDelay,this.themeOpenDelay=this.iframeWindow.openDelay,this.themeCloseButton=this.iframeDocument.getElementById("sge-close"),this.themeContainer=this.iframeDocument.getElementById("sge-container"),this.themeInput=this.iframeDocument.getElementById("sge-input"),this.themeInput.placeholder=this.placeholder}initSearchEngine(){const e={key:this.contentKey,url:this.apiUrl,inputId:"sge-input",outputId:"sge-results",outputChildsType:"li"};this.themeOptions&&this.mergeConfigs(e,this.themeOptions),this.mergeConfigs(e,this.searchinghostOptions),this.debug&&(e.debug=!0,console.info("[debug] SearchinGhost configuration:",e));const t=document.createElement("script"),i=n.replace("{{version}}",this.searchinghostVersion);t.setAttribute("src",i),this.iframeDocument.body.appendChild(t);const s=document.createElement("script"),r=this.serializeConfiguration(e);s.textContent=`new SearchinGhost(${r});`,t.onload=()=>this.iframeDocument.body.appendChild(s)}addListeners(){document.querySelectorAll('a[href*="#searchinghost-easy"]').forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),this.clickedAnchor=e,this.openOverlay()})}),this.iframeDocument.addEventListener("keyup",e=>{"Escape"!==e.key&&27!==e.keyCode||this.closeOverlay()}),this.themeCloseButton&&this.themeCloseButton.addEventListener("click",e=>{e.preventDefault(),this.closeOverlay()})}openOverlay(){this.iframeElement.style["z-index"]=this.zIndex,this.iframeElement.style.visibility="visible",this.themeContainer.classList.add("is-active"),this.themeInput.focus(),setTimeout(()=>{document.documentElement.style.overflow="hidden",this.isOpen=!0},this.themeOpenDelay||0)}closeOverlay(){this.isOpen&&(this.clickedAnchor.focus({preventScroll:!0}),document.documentElement.style.overflow="auto",this.themeContainer.classList.remove("is-active"),setTimeout(()=>{this.iframeElement.style["z-index"]=-1,this.iframeElement.style.visibility="hidden",this.clickedAnchor=void 0,this.isOpen=!1},this.themeCloseDelay||0))}getHtmlTemplate(){return"<!DOCTYPE html><html><head><meta charset=UTF-8><meta name=viewport content=\"width=device-width,initial-scale=1\"><style>:root{--light-grey:rgb(246, 249, 254);--blue-grey:rgb(110, 124, 141);--blue-grey-numbers:rgb(130, 146, 168);--blue-grey-borders:rgba(94, 109, 127, 0.06);--blue-grey-borders-over:rgba(94, 109, 127, 0.22)}#sge-container.is-active{opacity:1;transform:scale(1)}#sge-container{opacity:0;transform:scale(.95);transition:transform .3s ease,opacity .3s ease;display:block;position:absolute;top:0;bottom:0;left:0;right:0;overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch;background-color:#fff;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;font-family:sans-serif}.wrapper{max-width:650px;margin:0 auto;padding:3em .7em 2em .7em}@media screen and (max-width:850px){.wrapper{padding-top:4.5em}}form{display:flex;align-items:center;width:100%;background-color:var(--light-grey);box-sizing:border-box;border:solid 1px var(--blue-grey-borders);border-radius:4px;transition:border-color .3s ease}form:focus-within{border-color:var(--blue-grey-borders-over)}.search-icon{flex-grow:0;padding:0 10px}.search-icon>svg{height:1.55em;margin:.3em .2em 0 .5em;fill:var(--blue-grey)}#sge-input{overflow:hidden;width:100%;flex-grow:1;flex-shrink:1;margin:0;padding:0 .5em 0 0;border:solid 1px transparent;background-color:transparent;font-size:1.8em;font-weight:200;line-height:2em;outline:0}#sge-input::placeholder{color:var(--blue-grey);opacity:1}#sge-close{display:block;position:absolute;width:1.4em;height:1.4em;top:1.1em;right:1.4em;margin:0;padding:1em;border-radius:50%;border:solid 1px transparent;background-color:var(--light-grey);transition:border-color .3s ease;outline:0}@media screen and (max-width:850px){#sge-close{top:.5em;right:.7em}}#sge-close:hover{cursor:pointer;border-color:var(--blue-grey-borders-over)}#sge-close:after,#sge-close:before{content:\"\";display:block;position:absolute;top:50%;left:25%;width:50%;height:1.6px;background-color:var(--blue-grey);border-radius:2px}#sge-close:before{transform:rotate(45deg)}#sge-close:after{transform:rotate(-45deg)}#sge-results{padding:0;margin:0;counter-reset:incr}.sge-results-item{display:block;list-style:none;margin-top:1em;background-color:var(--light-grey);border-radius:4px}.sge-results-item a{display:grid;grid-template-columns:auto 1fr;counter-increment:incr;text-decoration:none;color:#000;padding:.9em 1em}.sge-results-item a:before{grid-row-start:1;grid-row-end:3;grid-column:1;align-self:center;content:counter(incr) \".\";display:block;margin:.2em .3em 0 .2em;font-size:2em;line-height:1em;font-weight:100;color:var(--blue-grey-numbers)}.sge-results-item time{grid-column:2;grid-row:1;align-self:end;margin-top:.5em;font-size:.8em;font-weight:200;color:var(--blue-grey)}.sge-results-item h2{grid-column:2;grid-row:2;margin:.2em 0 0 0;font-size:1.2em;font-weight:500;line-height:1.3em;text-transform:capitalize}</style><script>var openDelay=300,closeDelay=300,searchinghostOptions={template:function(e){return`<a href=\"${e.url}\"><time>${e.published_at}</time><h2>${e.title}</h2></a>`},date:{locale:\"en-US\",options:{year:\"numeric\",month:\"long\",day:\"numeric\"}}}</script></head><body><section id=sge-container><div class=wrapper><form autocomplete=off><i class=search-icon><svg xmlns=http://www.w3.org/2000/svg viewBox=\"0 0 512 512\"><path d=\"M508.875,493.792L353.089,338.005c32.358-35.927,52.245-83.296,52.245-135.339C405.333,90.917,314.417,0,202.667,0 S0,90.917,0,202.667s90.917,202.667,202.667,202.667c52.043,0,99.411-19.887,135.339-52.245l155.786,155.786 c2.083,2.083,4.813,3.125,7.542,3.125c2.729,0,5.458-1.042,7.542-3.125C513.042,504.708,513.042,497.958,508.875,493.792z M202.667,384c-99.979,0-181.333-81.344-181.333-181.333S102.688,21.333,202.667,21.333S384,102.677,384,202.667 S302.646,384,202.667,384z\"/></svg></i><input id=sge-input type=text placeholder=Search></form><i id=sge-close></i><ol id=sge-results></ol></div></section></body></html>"}mergeConfigs(e,t){for(let[i,n]of Object.entries(t))e[i]=n}serializeConfiguration(e){let t="{";for(let[i,n]of Object.entries(e))switch(typeof n){case"string":t+=`${i}:"${n}",`;break;case"function":case"boolean":case"number":t+=`${i}:${n},`;break;case"object":Array.isArray(n)?t+=`${i}:${JSON.stringify(n)},`:n instanceof RegExp?t+=`${i}:${n},`:t+=`${i}:${this.serializeConfiguration(n)},`;break;case"undefined":break;default:console.warn("Unable to properly serialize the searchinghost option '"+i+"' with value:",n)}return t=t.slice(0,-1),t+="}",this.debug&&console.info("[debug] serialized configuration:",t),t}}}]).default;