(window.webpackJsonp=window.webpackJsonp||[]).push([[111],{cynU:function(n,l,e){"use strict";e.r(l);var t=e("CcnG"),u=function(){return function(){}}(),i=e("pMnS"),r=e("MKJQ"),o=e("jy/b"),d=e("ZYCi"),a=e("Ip0R"),c=function(){function n(){}return n.prototype.ngOnInit=function(){},n}(),f=t["ɵcrt"]({encapsulation:0,styles:[["ion-card[_ngcontent-%COMP%]{background-color:#9cc7ae}"]],data:{}});function s(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,9,"ion-card",[],null,null,null,r.Y,r.f)),t["ɵdid"](1,49152,null,0,o.l,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](2,0,null,0,4,"ion-card-header",[],null,null,null,r.W,r.h)),t["ɵdid"](3,49152,null,0,o.n,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](4,0,null,0,2,"ion-card-title",[],null,null,null,r.X,r.i)),t["ɵdid"](5,49152,null,0,o.p,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵted"](6,0,["",""])),(n()(),t["ɵeld"](7,0,null,0,2,"ion-card-content",[],null,null,null,r.V,r.g)),t["ɵdid"](8,49152,null,0,o.m,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵted"](9,0,[" "," "]))],null,(function(n,l){var e=l.component;n(l,6,0,e.dinner.title),n(l,9,0,e.dinner.description)}))}var m=e("gEl6"),g=e("LKrI"),p=e("L0Zc"),h=e("9B5/"),R=e("yzu5"),b=e("98RE"),v=e("0+Dt"),D=e("rrMi"),y=function(){function n(n,l,e,t,u,i){this.dinnersService=n,this.navController=l,this.paramsService=e,this.ref=t,this.notificationsService=u,this.profileService=i}return n.prototype.ngOnInit=function(){var n=this;this.notificationsService.getUpdateParamsObservable().subscribe((function(){console.log("Dinner History - Ricarico cene"),n.loadDinners(null,!0)})),this.loadDinners(null,!1)},n.prototype.loadDinners=function(n,l){var e=this;this.paramsService.loadParams(l).then((function(){e.dinnersService.getMyDinner(l).then((function(t){if(e.myDinner=t,e.myDinner){var u=e.dinnersService.formatDate(e.myDinner.date);e.myDinner.dateString=u[0],e.myDinner.time=Number(u[1])}e.dinnersService.getDinnerHistory(l).then((function(l){e.dinnerHistoryList=l,n&&n.target.complete()}))}),(function(n){console.warn(n)}))}))},n.prototype.goToDinner=function(n){var l=this;this.dinnersService.getDinnerState(n.id).then((function(e){var t=e.dinner_state;console.log("Dinner State: "+t),l.dinnersService.detDinnerStateRoute(n,t)}))},n.prototype.goToDinnerWinner=function(n){this.navController.navigateRoot("/home/tabs/my-dinners/dinner-winners",{queryParams:n})},n}(),C=t["ɵcrt"]({encapsulation:0,styles:[[""]],data:{}});function N(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,5,"ion-button",[["routerLink","/home/chat"],["shape","round"],["size","large"]],null,[[null,"click"]],(function(n,l,e){var u=!0;return"click"===l&&(u=!1!==t["ɵnov"](n,2).onClick()&&u),"click"===l&&(u=!1!==t["ɵnov"](n,3).onClick(e)&&u),u}),r.T,r.d)),t["ɵdid"](1,49152,null,0,o.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{shape:[0,"shape"],size:[1,"size"]},null),t["ɵdid"](2,16384,null,0,d.n,[d.m,d.a,[8,null],t.Renderer2,t.ElementRef],{routerLink:[0,"routerLink"]},null),t["ɵdid"](3,737280,null,0,o.Hb,[a.LocationStrategy,o.Eb,t.ElementRef,d.m,[2,d.n]],null,null),(n()(),t["ɵeld"](4,0,null,0,1,"ion-icon",[["name","chatbubble-ellipses-outline"],["size","large"]],null,null,null,r.fb,r.p)),t["ɵdid"](5,49152,null,0,o.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"],size:[1,"size"]},null)],(function(n,l){n(l,1,0,"round","large"),n(l,2,0,"/home/chat"),n(l,3,0),n(l,5,0,"chatbubble-ellipses-outline","large")}),null)}function E(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,2,"div",[],null,null,null,null,null)),(n()(),t["ɵeld"](1,0,null,null,1,"rd-my-dinner",[],null,[[null,"click"]],(function(n,l,e){var t=!0,u=n.component;return"click"===l&&(t=!1!==u.goToDinner(u.myDinner)&&t),t}),s,f)),t["ɵdid"](2,114688,null,0,c,[],{dinner:[0,"dinner"]},null)],(function(n,l){n(l,2,0,l.component.myDinner)}),null)}function I(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,2,"div",[],null,null,null,null,null)),(n()(),t["ɵeld"](1,0,null,null,1,"rd-dinner",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.goToDinnerWinner(n.context.$implicit)&&t),t}),m.b,m.a)),t["ɵdid"](2,114688,null,0,g.a,[],{dinner:[0,"dinner"]},null)],(function(n,l){n(l,2,0,l.context.$implicit)}),null)}function k(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h2",[],null,null,null,null,null)),(n()(),t["ɵted"](-1,null,["Non sono presenti cene passate"]))],null,null)}function S(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,4,"div",[],null,null,null,null,null)),(n()(),t["ɵand"](16777216,null,null,1,null,I)),t["ɵdid"](2,278528,null,0,a.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["ɵand"](16777216,null,null,1,null,k)),t["ɵdid"](4,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,2,0,e.dinnerHistoryList),n(l,4,0,0===e.dinnerHistoryList.length)}),null)}function Z(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,14,"ion-header",[],null,null,null,r.eb,r.o)),t["ɵdid"](1,49152,null,0,o.A,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](2,0,null,0,12,"ion-toolbar",[],null,null,null,r.Fb,r.P)),t["ɵdid"](3,49152,null,0,o.yb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](4,0,null,0,2,"ion-title",[],null,null,null,r.Eb,r.O)),t["ɵdid"](5,49152,null,0,o.wb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵted"](-1,0,["My Dinners"])),(n()(),t["ɵeld"](7,0,null,0,3,"ion-buttons",[["slot","primary"]],null,null,null,r.U,r.e)),t["ɵdid"](8,49152,null,0,o.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](9,0,null,0,1,"rd-profile",[],null,null,null,p.b,p.a)),t["ɵdid"](10,114688,null,0,h.a,[R.a],null,null),(n()(),t["ɵeld"](11,0,null,0,3,"ion-buttons",[["slot","secondary"]],null,null,null,r.U,r.e)),t["ɵdid"](12,49152,null,0,o.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,N)),t["ɵdid"](14,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](15,0,null,null,11,"ion-content",[],null,null,null,r.ab,r.k)),t["ɵdid"](16,49152,null,0,o.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](17,0,null,0,3,"ion-refresher",[["slot","fixed"]],null,[[null,"ionRefresh"]],(function(n,l,e){var t=!0;return"ionRefresh"===l&&(t=!1!==n.component.loadDinners(e,!0)&&t),t}),r.sb,r.B)),t["ɵdid"](18,49152,null,0,o.Z,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](19,0,null,0,1,"ion-refresher-content",[["pullingIcon","lines"],["refreshingSpinner","lines"]],null,null,null,r.rb,r.C)),t["ɵdid"](20,49152,null,0,o.ab,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{pullingIcon:[0,"pullingIcon"],refreshingSpinner:[1,"refreshingSpinner"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,E)),t["ɵdid"](22,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](23,0,null,0,1,"h1",[],null,null,null,null,null)),(n()(),t["ɵted"](-1,null,["Cronologia Cene"])),(n()(),t["ɵand"](16777216,null,0,1,null,S)),t["ɵdid"](26,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,10,0),n(l,14,0,e.paramsService.getParams().dinnerId),n(l,20,0,"lines","lines"),n(l,22,0,e.myDinner),n(l,26,0,e.dinnerHistoryList)}),null)}function M(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"app-my-dinners",[],null,null,null,Z,C)),t["ɵdid"](1,114688,null,0,y,[D.a,o.Eb,R.a,t.ChangeDetectorRef,b.a,v.a],null,null)],(function(n,l){n(l,1,0)}),null)}var P=t["ɵccf"]("app-my-dinners",y,M,{},{},[]),w=e("gIcY"),F=function(){return e.e(110).then(e.bind(null,"OuYR")).then((function(n){return n.DinnerWinnersPageModuleNgFactory}))},L=function(){return e.e(6).then(e.bind(null,"CWoH")).then((function(n){return n.DinnerDetailPageModuleNgFactory}))},O=function(){return Promise.all([e.e(3),e.e(107)]).then(e.bind(null,"3YE8")).then((function(n){return n.DinnerEventPageModuleNgFactory}))},T=function(){return Promise.all([e.e(3),e.e(108)]).then(e.bind(null,"VBSJ")).then((function(n){return n.DinnerPhasesPageModuleNgFactory}))},z=function(){return Promise.all([e.e(3),e.e(109)]).then(e.bind(null,"7k/u")).then((function(n){return n.DinnerVotesPageModuleNgFactory}))},H=function(){return function(){}}(),V=e("RnAK"),_=e("E9nr");e.d(l,"MyDinnersPageModuleNgFactory",(function(){return A}));var A=t["ɵcmf"](u,[],(function(n){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[i.a,P]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,a.NgLocalization,a.NgLocaleLocalization,[t.LOCALE_ID,[2,a["ɵangular_packages_common_common_a"]]]),t["ɵmpd"](4608,w.l,w.l,[]),t["ɵmpd"](4608,o.b,o.b,[t.NgZone,t.ApplicationRef]),t["ɵmpd"](4608,o.Db,o.Db,[o.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](4608,o.Gb,o.Gb,[o.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](1073742336,a.CommonModule,a.CommonModule,[]),t["ɵmpd"](1073742336,w.k,w.k,[]),t["ɵmpd"](1073742336,w.b,w.b,[]),t["ɵmpd"](1073742336,o.Ab,o.Ab,[]),t["ɵmpd"](1073742336,d.o,d.o,[[2,d.t],[2,d.m]]),t["ɵmpd"](1073742336,H,H,[]),t["ɵmpd"](1073742336,V.a,V.a,[]),t["ɵmpd"](1073742336,_.a,_.a,[]),t["ɵmpd"](1073742336,u,u,[]),t["ɵmpd"](1024,d.k,(function(){return[[{path:"",component:y},{path:"dinner-winners",loadChildren:F},{path:"dinner-detail",loadChildren:L},{path:"dinner-event",loadChildren:O},{path:"dinner-phases",loadChildren:T},{path:"dinner-votes",loadChildren:z}]]}),[])])}))}}]);