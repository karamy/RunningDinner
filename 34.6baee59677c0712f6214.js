(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{pc8X:function(l,n,e){"use strict";e.r(n);var t=e("CcnG"),o=function(){return function(){}}(),u=e("pMnS"),i=e("MKJQ"),a=e("jy/b"),r=e("Ip0R"),d=e("gIcY"),s=e("mrSG"),c=e("vLlK"),g=e("em74"),p=e("hTf0"),m=e("DP//"),f=e("qXBG"),h=e("AytR"),b=function(){function l(l,n,e,t,o,u,i){this.photoService=l,this.signupService=n,this.router=e,this.render=t,this.zone=o,this.authService=u,this.spinner=i,this.mapPreview=null,this.progressvalue=.25,this.index=0,Object(p.a)(window),this.GoogleAutocomplete=new google.maps.places.AutocompleteService,this.autocomplete={input:""},this.autocompleteItems=[]}return l.prototype.ngAfterViewInit=function(){var l=this;this.getGoogleMaps().then((function(n){if(l.mapElementRef){var e=l.mapElementRef.nativeElement,t=new n.Map(e,{center:{lat:44.5464311,lng:7.7184579},zoom:16});n.event.addListenerOnce(t,"idle",(function(){l.render.addClass(e,"visible")}))}})).catch((function(l){console.log(l)}))},l.prototype.ngOnInit=function(){this.username=null,this.loadPicture()},l.prototype.activeIndex=function(){var l=this;this.Slider.getActiveIndex().then((function(n){console.log("active index = ",n),l.index=n,l.progressvalue=.25+.25*n}))},l.prototype.getPicture=function(){return s.__awaiter(this,void 0,void 0,(function(){return s.__generator(this,(function(l){switch(l.label){case 0:return[4,this.photoService.getPicture()];case 1:return l.sent()&&this.loadPicture(),[2]}}))}))},l.prototype.loadPicture=function(){var l=this.photoService.profilePhotoData;l&&(this.photoData="data:image/png;base64,"+l)},l.prototype.goToProfilePhoto=function(){this.signupService.setProfilePhoto(this.photoService.profilePhotoData),this.router.navigateByUrl("/sign-up/address-map")},l.prototype.onSignup=function(){var l=this;this.signupService.setName(this.username),this.signupService.setBirthDate(this.birthdate),this.signupService.setProfilePhoto(this.photoService.profilePhotoData),(new google.maps.Geocoder).geocode({address:this.autocomplete.input},(function(n,e){var t,o;"OK"===e?(t=n[0].geometry.location.lat(),o=n[0].geometry.location.lng(),l.signupService.setAddressAndCoordinates(l.autocomplete.input,t,o),l.spinner.create("Effettuo login..."),l.signupService.signupUser().then((function(){l.authService.doLogin(l.signupService.getSignupData().phoneNumber)}),(function(n){alert("Errore registrazione"),l.spinner.dismiss(),l.authService.doLogout(),console.warn(n)}))):console.log("Impossibile eseguire geocoder per la seguente ragione: "+e)}))},l.prototype.getGoogleMaps=function(){var l=window,n=l.google;return n&&n.maps?Promise.resolve(n.maps):new Promise((function(n,e){var t=document.createElement("script");t.src="https://maps.googleapis.com/maps/api/js?key="+h.a.googleMapsAPIKey,t.async=!0,t.defer=!0,document.body.appendChild(t),t.onload=function(){var t=l.google;t&&t.maps?n(t.maps):e("Google maps SDK not available")}}))},l.prototype.updateSearchResults=function(){var l=this;""!==this.autocomplete.input?this.GoogleAutocomplete.getPlacePredictions({input:this.autocomplete.input},(function(n){l.autocompleteItems=[],l.zone.run((function(){n&&n.forEach((function(n){l.autocompleteItems.push(n)}))}))})):this.autocompleteItems=[]},l.prototype.selectSearchResult=function(l){console.log(l),this.autocompleteItems=[],this.autocomplete.input=l.description,this.getMapImage(l.description)},l.prototype.getMapImage=function(l){l&&(this.mapPreview="https://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=roadmap\n    &markers=color:red%7Clabel:Place%7C"+l+"\n    &key="+h.a.googleMapsAPIKey)},l}(),v=e("ZYCi"),C=t["ɵcrt"]({encapsulation:0,styles:[[".headerslide[_ngcontent-%COMP%]{position:absolute;top:0;width:100%;height:20%;border-bottom-right-radius:2em;border-bottom-left-radius:2em;box-shadow:0 5px 20px 20px #f5f5f5;background:linear-gradient(to bottom,#50976a,#80c898)}ion-slides[_ngcontent-%COMP%]{height:100%!important;--bullet-background:white;--bullet-background-active:#e2f4de}.titletop[_ngcontent-%COMP%]{font-size:2.5em;color:#50976a;width:60%;text-align:left;margin-left:10%;margin-top:10%}.titlebottom[_ngcontent-%COMP%]{color:#fff}ion-grid[_ngcontent-%COMP%]{height:100%!important;width:100%!important}.FirstRow[_ngcontent-%COMP%]{height:20%!important;width:100%!important;display:flex}.SecondRow[_ngcontent-%COMP%]{height:40%!important;width:100%!important;text-align:center;display:table}.ThirdRow[_ngcontent-%COMP%]{height:40%!important;text-align:center;display:table;margin-left:auto;margin-right:auto}.inputusername[_ngcontent-%COMP%]{font-size:1.5em;background-color:#fff;border:1px solid grey;border-radius:.5em;width:90%;margin-left:auto;margin-right:auto;padding-left:10px}.profilephoto[_ngcontent-%COMP%]{border-radius:50%;height:12rem;width:12rem;border:3px solid var(--ion-color-secondary);margin-bottom:10%}ion-row[_ngcontent-%COMP%]{height:100%;display:flex;vertical-align:middle;align-items:center;justify-content:center}.map-preview[_ngcontent-%COMP%]{justify-content:center;width:50%;display:flex;margin:auto;align-items:center;border:3px solid var(--ion-color-secondary);border-radius:2rem}.map[_ngcontent-%COMP%]{justify-content:center;display:flex;margin:2rem auto auto;align-items:center;width:50%;background-color:transparent;opacity:0;transition:opacity 150ms ease-in;border:3px solid var(--ion-color-secondary);border-radius:2rem}.map.visible[_ngcontent-%COMP%]{opacity:1}ion-list.autocomplete[_ngcontent-%COMP%]{border-bottom-left-radius:1em!important;border-bottom-right-radius:1em!important;width:86%;margin-left:7%}ion-input[_ngcontent-%COMP%]{--padding-start:9%!important;--padding-end:9%!important}ion-progress-bar[_ngcontent-%COMP%]{position:absolute;top:0;height:3%}.buttonbottom[_ngcontent-%COMP%]{background:linear-gradient(to bottom,#fff,#e2f4de);border-radius:.5em;width:40%;height:20%;box-shadow:0 0 7px 7px #e2f4de;font-size:1.7em;border-width:0;margin-left:auto;margin-right:auto}.photobutton[_ngcontent-%COMP%]{height:30%;width:8em;margin-top:30%}"]],data:{}});function R(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,3,"ion-avatar",[["class","profilephoto"],["style","margin: auto"]],null,null,null,i.R,i.b)),t["ɵdid"](1,49152,null,0,a.e,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](2,0,null,0,1,"ion-img",[["class","profilephoto"]],null,null,null,i.gb,i.q)),t["ɵdid"](3,49152,null,0,a.C,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{src:[0,"src"]},null)],(function(l,n){l(n,3,0,t["ɵinlineInterpolate"](1,"",n.component.photoData,""))}),null)}function w(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,2,"ion-item",[["tappable",""]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.selectSearchResult(l.parent.context.$implicit)&&t),t}),i.nb,i.u)),t["ɵdid"](1,49152,null,0,a.G,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵted"](2,0,[" "," "]))],null,(function(l,n){l(n,2,0,n.parent.context.$implicit.description)}))}function D(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,3,"ion-list",[],[[8,"hidden",0]],null,null,i.pb,i.z)),t["ɵdid"](1,49152,null,0,a.N,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵand"](16777216,null,0,1,null,w)),t["ɵdid"](3,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){l(n,3,0,n.context.index<3)}),(function(l,n){l(n,0,0,0==n.component.autocompleteItems.length)}))}function y(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,2,"ion-button",[["class","buttonbottom"],["expand","block"],["fill","outline"],["strong","true"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.onSignup()&&t),t}),i.T,i.d)),t["ɵdid"](1,49152,null,0,a.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{expand:[0,"expand"],fill:[1,"fill"],strong:[2,"strong"]},null),(l()(),t["ɵted"](-1,0,["Conferma"]))],(function(l,n){l(n,1,0,"block","outline","true")}),null)}function I(l){return t["ɵvid"](0,[t["ɵqud"](671088640,1,{Slider:0}),t["ɵqud"](671088640,2,{mapElementRef:0}),(l()(),t["ɵeld"](2,0,null,null,105,"ion-content",[],null,null,null,i.ab,i.k)),t["ɵdid"](3,49152,null,0,a.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](4,0,null,0,2,"div",[["class","headerslide"]],null,null,null,null,null)),(l()(),t["ɵeld"](5,0,null,null,1,"ion-progress-bar",[["color","secondary"]],null,null,null,i.qb,i.A)),t["ɵdid"](6,49152,null,0,a.V,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{color:[0,"color"],value:[1,"value"]},null),(l()(),t["ɵeld"](7,0,null,0,100,"ion-slides",[["color","secondary"]],null,[[null,"ionSlideDidChange"]],(function(l,n,e){var t=!0;return"ionSlideDidChange"===n&&(t=!1!==l.component.activeIndex()&&t),t}),i.zb,i.J)),t["ɵdid"](8,49152,[[1,4],["slider",4]],0,a.nb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](9,0,null,0,22,"ion-slide",[["class","Slide1"]],null,null,null,i.yb,i.I)),t["ɵdid"](10,49152,null,0,a.mb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](11,0,null,0,20,"ion-grid",[],null,null,null,i.db,i.n)),t["ɵdid"](12,49152,null,0,a.z,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](13,0,null,0,3,"ion-row",[["class","FirstRow"]],null,null,null,i.tb,i.D)),t["ɵdid"](14,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](15,0,null,0,1,"h1",[["class","titlebottom"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,[" Questo sarà il tuo nome utente in Running Dinner "])),(l()(),t["ɵeld"](17,0,null,0,12,"ion-row",[["class","SecondRow"]],null,null,null,i.tb,i.D)),t["ɵdid"](18,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](19,0,null,0,3,"h1",[["class","titletop"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,[" Mi "])),(l()(),t["ɵeld"](21,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,[" chiamo "])),(l()(),t["ɵeld"](23,0,null,0,6,"ion-input",[["class","inputusername"],["placeholder","Inserisci qui il tuo nome"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,e){var o=!0,u=l.component;return"ionBlur"===n&&(o=!1!==t["ɵnov"](l,24)._handleBlurEvent(e.target)&&o),"ionChange"===n&&(o=!1!==t["ɵnov"](l,24)._handleInputEvent(e.target)&&o),"ngModelChange"===n&&(o=!1!==(u.username=e)&&o),o}),i.jb,i.t)),t["ɵdid"](24,4341760,null,0,a.Jb,[t.Injector,t.ElementRef],null,null),t["ɵprd"](1024,null,d.d,(function(l){return[l]}),[a.Jb]),t["ɵdid"](26,671744,null,0,d.i,[[8,null],[8,null],[8,null],[6,d.d]],{model:[0,"model"]},{update:"ngModelChange"}),t["ɵprd"](2048,null,d.e,null,[d.i]),t["ɵdid"](28,16384,null,0,d.f,[[4,d.e]],null,null),t["ɵdid"](29,49152,null,0,a.F,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{placeholder:[0,"placeholder"]},null),(l()(),t["ɵeld"](30,0,null,0,1,"ion-row",[["class","ThirdRow"]],null,null,null,i.tb,i.D)),t["ɵdid"](31,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](32,0,null,0,22,"ion-slide",[["class","Slide2"]],null,null,null,i.yb,i.I)),t["ɵdid"](33,49152,null,0,a.mb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](34,0,null,0,20,"ion-grid",[],null,null,null,i.db,i.n)),t["ɵdid"](35,49152,null,0,a.z,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](36,0,null,0,3,"ion-row",[["class","FirstRow"]],null,null,null,i.tb,i.D)),t["ɵdid"](37,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](38,0,null,0,1,"h1",[["class","titlebottom"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,[" Verrà visualizzata unicamente l'età dell'utente "])),(l()(),t["ɵeld"](40,0,null,0,12,"ion-row",[["class","SecondRow"]],null,null,null,i.tb,i.D)),t["ɵdid"](41,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](42,0,null,0,3,"h1",[["class","titletop"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,[" Sono "])),(l()(),t["ɵeld"](44,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,[" nato "])),(l()(),t["ɵeld"](46,0,null,0,6,"ion-datetime",[["class","inputusername"],["placeholder","Inserisci la tua data di nascita"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,e){var o=!0,u=l.component;return"ionBlur"===n&&(o=!1!==t["ɵnov"](l,47)._handleBlurEvent(e.target)&&o),"ionChange"===n&&(o=!1!==t["ɵnov"](l,47)._handleChangeEvent(e.target)&&o),"ngModelChange"===n&&(o=!1!==(u.birthdate=e)&&o),o}),i.bb,i.l)),t["ɵdid"](47,4341760,null,0,a.Ib,[t.Injector,t.ElementRef],null,null),t["ɵprd"](1024,null,d.d,(function(l){return[l]}),[a.Ib]),t["ɵdid"](49,671744,null,0,d.i,[[8,null],[8,null],[8,null],[6,d.d]],{model:[0,"model"]},{update:"ngModelChange"}),t["ɵprd"](2048,null,d.e,null,[d.i]),t["ɵdid"](51,16384,null,0,d.f,[[4,d.e]],null,null),t["ɵdid"](52,49152,null,0,a.u,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{placeholder:[0,"placeholder"]},null),(l()(),t["ɵeld"](53,0,null,0,1,"ion-row",[["class","ThirdRow"]],null,null,null,i.tb,i.D)),t["ɵdid"](54,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](55,0,null,0,21,"ion-slide",[["class","Slide3"]],null,null,null,i.yb,i.I)),t["ɵdid"](56,49152,null,0,a.mb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](57,0,null,0,19,"ion-grid",[],null,null,null,i.db,i.n)),t["ɵdid"](58,49152,null,0,a.z,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](59,0,null,0,3,"ion-row",[["class","FirstRow"]],null,null,null,i.tb,i.D)),t["ɵdid"](60,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](61,0,null,0,1,"h1",[["class","titlebottom"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,[" La foto profilo sarà visibile sono in forma di icona "])),(l()(),t["ɵeld"](63,0,null,0,7,"ion-row",[["class","SecondRow"]],null,null,null,i.tb,i.D)),t["ɵdid"](64,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](65,0,null,0,3,"h1",[["class","titletop"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,[" Foto "])),(l()(),t["ɵeld"](67,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,[" Profilo "])),(l()(),t["ɵand"](16777216,null,0,1,null,R)),t["ɵdid"](70,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵeld"](71,0,null,0,5,"ion-row",[["class","ThirdRow"]],null,null,null,i.tb,i.D)),t["ɵdid"](72,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](73,0,null,0,3,"ion-button",[["class","photobutton"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.getPicture()&&t),t}),i.T,i.d)),t["ɵdid"](74,49152,null,0,a.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](75,0,null,0,1,"ion-icon",[["name","camera"],["style","font-size: 3em"]],null,null,null,i.fb,i.p)),t["ɵdid"](76,49152,null,0,a.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(l()(),t["ɵeld"](77,0,null,0,30,"ion-slide",[["class","Slide4"]],null,null,null,i.yb,i.I)),t["ɵdid"](78,49152,null,0,a.mb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](79,0,null,0,28,"ion-grid",[],null,null,null,i.db,i.n)),t["ɵdid"](80,49152,null,0,a.z,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](81,0,null,0,3,"ion-row",[["class","FirstRow"]],null,null,null,i.tb,i.D)),t["ɵdid"](82,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](83,0,null,0,1,"h1",[["class","titlebottom"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,[" Verrà visualizzata unicamente durante la scelta della casa "])),(l()(),t["ɵeld"](85,0,null,0,16,"ion-row",[["class","SecondRow"]],null,null,null,i.tb,i.D)),t["ɵdid"](86,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](87,0,null,0,3,"h1",[["class","titletop"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,[" Mi "])),(l()(),t["ɵeld"](89,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,[" trovo "])),(l()(),t["ɵeld"](91,0,null,0,6,"ion-input",[["class","inputusername"],["placeholder","Inserisci qui l'indirizzo"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"keyup"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,e){var o=!0,u=l.component;return"ionBlur"===n&&(o=!1!==t["ɵnov"](l,92)._handleBlurEvent(e.target)&&o),"ionChange"===n&&(o=!1!==t["ɵnov"](l,92)._handleInputEvent(e.target)&&o),"ngModelChange"===n&&(o=!1!==(u.autocomplete.input=e)&&o),"keyup"===n&&(o=!1!==u.updateSearchResults()&&o),o}),i.jb,i.t)),t["ɵdid"](92,4341760,null,0,a.Jb,[t.Injector,t.ElementRef],null,null),t["ɵprd"](1024,null,d.d,(function(l){return[l]}),[a.Jb]),t["ɵdid"](94,671744,null,0,d.i,[[8,null],[8,null],[8,null],[6,d.d]],{model:[0,"model"]},{update:"ngModelChange"}),t["ɵprd"](2048,null,d.e,null,[d.i]),t["ɵdid"](96,16384,null,0,d.f,[[4,d.e]],null,null),t["ɵdid"](97,49152,null,0,a.F,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{placeholder:[0,"placeholder"]},null),(l()(),t["ɵeld"](98,0,null,0,3,"ion-list",[["class","autocomplete"]],null,null,null,i.pb,i.z)),t["ɵdid"](99,49152,null,0,a.N,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵand"](16777216,null,0,1,null,D)),t["ɵdid"](101,278528,null,0,r.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["ɵeld"](102,0,null,0,5,"ion-row",[["class","ThirdRow"]],null,null,null,i.tb,i.D)),t["ɵdid"](103,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](104,0,null,0,0,"img",[["class","map-preview animate__animated animate__fadeIn"]],[[8,"hidden",0],[8,"src",4]],null,null,null,null)),(l()(),t["ɵeld"](105,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),t["ɵand"](16777216,null,0,1,null,y)),t["ɵdid"](107,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){var e=n.component;l(n,6,0,"secondary",t["ɵinlineInterpolate"](1,"",e.progressvalue,"")),l(n,26,0,e.username),l(n,29,0,"Inserisci qui il tuo nome"),l(n,49,0,e.birthdate),l(n,52,0,"Inserisci la tua data di nascita"),l(n,70,0,e.photoData),l(n,76,0,"camera"),l(n,94,0,e.autocomplete.input),l(n,97,0,"Inserisci qui l'indirizzo"),l(n,101,0,e.autocompleteItems),l(n,107,0,e.autocomplete.input&&e.username&&e.birthdate&&e.photoService.profilePhotoData)}),(function(l,n){var e=n.component;l(n,23,0,t["ɵnov"](n,28).ngClassUntouched,t["ɵnov"](n,28).ngClassTouched,t["ɵnov"](n,28).ngClassPristine,t["ɵnov"](n,28).ngClassDirty,t["ɵnov"](n,28).ngClassValid,t["ɵnov"](n,28).ngClassInvalid,t["ɵnov"](n,28).ngClassPending),l(n,46,0,t["ɵnov"](n,51).ngClassUntouched,t["ɵnov"](n,51).ngClassTouched,t["ɵnov"](n,51).ngClassPristine,t["ɵnov"](n,51).ngClassDirty,t["ɵnov"](n,51).ngClassValid,t["ɵnov"](n,51).ngClassInvalid,t["ɵnov"](n,51).ngClassPending),l(n,91,0,t["ɵnov"](n,96).ngClassUntouched,t["ɵnov"](n,96).ngClassTouched,t["ɵnov"](n,96).ngClassPristine,t["ɵnov"](n,96).ngClassDirty,t["ɵnov"](n,96).ngClassValid,t["ɵnov"](n,96).ngClassInvalid,t["ɵnov"](n,96).ngClassPending),l(n,104,0,!e.mapPreview,t["ɵinlineInterpolate"](1,"",e.mapPreview,""))}))}function P(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,1,"app-registration",[],null,null,null,I,C)),t["ɵdid"](1,4308992,null,0,b,[g.a,c.a,v.n,t.Renderer2,t.NgZone,f.a,m.a],null,null)],(function(l,n){l(n,1,0)}),null)}var E=t["ɵccf"]("app-registration",b,P,{},{},[]),N=function(){return function(){}}();e.d(n,"RegistrationPageModuleNgFactory",(function(){return M}));var M=t["ɵcmf"](o,[],(function(l){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[u.a,E]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,r.NgLocalization,r.NgLocaleLocalization,[t.LOCALE_ID,[2,r["ɵangular_packages_common_common_a"]]]),t["ɵmpd"](4608,d.l,d.l,[]),t["ɵmpd"](4608,a.b,a.b,[t.NgZone,t.ApplicationRef]),t["ɵmpd"](4608,a.Db,a.Db,[a.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](4608,a.Gb,a.Gb,[a.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](1073742336,r.CommonModule,r.CommonModule,[]),t["ɵmpd"](1073742336,d.k,d.k,[]),t["ɵmpd"](1073742336,d.b,d.b,[]),t["ɵmpd"](1073742336,a.Ab,a.Ab,[]),t["ɵmpd"](1073742336,v.p,v.p,[[2,v.u],[2,v.n]]),t["ɵmpd"](1073742336,N,N,[]),t["ɵmpd"](1073742336,o,o,[]),t["ɵmpd"](1024,v.l,(function(){return[[{path:"",component:b}]]}),[])])}))}}]);