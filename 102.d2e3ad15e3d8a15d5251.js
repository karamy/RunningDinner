(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{QJOm:function(n,l,e){"use strict";e.r(l);var t=e("CcnG"),o=function(){return function(){}}(),i=e("pMnS"),u=e("MKJQ"),c=e("jy/b"),r=e("L0Zc"),a=e("9B5/"),s=e("yzu5"),d=e("Ip0R"),p=e("mrSG"),f=e("iO+n"),m=e("8ld7"),g=e("DP//"),h=function(){function n(n,l,e){this.modalController=n,this.contactsService=l,this.spinner=e,this.contactList=[],this.modalOpen=!1}return n.prototype.showContact=function(n,l,e){return p.__awaiter(this,void 0,void 0,(function(){var t,o=this;return p.__generator(this,(function(i){switch(i.label){case 0:return this.modalOpen=!0,[4,this.modalController.create({component:f.a,swipeToClose:!0,backdropDismiss:!0,componentProps:{contactName:n,contactImage:l,contactId:e},cssClass:"modal-style"})];case 1:return(t=i.sent()).onWillDismiss().then((function(){o.modalOpen=!1})),[4,t.present()];case 2:return[2,i.sent()]}}))}))},n.prototype.ngOnInit=function(){var n=this;this.spinner.create("Caricando Contatti..."),this.fetchContacts().finally((function(){n.spinner.dismiss()}))},n.prototype.fetchContacts=function(){var n=this;return new Promise((function(l,e){n.contactsService.getLocalContacts(!0).then((function(t){n.contactsService.postContacts(t).then((function(e){n.contactList=n.contactsService.compareContacts(e,t),l()}),(function(){console.error("Impossibile inviare contatti al server"),e()}))}),(function(){console.error("Impossibile leggere contatti dal dispositivo"),e()}))}))},n.prototype.doRefresh=function(n){this.fetchContacts().finally((function(){n.target.complete()}))},n}(),b=t["ɵcrt"]({encapsulation:0,styles:[[".blur[_ngcontent-%COMP%]{-webkit-filter:blur(5px);filter:blur(5px)}"]],data:{}});function C(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,6,"ion-item",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.showContact(n.context.$implicit.name,n.context.$implicit.imageUrl,n.context.$implicit.userId)&&t),t}),u.bb,u.p)),t["ɵdid"](1,49152,null,0,c.G,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](2,0,null,0,2,"ion-avatar",[],null,null,null,u.K,u.b)),t["ɵdid"](3,49152,null,0,c.e,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](4,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null)),(n()(),t["ɵeld"](5,0,null,0,1,"p",[],null,null,null,null,null)),(n()(),t["ɵted"](6,null,["",""]))],null,(function(n,l){n(l,4,0,l.context.$implicit.imageUrl),n(l,6,0,l.context.$implicit.name)}))}function R(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,10,"ion-header",[],null,null,null,u.U,u.l)),t["ɵdid"](1,49152,null,0,c.A,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](2,0,null,0,8,"ion-toolbar",[],null,null,null,u.rb,u.I)),t["ɵdid"](3,49152,null,0,c.yb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](4,0,null,0,2,"ion-title",[],null,null,null,u.qb,u.H)),t["ɵdid"](5,49152,null,0,c.wb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵted"](-1,0,["contacts"])),(n()(),t["ɵeld"](7,0,null,0,3,"ion-buttons",[["slot","primary"]],null,null,null,u.N,u.e)),t["ɵdid"](8,49152,null,0,c.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](9,0,null,0,1,"rd-profile",[],null,null,null,r.b,r.a)),t["ɵdid"](10,114688,null,0,a.a,[s.a],null,null),(n()(),t["ɵeld"](11,0,null,null,9,"ion-content",[],[[2,"blur",null]],null,null,u.Q,u.h)),t["ɵdid"](12,49152,null,0,c.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](13,0,null,0,3,"ion-refresher",[["slot","fixed"]],null,[[null,"ionRefresh"]],(function(n,l,e){var t=!0;return"ionRefresh"===l&&(t=!1!==n.component.doRefresh(e)&&t),t}),u.fb,u.v)),t["ɵdid"](14,49152,null,0,c.Z,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](15,0,null,0,1,"ion-refresher-content",[["pullingIcon","lines"],["refreshingSpinner","lines"]],null,null,null,u.eb,u.w)),t["ɵdid"](16,49152,null,0,c.ab,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{pullingIcon:[0,"pullingIcon"],refreshingSpinner:[1,"refreshingSpinner"]},null),(n()(),t["ɵeld"](17,0,null,0,3,"ion-list",[],null,null,null,u.db,u.u)),t["ɵdid"](18,49152,null,0,c.N,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,C)),t["ɵdid"](20,278528,null,0,d.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],(function(n,l){var e=l.component;n(l,10,0),n(l,16,0,"lines","lines"),n(l,20,0,e.contactList)}),(function(n,l){n(l,11,0,!0===l.component.modalOpen)}))}function v(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"app-contacts",[],null,null,null,R,b)),t["ɵdid"](1,114688,null,0,h,[c.Db,m.a,g.a],null,null)],(function(n,l){n(l,1,0)}),null)}var N=t["ɵccf"]("app-contacts",h,v,{},{},[]),y=e("gIcY"),D=e("ZYCi"),w=function(){return function(){}}(),I=e("E9nr");e.d(l,"ContactsPageModuleNgFactory",(function(){return Z}));var Z=t["ɵcmf"](o,[],(function(n){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[i.a,N]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,d.NgLocalization,d.NgLocaleLocalization,[t.LOCALE_ID,[2,d["ɵangular_packages_common_common_a"]]]),t["ɵmpd"](4608,y.l,y.l,[]),t["ɵmpd"](4608,c.b,c.b,[t.NgZone,t.ApplicationRef]),t["ɵmpd"](4608,c.Db,c.Db,[c.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](4608,c.Gb,c.Gb,[c.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](1073742336,d.CommonModule,d.CommonModule,[]),t["ɵmpd"](1073742336,y.k,y.k,[]),t["ɵmpd"](1073742336,y.b,y.b,[]),t["ɵmpd"](1073742336,c.Ab,c.Ab,[]),t["ɵmpd"](1073742336,D.o,D.o,[[2,D.t],[2,D.m]]),t["ɵmpd"](1073742336,w,w,[]),t["ɵmpd"](1073742336,I.a,I.a,[]),t["ɵmpd"](1073742336,o,o,[]),t["ɵmpd"](1024,D.k,(function(){return[[{path:"",component:h}]]}),[])])}))}}]);