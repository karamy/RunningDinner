(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{LnXg:function(n,l,e){"use strict";e.r(l);var t=e("CcnG"),o=function(){return function(){}}(),u=e("pMnS"),i=e("MKJQ"),a=e("jy/b"),r=e("Ip0R"),p=e("gIcY"),s=e("qXBG"),c=e("AytR"),b=e("vLlK"),d=e("DP//"),g=function(){function n(n,l,e,t,o){this.signupService=n,this.render=l,this.zone=e,this.authService=t,this.spinner=o,this.mapPreview=null,this.GoogleAutocomplete=new google.maps.places.AutocompleteService,this.autocomplete={input:""},this.autocompleteItems=[]}return n.prototype.onSignup=function(){var n=this;this.signupService.setAddress(this.autocomplete.input),this.spinner.create("Effettuo login..."),this.signupService.signupUser().then((function(){n.authService.doLogin(n.signupService.getSignupData().phoneNumber)}),(function(l){alert("Errore registrazione"),n.spinner.dismiss(),n.authService.doLogout(),console.warn(l)}))},n.prototype.ngAfterViewInit=function(){var n=this;this.getGoogleMaps().then((function(l){if(n.mapElementRef){var e=n.mapElementRef.nativeElement,t=new l.Map(e,{center:{lat:44.5464311,lng:7.7184579},zoom:16});l.event.addListenerOnce(t,"idle",(function(){n.render.addClass(e,"visible")}))}})).catch((function(n){console.log(n)}))},n.prototype.getGoogleMaps=function(){var n=window,l=n.google;return l&&l.maps?Promise.resolve(l.maps):new Promise((function(l,e){var t=document.createElement("script");t.src="https://maps.googleapis.com/maps/api/js?key="+c.a.googleMapsAPIKey,t.async=!0,t.defer=!0,document.body.appendChild(t),t.onload=function(){var t=n.google;t&&t.maps?l(t.maps):e("Google maps SDK not available")}}))},n.prototype.updateSearchResults=function(){var n=this;""!==this.autocomplete.input?this.GoogleAutocomplete.getPlacePredictions({input:this.autocomplete.input},(function(l){n.autocompleteItems=[],n.zone.run((function(){l&&l.forEach((function(l){n.autocompleteItems.push(l)}))}))})):this.autocompleteItems=[]},n.prototype.selectSearchResult=function(n){console.log(n),this.autocompleteItems=[],this.autocomplete.input=n.description,this.getMapImage(n.description)},n.prototype.getMapImage=function(n){n&&(this.mapPreview="https://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=roadmap\n    &markers=color:red%7Clabel:Place%7C"+n+"\n    &key="+c.a.googleMapsAPIKey)},n}(),m=t.nb({encapsulation:0,styles:[[".map-preview[_ngcontent-%COMP%]{justify-content:center;width:50%;height:30%;display:flex;margin:2rem auto auto;align-items:center;border:3px solid var(--ion-color-secondary);border-radius:2rem}.map[_ngcontent-%COMP%]{justify-content:center;display:flex;margin:2rem auto auto;align-items:center;height:40%;width:70%;background-color:transparent;opacity:0;transition:opacity 150ms ease-in;border:3px solid var(--ion-color-secondary);border-radius:2rem}.map.visible[_ngcontent-%COMP%]{opacity:1}"]],data:{}});function h(n){return t.Gb(0,[(n()(),t.pb(0,0,null,null,2,"ion-item",[["tappable",""]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.selectSearchResult(n.parent.context.$implicit)&&t),t}),i.U,i.p)),t.ob(1,49152,null,0,a.G,[t.h,t.k,t.x],null,null),(n()(),t.Fb(2,0,[" "," "]))],null,(function(n,l){n(l,2,0,l.parent.context.$implicit.description)}))}function f(n){return t.Gb(0,[(n()(),t.pb(0,0,null,null,3,"ion-list",[],[[8,"hidden",0]],null,null,i.W,i.r)),t.ob(1,49152,null,0,a.N,[t.h,t.k,t.x],null,null),(n()(),t.eb(16777216,null,0,1,null,h)),t.ob(3,16384,null,0,r.i,[t.M,t.J],{ngIf:[0,"ngIf"]},null)],(function(n,l){n(l,3,0,l.context.index<3)}),(function(n,l){n(l,0,0,0==l.component.autocompleteItems.length)}))}function v(n){return t.Gb(0,[t.Db(671088640,1,{mapElementRef:0}),(n()(),t.pb(1,0,null,null,6,"ion-toolbar",[],null,null,null,i.jb,i.E)),t.ob(2,49152,null,0,a.yb,[t.h,t.k,t.x],null,null),(n()(),t.pb(3,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,i.J,i.e)),t.ob(4,49152,null,0,a.k,[t.h,t.k,t.x],null,null),(n()(),t.pb(5,0,null,0,2,"ion-back-button",[["color","secondary"],["defaultHref","/sign-up/profile-photo"]],null,[[null,"click"]],(function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t.Bb(n,7).onClick(e)&&o),o}),i.H,i.c)),t.ob(6,49152,null,0,a.f,[t.h,t.k,t.x],{color:[0,"color"],defaultHref:[1,"defaultHref"]},null),t.ob(7,16384,null,0,a.g,[[2,a.eb],a.Eb],{defaultHref:[0,"defaultHref"]},null),(n()(),t.pb(8,0,null,null,22,"ion-content",[],null,null,null,i.M,i.h)),t.ob(9,49152,null,0,a.t,[t.h,t.k,t.x],null,null),(n()(),t.pb(10,0,null,0,15,"ion-item",[],null,null,null,i.U,i.p)),t.ob(11,49152,null,0,a.G,[t.h,t.k,t.x],null,null),(n()(),t.pb(12,0,null,0,3,"h1",[],null,null,null,null,null)),(n()(),t.Fb(-1,null,["My "])),(n()(),t.pb(14,0,null,null,0,"br",[],null,null,null,null,null)),(n()(),t.Fb(-1,null,[" address is"])),(n()(),t.pb(16,0,null,0,2,"ion-label",[["position","floating"]],null,null,null,i.V,i.q)),t.ob(17,49152,null,0,a.M,[t.h,t.k,t.x],{position:[0,"position"]},null),(n()(),t.Fb(-1,0,["Address"])),(n()(),t.pb(19,0,null,0,6,"ion-input",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"keyup"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,e){var o=!0,u=n.component;return"ionBlur"===l&&(o=!1!==t.Bb(n,20)._handleBlurEvent(e.target)&&o),"ionChange"===l&&(o=!1!==t.Bb(n,20)._handleInputEvent(e.target)&&o),"ngModelChange"===l&&(o=!1!==(u.autocomplete.input=e)&&o),"keyup"===l&&(o=!1!==u.updateSearchResults()&&o),o}),i.T,i.o)),t.ob(20,16384,null,0,a.Jb,[t.k],null,null),t.Cb(1024,null,p.c,(function(n){return[n]}),[a.Jb]),t.ob(22,671744,null,0,p.f,[[8,null],[8,null],[8,null],[6,p.c]],{model:[0,"model"]},{update:"ngModelChange"}),t.Cb(2048,null,p.d,null,[p.f]),t.ob(24,16384,null,0,p.e,[[4,p.d]],null,null),t.ob(25,49152,null,0,a.F,[t.h,t.k,t.x],null,null),(n()(),t.eb(16777216,null,0,1,null,f)),t.ob(27,278528,null,0,r.h,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),(n()(),t.pb(28,0,null,0,0,"img",[["class","map-preview"]],[[8,"hidden",0],[8,"src",4]],null,null,null,null)),(n()(),t.pb(29,0,null,0,1,"ion-row",[["style","height: 10%"]],null,null,null,i.Z,i.u)),t.ob(30,49152,null,0,a.fb,[t.h,t.k,t.x],null,null),(n()(),t.pb(31,0,null,null,2,"ion-button",[["color","secondary"],["expand","block"],["fill","outline"],["strong","true"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onSignup()&&t),t}),i.I,i.d)),t.ob(32,49152,null,0,a.j,[t.h,t.k,t.x],{color:[0,"color"],disabled:[1,"disabled"],expand:[2,"expand"],fill:[3,"fill"],strong:[4,"strong"]},null),(n()(),t.Fb(-1,0,["Conferma"]))],(function(n,l){var e=l.component;n(l,6,0,"secondary","/sign-up/profile-photo"),n(l,7,0,"/sign-up/profile-photo"),n(l,17,0,"floating"),n(l,22,0,e.autocomplete.input),n(l,27,0,e.autocompleteItems),n(l,32,0,"secondary",!e.autocomplete.input,"block","outline","true")}),(function(n,l){var e=l.component;n(l,19,0,t.Bb(l,24).ngClassUntouched,t.Bb(l,24).ngClassTouched,t.Bb(l,24).ngClassPristine,t.Bb(l,24).ngClassDirty,t.Bb(l,24).ngClassValid,t.Bb(l,24).ngClassInvalid,t.Bb(l,24).ngClassPending),n(l,28,0,!e.mapPreview,t.tb(1,"",e.mapPreview,""))}))}function y(n){return t.Gb(0,[(n()(),t.pb(0,0,null,null,1,"app-address-map",[],null,null,null,v,m)),t.ob(1,4243456,null,0,g,[b.a,t.B,t.x,s.a,d.a],null,null)],null,null)}var k=t.lb("app-address-map",g,y,{},{},[]),x=e("ZYCi"),C=function(){return function(){}}();e.d(l,"AddressMapPageModuleNgFactory",(function(){return w}));var w=t.mb(o,[],(function(n){return t.yb([t.zb(512,t.j,t.X,[[8,[u.a,k]],[3,t.j],t.v]),t.zb(4608,r.k,r.j,[t.s,[2,r.r]]),t.zb(4608,p.i,p.i,[]),t.zb(4608,a.b,a.b,[t.x,t.g]),t.zb(4608,a.Db,a.Db,[a.b,t.j,t.p]),t.zb(4608,a.Gb,a.Gb,[a.b,t.j,t.p]),t.zb(1073742336,r.b,r.b,[]),t.zb(1073742336,p.h,p.h,[]),t.zb(1073742336,p.a,p.a,[]),t.zb(1073742336,a.Ab,a.Ab,[]),t.zb(1073742336,x.o,x.o,[[2,x.t],[2,x.m]]),t.zb(1073742336,C,C,[]),t.zb(1073742336,o,o,[]),t.zb(1024,x.k,(function(){return[[{path:"",component:g}]]}),[])])}))}}]);