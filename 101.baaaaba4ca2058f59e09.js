(window.webpackJsonp=window.webpackJsonp||[]).push([[101],{Pvp5:function(n,l,e){"use strict";e.r(l);var t=e("CcnG"),o=function(){return function(){}}(),i=e("pMnS"),u=e("MKJQ"),r=e("jy/b"),a=e("gIcY"),d=e("Ip0R"),c=e("mrSG"),s=e("BV2u"),g=e("DP//"),p=e("t/Na"),f=function(){function n(n,l,e){this.http=n,this.rdConstants=l,this.spinner=e}return n.prototype.createDinner=function(n){return c.__awaiter(this,void 0,void 0,(function(){var l=this;return c.__generator(this,(function(e){switch(e.label){case 0:return[4,this.spinner.create()];case 1:return e.sent(),[2,this.http.post(this.rdConstants.getApiRoute("dinners"),n).toPromise().finally((function(){l.spinner.dismiss()}))]}}))}))},n.ngInjectableDef=t["ɵɵdefineInjectable"]({factory:function(){return new n(t["ɵɵinject"](p.c),t["ɵɵinject"](s.a),t["ɵɵinject"](g.a))},token:n,providedIn:"root"}),n}(),h=e("yzu5"),m=function(){function n(n,l,e,t){this.dinnerService=n,this.alertController=l,this.paramsService=e,this.navController=t}return Object.defineProperty(n.prototype,"dinnerDateStr",{get:function(){return this.dinnerDate.toISOString()},set:function(n){this.dinnerDate=new Date(n)},enumerable:!0,configurable:!0}),n.prototype.ngOnInit=function(){this.customActionSheetOptions={header:"Tipologia",subHeader:"Seleziona la tipologia di cena"},this.dinnerTypes=[{code:1,description:"Generica"},{code:2,description:"Piemontese"},{code:3,description:"Sushi"}],this.dinnerType=1,this.dinnerDate=new Date},n.prototype.onCreateDinner=function(){return c.__awaiter(this,void 0,void 0,(function(){var n=this;return c.__generator(this,(function(l){switch(l.label){case 0:return[4,this.alertController.create({header:"Creazione cena",message:"Confermi la creazione della cena? Verrai automaticamente inserito come partecipante",buttons:[{text:"Cancel",role:"cancel",cssClass:"secondary",handler:function(){console.log("confirm cancel")}},{text:"Certo!",handler:function(){n.sendRequest()}}]})];case 1:return[4,l.sent().present()];case 2:return l.sent(),[2]}}))}))},n.prototype.sendRequest=function(){var n=this,l={dinnerDescription:this.dinnerDescription,dinnerType:this.dinnerType,dinnerDate:this.dinnerDate,groupId:this.paramsService.getParams().groupId};this.dinnerService.createDinner(l).then((function(){n.paramsService.loadParams(),n.navController.navigateRoot("/home")}),(function(n){console.warn(n)}))},n}(),C=t["ɵcrt"]({encapsulation:0,styles:[[""]],data:{}});function v(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,2,"ion-select-option",[],null,null,null,u.ib,u.A)),t["ɵdid"](1,49152,null,0,r.kb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{value:[0,"value"]},null),(n()(),t["ɵted"](2,0,["",""]))],(function(n,l){n(l,1,0,l.context.$implicit.code)}),(function(n,l){n(l,2,0,l.context.$implicit.description)}))}function b(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,11,"ion-header",[],null,null,null,u.U,u.l)),t["ɵdid"](1,49152,null,0,r.A,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](2,0,null,0,9,"ion-toolbar",[],null,null,null,u.rb,u.I)),t["ɵdid"](3,49152,null,0,r.yb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](4,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,u.N,u.e)),t["ɵdid"](5,49152,null,0,r.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](6,0,null,0,2,"ion-back-button",[["defaultHref","/home/tabs/rooms"]],null,[[null,"click"]],(function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["ɵnov"](n,8).onClick(e)&&o),o}),u.L,u.c)),t["ɵdid"](7,49152,null,0,r.f,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{defaultHref:[0,"defaultHref"]},null),t["ɵdid"](8,16384,null,0,r.g,[[2,r.eb],r.Eb],{defaultHref:[0,"defaultHref"]},null),(n()(),t["ɵeld"](9,0,null,0,2,"ion-title",[],null,null,null,u.qb,u.H)),t["ɵdid"](10,49152,null,0,r.wb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵted"](-1,0,["Crea la tua cena"])),(n()(),t["ɵeld"](12,0,null,null,39,"ion-content",[["class","padding"]],null,null,null,u.Q,u.h)),t["ɵdid"](13,49152,null,0,r.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](14,0,null,0,11,"ion-item",[],null,null,null,u.bb,u.p)),t["ɵdid"](15,49152,null,0,r.G,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](16,0,null,0,2,"ion-label",[["position","floating"]],null,null,null,u.cb,u.t)),t["ɵdid"](17,49152,null,0,r.M,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{position:[0,"position"]},null),(n()(),t["ɵted"](-1,0,["Descrizione"])),(n()(),t["ɵeld"](19,0,null,0,6,"ion-input",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,e){var o=!0,i=n.component;return"ionBlur"===l&&(o=!1!==t["ɵnov"](n,20)._handleBlurEvent(e.target)&&o),"ionChange"===l&&(o=!1!==t["ɵnov"](n,20)._handleInputEvent(e.target)&&o),"ngModelChange"===l&&(o=!1!==(i.dinnerDescription=e)&&o),o}),u.X,u.o)),t["ɵdid"](20,16384,null,0,r.Jb,[t.ElementRef],null,null),t["ɵprd"](1024,null,a.c,(function(n){return[n]}),[r.Jb]),t["ɵdid"](22,671744,null,0,a.f,[[8,null],[8,null],[8,null],[6,a.c]],{model:[0,"model"]},{update:"ngModelChange"}),t["ɵprd"](2048,null,a.d,null,[a.f]),t["ɵdid"](24,16384,null,0,a.e,[[4,a.d]],null,null),t["ɵdid"](25,49152,null,0,r.F,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](26,0,null,0,13,"ion-item",[],null,null,null,u.bb,u.p)),t["ɵdid"](27,49152,null,0,r.G,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](28,0,null,0,2,"ion-label",[["position","floating"]],null,null,null,u.cb,u.t)),t["ɵdid"](29,49152,null,0,r.M,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{position:[0,"position"]},null),(n()(),t["ɵted"](-1,0,["Tipologia"])),(n()(),t["ɵeld"](31,0,null,0,8,"ion-select",[["placeholder","Tipologia"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,e){var o=!0,i=n.component;return"ionBlur"===l&&(o=!1!==t["ɵnov"](n,32)._handleBlurEvent(e.target)&&o),"ionChange"===l&&(o=!1!==t["ɵnov"](n,32)._handleChangeEvent(e.target)&&o),"ngModelChange"===l&&(o=!1!==(i.dinnerType=e)&&o),o}),u.jb,u.z)),t["ɵdid"](32,16384,null,0,r.Ib,[t.ElementRef],null,null),t["ɵprd"](1024,null,a.c,(function(n){return[n]}),[r.Ib]),t["ɵdid"](34,671744,null,0,a.f,[[8,null],[8,null],[8,null],[6,a.c]],{model:[0,"model"]},{update:"ngModelChange"}),t["ɵprd"](2048,null,a.d,null,[a.f]),t["ɵdid"](36,16384,null,0,a.e,[[4,a.d]],null,null),t["ɵdid"](37,49152,null,0,r.jb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{placeholder:[0,"placeholder"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,v)),t["ɵdid"](39,278528,null,0,d.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["ɵeld"](40,0,null,0,11,"ion-item",[],null,null,null,u.bb,u.p)),t["ɵdid"](41,49152,null,0,r.G,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](42,0,null,0,2,"ion-label",[["position","floating"]],null,null,null,u.cb,u.t)),t["ɵdid"](43,49152,null,0,r.M,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{position:[0,"position"]},null),(n()(),t["ɵted"](-1,0,["Data"])),(n()(),t["ɵeld"](45,0,null,0,6,"ion-datetime",[["displayFormat","DD/MM/YYYY"],["placeholder","Data"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,e){var o=!0,i=n.component;return"ionBlur"===l&&(o=!1!==t["ɵnov"](n,46)._handleBlurEvent(e.target)&&o),"ionChange"===l&&(o=!1!==t["ɵnov"](n,46)._handleChangeEvent(e.target)&&o),"ngModelChange"===l&&(o=!1!==(i.dinnerDateStr=e)&&o),o}),u.R,u.i)),t["ɵdid"](46,16384,null,0,r.Ib,[t.ElementRef],null,null),t["ɵprd"](1024,null,a.c,(function(n){return[n]}),[r.Ib]),t["ɵdid"](48,671744,null,0,a.f,[[8,null],[8,null],[8,null],[6,a.c]],{model:[0,"model"]},{update:"ngModelChange"}),t["ɵprd"](2048,null,a.d,null,[a.f]),t["ɵdid"](50,16384,null,0,a.e,[[4,a.d]],null,null),t["ɵdid"](51,49152,null,0,r.u,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{displayFormat:[0,"displayFormat"],placeholder:[1,"placeholder"]},null),(n()(),t["ɵeld"](52,0,null,null,4,"ion-footer",[["class","ion-no-border"]],null,null,null,u.S,u.j)),t["ɵdid"](53,49152,null,0,r.y,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](54,0,null,0,2,"ion-button",[["color","secondary"],["expand","block"],["fill","outline"],["strong","true"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onCreateDinner()&&t),t}),u.M,u.d)),t["ɵdid"](55,49152,null,0,r.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{color:[0,"color"],disabled:[1,"disabled"],expand:[2,"expand"],fill:[3,"fill"],strong:[4,"strong"]},null),(n()(),t["ɵted"](-1,0,["Crea Cena"]))],(function(n,l){var e=l.component;n(l,7,0,"/home/tabs/rooms"),n(l,8,0,"/home/tabs/rooms"),n(l,17,0,"floating"),n(l,22,0,e.dinnerDescription),n(l,29,0,"floating"),n(l,34,0,e.dinnerType),n(l,37,0,"Tipologia"),n(l,39,0,e.dinnerTypes),n(l,43,0,"floating"),n(l,48,0,e.dinnerDateStr),n(l,51,0,"DD/MM/YYYY","Data"),n(l,55,0,"secondary",!e.dinnerDescription,"block","outline","true")}),(function(n,l){n(l,19,0,t["ɵnov"](l,24).ngClassUntouched,t["ɵnov"](l,24).ngClassTouched,t["ɵnov"](l,24).ngClassPristine,t["ɵnov"](l,24).ngClassDirty,t["ɵnov"](l,24).ngClassValid,t["ɵnov"](l,24).ngClassInvalid,t["ɵnov"](l,24).ngClassPending),n(l,31,0,t["ɵnov"](l,36).ngClassUntouched,t["ɵnov"](l,36).ngClassTouched,t["ɵnov"](l,36).ngClassPristine,t["ɵnov"](l,36).ngClassDirty,t["ɵnov"](l,36).ngClassValid,t["ɵnov"](l,36).ngClassInvalid,t["ɵnov"](l,36).ngClassPending),n(l,45,0,t["ɵnov"](l,50).ngClassUntouched,t["ɵnov"](l,50).ngClassTouched,t["ɵnov"](l,50).ngClassPristine,t["ɵnov"](l,50).ngClassDirty,t["ɵnov"](l,50).ngClassValid,t["ɵnov"](l,50).ngClassInvalid,t["ɵnov"](l,50).ngClassPending)}))}function R(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"app-create-room",[],null,null,null,b,C)),t["ɵdid"](1,114688,null,0,m,[f,r.a,h.a,r.Eb],null,null)],(function(n,l){n(l,1,0)}),null)}var D=t["ɵccf"]("app-create-room",m,R,{},{},[]),y=e("ZYCi"),E=function(){return function(){}}();e.d(l,"CreateRoomPageModuleNgFactory",(function(){return N}));var N=t["ɵcmf"](o,[],(function(n){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[i.a,D]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,d.NgLocalization,d.NgLocaleLocalization,[t.LOCALE_ID,[2,d["ɵangular_packages_common_common_a"]]]),t["ɵmpd"](4608,a.i,a.i,[]),t["ɵmpd"](4608,r.b,r.b,[t.NgZone,t.ApplicationRef]),t["ɵmpd"](4608,r.Db,r.Db,[r.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](4608,r.Gb,r.Gb,[r.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](1073742336,d.CommonModule,d.CommonModule,[]),t["ɵmpd"](1073742336,a.h,a.h,[]),t["ɵmpd"](1073742336,a.a,a.a,[]),t["ɵmpd"](1073742336,r.Ab,r.Ab,[]),t["ɵmpd"](1073742336,y.o,y.o,[[2,y.t],[2,y.m]]),t["ɵmpd"](1073742336,E,E,[]),t["ɵmpd"](1073742336,o,o,[]),t["ɵmpd"](1024,y.k,(function(){return[[{path:"",component:m}]]}),[])])}))}}]);