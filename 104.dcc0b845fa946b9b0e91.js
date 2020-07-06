(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{eEW1:function(n,l,e){"use strict";e.r(l);var t=e("CcnG"),o=function(){return function(){}}(),i=e("pMnS"),u=e("MKJQ"),d=e("jy/b"),r=e("gIcY"),a=e("Ip0R"),s=e("mrSG"),g=e("rrMi"),c=e("yzu5"),p=e("98RE"),f=function(){function n(n,l,e,t,o){this.dinnersService=n,this.alertController=l,this.paramsService=e,this.navController=t,this.notificationsService=o}return Object.defineProperty(n.prototype,"dinnerDateStr",{get:function(){return this.dinnerDate.toISOString()},set:function(n){this.dinnerDate=new Date(n)},enumerable:!0,configurable:!0}),n.prototype.ngOnInit=function(){this.customActionSheetOptions={header:"Tipologia",subHeader:"Seleziona la tipologia di cena"},this.dinnerTypes=this.dinnersService.getDinnerTypes(),this.dinnerType=1,this.dinnerDate=new Date,this.dinnerDate.setDate(this.dinnerDate.getDate()+1)},n.prototype.onCreateDinner=function(){return s.__awaiter(this,void 0,void 0,(function(){var n=this;return s.__generator(this,(function(l){switch(l.label){case 0:return[4,this.alertController.create({header:"Creazione cena",message:"Confermi la creazione della cena? Verrai automaticamente inserito come partecipante",buttons:[{text:"Cancel",role:"cancel",cssClass:"secondary",handler:function(){console.log("confirm cancel")}},{text:"Certo!",handler:function(){n.sendRequestCreateDinner()}}]})];case 1:return[4,l.sent().present()];case 2:return l.sent(),[2]}}))}))},n.prototype.sendRequestCreateDinner=function(){var n=this,l={dinnerTitle:this.dinnerTitle,dinnerDescription:this.dinnerDescription,dinnerType:this.dinnerType,dinnerDate:this.dinnerDate,groupId:this.paramsService.getParams().groupId};this.dinnersService.createDinner(l).then((function(){n.paramsService.loadParams().then((function(){n.notificationsService.fireUpdateParamsEvent()})),n.navController.navigateRoot("/home")}),(function(n){console.warn(n)}))},n}(),h=t["ɵcrt"]({encapsulation:0,styles:[[""]],data:{}});function m(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,2,"ion-select-option",[],null,null,null,u.ob,u.D)),t["ɵdid"](1,49152,null,0,d.kb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{value:[0,"value"]},null),(n()(),t["ɵted"](2,0,["",""]))],(function(n,l){n(l,1,0,l.context.$implicit.code)}),(function(n,l){n(l,2,0,l.context.$implicit.description)}))}function C(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,11,"ion-header",[],null,null,null,u.ab,u.o)),t["ɵdid"](1,49152,null,0,d.A,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](2,0,null,0,9,"ion-toolbar",[],null,null,null,u.xb,u.L)),t["ɵdid"](3,49152,null,0,d.yb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](4,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,u.Q,u.e)),t["ɵdid"](5,49152,null,0,d.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](6,0,null,0,2,"ion-back-button",[["defaultHref","/home/tabs/dinners"]],null,[[null,"click"]],(function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["ɵnov"](n,8).onClick(e)&&o),o}),u.O,u.c)),t["ɵdid"](7,49152,null,0,d.f,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{defaultHref:[0,"defaultHref"]},null),t["ɵdid"](8,16384,null,0,d.g,[[2,d.eb],d.Eb],{defaultHref:[0,"defaultHref"]},null),(n()(),t["ɵeld"](9,0,null,0,2,"ion-title",[],null,null,null,u.wb,u.K)),t["ɵdid"](10,49152,null,0,d.wb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵted"](-1,0,["Crea la tua cena"])),(n()(),t["ɵeld"](12,0,null,null,51,"ion-content",[["class","padding"]],null,null,null,u.W,u.k)),t["ɵdid"](13,49152,null,0,d.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](14,0,null,0,11,"ion-item",[],null,null,null,u.hb,u.s)),t["ɵdid"](15,49152,null,0,d.G,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](16,0,null,0,2,"ion-label",[["position","floating"]],null,null,null,u.ib,u.w)),t["ɵdid"](17,49152,null,0,d.M,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{position:[0,"position"]},null),(n()(),t["ɵted"](-1,0,["Titolo"])),(n()(),t["ɵeld"](19,0,null,0,6,"ion-input",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,e){var o=!0,i=n.component;return"ionBlur"===l&&(o=!1!==t["ɵnov"](n,20)._handleBlurEvent(e.target)&&o),"ionChange"===l&&(o=!1!==t["ɵnov"](n,20)._handleInputEvent(e.target)&&o),"ngModelChange"===l&&(o=!1!==(i.dinnerTitle=e)&&o),o}),u.db,u.r)),t["ɵdid"](20,16384,null,0,d.Jb,[t.ElementRef],null,null),t["ɵprd"](1024,null,r.d,(function(n){return[n]}),[d.Jb]),t["ɵdid"](22,671744,null,0,r.i,[[8,null],[8,null],[8,null],[6,r.d]],{model:[0,"model"]},{update:"ngModelChange"}),t["ɵprd"](2048,null,r.e,null,[r.i]),t["ɵdid"](24,16384,null,0,r.f,[[4,r.e]],null,null),t["ɵdid"](25,49152,null,0,d.F,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](26,0,null,0,11,"ion-item",[],null,null,null,u.hb,u.s)),t["ɵdid"](27,49152,null,0,d.G,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](28,0,null,0,2,"ion-label",[["position","floating"]],null,null,null,u.ib,u.w)),t["ɵdid"](29,49152,null,0,d.M,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{position:[0,"position"]},null),(n()(),t["ɵted"](-1,0,["Descrizione"])),(n()(),t["ɵeld"](31,0,null,0,6,"ion-input",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,e){var o=!0,i=n.component;return"ionBlur"===l&&(o=!1!==t["ɵnov"](n,32)._handleBlurEvent(e.target)&&o),"ionChange"===l&&(o=!1!==t["ɵnov"](n,32)._handleInputEvent(e.target)&&o),"ngModelChange"===l&&(o=!1!==(i.dinnerDescription=e)&&o),o}),u.db,u.r)),t["ɵdid"](32,16384,null,0,d.Jb,[t.ElementRef],null,null),t["ɵprd"](1024,null,r.d,(function(n){return[n]}),[d.Jb]),t["ɵdid"](34,671744,null,0,r.i,[[8,null],[8,null],[8,null],[6,r.d]],{model:[0,"model"]},{update:"ngModelChange"}),t["ɵprd"](2048,null,r.e,null,[r.i]),t["ɵdid"](36,16384,null,0,r.f,[[4,r.e]],null,null),t["ɵdid"](37,49152,null,0,d.F,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](38,0,null,0,13,"ion-item",[],null,null,null,u.hb,u.s)),t["ɵdid"](39,49152,null,0,d.G,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](40,0,null,0,2,"ion-label",[["position","floating"]],null,null,null,u.ib,u.w)),t["ɵdid"](41,49152,null,0,d.M,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{position:[0,"position"]},null),(n()(),t["ɵted"](-1,0,["Tipologia"])),(n()(),t["ɵeld"](43,0,null,0,8,"ion-select",[["placeholder","Tipologia"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,e){var o=!0,i=n.component;return"ionBlur"===l&&(o=!1!==t["ɵnov"](n,44)._handleBlurEvent(e.target)&&o),"ionChange"===l&&(o=!1!==t["ɵnov"](n,44)._handleChangeEvent(e.target)&&o),"ngModelChange"===l&&(o=!1!==(i.dinnerType=e)&&o),o}),u.pb,u.C)),t["ɵdid"](44,16384,null,0,d.Ib,[t.ElementRef],null,null),t["ɵprd"](1024,null,r.d,(function(n){return[n]}),[d.Ib]),t["ɵdid"](46,671744,null,0,r.i,[[8,null],[8,null],[8,null],[6,r.d]],{model:[0,"model"]},{update:"ngModelChange"}),t["ɵprd"](2048,null,r.e,null,[r.i]),t["ɵdid"](48,16384,null,0,r.f,[[4,r.e]],null,null),t["ɵdid"](49,49152,null,0,d.jb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{placeholder:[0,"placeholder"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,m)),t["ɵdid"](51,278528,null,0,a.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["ɵeld"](52,0,null,0,11,"ion-item",[],null,null,null,u.hb,u.s)),t["ɵdid"](53,49152,null,0,d.G,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](54,0,null,0,2,"ion-label",[["position","floating"]],null,null,null,u.ib,u.w)),t["ɵdid"](55,49152,null,0,d.M,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{position:[0,"position"]},null),(n()(),t["ɵted"](-1,0,["Data"])),(n()(),t["ɵeld"](57,0,null,0,6,"ion-datetime",[["displayFormat","DD/MM/YYYY HH:mm"],["placeholder","Data"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,e){var o=!0,i=n.component;return"ionBlur"===l&&(o=!1!==t["ɵnov"](n,58)._handleBlurEvent(e.target)&&o),"ionChange"===l&&(o=!1!==t["ɵnov"](n,58)._handleChangeEvent(e.target)&&o),"ngModelChange"===l&&(o=!1!==(i.dinnerDateStr=e)&&o),o}),u.X,u.l)),t["ɵdid"](58,16384,null,0,d.Ib,[t.ElementRef],null,null),t["ɵprd"](1024,null,r.d,(function(n){return[n]}),[d.Ib]),t["ɵdid"](60,671744,null,0,r.i,[[8,null],[8,null],[8,null],[6,r.d]],{model:[0,"model"]},{update:"ngModelChange"}),t["ɵprd"](2048,null,r.e,null,[r.i]),t["ɵdid"](62,16384,null,0,r.f,[[4,r.e]],null,null),t["ɵdid"](63,49152,null,0,d.u,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{displayFormat:[0,"displayFormat"],placeholder:[1,"placeholder"]},null),(n()(),t["ɵeld"](64,0,null,null,4,"ion-footer",[["class","ion-no-border"]],null,null,null,u.Y,u.m)),t["ɵdid"](65,49152,null,0,d.y,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](66,0,null,0,2,"ion-button",[["color","secondary"],["expand","block"],["fill","outline"],["strong","true"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onCreateDinner()&&t),t}),u.P,u.d)),t["ɵdid"](67,49152,null,0,d.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{color:[0,"color"],disabled:[1,"disabled"],expand:[2,"expand"],fill:[3,"fill"],strong:[4,"strong"]},null),(n()(),t["ɵted"](-1,0,["Crea Cena"]))],(function(n,l){var e=l.component;n(l,7,0,"/home/tabs/dinners"),n(l,8,0,"/home/tabs/dinners"),n(l,17,0,"floating"),n(l,22,0,e.dinnerTitle),n(l,29,0,"floating"),n(l,34,0,e.dinnerDescription),n(l,41,0,"floating"),n(l,46,0,e.dinnerType),n(l,49,0,"Tipologia"),n(l,51,0,e.dinnerTypes),n(l,55,0,"floating"),n(l,60,0,e.dinnerDateStr),n(l,63,0,"DD/MM/YYYY HH:mm","Data"),n(l,67,0,"secondary",!e.dinnerDescription,"block","outline","true")}),(function(n,l){n(l,19,0,t["ɵnov"](l,24).ngClassUntouched,t["ɵnov"](l,24).ngClassTouched,t["ɵnov"](l,24).ngClassPristine,t["ɵnov"](l,24).ngClassDirty,t["ɵnov"](l,24).ngClassValid,t["ɵnov"](l,24).ngClassInvalid,t["ɵnov"](l,24).ngClassPending),n(l,31,0,t["ɵnov"](l,36).ngClassUntouched,t["ɵnov"](l,36).ngClassTouched,t["ɵnov"](l,36).ngClassPristine,t["ɵnov"](l,36).ngClassDirty,t["ɵnov"](l,36).ngClassValid,t["ɵnov"](l,36).ngClassInvalid,t["ɵnov"](l,36).ngClassPending),n(l,43,0,t["ɵnov"](l,48).ngClassUntouched,t["ɵnov"](l,48).ngClassTouched,t["ɵnov"](l,48).ngClassPristine,t["ɵnov"](l,48).ngClassDirty,t["ɵnov"](l,48).ngClassValid,t["ɵnov"](l,48).ngClassInvalid,t["ɵnov"](l,48).ngClassPending),n(l,57,0,t["ɵnov"](l,62).ngClassUntouched,t["ɵnov"](l,62).ngClassTouched,t["ɵnov"](l,62).ngClassPristine,t["ɵnov"](l,62).ngClassDirty,t["ɵnov"](l,62).ngClassValid,t["ɵnov"](l,62).ngClassInvalid,t["ɵnov"](l,62).ngClassPending)}))}function v(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"app-create-dinner",[],null,null,null,C,h)),t["ɵdid"](1,114688,null,0,f,[g.a,d.a,c.a,d.Eb,p.a],null,null)],(function(n,l){n(l,1,0)}),null)}var b=t["ɵccf"]("app-create-dinner",f,v,{},{},[]),D=e("ZYCi"),R=function(){return function(){}}();e.d(l,"CreateDinnerPageModuleNgFactory",(function(){return E}));var E=t["ɵcmf"](o,[],(function(n){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[i.a,b]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,a.NgLocalization,a.NgLocaleLocalization,[t.LOCALE_ID,[2,a["ɵangular_packages_common_common_a"]]]),t["ɵmpd"](4608,r.l,r.l,[]),t["ɵmpd"](4608,d.b,d.b,[t.NgZone,t.ApplicationRef]),t["ɵmpd"](4608,d.Db,d.Db,[d.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](4608,d.Gb,d.Gb,[d.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](1073742336,a.CommonModule,a.CommonModule,[]),t["ɵmpd"](1073742336,r.k,r.k,[]),t["ɵmpd"](1073742336,r.b,r.b,[]),t["ɵmpd"](1073742336,d.Ab,d.Ab,[]),t["ɵmpd"](1073742336,D.p,D.p,[[2,D.u],[2,D.n]]),t["ɵmpd"](1073742336,R,R,[]),t["ɵmpd"](1073742336,o,o,[]),t["ɵmpd"](1024,D.l,(function(){return[[{path:"",component:f}]]}),[])])}))}}]);