(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{"+5g7":function(l,n,u){"use strict";u.r(n);var e=u("CcnG"),i=function(){return function(){}}(),o=u("pMnS"),t=u("MKJQ"),r=u("jy/b"),s=u("ZYCi"),b=u("Ip0R"),c=u("TdWN"),a=function(){function l(l){this.permServ=l}return l.prototype.ionViewDidEnter=function(){var l=this;this.permServ.hasGpsPermission().then((function(){l.permissionGranted="true",console.log("Permesso dato")}),(function(n){"not_requested"===n||"not_determined"===n||"denied_once"===n?(l.permissionGranted="false",console.log(l.permissionGranted)):(l.permissionGranted="settings",console.log(l.permissionGranted))}))},l.prototype.requestPermission=function(){var l=this;this.permServ.requestGpsPermission().then((function(){l.permissionGranted="true"}),(function(n){console.log("Status ritornato: "+n),"denied_once"!==n&&(l.permissionGranted="settings")}))},l.prototype.forcePermissions=function(){var l=this;this.permServ.forcePermissions().then((function(){console.log("resolved"),l.permServ.hasGpsPermission().then((function(){l.permissionGranted="true"})).catch((function(){console.log("Permission Denied")}))})).catch((function(){console.log("rejected")}))},l}(),p=e.nb({encapsulation:0,styles:[["ion-img[_ngcontent-%COMP%]{width:100%}ion-item[_ngcontent-%COMP%]{--inner-padding-end:0px;--padding-start:0px}"]],data:{}});function d(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,2,"ion-item",[["lines","none"]],null,null,null,t.U,t.p)),e.ob(1,49152,null,0,r.G,[e.h,e.k,e.x],{lines:[0,"lines"]},null),(l()(),e.pb(2,0,null,0,0,"img",[["src","assets/location_granted.png"]],null,null,null,null,null))],(function(l,n){l(n,1,0,"none")}),null)}function f(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,2,"ion-item",[["lines","none"]],null,null,null,t.U,t.p)),e.ob(1,49152,null,0,r.G,[e.h,e.k,e.x],{lines:[0,"lines"]},null),(l()(),e.pb(2,0,null,0,0,"img",[["src","assets/location_not_granted.png"]],null,null,null,null,null))],(function(l,n){l(n,1,0,"none")}),null)}function g(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,3,"div",[["style","padding:2rem"]],null,null,null,null,null)),(l()(),e.Fb(-1,null,[" Consenti la localizzazione così posso consigliarti le cene più vicine e guidarti durante la tua "])),(l()(),e.pb(2,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),e.Fb(-1,null,["Running Dinner!"]))],null,null)}function m(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,3,"div",[["style","padding:2rem"]],null,null,null,null,null)),(l()(),e.Fb(-1,null,[" Purtroppo la localizzazione è obbligatoria per poterti guidare durante la tua "])),(l()(),e.pb(2,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),e.Fb(-1,null,["Running Dinner!"]))],null,null)}function G(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,1,"div",[["style","padding:2rem"]],null,null,null,null,null)),(l()(),e.Fb(-1,null,[" Accedi alle impostazioni per attivarla "]))],null,null)}function k(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,1,"div",[["style","font-weight:bold"]],null,null,null,null,null)),(l()(),e.Fb(-1,null,[" GRANDE! "]))],null,null)}function z(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,3,"div",[["style","padding:2rem"]],null,null,null,null,null)),(l()(),e.Fb(-1,null,[" Sei quasi pronto per iniziare la tua prima "])),(l()(),e.pb(2,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),e.Fb(-1,null,["Running Dinner!"]))],null,null)}function h(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,4,"ion-button",[["color","secondary"],["expand","block"],["fill","solid"],["routerLink","/auth/notification"],["size","large"]],null,[[null,"click"]],(function(l,n,u){var i=!0;return"click"===n&&(i=!1!==e.Bb(l,2).onClick()&&i),"click"===n&&(i=!1!==e.Bb(l,3).onClick(u)&&i),i}),t.I,t.d)),e.ob(1,49152,null,0,r.j,[e.h,e.k,e.x],{color:[0,"color"],expand:[1,"expand"],fill:[2,"fill"],size:[3,"size"]},null),e.ob(2,16384,null,0,s.n,[s.m,s.a,[8,null],e.B,e.k],{routerLink:[0,"routerLink"]},null),e.ob(3,737280,null,0,r.Hb,[b.g,r.Eb,e.k,s.m,[2,s.n]],null,null),(l()(),e.Fb(-1,0,[" CONTINUA "]))],(function(l,n){l(n,1,0,"secondary","block","solid","large"),l(n,2,0,"/auth/notification"),l(n,3,0)}),null)}function I(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,2,"ion-button",[["color","secondary"],["expand","block"],["fill","solid"],["size","large"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.requestPermission()&&e),e}),t.I,t.d)),e.ob(1,49152,null,0,r.j,[e.h,e.k,e.x],{color:[0,"color"],expand:[1,"expand"],fill:[2,"fill"],size:[3,"size"]},null),(l()(),e.Fb(-1,0,[" CONSENTI GEOLOCALIZZAZIONE "]))],(function(l,n){l(n,1,0,"secondary","block","solid","large")}),null)}function x(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,2,"ion-button",[["color","secondary"],["expand","block"],["fill","solid"],["size","large"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.forcePermissions()&&e),e}),t.I,t.d)),e.ob(1,49152,null,0,r.j,[e.h,e.k,e.x],{color:[0,"color"],expand:[1,"expand"],fill:[2,"fill"],size:[3,"size"]},null),(l()(),e.Fb(-1,0,[" VAI A IMPOSTAZIONI "]))],(function(l,n){l(n,1,0,"secondary","block","solid","large")}),null)}function v(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,27,"ion-content",[],null,null,null,t.M,t.h)),e.ob(1,49152,null,0,r.t,[e.h,e.k,e.x],null,null),(l()(),e.pb(2,0,null,0,25,"ion-grid",[["style","padding:0rem"]],null,null,null,t.P,t.k)),e.ob(3,49152,null,0,r.z,[e.h,e.k,e.x],null,null),(l()(),e.pb(4,0,null,0,7,"ion-row",[["class","ion-align-self-center ion-align-items-center"],["style","padding:0rem"]],null,null,null,t.Z,t.u)),e.ob(5,49152,null,0,r.fb,[e.h,e.k,e.x],null,null),(l()(),e.pb(6,0,null,0,5,"ion-col",[["class","ion-align-self-center"],["size-md","6"],["size-sm","12"],["size-xs","12"],["style","padding:0rem"]],null,null,null,t.L,t.g)),e.ob(7,49152,null,0,r.s,[e.h,e.k,e.x],null,null),(l()(),e.eb(16777216,null,0,1,null,d)),e.ob(9,16384,null,0,b.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.eb(16777216,null,0,1,null,f)),e.ob(11,16384,null,0,b.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.pb(12,0,null,0,15,"ion-row",[],null,null,null,t.Z,t.u)),e.ob(13,49152,null,0,r.fb,[e.h,e.k,e.x],null,null),(l()(),e.pb(14,0,null,0,13,"ion-col",[["class","ion-align-self-center ion-text-center"],["size-md","6"],["size-sm","12"],["size-xs","12"],["style","padding:2rem"]],null,null,null,t.L,t.g)),e.ob(15,49152,null,0,r.s,[e.h,e.k,e.x],null,null),(l()(),e.eb(16777216,null,0,1,null,g)),e.ob(17,16384,null,0,b.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.eb(16777216,null,0,1,null,m)),e.ob(19,16384,null,0,b.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.pb(20,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),e.eb(16777216,null,0,1,null,G)),e.ob(22,16384,null,0,b.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.eb(16777216,null,0,1,null,k)),e.ob(24,16384,null,0,b.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.pb(25,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),e.eb(16777216,null,0,1,null,z)),e.ob(27,16384,null,0,b.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.pb(28,0,null,null,9,"ion-footer",[],null,null,null,t.O,t.j)),e.ob(29,49152,null,0,r.y,[e.h,e.k,e.x],null,null),(l()(),e.pb(30,0,null,0,7,"ion-toolbar",[["position","bottom"]],null,null,null,t.jb,t.E)),e.ob(31,49152,null,0,r.yb,[e.h,e.k,e.x],null,null),(l()(),e.eb(16777216,null,0,1,null,h)),e.ob(33,16384,null,0,b.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.eb(16777216,null,0,1,null,I)),e.ob(35,16384,null,0,b.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.eb(16777216,null,0,1,null,x)),e.ob(37,16384,null,0,b.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null)],(function(l,n){var u=n.component;l(n,9,0,"true"===u.permissionGranted),l(n,11,0,"false"===u.permissionGranted||"settings"===u.permissionGranted),l(n,17,0,"false"===u.permissionGranted),l(n,19,0,"settings"===u.permissionGranted),l(n,22,0,"settings"===u.permissionGranted),l(n,24,0,"true"===u.permissionGranted),l(n,27,0,"true"===u.permissionGranted),l(n,33,0,"true"===u.permissionGranted),l(n,35,0,"false"===u.permissionGranted),l(n,37,0,"settings"===u.permissionGranted)}),null)}function y(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,1,"app-geolocation",[],null,null,null,v,p)),e.ob(1,49152,null,0,a,[c.a],null,null)],null,null)}var M=e.lb("app-geolocation",a,y,{},{},[]),P=u("gIcY"),J=function(){return function(){}}();u.d(n,"GeolocationPageModuleNgFactory",(function(){return j}));var j=e.mb(i,[],(function(l){return e.yb([e.zb(512,e.j,e.X,[[8,[o.a,M]],[3,e.j],e.v]),e.zb(4608,b.k,b.j,[e.s,[2,b.r]]),e.zb(4608,P.i,P.i,[]),e.zb(4608,r.b,r.b,[e.x,e.g]),e.zb(4608,r.Db,r.Db,[r.b,e.j,e.p]),e.zb(4608,r.Gb,r.Gb,[r.b,e.j,e.p]),e.zb(1073742336,b.b,b.b,[]),e.zb(1073742336,P.h,P.h,[]),e.zb(1073742336,P.a,P.a,[]),e.zb(1073742336,r.Ab,r.Ab,[]),e.zb(1073742336,s.o,s.o,[[2,s.t],[2,s.m]]),e.zb(1073742336,J,J,[]),e.zb(1073742336,i,i,[]),e.zb(1024,s.k,(function(){return[[{path:"",component:a}]]}),[])])}))}}]);