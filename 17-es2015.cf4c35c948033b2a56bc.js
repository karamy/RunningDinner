(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"+5g7":function(l,n,u){"use strict";u.r(n);var e=u("8Y7J");class i{}var o=u("pMnS"),t=u("MKJQ"),s=u("sZkV"),r=u("iInd"),a=u("SVse"),b=u("TdWN");class c{constructor(l){this.permServ=l}ionViewDidEnter(){this.permServ.hasGpsPermission().then(()=>{this.permissionGranted="true",console.log("Permesso dato")},l=>{"not_requested"===l||"not_determined"===l||"denied_once"===l?(this.permissionGranted="false",console.log(this.permissionGranted)):(this.permissionGranted="settings",console.log(this.permissionGranted))})}requestPermission(){this.permServ.requestGpsPermission().then(()=>{this.permissionGranted="true"},l=>{console.log("Status ritornato: "+l),"denied_once"!==l&&(this.permissionGranted="settings")})}forcePermissions(){this.permServ.forcePermissions().then(()=>{console.log("resolved"),this.permServ.hasGpsPermission().then(()=>{this.permissionGranted="true"}).catch(()=>{console.log("Permission Denied")})}).catch(()=>{console.log("rejected")})}}var p=e.nb({encapsulation:0,styles:[["ion-img[_ngcontent-%COMP%]{width:100%}ion-item[_ngcontent-%COMP%]{--inner-padding-end:0px;--padding-start:0px}"]],data:{}});function d(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,2,"ion-item",[["lines","none"]],null,null,null,t.Q,t.p)),e.ob(1,49152,null,0,s.F,[e.h,e.k,e.x],{lines:[0,"lines"]},null),(l()(),e.pb(2,0,null,0,0,"img",[["src","assets/location_granted.png"]],null,null,null,null,null))],(function(l,n){l(n,1,0,"none")}),null)}function g(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,2,"ion-item",[["lines","none"]],null,null,null,t.Q,t.p)),e.ob(1,49152,null,0,s.F,[e.h,e.k,e.x],{lines:[0,"lines"]},null),(l()(),e.pb(2,0,null,0,0,"img",[["src","assets/location_not_granted.png"]],null,null,null,null,null))],(function(l,n){l(n,1,0,"none")}),null)}function f(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,3,"div",[["style","padding:2rem"]],null,null,null,null,null)),(l()(),e.Fb(-1,null,[" Consenti la localizzazione cos\xec posso consigliarti le cene pi\xf9 vicine e guidarti durante la tua "])),(l()(),e.pb(2,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),e.Fb(-1,null,["Running Dinner!"]))],null,null)}function m(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,3,"div",[["style","padding:2rem"]],null,null,null,null,null)),(l()(),e.Fb(-1,null,[" Purtroppo la localizzazione \xe8 obbligatoria per poterti guidare durante la tua "])),(l()(),e.pb(2,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),e.Fb(-1,null,["Running Dinner!"]))],null,null)}function h(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,1,"div",[["style","padding:2rem"]],null,null,null,null,null)),(l()(),e.Fb(-1,null,[" Accedi alle impostazioni per attivarla "]))],null,null)}function k(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,1,"div",[["style","font-weight:bold"]],null,null,null,null,null)),(l()(),e.Fb(-1,null,[" GRANDE! "]))],null,null)}function z(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,3,"div",[["style","padding:2rem"]],null,null,null,null,null)),(l()(),e.Fb(-1,null,[" Sei quasi pronto per iniziare la tua prima "])),(l()(),e.pb(2,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),e.Fb(-1,null,["Running Dinner!"]))],null,null)}function G(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,4,"ion-button",[["color","secondary"],["expand","block"],["fill","solid"],["routerLink","/auth/notification"],["size","large"]],null,[[null,"click"]],(function(l,n,u){var i=!0;return"click"===n&&(i=!1!==e.Bb(l,2).onClick()&&i),"click"===n&&(i=!1!==e.Bb(l,3).onClick(u)&&i),i}),t.E,t.d)),e.ob(1,49152,null,0,s.i,[e.h,e.k,e.x],{color:[0,"color"],expand:[1,"expand"],fill:[2,"fill"],size:[3,"size"]},null),e.ob(2,16384,null,0,r.n,[r.m,r.a,[8,null],e.B,e.k],{routerLink:[0,"routerLink"]},null),e.ob(3,737280,null,0,s.Gb,[a.g,s.Db,e.k,r.m,[2,r.n]],null,null),(l()(),e.Fb(-1,0,[" CONTINUA "]))],(function(l,n){l(n,1,0,"secondary","block","solid","large"),l(n,2,0,"/auth/notification"),l(n,3,0)}),null)}function x(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,2,"ion-button",[["color","secondary"],["expand","block"],["fill","solid"],["size","large"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.requestPermission()&&e),e}),t.E,t.d)),e.ob(1,49152,null,0,s.i,[e.h,e.k,e.x],{color:[0,"color"],expand:[1,"expand"],fill:[2,"fill"],size:[3,"size"]},null),(l()(),e.Fb(-1,0,[" CONSENTI GEOLOCALIZZAZIONE "]))],(function(l,n){l(n,1,0,"secondary","block","solid","large")}),null)}function I(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,2,"ion-button",[["color","secondary"],["expand","block"],["fill","solid"],["size","large"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.forcePermissions()&&e),e}),t.E,t.d)),e.ob(1,49152,null,0,s.i,[e.h,e.k,e.x],{color:[0,"color"],expand:[1,"expand"],fill:[2,"fill"],size:[3,"size"]},null),(l()(),e.Fb(-1,0,[" VAI A IMPOSTAZIONI "]))],(function(l,n){l(n,1,0,"secondary","block","solid","large")}),null)}function v(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,27,"ion-content",[],null,null,null,t.I,t.h)),e.ob(1,49152,null,0,s.s,[e.h,e.k,e.x],null,null),(l()(),e.pb(2,0,null,0,25,"ion-grid",[["style","padding:0rem"]],null,null,null,t.L,t.k)),e.ob(3,49152,null,0,s.y,[e.h,e.k,e.x],null,null),(l()(),e.pb(4,0,null,0,7,"ion-row",[["class","ion-align-self-center ion-align-items-center"],["style","padding:0rem"]],null,null,null,t.T,t.s)),e.ob(5,49152,null,0,s.eb,[e.h,e.k,e.x],null,null),(l()(),e.pb(6,0,null,0,5,"ion-col",[["class","ion-align-self-center"],["size-md","6"],["size-sm","12"],["size-xs","12"],["style","padding:0rem"]],null,null,null,t.H,t.g)),e.ob(7,49152,null,0,s.r,[e.h,e.k,e.x],null,null),(l()(),e.eb(16777216,null,0,1,null,d)),e.ob(9,16384,null,0,a.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.eb(16777216,null,0,1,null,g)),e.ob(11,16384,null,0,a.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.pb(12,0,null,0,15,"ion-row",[],null,null,null,t.T,t.s)),e.ob(13,49152,null,0,s.eb,[e.h,e.k,e.x],null,null),(l()(),e.pb(14,0,null,0,13,"ion-col",[["class","ion-align-self-center ion-text-center"],["size-md","6"],["size-sm","12"],["size-xs","12"],["style","padding:2rem"]],null,null,null,t.H,t.g)),e.ob(15,49152,null,0,s.r,[e.h,e.k,e.x],null,null),(l()(),e.eb(16777216,null,0,1,null,f)),e.ob(17,16384,null,0,a.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.eb(16777216,null,0,1,null,m)),e.ob(19,16384,null,0,a.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.pb(20,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),e.eb(16777216,null,0,1,null,h)),e.ob(22,16384,null,0,a.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.eb(16777216,null,0,1,null,k)),e.ob(24,16384,null,0,a.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.pb(25,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),e.eb(16777216,null,0,1,null,z)),e.ob(27,16384,null,0,a.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.pb(28,0,null,null,9,"ion-footer",[],null,null,null,t.K,t.j)),e.ob(29,49152,null,0,s.x,[e.h,e.k,e.x],null,null),(l()(),e.pb(30,0,null,0,7,"ion-toolbar",[["position","bottom"]],null,null,null,t.bb,t.A)),e.ob(31,49152,null,0,s.xb,[e.h,e.k,e.x],null,null),(l()(),e.eb(16777216,null,0,1,null,G)),e.ob(33,16384,null,0,a.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.eb(16777216,null,0,1,null,x)),e.ob(35,16384,null,0,a.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.eb(16777216,null,0,1,null,I)),e.ob(37,16384,null,0,a.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null)],(function(l,n){var u=n.component;l(n,9,0,"true"===u.permissionGranted),l(n,11,0,"false"===u.permissionGranted||"settings"===u.permissionGranted),l(n,17,0,"false"===u.permissionGranted),l(n,19,0,"settings"===u.permissionGranted),l(n,22,0,"settings"===u.permissionGranted),l(n,24,0,"true"===u.permissionGranted),l(n,27,0,"true"===u.permissionGranted),l(n,33,0,"true"===u.permissionGranted),l(n,35,0,"false"===u.permissionGranted),l(n,37,0,"settings"===u.permissionGranted)}),null)}function y(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,1,"app-geolocation",[],null,null,null,v,p)),e.ob(1,49152,null,0,c,[b.a],null,null)],null,null)}var F=e.lb("app-geolocation",c,y,{},{},[]),M=u("s7LF");class P{}u.d(n,"GeolocationPageModuleNgFactory",(function(){return J}));var J=e.mb(i,[],(function(l){return e.yb([e.zb(512,e.j,e.X,[[8,[o.a,F]],[3,e.j],e.v]),e.zb(4608,a.k,a.j,[e.s,[2,a.q]]),e.zb(4608,M.i,M.i,[]),e.zb(4608,s.a,s.a,[e.x,e.g]),e.zb(4608,s.Cb,s.Cb,[s.a,e.j,e.p]),e.zb(4608,s.Fb,s.Fb,[s.a,e.j,e.p]),e.zb(1073742336,a.b,a.b,[]),e.zb(1073742336,M.h,M.h,[]),e.zb(1073742336,M.a,M.a,[]),e.zb(1073742336,s.zb,s.zb,[]),e.zb(1073742336,r.o,r.o,[[2,r.t],[2,r.m]]),e.zb(1073742336,P,P,[]),e.zb(1073742336,i,i,[]),e.zb(1024,r.k,(function(){return[[{path:"",component:c}]]}),[])])}))}}]);