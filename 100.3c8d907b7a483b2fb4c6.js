(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{"+5g7":function(n,l,e){"use strict";e.r(l);var o=e("CcnG"),t=function(){return function(){}}(),i=e("pMnS"),r=e("MKJQ"),u=e("jy/b"),a=e("ZYCi"),d=e("Ip0R"),s=e("TdWN"),c=function(){function n(n){this.permServ=n}return n.prototype.ionViewDidEnter=function(){var n=this;this.permServ.hasGpsPermission().then((function(){n.permissionGranted="true",console.log("Permesso dato")}),(function(l){"not_requested"===l||"not_determined"===l||"denied_once"===l?(n.permissionGranted="false",console.log(n.permissionGranted)):(n.permissionGranted="settings",console.log(n.permissionGranted))}))},n.prototype.requestPermission=function(){var n=this;this.permServ.requestGpsPermission().then((function(){n.permissionGranted="true"}),(function(l){console.log("Status ritornato: "+l),"denied_once"!==l&&(n.permissionGranted="settings")}))},n.prototype.forcePermissions=function(){var n=this;this.permServ.forcePermissions().then((function(){console.log("resolved"),n.permServ.hasGpsPermission().then((function(){n.permissionGranted="true"})).catch((function(){console.log("Permission Denied")}))})).catch((function(){console.log("rejected")}))},n}(),f=o["ɵcrt"]({encapsulation:0,styles:[[".headerslide[_ngcontent-%COMP%]{width:100%;border-bottom-right-radius:2em;border-bottom-left-radius:2em;background:-webkit-gradient(linear,left top,left bottom,from(#50976a),to(#80c898));background:linear-gradient(to bottom,#50976a,#80c898)}.titleheader[_ngcontent-%COMP%]{font-size:1.5em;color:#fff;width:80%;margin-right:auto;margin-left:auto;text-align:center}.buttonbottom[_ngcontent-%COMP%]{background:-webkit-gradient(linear,left top,left bottom,from(white),to(#e2f4de));background:linear-gradient(to bottom,#fff,#e2f4de);border-radius:.5em;height:10%;box-shadow:0 0 7px 7px #e2f4de;font-size:1.7em;border-width:0;position:absolute;left:0;right:0;margin-left:auto;margin-right:auto}.firstrow[_ngcontent-%COMP%]{height:20%}.secondrow[_ngcontent-%COMP%]{height:70%;-webkit-box-align:center;align-items:center;background:radial-gradient(#80c898,#fff 80%)}.secondrowsecond[_ngcontent-%COMP%]{height:70%;-webkit-box-align:center;align-items:center;background:radial-gradient(#ff817b,#fff 80%)}.thirdrow[_ngcontent-%COMP%]{height:40%;display:-webkit-box;display:flex}ion-grid[_ngcontent-%COMP%]{height:100%!important;width:100%!important}.geolocalization[_ngcontent-%COMP%]{margin:10px}.pulse[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto;-webkit-animation-name:color;animation-name:color;-webkit-animation-duration:3s;animation-duration:3s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;border-radius:6em;width:50%}@-webkit-keyframes color{0%{box-shadow:0 0 0 0 rgba(255,255,255,.7),0 0 0 0 rgba(255,255,255,.7)}40%{box-shadow:0 0 0 50px rgba(255,255,255,0),0 0 0 0 rgba(255,255,255,.7)}80%{box-shadow:0 0 0 50px rgba(255,255,255,0),0 0 0 30px rgba(255,255,255,0)}100%{box-shadow:0 0 0 0 rgba(255,255,255,0),0 0 0 30px rgba(255,255,255,0)}}@keyframes color{0%{box-shadow:0 0 0 0 rgba(255,255,255,.7),0 0 0 0 rgba(255,255,255,.7)}40%{box-shadow:0 0 0 50px rgba(255,255,255,0),0 0 0 0 rgba(255,255,255,.7)}80%{box-shadow:0 0 0 50px rgba(255,255,255,0),0 0 0 30px rgba(255,255,255,0)}100%{box-shadow:0 0 0 0 rgba(255,255,255,0),0 0 0 30px rgba(255,255,255,0)}}"]],data:{}});function g(n){return o["ɵvid"](0,[(n()(),o["ɵeld"](0,0,null,null,1,"h1",[["class","titleheader"]],null,null,null,null,null)),(n()(),o["ɵted"](-1,null,[" Consenti la localizzazione così posso consigliarti le cene più vicine "]))],null,null)}function m(n){return o["ɵvid"](0,[(n()(),o["ɵeld"](0,0,null,null,1,"h1",[["class","titleheader"]],null,null,null,null,null)),(n()(),o["ɵted"](-1,null,[" Purtroppo la localizzazione è obbligatoria, accedi alle impostazioni per attivarla "]))],null,null)}function p(n){return o["ɵvid"](0,[(n()(),o["ɵeld"](0,0,null,null,3,"h1",[["class","titleheader"]],null,null,null,null,null)),(n()(),o["ɵted"](-1,null,[" Pochi passi alla tua prima "])),(n()(),o["ɵeld"](2,0,null,null,1,"b",[],null,null,null,null,null)),(n()(),o["ɵted"](-1,null,["Running Dinner!"]))],null,null)}function b(n){return o["ɵvid"](0,[(n()(),o["ɵeld"](0,0,null,null,4,"ion-button",[["class","buttonbottom"],["expand","block"],["routerLink","/auth/notification"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==o["ɵnov"](n,2).onClick()&&t),"click"===l&&(t=!1!==o["ɵnov"](n,3).onClick(e)&&t),t}),r.T,r.d)),o["ɵdid"](1,49152,null,0,u.j,[o.ChangeDetectorRef,o.ElementRef,o.NgZone],{expand:[0,"expand"]},null),o["ɵdid"](2,16384,null,0,a.o,[a.n,a.a,[8,null],o.Renderer2,o.ElementRef],{routerLink:[0,"routerLink"]},null),o["ɵdid"](3,737280,null,0,u.Hb,[d.LocationStrategy,u.Eb,o.ElementRef,a.n,[2,a.o]],null,null),(n()(),o["ɵted"](-1,0,[" CONTINUA "]))],(function(n,l){n(l,1,0,"block"),n(l,2,0,"/auth/notification"),n(l,3,0)}),null)}function h(n){return o["ɵvid"](0,[(n()(),o["ɵeld"](0,0,null,null,2,"ion-button",[["class","buttonbottom"],["expand","block"]],null,[[null,"click"]],(function(n,l,e){var o=!0;return"click"===l&&(o=!1!==n.component.requestPermission()&&o),o}),r.T,r.d)),o["ɵdid"](1,49152,null,0,u.j,[o.ChangeDetectorRef,o.ElementRef,o.NgZone],{expand:[0,"expand"]},null),(n()(),o["ɵted"](-1,0,[" CONSENTI GEOLOCALIZZAZIONE "]))],(function(n,l){n(l,1,0,"block")}),null)}function C(n){return o["ɵvid"](0,[(n()(),o["ɵeld"](0,0,null,null,2,"ion-button",[["class","buttonbottom"],["expand","block"]],null,[[null,"click"]],(function(n,l,e){var o=!0;return"click"===l&&(o=!1!==n.component.forcePermissions()&&o),o}),r.T,r.d)),o["ɵdid"](1,49152,null,0,u.j,[o.ChangeDetectorRef,o.ElementRef,o.NgZone],{expand:[0,"expand"]},null),(n()(),o["ɵted"](-1,0,[" VAI A IMPOSTAZIONI "]))],(function(n,l){n(l,1,0,"block")}),null)}function w(n){return o["ɵvid"](0,[(n()(),o["ɵeld"](0,0,null,null,25,"ion-content",[["scroll","false"]],null,null,null,r.ab,r.k)),o["ɵdid"](1,49152,null,0,u.t,[o.ChangeDetectorRef,o.ElementRef,o.NgZone],null,null),(n()(),o["ɵeld"](2,0,null,0,23,"ion-grid",[],null,null,null,r.db,r.n)),o["ɵdid"](3,49152,null,0,u.z,[o.ChangeDetectorRef,o.ElementRef,o.NgZone],null,null),(n()(),o["ɵeld"](4,0,null,0,8,"ion-row",[["class","firstrow"]],null,null,null,r.tb,r.D)),o["ɵdid"](5,49152,null,0,u.fb,[o.ChangeDetectorRef,o.ElementRef,o.NgZone],null,null),(n()(),o["ɵeld"](6,0,null,0,6,"div",[["class","headerslide"]],null,null,null,null,null)),(n()(),o["ɵand"](16777216,null,null,1,null,g)),o["ɵdid"](8,16384,null,0,d.NgIf,[o.ViewContainerRef,o.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),o["ɵand"](16777216,null,null,1,null,m)),o["ɵdid"](10,16384,null,0,d.NgIf,[o.ViewContainerRef,o.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),o["ɵand"](16777216,null,null,1,null,p)),o["ɵdid"](12,16384,null,0,d.NgIf,[o.ViewContainerRef,o.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),o["ɵeld"](13,0,null,0,6,"ion-row",[],null,null,null,r.tb,r.D)),o["ɵprd"](512,null,d["ɵNgClassImpl"],d["ɵNgClassR2Impl"],[o.IterableDiffers,o.KeyValueDiffers,o.ElementRef,o.Renderer2]),o["ɵdid"](15,278528,null,0,d.NgClass,[d["ɵNgClassImpl"]],{ngClass:[0,"ngClass"]},null),o["ɵdid"](16,49152,null,0,u.fb,[o.ChangeDetectorRef,o.ElementRef,o.NgZone],null,null),(n()(),o["ɵeld"](17,0,null,0,2,"div",[["class","pulse"]],null,null,null,null,null)),(n()(),o["ɵeld"](18,0,null,null,1,"ion-img",[["class","geolocalization"],["src","assets/geolocalization.svg"]],null,null,null,r.gb,r.q)),o["ɵdid"](19,49152,null,0,u.C,[o.ChangeDetectorRef,o.ElementRef,o.NgZone],{src:[0,"src"]},null),(n()(),o["ɵand"](16777216,null,0,1,null,b)),o["ɵdid"](21,16384,null,0,d.NgIf,[o.ViewContainerRef,o.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),o["ɵand"](16777216,null,0,1,null,h)),o["ɵdid"](23,16384,null,0,d.NgIf,[o.ViewContainerRef,o.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),o["ɵand"](16777216,null,0,1,null,C)),o["ɵdid"](25,16384,null,0,d.NgIf,[o.ViewContainerRef,o.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,8,0,"false"===e.permissionGranted),n(l,10,0,"settings"===e.permissionGranted),n(l,12,0,"true"===e.permissionGranted),n(l,15,0,"true"===e.permissionGranted?"secondrow":"secondrowsecond"),n(l,19,0,"assets/geolocalization.svg"),n(l,21,0,"true"===e.permissionGranted),n(l,23,0,"false"===e.permissionGranted),n(l,25,0,"settings"===e.permissionGranted)}),null)}function R(n){return o["ɵvid"](0,[(n()(),o["ɵeld"](0,0,null,null,1,"app-geolocation",[],null,null,null,w,f)),o["ɵdid"](1,49152,null,0,c,[s.a],null,null)],null,null)}var k=o["ɵccf"]("app-geolocation",c,R,{},{},[]),v=e("gIcY"),I=function(){return function(){}}();e.d(l,"GeolocationPageModuleNgFactory",(function(){return x}));var x=o["ɵcmf"](t,[],(function(n){return o["ɵmod"]([o["ɵmpd"](512,o.ComponentFactoryResolver,o["ɵCodegenComponentFactoryResolver"],[[8,[i.a,k]],[3,o.ComponentFactoryResolver],o.NgModuleRef]),o["ɵmpd"](4608,d.NgLocalization,d.NgLocaleLocalization,[o.LOCALE_ID,[2,d["ɵangular_packages_common_common_a"]]]),o["ɵmpd"](4608,v.l,v.l,[]),o["ɵmpd"](4608,u.b,u.b,[o.NgZone,o.ApplicationRef]),o["ɵmpd"](4608,u.Db,u.Db,[u.b,o.ComponentFactoryResolver,o.Injector]),o["ɵmpd"](4608,u.Gb,u.Gb,[u.b,o.ComponentFactoryResolver,o.Injector]),o["ɵmpd"](1073742336,d.CommonModule,d.CommonModule,[]),o["ɵmpd"](1073742336,v.k,v.k,[]),o["ɵmpd"](1073742336,v.b,v.b,[]),o["ɵmpd"](1073742336,u.Ab,u.Ab,[]),o["ɵmpd"](1073742336,a.p,a.p,[[2,a.u],[2,a.n]]),o["ɵmpd"](1073742336,I,I,[]),o["ɵmpd"](1073742336,t,t,[]),o["ɵmpd"](1024,a.l,(function(){return[[{path:"",component:c}]]}),[])])}))}}]);