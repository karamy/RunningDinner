(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{LnXg:function(l,n,e){"use strict";e.r(n);var t=e("8Y7J");class o{}var u=e("pMnS"),i=e("MKJQ"),a=e("sZkV"),s=e("SVse"),r=e("s7LF"),p=e("qXBG"),c=e("AytR"),b=e("vLlK"),d=e("DP//");class g{constructor(l,n,e,t,o){this.signupService=l,this.render=n,this.zone=e,this.authService=t,this.spinner=o,this.mapPreview=null,this.GoogleAutocomplete=new google.maps.places.AutocompleteService,this.autocomplete={input:""},this.autocompleteItems=[]}onSignup(){this.signupService.setAddress(this.autocomplete.input),this.spinner.create(),this.signupService.signupUser().then(()=>{this.authService.doLogin(this.signupService.getSignupData().phoneNumber)},l=>{alert("Errore registrazione"),this.spinner.dismiss(),this.authService.doLogout(),console.warn(l)})}ngAfterViewInit(){this.getGoogleMaps().then(l=>{if(this.mapElementRef){const n=this.mapElementRef.nativeElement,e=new l.Map(n,{center:{lat:44.5464311,lng:7.7184579},zoom:16});l.event.addListenerOnce(e,"idle",()=>{this.render.addClass(n,"visible")})}}).catch(l=>{console.log(l)})}getGoogleMaps(){const l=window,n=l.google;return n&&n.maps?Promise.resolve(n.maps):new Promise((n,e)=>{const t=document.createElement("script");t.src=`https://maps.googleapis.com/maps/api/js?key=${c.a.googleMapsAPIKey}`,t.async=!0,t.defer=!0,document.body.appendChild(t),t.onload=()=>{const t=l.google;t&&t.maps?n(t.maps):e("Google maps SDK not available")}})}updateSearchResults(){""!==this.autocomplete.input?this.GoogleAutocomplete.getPlacePredictions({input:this.autocomplete.input},l=>{this.autocompleteItems=[],this.zone.run(()=>{l&&l.forEach(l=>{this.autocompleteItems.push(l)})})}):this.autocompleteItems=[]}selectSearchResult(l){console.log(l),this.autocompleteItems=[],this.autocomplete.input=l.description,this.getMapImage(l.description)}getMapImage(l){l&&(this.mapPreview=`https://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=roadmap\n    &markers=color:red%7Clabel:Place%7C${l}\n    &key=${c.a.googleMapsAPIKey}`)}}var m=t.nb({encapsulation:0,styles:[[".map-preview[_ngcontent-%COMP%]{-webkit-box-pack:center;justify-content:center;width:50%;height:30%;display:-webkit-box;display:flex;margin:2rem auto auto;-webkit-box-align:center;align-items:center;border:3px solid var(--ion-color-secondary);border-radius:2rem}.map[_ngcontent-%COMP%]{-webkit-box-pack:center;justify-content:center;display:-webkit-box;display:flex;margin:2rem auto auto;-webkit-box-align:center;align-items:center;height:40%;width:70%;background-color:transparent;opacity:0;-webkit-transition:opacity 150ms ease-in;transition:opacity 150ms ease-in;border:3px solid var(--ion-color-secondary);border-radius:2rem}.map.visible[_ngcontent-%COMP%]{opacity:1}"]],data:{}});function h(l){return t.Gb(0,[(l()(),t.pb(0,0,null,null,2,"ion-item",[["tappable",""]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.selectSearchResult(l.parent.context.$implicit)&&t),t}),i.Q,i.p)),t.ob(1,49152,null,0,a.F,[t.h,t.k,t.x],null,null),(l()(),t.Fb(2,0,[" "," "]))],null,(function(l,n){l(n,2,0,n.parent.context.$implicit.description)}))}function f(l){return t.Gb(0,[(l()(),t.pb(0,0,null,null,3,"ion-list",[],[[8,"hidden",0]],null,null,i.S,i.r)),t.ob(1,49152,null,0,a.M,[t.h,t.k,t.x],null,null),(l()(),t.eb(16777216,null,0,1,null,h)),t.ob(3,16384,null,0,s.i,[t.M,t.J],{ngIf:[0,"ngIf"]},null)],(function(l,n){l(n,3,0,n.context.index<3)}),(function(l,n){l(n,0,0,0==n.component.autocompleteItems.length)}))}function k(l){return t.Gb(0,[t.Db(671088640,1,{mapElementRef:0}),(l()(),t.pb(1,0,null,null,6,"ion-toolbar",[],null,null,null,i.bb,i.A)),t.ob(2,49152,null,0,a.xb,[t.h,t.k,t.x],null,null),(l()(),t.pb(3,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,i.F,i.e)),t.ob(4,49152,null,0,a.j,[t.h,t.k,t.x],null,null),(l()(),t.pb(5,0,null,0,2,"ion-back-button",[["color","secondary"],["defaultHref","/sign-up/profile-photo"]],null,[[null,"click"]],(function(l,n,e){var o=!0;return"click"===n&&(o=!1!==t.Bb(l,7).onClick(e)&&o),o}),i.D,i.c)),t.ob(6,49152,null,0,a.e,[t.h,t.k,t.x],{color:[0,"color"],defaultHref:[1,"defaultHref"]},null),t.ob(7,16384,null,0,a.f,[[2,a.db],a.Db],{defaultHref:[0,"defaultHref"]},null),(l()(),t.pb(8,0,null,null,22,"ion-content",[],null,null,null,i.I,i.h)),t.ob(9,49152,null,0,a.s,[t.h,t.k,t.x],null,null),(l()(),t.pb(10,0,null,0,15,"ion-item",[],null,null,null,i.Q,i.p)),t.ob(11,49152,null,0,a.F,[t.h,t.k,t.x],null,null),(l()(),t.pb(12,0,null,0,3,"h1",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["My "])),(l()(),t.pb(14,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,[" address is"])),(l()(),t.pb(16,0,null,0,2,"ion-label",[["position","floating"]],null,null,null,i.R,i.q)),t.ob(17,49152,null,0,a.L,[t.h,t.k,t.x],{position:[0,"position"]},null),(l()(),t.Fb(-1,0,["Address"])),(l()(),t.pb(19,0,null,0,6,"ion-input",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"keyup"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,e){var o=!0,u=l.component;return"ionBlur"===n&&(o=!1!==t.Bb(l,20)._handleBlurEvent(e.target)&&o),"ionChange"===n&&(o=!1!==t.Bb(l,20)._handleInputEvent(e.target)&&o),"ngModelChange"===n&&(o=!1!==(u.autocomplete.input=e)&&o),"keyup"===n&&(o=!1!==u.updateSearchResults()&&o),o}),i.P,i.o)),t.ob(20,16384,null,0,a.Ib,[t.k],null,null),t.Cb(1024,null,r.c,(function(l){return[l]}),[a.Ib]),t.ob(22,671744,null,0,r.f,[[8,null],[8,null],[8,null],[6,r.c]],{model:[0,"model"]},{update:"ngModelChange"}),t.Cb(2048,null,r.d,null,[r.f]),t.ob(24,16384,null,0,r.e,[[4,r.d]],null,null),t.ob(25,49152,null,0,a.E,[t.h,t.k,t.x],null,null),(l()(),t.eb(16777216,null,0,1,null,f)),t.ob(27,278528,null,0,s.h,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),(l()(),t.pb(28,0,null,0,0,"img",[["class","map-preview"]],[[8,"hidden",0],[8,"src",4]],null,null,null,null)),(l()(),t.pb(29,0,null,0,1,"ion-row",[["style","height: 10%"]],null,null,null,i.T,i.s)),t.ob(30,49152,null,0,a.eb,[t.h,t.k,t.x],null,null),(l()(),t.pb(31,0,null,null,2,"ion-button",[["color","secondary"],["expand","block"],["fill","outline"],["strong","true"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.onSignup()&&t),t}),i.E,i.d)),t.ob(32,49152,null,0,a.i,[t.h,t.k,t.x],{color:[0,"color"],disabled:[1,"disabled"],expand:[2,"expand"],fill:[3,"fill"],strong:[4,"strong"]},null),(l()(),t.Fb(-1,0,["Conferma"]))],(function(l,n){var e=n.component;l(n,6,0,"secondary","/sign-up/profile-photo"),l(n,7,0,"/sign-up/profile-photo"),l(n,17,0,"floating"),l(n,22,0,e.autocomplete.input),l(n,27,0,e.autocompleteItems),l(n,32,0,"secondary",!e.autocomplete.input,"block","outline","true")}),(function(l,n){var e=n.component;l(n,19,0,t.Bb(n,24).ngClassUntouched,t.Bb(n,24).ngClassTouched,t.Bb(n,24).ngClassPristine,t.Bb(n,24).ngClassDirty,t.Bb(n,24).ngClassValid,t.Bb(n,24).ngClassInvalid,t.Bb(n,24).ngClassPending),l(n,28,0,!e.mapPreview,t.tb(1,"",e.mapPreview,""))}))}function v(l){return t.Gb(0,[(l()(),t.pb(0,0,null,null,1,"app-address-map",[],null,null,null,k,m)),t.ob(1,4243456,null,0,g,[b.a,t.B,t.x,p.a,d.a],null,null)],null,null)}var y=t.lb("app-address-map",g,v,{},{},[]),x=e("iInd");class w{}e.d(n,"AddressMapPageModuleNgFactory",(function(){return C}));var C=t.mb(o,[],(function(l){return t.yb([t.zb(512,t.j,t.X,[[8,[u.a,y]],[3,t.j],t.v]),t.zb(4608,s.k,s.j,[t.s,[2,s.q]]),t.zb(4608,r.i,r.i,[]),t.zb(4608,a.a,a.a,[t.x,t.g]),t.zb(4608,a.Cb,a.Cb,[a.a,t.j,t.p]),t.zb(4608,a.Fb,a.Fb,[a.a,t.j,t.p]),t.zb(1073742336,s.b,s.b,[]),t.zb(1073742336,r.h,r.h,[]),t.zb(1073742336,r.a,r.a,[]),t.zb(1073742336,a.zb,a.zb,[]),t.zb(1073742336,x.o,x.o,[[2,x.t],[2,x.m]]),t.zb(1073742336,w,w,[]),t.zb(1073742336,o,o,[]),t.zb(1024,x.k,(function(){return[[{path:"",component:g}]]}),[])])}))}}]);