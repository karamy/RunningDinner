(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{"+5g7":function(n,l,e){"use strict";e.r(l);var u=e("CcnG"),i=function(){return function(){}}(),o=e("pMnS"),t=e("MKJQ"),r=e("jy/b"),d=e("ZYCi"),a=e("Ip0R"),s=e("TdWN"),c=function(){function n(n){this.permServ=n}return n.prototype.ionViewDidEnter=function(){var n=this;this.permServ.hasGpsPermission().then((function(){n.permissionGranted="true",console.log("Permesso dato")}),(function(l){"not_requested"===l||"not_determined"===l||"denied_once"===l?(n.permissionGranted="false",console.log(n.permissionGranted)):(n.permissionGranted="settings",console.log(n.permissionGranted))}))},n.prototype.requestPermission=function(){var n=this;this.permServ.requestGpsPermission().then((function(){n.permissionGranted="true"}),(function(l){console.log("Status ritornato: "+l),"denied_once"!==l&&(n.permissionGranted="settings")}))},n.prototype.forcePermissions=function(){var n=this;this.permServ.forcePermissions().then((function(){console.log("resolved"),n.permServ.hasGpsPermission().then((function(){n.permissionGranted="true"})).catch((function(){console.log("Permission Denied")}))})).catch((function(){console.log("rejected")}))},n}(),f=u["ɵcrt"]({encapsulation:0,styles:[["ion-img[_ngcontent-%COMP%]{width:100%}ion-item[_ngcontent-%COMP%]{--inner-padding-end:0px;--padding-start:0px}"]],data:{}});function g(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,0,null,null,2,"ion-item",[["lines","none"]],null,null,null,t.nb,t.u)),u["ɵdid"](1,49152,null,0,r.G,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],{lines:[0,"lines"]},null),(n()(),u["ɵeld"](2,0,null,0,0,"img",[["src","assets/location_granted.png"]],null,null,null,null,null))],(function(n,l){n(l,1,0,"none")}),null)}function p(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,0,null,null,2,"ion-item",[["lines","none"]],null,null,null,t.nb,t.u)),u["ɵdid"](1,49152,null,0,r.G,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],{lines:[0,"lines"]},null),(n()(),u["ɵeld"](2,0,null,0,0,"img",[["src","assets/location_not_granted.png"]],null,null,null,null,null))],(function(n,l){n(l,1,0,"none")}),null)}function m(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,0,null,null,3,"div",[["style","padding:2rem"]],null,null,null,null,null)),(n()(),u["ɵted"](-1,null,[" Consenti la localizzazione così posso consigliarti le cene più vicine e guidarti durante la tua "])),(n()(),u["ɵeld"](2,0,null,null,1,"b",[],null,null,null,null,null)),(n()(),u["ɵted"](-1,null,["Running Dinner!"]))],null,null)}function R(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,0,null,null,3,"div",[["style","padding:2rem"]],null,null,null,null,null)),(n()(),u["ɵted"](-1,null,[" Purtroppo la localizzazione è obbligatoria per poterti guidare durante la tua "])),(n()(),u["ɵeld"](2,0,null,null,1,"b",[],null,null,null,null,null)),(n()(),u["ɵted"](-1,null,["Running Dinner!"]))],null,null)}function b(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,0,null,null,1,"div",[["style","padding:2rem"]],null,null,null,null,null)),(n()(),u["ɵted"](-1,null,[" Accedi alle impostazioni per attivarla "]))],null,null)}function I(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,0,null,null,1,"div",[["style","font-weight:bold"]],null,null,null,null,null)),(n()(),u["ɵted"](-1,null,[" GRANDE! "]))],null,null)}function v(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,0,null,null,3,"div",[["style","padding:2rem"]],null,null,null,null,null)),(n()(),u["ɵted"](-1,null,[" Sei quasi pronto per iniziare la tua prima "])),(n()(),u["ɵeld"](2,0,null,null,1,"b",[],null,null,null,null,null)),(n()(),u["ɵted"](-1,null,["Running Dinner!"]))],null,null)}function C(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,0,null,null,4,"ion-button",[["color","secondary"],["expand","block"],["fill","solid"],["routerLink","/auth/notification"],["size","large"]],null,[[null,"click"]],(function(n,l,e){var i=!0;return"click"===l&&(i=!1!==u["ɵnov"](n,2).onClick()&&i),"click"===l&&(i=!1!==u["ɵnov"](n,3).onClick(e)&&i),i}),t.T,t.d)),u["ɵdid"](1,49152,null,0,r.j,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],{color:[0,"color"],expand:[1,"expand"],fill:[2,"fill"],size:[3,"size"]},null),u["ɵdid"](2,16384,null,0,d.o,[d.n,d.a,[8,null],u.Renderer2,u.ElementRef],{routerLink:[0,"routerLink"]},null),u["ɵdid"](3,737280,null,0,r.Hb,[a.LocationStrategy,r.Eb,u.ElementRef,d.n,[2,d.o]],null,null),(n()(),u["ɵted"](-1,0,[" CONTINUA "]))],(function(n,l){n(l,1,0,"secondary","block","solid","large"),n(l,2,0,"/auth/notification"),n(l,3,0)}),null)}function N(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,0,null,null,2,"ion-button",[["color","secondary"],["expand","block"],["fill","solid"],["size","large"]],null,[[null,"click"]],(function(n,l,e){var u=!0;return"click"===l&&(u=!1!==n.component.requestPermission()&&u),u}),t.T,t.d)),u["ɵdid"](1,49152,null,0,r.j,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],{color:[0,"color"],expand:[1,"expand"],fill:[2,"fill"],size:[3,"size"]},null),(n()(),u["ɵted"](-1,0,[" CONSENTI GEOLOCALIZZAZIONE "]))],(function(n,l){n(l,1,0,"secondary","block","solid","large")}),null)}function h(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,0,null,null,2,"ion-button",[["color","secondary"],["expand","block"],["fill","solid"],["size","large"]],null,[[null,"click"]],(function(n,l,e){var u=!0;return"click"===l&&(u=!1!==n.component.forcePermissions()&&u),u}),t.T,t.d)),u["ɵdid"](1,49152,null,0,r.j,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],{color:[0,"color"],expand:[1,"expand"],fill:[2,"fill"],size:[3,"size"]},null),(n()(),u["ɵted"](-1,0,[" VAI A IMPOSTAZIONI "]))],(function(n,l){n(l,1,0,"secondary","block","solid","large")}),null)}function G(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,0,null,null,27,"ion-content",[],null,null,null,t.ab,t.k)),u["ɵdid"](1,49152,null,0,r.t,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],null,null),(n()(),u["ɵeld"](2,0,null,0,25,"ion-grid",[["style","padding:0rem"]],null,null,null,t.db,t.n)),u["ɵdid"](3,49152,null,0,r.z,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],null,null),(n()(),u["ɵeld"](4,0,null,0,7,"ion-row",[["class","ion-align-self-center ion-align-items-center"],["style","padding:0rem"]],null,null,null,t.tb,t.D)),u["ɵdid"](5,49152,null,0,r.fb,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],null,null),(n()(),u["ɵeld"](6,0,null,0,5,"ion-col",[["class","ion-align-self-center"],["size-md","6"],["size-sm","12"],["size-xs","12"],["style","padding:0rem"]],null,null,null,t.Z,t.j)),u["ɵdid"](7,49152,null,0,r.s,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],null,null),(n()(),u["ɵand"](16777216,null,0,1,null,g)),u["ɵdid"](9,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵand"](16777216,null,0,1,null,p)),u["ɵdid"](11,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵeld"](12,0,null,0,15,"ion-row",[],null,null,null,t.tb,t.D)),u["ɵdid"](13,49152,null,0,r.fb,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],null,null),(n()(),u["ɵeld"](14,0,null,0,13,"ion-col",[["class","ion-align-self-center ion-text-center"],["size-md","6"],["size-sm","12"],["size-xs","12"],["style","padding:2rem"]],null,null,null,t.Z,t.j)),u["ɵdid"](15,49152,null,0,r.s,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],null,null),(n()(),u["ɵand"](16777216,null,0,1,null,m)),u["ɵdid"](17,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵand"](16777216,null,0,1,null,R)),u["ɵdid"](19,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵeld"](20,0,null,0,0,"br",[],null,null,null,null,null)),(n()(),u["ɵand"](16777216,null,0,1,null,b)),u["ɵdid"](22,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵand"](16777216,null,0,1,null,I)),u["ɵdid"](24,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵeld"](25,0,null,0,0,"br",[],null,null,null,null,null)),(n()(),u["ɵand"](16777216,null,0,1,null,v)),u["ɵdid"](27,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵeld"](28,0,null,null,9,"ion-footer",[],null,null,null,t.cb,t.m)),u["ɵdid"](29,49152,null,0,r.y,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],null,null),(n()(),u["ɵeld"](30,0,null,0,7,"ion-toolbar",[["position","bottom"]],null,null,null,t.Fb,t.P)),u["ɵdid"](31,49152,null,0,r.yb,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],null,null),(n()(),u["ɵand"](16777216,null,0,1,null,C)),u["ɵdid"](33,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵand"](16777216,null,0,1,null,N)),u["ɵdid"](35,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵand"](16777216,null,0,1,null,h)),u["ɵdid"](37,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,9,0,"true"===e.permissionGranted),n(l,11,0,"false"===e.permissionGranted||"settings"===e.permissionGranted),n(l,17,0,"false"===e.permissionGranted),n(l,19,0,"settings"===e.permissionGranted),n(l,22,0,"settings"===e.permissionGranted),n(l,24,0,"true"===e.permissionGranted),n(l,27,0,"true"===e.permissionGranted),n(l,33,0,"true"===e.permissionGranted),n(l,35,0,"false"===e.permissionGranted),n(l,37,0,"settings"===e.permissionGranted)}),null)}function y(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,0,null,null,1,"app-geolocation",[],null,null,null,G,f)),u["ɵdid"](1,49152,null,0,c,[s.a],null,null)],null,null)}var z=u["ɵccf"]("app-geolocation",c,y,{},{},[]),k=e("gIcY"),D=function(){return function(){}}();e.d(l,"GeolocationPageModuleNgFactory",(function(){return E}));var E=u["ɵcmf"](i,[],(function(n){return u["ɵmod"]([u["ɵmpd"](512,u.ComponentFactoryResolver,u["ɵCodegenComponentFactoryResolver"],[[8,[o.a,z]],[3,u.ComponentFactoryResolver],u.NgModuleRef]),u["ɵmpd"](4608,a.NgLocalization,a.NgLocaleLocalization,[u.LOCALE_ID,[2,a["ɵangular_packages_common_common_a"]]]),u["ɵmpd"](4608,k.l,k.l,[]),u["ɵmpd"](4608,r.b,r.b,[u.NgZone,u.ApplicationRef]),u["ɵmpd"](4608,r.Db,r.Db,[r.b,u.ComponentFactoryResolver,u.Injector]),u["ɵmpd"](4608,r.Gb,r.Gb,[r.b,u.ComponentFactoryResolver,u.Injector]),u["ɵmpd"](1073742336,a.CommonModule,a.CommonModule,[]),u["ɵmpd"](1073742336,k.k,k.k,[]),u["ɵmpd"](1073742336,k.b,k.b,[]),u["ɵmpd"](1073742336,r.Ab,r.Ab,[]),u["ɵmpd"](1073742336,d.p,d.p,[[2,d.u],[2,d.n]]),u["ɵmpd"](1073742336,D,D,[]),u["ɵmpd"](1073742336,i,i,[]),u["ɵmpd"](1024,d.l,(function(){return[[{path:"",component:c}]]}),[])])}))}}]);