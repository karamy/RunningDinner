(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{K9Nc:function(t,o,e){"use strict";e.r(o),e.d(o,"ion_app",(function(){return d})),e.d(o,"ion_buttons",(function(){return g})),e.d(o,"ion_content",(function(){return p})),e.d(o,"ion_footer",(function(){return f})),e.d(o,"ion_header",(function(){return y})),e.d(o,"ion_router_outlet",(function(){return x})),e.d(o,"ion_title",(function(){return j})),e.d(o,"ion_toolbar",(function(){return O}));var i=e("54nT"),n=e("AfW+"),r=e("aiEM"),s=e("0AIG"),a=(e("kBU6"),e("Dl6n")),l=e("m9yc"),c=e("Uch9");const d=class{constructor(t){Object(i.k)(this,t)}componentDidLoad(){b(()=>{const t=Object(n.f)(window,"hybrid");n.b.getBoolean("_testing")||e.e(13).then(e.bind(null,"a7BO")).then(t=>t.startTapClick(n.b)),n.b.getBoolean("statusTap",t)&&e.e(11).then(e.bind(null,"AhaL")).then(t=>t.startStatusTap()),n.b.getBoolean("inputShims",h())&&e.e(10).then(e.bind(null,"aoIK")).then(t=>t.startInputShims(n.b)),n.b.getBoolean("hardwareBackButton",t)&&e.e(9).then(e.bind(null,"XRsP")).then(t=>t.startHardwareBackButton()),e.e(8).then(e.bind(null,"3YLQ")).then(t=>t.startFocusVisible())})}render(){const t=Object(i.d)(this);return Object(i.i)(i.a,{class:{[t]:!0,"ion-page":!0,"force-statusbar-padding":n.b.getBoolean("_forceStatusbarPadding")}})}get el(){return Object(i.f)(this)}static get style(){return"html.plt-mobile ion-app{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}ion-app.force-statusbar-padding{--ion-safe-area-top:20px}"}},h=()=>Object(n.f)(window,"ios")&&Object(n.f)(window,"mobile"),b=t=>{"requestIdleCallback"in window?window.requestIdleCallback(t):setTimeout(t,32)},g=class{constructor(t){Object(i.k)(this,t),this.collapse=!1}render(){const t=Object(i.d)(this);return Object(i.i)(i.a,{class:{[t]:!0,"buttons-collapse":this.collapse}})}static get style(){return".sc-ion-buttons-md-h{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-transform:translateZ(0);transform:translateZ(0);z-index:99}.sc-ion-buttons-md-s  ion-button {margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;--padding-top:0;--padding-bottom:0;--padding-start:8px;--padding-end:8px;--box-shadow:none;margin-left:2px;margin-right:2px;height:32px;font-size:14px;font-weight:500}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-buttons-md-s  ion-button {margin-left:unset;margin-right:unset;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px}}.sc-ion-buttons-md-s  ion-button:not(.button-round) {--border-radius:2px}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s  .button , .ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s  .button {--color:initial;--color-focused:var(--ion-color-contrast);--color-hover:var(--ion-color-contrast);--background-activated:transparent;--background-focused:var(--ion-color-contrast);--background-hover:var(--ion-color-contrast)}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s  .button-solid , .ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s  .button-solid {--background:var(--ion-color-contrast);--background-activated:transparent;--background-focused:var(--ion-color-shade);--background-hover:var(--ion-color-base);--color:var(--ion-color-base);--color-focused:var(--ion-color-base);--color-hover:var(--ion-color-base)}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s  .button-outline , .ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s  .button-outline {--border-color:var(--ion-color-contrast)}.sc-ion-buttons-md-s  .button-has-icon-only.button-clear {--padding-top:12px;--padding-end:12px;--padding-bottom:12px;--padding-start:12px;--border-radius:50%;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;width:48px;height:48px}.sc-ion-buttons-md-s  .button {--background-hover:currentColor}.sc-ion-buttons-md-s  .button-solid {--color:var(--ion-toolbar-background,var(--ion-background-color,#fff));--color-activated:var(--ion-toolbar-background,var(--ion-background-color,#fff));--background:var(--ion-toolbar-color,var(--ion-text-color,#424242));--background-activated:transparent;--background-focused:currentColor}.sc-ion-buttons-md-s  .button-outline {--border-color:var(--ion-toolbar-color,var(--ion-text-color,#424242))}.sc-ion-buttons-md-s  .button-clear , .sc-ion-buttons-md-s  .button-outline {--color:initial;--color-activated:currentColor;--color-focused:var(--ion-toolbar-color,var(--ion-text-color,#424242));--background:transparent;--background-activated:transparent;--background-focused:currentColor;--background-hover:currentColor}.sc-ion-buttons-md-s  ion-icon[slot=start] {margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;margin-right:.3em;font-size:1.4em}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-buttons-md-s  ion-icon[slot=start] {margin-right:unset;-webkit-margin-end:.3em;margin-inline-end:.3em}}.sc-ion-buttons-md-s  ion-icon[slot=end] {margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;margin-left:.4em;font-size:1.4em}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-buttons-md-s  ion-icon[slot=end] {margin-left:unset;-webkit-margin-start:.4em;margin-inline-start:.4em}}.sc-ion-buttons-md-s  ion-icon[slot=icon-only] {padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;font-size:1.8em}"}},p=class{constructor(t){Object(i.k)(this,t),this.isScrolling=!1,this.lastScroll=0,this.queued=!1,this.cTop=-1,this.cBottom=-1,this.mode=Object(i.d)(this),this.detail={scrollTop:0,scrollLeft:0,type:"scroll",event:void 0,startX:0,startY:0,startTime:0,currentX:0,currentY:0,velocityX:0,velocityY:0,deltaX:0,deltaY:0,currentTime:0,data:void 0,isScrolling:!0},this.fullscreen=!1,this.scrollX=!1,this.scrollY=!0,this.scrollEvents=!1,this.ionScrollStart=Object(i.e)(this,"ionScrollStart",7),this.ionScroll=Object(i.e)(this,"ionScroll",7),this.ionScrollEnd=Object(i.e)(this,"ionScrollEnd",7)}disconnectedCallback(){this.onScrollEnd()}componentDidLoad(){this.resize()}onClick(t){this.isScrolling&&(t.preventDefault(),t.stopPropagation())}shouldForceOverscroll(){const{forceOverscroll:t,mode:o}=this;return void 0===t?"ios"===o&&Object(n.f)("ios"):t}resize(){this.fullscreen?Object(i.g)(this.readDimensions.bind(this)):0===this.cTop&&0===this.cBottom||(this.cTop=this.cBottom=0,this.el.forceUpdate())}readDimensions(){const t=u(this.el),o=Math.max(this.el.offsetTop,0),e=Math.max(t.offsetHeight-o-this.el.offsetHeight,0);(o!==this.cTop||e!==this.cBottom)&&(this.cTop=o,this.cBottom=e,this.el.forceUpdate())}onScroll(t){const o=Date.now(),e=!this.isScrolling;this.lastScroll=o,e&&this.onScrollStart(),!this.queued&&this.scrollEvents&&(this.queued=!0,Object(i.g)(o=>{this.queued=!1,this.detail.event=t,m(this.detail,this.scrollEl,o,e),this.ionScroll.emit(this.detail)}))}getScrollElement(){return Promise.resolve(this.scrollEl)}scrollToTop(t=0){return this.scrollToPoint(void 0,0,t)}scrollToBottom(t=0){return this.scrollToPoint(void 0,this.scrollEl.scrollHeight-this.scrollEl.clientHeight,t)}scrollByPoint(t,o,e){return this.scrollToPoint(t+this.scrollEl.scrollLeft,o+this.scrollEl.scrollTop,e)}async scrollToPoint(t,o,e=0){const i=this.scrollEl;if(e<32)return null!=o&&(i.scrollTop=o),void(null!=t&&(i.scrollLeft=t));let n,r=0;const s=new Promise(t=>n=t),a=i.scrollTop,l=i.scrollLeft,c=null!=o?o-a:0,d=null!=t?t-l:0,h=t=>{const o=Math.min(1,(t-r)/e)-1,s=Math.pow(o,3)+1;0!==c&&(i.scrollTop=Math.floor(s*c+a)),0!==d&&(i.scrollLeft=Math.floor(s*d+l)),s<1?requestAnimationFrame(h):n()};return requestAnimationFrame(t=>{r=t,h(t)}),s}onScrollStart(){this.isScrolling=!0,this.ionScrollStart.emit({isScrolling:!0}),this.watchDog&&clearInterval(this.watchDog),this.watchDog=setInterval(()=>{this.lastScroll<Date.now()-120&&this.onScrollEnd()},100)}onScrollEnd(){clearInterval(this.watchDog),this.watchDog=null,this.isScrolling&&(this.isScrolling=!1,this.ionScrollEnd.emit({isScrolling:!1}))}render(){const{scrollX:t,scrollY:o}=this,e=Object(i.d)(this),r=this.shouldForceOverscroll(),s="ios"===e&&n.b.getBoolean("experimentalTransitionShadow",!0);return this.resize(),Object(i.i)(i.a,{class:Object.assign(Object.assign({},Object(a.a)(this.color)),{[e]:!0,"content-sizing":Object(a.c)("ion-popover",this.el),overscroll:r}),style:{"--offset-top":`${this.cTop}px`,"--offset-bottom":`${this.cBottom}px`}},Object(i.i)("div",{id:"background-content"}),Object(i.i)("main",{class:{"inner-scroll":!0,"scroll-x":t,"scroll-y":o,overscroll:(t||o)&&r},ref:t=>this.scrollEl=t,onScroll:this.scrollEvents?t=>this.onScroll(t):void 0},Object(i.i)("slot",null)),s?Object(i.i)("div",{class:"transition-effect"},Object(i.i)("div",{class:"transition-cover"}),Object(i.i)("div",{class:"transition-shadow"})):null,Object(i.i)("slot",{name:"fixed"}))}get el(){return Object(i.f)(this)}static get style(){return':host{--background:var(--ion-background-color,#fff);--color:var(--ion-text-color,#000);--padding-top:0px;--padding-bottom:0px;--padding-start:0px;--padding-end:0px;--keyboard-offset:0px;--offset-top:0px;--offset-bottom:0px;--overflow:auto;display:block;position:relative;-ms-flex:1;flex:1;width:100%;height:100%;margin:0!important;padding:0!important;font-family:var(--ion-font-family,inherit);contain:size style}:host(.ion-color) .inner-scroll{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.outer-content){--background:var(--ion-color-step-50,#f2f2f2)}#background-content{background:var(--background)}#background-content,.inner-scroll{left:0;right:0;top:calc(var(--offset-top) * -1);bottom:calc(var(--offset-bottom) * -1);position:absolute}.inner-scroll{padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:calc(var(--padding-top) + var(--offset-top));padding-bottom:calc(var(--padding-bottom) + var(--keyboard-offset) + var(--offset-bottom));color:var(--color);-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.inner-scroll{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.scroll-x,.scroll-y{-webkit-overflow-scrolling:touch;will-change:scroll-position;-ms-scroll-chaining:none;overscroll-behavior:contain}.scroll-y{-ms-touch-action:pan-y;touch-action:pan-y;overflow-y:var(--overflow)}.scroll-x{-ms-touch-action:pan-x;touch-action:pan-x;overflow-x:var(--overflow)}.scroll-x.scroll-y{-ms-touch-action:auto;touch-action:auto}.overscroll:after,.overscroll:before{position:absolute;width:1px;height:1px;content:""}.overscroll:before{bottom:-1px}.overscroll:after{top:-1px}:host(.content-sizing){contain:none}:host(.content-sizing) .inner-scroll{position:relative}.transition-effect{display:none;left:-100%;opacity:0;pointer-events:none}.transition-cover,.transition-effect{position:absolute;width:100%;height:100%}.transition-cover{right:0;background:#000;opacity:.1}.transition-shadow{display:block;position:absolute;right:0;width:10px;height:100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAgCAYAAAAIXrg4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTE3MDgzRkQ5QTkyMTFFOUEwNzQ5MkJFREE1NUY2MjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTE3MDgzRkU5QTkyMTFFOUEwNzQ5MkJFREE1NUY2MjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMTcwODNGQjlBOTIxMUU5QTA3NDkyQkVEQTU1RjYyNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMTcwODNGQzlBOTIxMUU5QTA3NDkyQkVEQTU1RjYyNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmePEuQAAABNSURBVHjaYvz//z8DIxAwMDAwATGMhmFmPDQuOSZks0AMmoJBaQHjkPfB0Lfg/2gQjVow+HPy/yHvg9GiYjQfjMbBqAWjFgy/4hogwADYqwdzxy5BuwAAAABJRU5ErkJggg==);background-repeat:repeat-y;background-size:10px 16px}::slotted([slot=fixed]){position:absolute}'}},u=t=>t.closest("ion-tabs")||t.closest("ion-app,ion-page,.ion-page,page-inner")||(t=>t.parentElement?t.parentElement:t.parentNode&&t.parentNode.host?t.parentNode.host:null)(t),m=(t,o,e,i)=>{const n=t.currentX,r=t.currentY,s=o.scrollLeft,a=o.scrollTop,l=e-t.currentTime;if(i&&(t.startTime=e,t.startX=s,t.startY=a,t.velocityX=t.velocityY=0),t.currentTime=e,t.currentX=t.scrollLeft=s,t.currentY=t.scrollTop=a,t.deltaX=s-t.startX,t.deltaY=a-t.startY,l>0&&l<100){const o=(a-r)/l;t.velocityX=(s-n)/l*.7+.3*t.velocityX,t.velocityY=.7*o+.3*t.velocityY}},f=class{constructor(t){Object(i.k)(this,t),this.translucent=!1}render(){const t=Object(i.d)(this),o=this.translucent;return Object(i.i)(i.a,{role:"contentinfo",class:{[t]:!0,[`footer-${t}`]:!0,"footer-translucent":o,[`footer-translucent-${t}`]:o}},"ios"===t&&o&&Object(i.i)("div",{class:"footer-background"}),Object(i.i)("slot",null))}static get style(){return'ion-footer{display:block;position:relative;-ms-flex-order:1;order:1;width:100%;z-index:10}ion-footer ion-toolbar:last-of-type{padding-bottom:var(--ion-safe-area-bottom,0)}.footer-md:before{left:0;top:-2px;bottom:auto;background-position:left 0 top 0;position:absolute;width:100%;height:2px;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAHBAMAAADzDtBxAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMUCS0gBIh/TXEAAAAaSURBVAjXYxCEAgY4UIICBmMogMsgFLtAAQCNSwXZKOdPxgAAAABJRU5ErkJggg==");background-repeat:repeat-x;content:""}:host-context([dir=rtl]) .footer-md:before,[dir=rtl] .footer-md:before{left:unset;right:unset;right:0;background-position:right 0 top 0}.footer-md.ion-no-border:before{display:none}'}},v=t=>{const o=document.querySelector(`${t}.ion-cloned-element`);if(null!==o)return o;const e=document.createElement(t);return e.classList.add("ion-cloned-element"),e.style.setProperty("display","none"),document.body.appendChild(e),e},w=t=>{if(!t)return;const o=t.querySelectorAll("ion-toolbar");return{el:t,toolbars:Array.from(o).map(t=>{const o=t.querySelector("ion-title");return{el:t,background:t.shadowRoot.querySelector(".toolbar-background"),ionTitleEl:o,innerTitleEl:o?o.shadowRoot.querySelector(".toolbar-title"):null,ionButtonsEl:Array.from(t.querySelectorAll("ion-buttons"))||[]}})||[]}},A=(t,o)=>{void 0===o?t.background.style.removeProperty("--opacity"):t.background.style.setProperty("--opacity",o.toString())},k=(t,o=!0)=>{o?t.el.classList.remove("header-collapse-condense-inactive"):t.el.classList.add("header-collapse-condense-inactive")},y=class{constructor(t){Object(i.k)(this,t),this.collapsibleHeaderInitialized=!1,this.translucent=!1}async componentDidLoad(){await this.checkCollapsibleHeader()}async componentDidUpdate(){await this.checkCollapsibleHeader()}componentDidUnload(){this.destroyCollapsibleHeader()}async checkCollapsibleHeader(){const t="condense"===this.collapse,o=!(!t||"ios"!==Object(i.d)(this))&&t;if(!o&&this.collapsibleHeaderInitialized)this.destroyCollapsibleHeader();else if(o&&!this.collapsibleHeaderInitialized){const t=this.el.closest("ion-app,ion-page,.ion-page,page-inner"),o=t?t.querySelector("ion-content"):null;await this.setupCollapsibleHeader(o,t)}}destroyCollapsibleHeader(){this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=void 0),this.scrollEl&&this.contentScrollCallback&&(this.scrollEl.removeEventListener("scroll",this.contentScrollCallback),this.contentScrollCallback=void 0),this.collapsibleMainHeader&&(this.collapsibleMainHeader.classList.remove("header-collapse-main"),this.collapsibleMainHeader=void 0)}async setupCollapsibleHeader(t,o){if(!t||!o)return void console.error("ion-header requires a content to collapse, make sure there is an ion-content.");this.scrollEl=await t.getScrollElement();const e=o.querySelectorAll("ion-header");if(this.collapsibleMainHeader=Array.from(e).find(t=>"condense"!==t.collapse),!this.collapsibleMainHeader)return;const n=w(this.collapsibleMainHeader),s=w(this.el);n&&s&&(k(n,!1),n.toolbars.forEach(t=>{A(t,0)}),this.intersectionObserver=new IntersectionObserver(t=>{((t,o,e)=>{Object(i.l)(()=>{((t,o)=>{if(!t[0].isIntersecting)return;const e=t[0].intersectionRatio>.9?0:100*(1-t[0].intersectionRatio)/75;o.toolbars.forEach(t=>{A(t,1===e?void 0:e)})})(t,o);const i=t[0],n=i.intersectionRect,r=n.width*n.height,s=0===r&&0==i.rootBounds.width*i.rootBounds.height,a=Math.abs(n.left-i.boundingClientRect.left),l=Math.abs(n.right-i.boundingClientRect.right);s||r>0&&(a>=5||l>=5)||(i.isIntersecting?(k(o,!1),k(e)):(0===n.x&&0===n.y||0!==n.width&&0!==n.height)&&(k(o),k(e,!1),A(o.toolbars[0])))})})(t,n,s)},{root:t,threshold:[.25,.3,.4,.5,.6,.7,.8,.9,1]}),this.intersectionObserver.observe(s.toolbars[s.toolbars.length-1].el),this.contentScrollCallback=()=>{((t,o,e)=>{Object(i.g)(()=>{const n=t.scrollTop,s=Object(r.c)(1,1+-n/500,1.1);null===e.querySelector("ion-refresher.refresher-native")&&Object(i.l)(()=>{((t=[],o=1,e=!1)=>{t.forEach(t=>{const i=t.ionTitleEl,n=t.innerTitleEl;i&&"large"===i.size&&(n.style.transformOrigin="left center",n.style.transition=e?"all 0.2s ease-in-out":"",n.style.transform=`scale3d(${o}, ${o}, 1)`)})})(o.toolbars,s)})})})(this.scrollEl,s,t)},this.scrollEl.addEventListener("scroll",this.contentScrollCallback),Object(i.l)(()=>{v("ion-title"),v("ion-back-button"),this.collapsibleMainHeader.classList.add("header-collapse-main")}),this.collapsibleHeaderInitialized=!0)}render(){const{translucent:t}=this,o=Object(i.d)(this),e=this.collapse||"none";return Object(i.i)(i.a,{role:"banner",class:{[o]:!0,[`header-${o}`]:!0,"header-translucent":this.translucent,[`header-collapse-${e}`]:!0,[`header-translucent-${o}`]:this.translucent}},"ios"===o&&t&&Object(i.i)("div",{class:"header-background"}),Object(i.i)("slot",null))}get el(){return Object(i.f)(this)}static get style(){return'ion-header{display:block;position:relative;-ms-flex-order:-1;order:-1;width:100%;z-index:10}ion-header ion-toolbar:first-of-type{padding-top:var(--ion-safe-area-top,0)}.header-md:after{left:0;bottom:-5px;background-position:left 0 top -2px;position:absolute;width:100%;height:5px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAHBAMAAADzDtBxAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMUCS0gBIh/TXEAAAAaSURBVAjXYxCEAgY4UIICBmMogMsgFLtAAQCNSwXZKOdPxgAAAABJRU5ErkJggg==);background-repeat:repeat-x;content:""}:host-context([dir=rtl]) .header-md:after,[dir=rtl] .header-md:after{left:unset;right:unset;right:0;background-position:right 0 top -2px}.header-collapse-condense,.header-md.ion-no-border:after{display:none}'}},x=class{constructor(t){Object(i.k)(this,t),this.animationEnabled=!0,this.mode=Object(i.d)(this),this.animated=!0,this.ionNavWillLoad=Object(i.e)(this,"ionNavWillLoad",7),this.ionNavWillChange=Object(i.e)(this,"ionNavWillChange",3),this.ionNavDidChange=Object(i.e)(this,"ionNavDidChange",3)}swipeHandlerChanged(){this.gesture&&this.gesture.enable(void 0!==this.swipeHandler)}async connectedCallback(){this.gesture=(await e.e(3).then(e.bind(null,"a4YZ"))).createSwipeBackGesture(this.el,()=>!!this.swipeHandler&&this.swipeHandler.canStart()&&this.animationEnabled,()=>this.swipeHandler&&this.swipeHandler.onStart(),t=>this.ani&&this.ani.progressStep(t),(t,o,e)=>{if(this.ani){this.animationEnabled=!1,this.ani.onFinish(()=>{this.animationEnabled=!0,this.swipeHandler&&this.swipeHandler.onEnd(t)},{oneTimeCallback:!0});let i=t?-.001:.001;t?i+=Object(s.a)([0,0],[.32,.72],[0,1],[1,1],o)[0]:(this.ani.easing("cubic-bezier(1, 0, 0.68, 0.28)"),i+=Object(s.a)([0,0],[1,0],[.68,.28],[1,1],o)[0]),this.ani.progressEnd(t?1:0,i,e)}}),this.swipeHandlerChanged()}componentWillLoad(){this.ionNavWillLoad.emit()}disconnectedCallback(){this.gesture&&(this.gesture.destroy(),this.gesture=void 0)}async commit(t,o,e){const i=await this.lock();let n=!1;try{n=await this.transition(t,o,e)}catch(r){console.error(r)}return i(),n}async setRouteId(t,o,e){return{changed:await this.setRoot(t,o,{duration:"root"===e?0:void 0,direction:"back"===e?"back":"forward"}),element:this.activeEl}}async getRouteId(){const t=this.activeEl;return t?{id:t.tagName,element:t}:void 0}async setRoot(t,o,e){if(this.activeComponent===t)return!1;const i=this.activeEl,n=await Object(l.a)(this.delegate,this.el,t,["ion-page","ion-page-invisible"],o);return this.activeComponent=t,this.activeEl=n,await this.commit(n,i,e),await Object(l.b)(this.delegate,i),!0}async transition(t,o,e={}){if(o===t)return!1;this.ionNavWillChange.emit();const{el:i,mode:r}=this,s=this.animated&&n.b.getBoolean("animated",!0),a=this.animation||e.animationBuilder||n.b.get("navAnimation");return await Object(c.e)(Object.assign({mode:r,animated:s,animationBuilder:a,enteringEl:t,leavingEl:o,baseEl:i,progressCallback:e.progressAnimation?t=>this.ani=t:void 0},e)),this.ionNavDidChange.emit(),!0}async lock(){const t=this.waitPromise;let o;return this.waitPromise=new Promise(t=>o=t),void 0!==t&&await t,o}render(){return Object(i.i)("slot",null)}get el(){return Object(i.f)(this)}static get watchers(){return{swipeHandler:["swipeHandlerChanged"]}}static get style(){return":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:layout size style;overflow:hidden;z-index:0}"}},j=class{constructor(t){Object(i.k)(this,t),this.ionStyle=Object(i.e)(this,"ionStyle",7)}sizeChanged(){this.emitStyle()}connectedCallback(){this.emitStyle()}emitStyle(){const t=this.getSize();this.ionStyle.emit({[`title-${t}`]:!0})}getSize(){return void 0!==this.size?this.size:"default"}render(){const t=Object(i.d)(this),o=this.getSize();return Object(i.i)(i.a,{class:Object.assign({[t]:!0,[`title-${o}`]:!0},Object(a.a)(this.color))},Object(i.i)("div",{class:"toolbar-title"},Object(i.i)("slot",null)))}get el(){return Object(i.f)(this)}static get watchers(){return{size:["sizeChanged"]}}static get style(){return":host{--color:initial;display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center;-webkit-transform:translateZ(0);transform:translateZ(0);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}.toolbar-title{display:block;width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;pointer-events:auto}:host(.title-small) .toolbar-title{white-space:normal}:host{padding-left:20px;padding-right:20px;padding-top:0;padding-bottom:0;font-size:20px;font-weight:500;letter-spacing:.0125em}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:20px;padding-inline-end:20px}}:host(.title-small){width:100%;height:100%;font-size:15px;font-weight:400}"}},O=class{constructor(t){Object(i.k)(this,t),this.childrenStyles=new Map}componentWillLoad(){const t=Array.from(this.el.querySelectorAll("ion-buttons")),o=t.find(t=>"start"===t.slot);o&&o.classList.add("buttons-first-slot");const e=t.reverse(),i=e.find(t=>"end"===t.slot)||e.find(t=>"primary"===t.slot)||e.find(t=>"secondary"===t.slot);i&&i.classList.add("buttons-last-slot")}childrenStyle(t){t.stopPropagation();const o=t.target.tagName,e=t.detail,i={},n=this.childrenStyles.get(o)||{};let r=!1;Object.keys(e).forEach(t=>{const o=`toolbar-${t}`,s=e[t];s!==n[o]&&(r=!0),s&&(i[o]=!0)}),r&&(this.childrenStyles.set(o,i),this.el.forceUpdate())}render(){const t=Object(i.d)(this),o={};return this.childrenStyles.forEach(t=>{Object.assign(o,t)}),Object(i.i)(i.a,{class:Object.assign(Object.assign({"in-toolbar":Object(a.c)("ion-toolbar",this.el),[t]:!0},o),Object(a.a)(this.color))},Object(i.i)("div",{class:"toolbar-background"}),Object(i.i)("div",{class:"toolbar-container"},Object(i.i)("slot",{name:"start"}),Object(i.i)("slot",{name:"secondary"}),Object(i.i)("div",{class:"toolbar-content"},Object(i.i)("slot",null)),Object(i.i)("slot",{name:"primary"}),Object(i.i)("slot",{name:"end"})))}get el(){return Object(i.f)(this)}static get style(){return":host{--border-width:0;--border-style:solid;--opacity:1;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;padding-left:var(--ion-safe-area-left);padding-right:var(--ion-safe-area-right);display:block;position:relative;width:100%;color:var(--color);font-family:var(--ion-font-family,inherit);contain:content;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-safe-area-left);padding-inline-start:var(--ion-safe-area-left);-webkit-padding-end:var(--ion-safe-area-right);padding-inline-end:var(--ion-safe-area-right)}}:host(.ion-color){color:var(--ion-color-contrast)}:host(.ion-color) .toolbar-background{background:var(--ion-color-base)}.toolbar-container{padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;width:100%;min-height:var(--min-height);contain:content;overflow:hidden;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toolbar-container{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.toolbar-background{top:0;-webkit-transform:translateZ(0);transform:translateZ(0);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);contain:strict;opacity:var(--opacity);z-index:-1;pointer-events:none}.toolbar-background,::slotted(ion-progress-bar){left:0;right:0;bottom:0;position:absolute}:host{--background:var(--ion-toolbar-background,var(--ion-background-color,#fff));--color:var(--ion-toolbar-color,var(--ion-text-color,#424242));--border-color:var(--ion-toolbar-border-color,var(--ion-border-color,var(--ion-color-step-150,#c1c4cd)));--padding-top:0;--padding-bottom:0;--padding-start:0;--padding-end:0;--min-height:56px}.toolbar-content{-ms-flex:1;flex:1;-ms-flex-order:3;order:3;min-width:0;max-width:100%}::slotted(ion-segment){min-height:var(--min-height)}::slotted(.buttons-first-slot){margin-left:4px}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted(.buttons-first-slot){margin-left:unset;-webkit-margin-start:4px;margin-inline-start:4px}}::slotted(.buttons-last-slot){margin-right:4px}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted(.buttons-last-slot){margin-right:unset;-webkit-margin-end:4px;margin-inline-end:4px}}::slotted([slot=start]){-ms-flex-order:2;order:2}::slotted([slot=secondary]){-ms-flex-order:4;order:4}::slotted([slot=primary]){-ms-flex-order:5;order:5;text-align:end}::slotted([slot=end]){-ms-flex-order:6;order:6;text-align:end}"}}}}]);