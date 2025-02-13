/*! searchinghost-easy v1.1.2 (https://github.com/gmfmi/searchinghost-easy#readme) license MIT */
var SearchinGhostEasy = function(e) {
    var t = {};

    function i(n) {
        if (t[n]) return t[n].exports;
        var s = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(s.exports, s, s.exports, i), s.l = !0, s.exports
    }
    return i.m = e, i.c = t, i.d = function(e, t, n) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, i.t = function(e, t) {
        if (1 & t && (e = i(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var s in e) i.d(n, s, function(t) {
                return e[t]
            }.bind(null, s));
        return n
    }, i.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return i.d(t, "a", t), t
    }, i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, i.p = "", i(i.s = 0)
}([function(e, t, i) {
    "use strict";
    i.r(t), i.d(t, "default", (function() {
        return s
    }));
    const n = "https://cdn.jsdelivr.net/npm/searchinghost@{{version}}/dist/searchinghost.min.js";
    class s {
        constructor(e) {
            this.isOpen = !1, this.parseArgs(e), this.createIframeElement(), this.initSearchEngine(), this.addListeners()
        }
        parseArgs(e) {
            this.contentKey = e.contentApiKey, this.apiUrl = e.apiUrl || window.location.origin, this.searchinghostOptions = e.searchinghostOptions || {}, this.searchinghostVersion = e.searchinghostVersion || "1.6.2", this.placeholder = e.placeholder || "Search", this.zIndex = e.zIndex || 2147483647, this.debug = e.debug || !1
        }
        createIframeElement() {
            this.iframeElement = document.createElement("iframe"), this.iframeElement.setAttribute("id", "searchinghost-easy"), this.iframeElement.style = "visibility:hidden;border:none;position:fixed;z-index:-1;top:0;left:0;width:100vw;height:100%;", document.body.appendChild(this.iframeElement), this.iframeWindow = this.iframeElement.contentWindow, this.iframeDocument = this.iframeWindow.document, this.iframeDocument.open(), this.iframeDocument.write(this.getHtmlTemplate()), this.iframeDocument.close();
            const e = document.createElement("base");
            e.setAttribute("target", "_parent"), this.iframeDocument.head.appendChild(e), this.themeOptions = this.iframeWindow.searchinghostOptions, this.themeCloseDelay = this.iframeWindow.closeDelay, this.themeOpenDelay = this.iframeWindow.openDelay, this.themeCloseButton = this.iframeDocument.getElementById("sge-close"), this.themeContainer = this.iframeDocument.getElementById("sge-container"), this.themeInput = this.iframeDocument.getElementById("sge-input"), this.themeInput.placeholder = this.placeholder
        }
        initSearchEngine() {
            const e = {
                key: this.contentKey,
                url: this.apiUrl,
                inputId: "sge-input",
                outputId: "sge-results",
                outputChildsType: "li"
            };
            this.themeOptions && this.mergeConfigs(e, this.themeOptions), this.mergeConfigs(e, this.searchinghostOptions), this.debug && (e.debug = !0, console.info("[debug] SearchinGhost configuration:", e));
            const t = document.createElement("script"),
                i = n.replace("{{version}}", this.searchinghostVersion);
            t.setAttribute("src", i), this.iframeDocument.body.appendChild(t);
            const s = document.createElement("script"),
                r = this.serializeConfiguration(e);
            s.textContent = `new SearchinGhost(${r});`, t.onload = () => this.iframeDocument.body.appendChild(s)
        }
        addListeners() {
            document.querySelectorAll('a[href*="#searchinghost-easy"]').forEach(e => {
                e.addEventListener("click", t => {
                    t.preventDefault(), this.clickedAnchor = e, this.openOverlay()
                })
            }), this.iframeDocument.addEventListener("keyup", e => {
                "Escape" !== e.key && 27 !== e.keyCode || this.closeOverlay()
            }), this.themeCloseButton && this.themeCloseButton.addEventListener("click", e => {
                e.preventDefault(), this.closeOverlay()
            })
        }
        openOverlay() {
            this.iframeElement.style["z-index"] = this.zIndex, this.iframeElement.style.visibility = "visible", this.themeContainer.classList.add("is-active"), this.themeInput.focus(), setTimeout(() => {
                document.documentElement.style.overflow = "hidden", this.isOpen = !0
            }, this.themeOpenDelay || 0)
        }
        closeOverlay() {
            this.isOpen && (this.clickedAnchor.focus({
                preventScroll: !0
            }), document.documentElement.style.overflow = "auto", this.themeContainer.classList.remove("is-active"), setTimeout(() => {
                this.iframeElement.style["z-index"] = -1, this.iframeElement.style.visibility = "hidden", this.clickedAnchor = void 0, this.isOpen = !1
            }, this.themeCloseDelay || 0))
        }
        getHtmlTemplate() {
            return "<!DOCTYPE html><html><head><meta charset=UTF-8><meta name=viewport content=\"width=device-width,initial-scale=1\"><style>:root{--light-grey:#58a1b2;--grey:#58a1b2;--medium-grey:#868b8f;--heavy-grey:#e7dfdf;--background-alt:rgba(0,0,0,0.5);--background-main:rgba(0,0,0,0.5);--borders:rgba(0,0,0,0)}#sge-container.is-active{opacity:1}#sge-container{backdrop-filter: blur(6px);opacity:0;transition:opacity .3s ease;display:block;position:absolute;top:0;bottom:0;left:0;right:0;overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch;background-color:var(--background-main);font-family:Arial,sans-serif;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}#sge-close{z-index:1;position:absolute;top:1em;right:1.5em;width:1.3em;height:1.3em;padding:.5em;cursor:pointer;fill:var(--light-grey);transition:all .3s ease}#sge-close:hover,.search-btn:hover{fill:var(--medium-grey)}@media screen and (max-width:950px){#sge-close{width:1.2em;height:1.2em;top:5px;right:6px}}@media screen and (max-width:568px){#sge-close{width:1em;height:1em;top:5px;right:6px}}.searchbar-container{position:relative;width:100%;border-bottom:1px solid var(--borders);background-color:var(--background-alt);overflow:hidden}.searchbar-wrapper{max-width:700px;margin:1.5em auto;padding:0 1em}@media screen and (max-width:950px){.searchbar-wrapper{margin:2.5em auto 1.5em}}.form{display:flex;justify-content:flex-end;align-items:stretch;border-bottom:1px solid var(--light-grey)}#sge-input{flex-grow:1;flex-shrink:1;width:100%;padding:0 .25em 0 0;border:0;font-size:3em;line-height:1.5em;color:var(--heavy-grey);font-weight:200;background-color:transparent;outline:0}#sge-input::placeholder{color:var(--light-grey);opacity:1;font-weight:200}#sge-input::-webkit-input-placeholder{color:var(--light-grey);opacity:1;font-weight:200}#sge-input::-moz-placeholder{color:var(--light-grey);opacity:1;font-weight:200}.search-btn{flex-grow:0;position:relative;width:3.5em;padding:2px;right:0;bottom:-.2em;border:0;background-color:transparent;cursor:pointer;fill:var(--light-grey);transition:all .3s ease}#found-items-counter{margin:.9em 0 0;height:.9em;font-size:.9em;font-weight:300;line-height:.9em;color:var(--medium-grey)}#sge-results{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:stretch;margin:0 auto;padding:.5em 0;max-width:900px}@media screen and (max-width:950px){#sge-results{padding:.5em 2em}}@media screen and (max-width:568px){#sge-results{padding:.5em 0}}.sge-results-item{flex-basis:calc(33% - (2 * .5em) + 1px);list-style:none;overflow:hidden;padding:0;margin:.5em;border-radius:5px;background-color:var(--background-alt);box-shadow:0 0 1px rgba(0,0,0,.06),0 2px 6px rgba(0,0,0,.03);transition:box-shadow .3s ease}@media screen and (max-width:950px){.sge-results-item{flex-basis:calc(50% - (2 * .5em) - 2px)}}@media screen and (max-width:568px){.sge-results-item{flex-basis:100%;margin:.5em 1em}}.sge-results-item:focus-within{outline:auto;box-shadow:0 0 5px rgba(0,0,0,.2),1px 2px 7px rgba(0,0,0,.1)}.sge-results-item:hover{box-shadow:0 0 1px rgba(0,0,0,.2),1px 2px 7px rgba(0,0,0,.1)}.sge-results-item:hover img{filter:brightness(110%)}.sge-results-item>a{display:block;height:100%;text-decoration:none;border-radius:4px}.sge-results-item img{width:100%;height:10em;object-fit:cover;filter:brightness(1);transition:filter .3s ease}.sge-results-item section{padding:.8em .8em .7em}.sge-results-item header{font-size:.65em;color:var(--grey);text-transform:uppercase}.sge-results-item .head-tags{border:1px solid var(--grey);border-radius:3px;padding:2.8px 4px 1px 5px}.sge-results-item .head-date{margin-left:.5em}.sge-results-item h2{color:var(--heavy-grey);margin:.3em 0;font-size:1.25em;font-weight:300;line-height:1.3em}</style><script>var openDelay=300,closeDelay=300,searchinghostOptions={limit:12,onSearchEnd:function(e){var t=document.getElementById(\"sge-input\").value.toLowerCase(),n=document.getElementById(\"found-items-counter\");if(\"\"!=t){var o=e.length;n.textContent=o<=1?o+\" post found\":o+\" posts found\"}else n.textContent=\"\"}}</script></head><body><section id=sge-container><div class=searchbar-container><section class=searchbar-wrapper><form class=form autocomplete=off><input id=sge-input type=text placeholder=Search><button type=submit class=search-btn tabindex=-1><svg xmlns=http://www.w3.org/2000/svg viewBox=\"0 0 512 512\"><path d=\"M508.875,493.792L353.089,338.005c32.358-35.927,52.245-83.296,52.245-135.339C405.333,90.917,314.417,0,202.667,0 S0,90.917,0,202.667s90.917,202.667,202.667,202.667c52.043,0,99.411-19.887,135.339-52.245l155.786,155.786 c2.083,2.083,4.813,3.125,7.542,3.125c2.729,0,5.458-1.042,7.542-3.125C513.042,504.708,513.042,497.958,508.875,493.792z M202.667,384c-99.979,0-181.333-81.344-181.333-181.333S102.688,21.333,202.667,21.333S384,102.677,384,202.667 S302.646,384,202.667,384z\"/></svg></button></form><p id=found-items-counter></p></section></div><i id=sge-close><svg xmlns=http://www.w3.org/2000/svg viewBox=\"0 0 512 512\"><path d=\"M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717 L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859 c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287 l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285 L284.286,256.002z\"/></svg></i><ul id=sge-results></ul></section></body></html>"
        }
        mergeConfigs(e, t) {
            for (let [i, n] of Object.entries(t)) e[i] = n
        }
        serializeConfiguration(e) {
            let t = "{";
            for (let [i, n] of Object.entries(e)) switch (typeof n) {
                case "string":
                    t += `${i}:"${n}",`;
                    break;
                case "function":
                case "boolean":
                case "number":
                    t += `${i}:${n},`;
                    break;
                case "object":
                    Array.isArray(n) ? t += `${i}:${JSON.stringify(n)},` : n instanceof RegExp ? t += `${i}:${n},` : t += `${i}:${this.serializeConfiguration(n)},`;
                    break;
                case "undefined":
                    break;
                default:
                    console.warn("Unable to properly serialize the searchinghost option '" + i + "' with value:", n)
            }
            return t = t.slice(0, -1), t += "}", this.debug && console.info("[debug] serialized configuration:", t), t
        }
    }
}]).default;