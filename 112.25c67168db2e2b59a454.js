(window.webpackJsonp=window.webpackJsonp||[]).push([[112],{LnXg:function(n,e,l){"use strict";l.r(e);var t=l("CcnG"),o=function(){return function(){}}(),u=l("pMnS"),i=l("MKJQ"),a=l("jy/b"),r=l("Ip0R"),c=l("gIcY"),p=l("qXBG"),d=l("AytR"),s=l("vLlK"),g=l("DP//"),m=function(){function n(n,e,l,t,o){this.signupService=n,this.render=e,this.zone=l,this.authService=t,this.spinner=o,this.mapPreview=null,this.GoogleAutocomplete=new google.maps.places.AutocompleteService,this.autocomplete={input:""},this.autocompleteItems=[]}return n.prototype.onSignup=function(){var n=this;(new google.maps.Geocoder).geocode({address:this.autocomplete.input},(function(e,l){var t,o;"OK"===l?(t=e[0].geometry.location.lat(),o=e[0].geometry.location.lng(),n.signupService.setAddressAndCoordinates(n.autocomplete.input,t,o),n.spinner.create("Effettuo login..."),n.signupService.signupUser().then((function(){n.authService.doLogin(n.signupService.getSignupData().phoneNumber)}),(function(e){alert("Errore registrazione"),n.spinner.dismiss(),n.authService.doLogout(),console.warn(e)}))):console.log("Impossibile eseguire geocoder per la seguente ragione: "+l)}))},n.prototype.ngAfterViewInit=function(){var n=this;this.getGoogleMaps().then((function(e){if(n.mapElementRef){var l=n.mapElementRef.nativeElement,t=new e.Map(l,{center:{lat:44.5464311,lng:7.7184579},zoom:16});e.event.addListenerOnce(t,"idle",(function(){n.render.addClass(l,"visible")}))}})).catch((function(n){console.log(n)}))},n.prototype.getGoogleMaps=function(){var n=window,e=n.google;return e&&e.maps?Promise.resolve(e.maps):new Promise((function(e,l){var t=document.createElement("script");t.src="https://maps.googleapis.com/maps/api/js?key="+d.a.googleMapsAPIKey,t.async=!0,t.defer=!0,document.body.appendChild(t),t.onload=function(){var t=n.google;t&&t.maps?e(t.maps):l("Google maps SDK not available")}}))},n.prototype.updateSearchResults=function(){var n=this;""!==this.autocomplete.input?this.GoogleAutocomplete.getPlacePredictions({input:this.autocomplete.input},(function(e){n.autocompleteItems=[],n.zone.run((function(){e&&e.forEach((function(e){n.autocompleteItems.push(e)}))}))})):this.autocompleteItems=[]},n.prototype.selectSearchResult=function(n){console.log(n),this.autocompleteItems=[],this.autocomplete.input=n.description,this.getMapImage(n.description)},n.prototype.getMapImage=function(n){n&&(this.mapPreview="https://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=roadmap\n    &markers=color:red%7Clabel:Place%7C"+n+"\n    &key="+d.a.googleMapsAPIKey)},n}(),f=t["ɵcrt"]({encapsulation:0,styles:[[".map-preview[_ngcontent-%COMP%]{-webkit-box-pack:center;justify-content:center;width:50%;height:30%;display:-webkit-box;display:flex;margin:2rem auto auto;-webkit-box-align:center;align-items:center;border:3px solid var(--ion-color-secondary);border-radius:2rem}.map[_ngcontent-%COMP%]{-webkit-box-pack:center;justify-content:center;display:-webkit-box;display:flex;margin:2rem auto auto;-webkit-box-align:center;align-items:center;height:40%;width:70%;background-color:transparent;opacity:0;-webkit-transition:opacity 150ms ease-in;transition:opacity 150ms ease-in;border:3px solid var(--ion-color-secondary);border-radius:2rem}.map.visible[_ngcontent-%COMP%]{opacity:1}"]],data:{}});function h(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,2,"ion-item",[["tappable",""]],null,[[null,"click"]],(function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.selectSearchResult(n.parent.context.$implicit)&&t),t}),i.nb,i.u)),t["ɵdid"](1,49152,null,0,a.G,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵted"](2,0,[" "," "]))],null,(function(n,e){n(e,2,0,e.parent.context.$implicit.description)}))}function b(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,3,"ion-list",[],[[8,"hidden",0]],null,null,i.pb,i.z)),t["ɵdid"](1,49152,null,0,a.N,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,h)),t["ɵdid"](3,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,e){n(e,3,0,e.context.index<3)}),(function(n,e){n(e,0,0,0==e.component.autocompleteItems.length)}))}function v(n){return t["ɵvid"](0,[t["ɵqud"](671088640,1,{mapElementRef:0}),(n()(),t["ɵeld"](1,0,null,null,6,"ion-toolbar",[],null,null,null,i.Fb,i.P)),t["ɵdid"](2,49152,null,0,a.yb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](3,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,i.U,i.e)),t["ɵdid"](4,49152,null,0,a.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](5,0,null,0,2,"ion-back-button",[["color","secondary"],["defaultHref","/sign-up/profile-photo"]],null,[[null,"click"]],(function(n,e,l){var o=!0;return"click"===e&&(o=!1!==t["ɵnov"](n,7).onClick(l)&&o),o}),i.S,i.c)),t["ɵdid"](6,49152,null,0,a.f,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{color:[0,"color"],defaultHref:[1,"defaultHref"]},null),t["ɵdid"](7,16384,null,0,a.g,[[2,a.eb],a.Eb],{defaultHref:[0,"defaultHref"]},null),(n()(),t["ɵeld"](8,0,null,null,22,"ion-content",[],null,null,null,i.ab,i.k)),t["ɵdid"](9,49152,null,0,a.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](10,0,null,0,15,"ion-item",[],null,null,null,i.nb,i.u)),t["ɵdid"](11,49152,null,0,a.G,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](12,0,null,0,3,"h1",[],null,null,null,null,null)),(n()(),t["ɵted"](-1,null,["My "])),(n()(),t["ɵeld"](14,0,null,null,0,"br",[],null,null,null,null,null)),(n()(),t["ɵted"](-1,null,[" address is"])),(n()(),t["ɵeld"](16,0,null,0,2,"ion-label",[["position","floating"]],null,null,null,i.ob,i.y)),t["ɵdid"](17,49152,null,0,a.M,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{position:[0,"position"]},null),(n()(),t["ɵted"](-1,0,["Address"])),(n()(),t["ɵeld"](19,0,null,0,6,"ion-input",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"keyup"],[null,"ionBlur"],[null,"ionChange"]],(function(n,e,l){var o=!0,u=n.component;return"ionBlur"===e&&(o=!1!==t["ɵnov"](n,20)._handleBlurEvent(l.target)&&o),"ionChange"===e&&(o=!1!==t["ɵnov"](n,20)._handleInputEvent(l.target)&&o),"ngModelChange"===e&&(o=!1!==(u.autocomplete.input=l)&&o),"keyup"===e&&(o=!1!==u.updateSearchResults()&&o),o}),i.jb,i.t)),t["ɵdid"](20,16384,null,0,a.Jb,[t.ElementRef],null,null),t["ɵprd"](1024,null,c.d,(function(n){return[n]}),[a.Jb]),t["ɵdid"](22,671744,null,0,c.i,[[8,null],[8,null],[8,null],[6,c.d]],{model:[0,"model"]},{update:"ngModelChange"}),t["ɵprd"](2048,null,c.e,null,[c.i]),t["ɵdid"](24,16384,null,0,c.f,[[4,c.e]],null,null),t["ɵdid"](25,49152,null,0,a.F,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,b)),t["ɵdid"](27,278528,null,0,r.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["ɵeld"](28,0,null,0,0,"img",[["class","map-preview"]],[[8,"hidden",0],[8,"src",4]],null,null,null,null)),(n()(),t["ɵeld"](29,0,null,0,1,"ion-row",[["style","height: 10%"]],null,null,null,i.tb,i.D)),t["ɵdid"](30,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](31,0,null,null,2,"ion-button",[["color","secondary"],["expand","block"],["fill","outline"],["strong","true"]],null,[[null,"click"]],(function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.onSignup()&&t),t}),i.T,i.d)),t["ɵdid"](32,49152,null,0,a.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{color:[0,"color"],disabled:[1,"disabled"],expand:[2,"expand"],fill:[3,"fill"],strong:[4,"strong"]},null),(n()(),t["ɵted"](-1,0,["Conferma"]))],(function(n,e){var l=e.component;n(e,6,0,"secondary","/sign-up/profile-photo"),n(e,7,0,"/sign-up/profile-photo"),n(e,17,0,"floating"),n(e,22,0,l.autocomplete.input),n(e,27,0,l.autocompleteItems),n(e,32,0,"secondary",!l.autocomplete.input,"block","outline","true")}),(function(n,e){var l=e.component;n(e,19,0,t["ɵnov"](e,24).ngClassUntouched,t["ɵnov"](e,24).ngClassTouched,t["ɵnov"](e,24).ngClassPristine,t["ɵnov"](e,24).ngClassDirty,t["ɵnov"](e,24).ngClassValid,t["ɵnov"](e,24).ngClassInvalid,t["ɵnov"](e,24).ngClassPending),n(e,28,0,!l.mapPreview,t["ɵinlineInterpolate"](1,"",l.mapPreview,""))}))}function y(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"app-address-map",[],null,null,null,v,f)),t["ɵdid"](1,4243456,null,0,m,[s.a,t.Renderer2,t.NgZone,p.a,g.a],null,null)],null,null)}var C=t["ɵccf"]("app-address-map",m,y,{},{},[]),R=l("ZYCi"),k=function(){return function(){}}();l.d(e,"AddressMapPageModuleNgFactory",(function(){return w}));var w=t["ɵcmf"](o,[],(function(n){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[u.a,C]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,r.NgLocalization,r.NgLocaleLocalization,[t.LOCALE_ID,[2,r["ɵangular_packages_common_common_a"]]]),t["ɵmpd"](4608,c.l,c.l,[]),t["ɵmpd"](4608,a.b,a.b,[t.NgZone,t.ApplicationRef]),t["ɵmpd"](4608,a.Db,a.Db,[a.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](4608,a.Gb,a.Gb,[a.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](1073742336,r.CommonModule,r.CommonModule,[]),t["ɵmpd"](1073742336,c.k,c.k,[]),t["ɵmpd"](1073742336,c.b,c.b,[]),t["ɵmpd"](1073742336,a.Ab,a.Ab,[]),t["ɵmpd"](1073742336,R.p,R.p,[[2,R.u],[2,R.n]]),t["ɵmpd"](1073742336,k,k,[]),t["ɵmpd"](1073742336,o,o,[]),t["ɵmpd"](1024,R.l,(function(){return[[{path:"",component:m}]]}),[])])}))}}]);