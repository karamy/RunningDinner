(window.webpackJsonp=window.webpackJsonp||[]).push([[101],{QJOm:function(n,l,t){"use strict";t.r(l);var o=t("CcnG"),u=function(){return function(){}}(),e=t("pMnS"),i=t("MKJQ"),c=t("jy/b"),r=t("L0Zc"),s=t("9B5/"),a=t("yzu5"),b=t("Ip0R"),p=t("mrSG"),f=t("iO+n"),h=t("8ld7"),m=t("DP//"),d=function(){function n(n,l,t){this.modalController=n,this.contactsService=l,this.spinner=t,this.contactList=[]}return n.prototype.showContact=function(n,l,t){return p.__awaiter(this,void 0,void 0,(function(){return p.__generator(this,(function(o){switch(o.label){case 0:return[4,this.modalController.create({component:f.a,swipeToClose:!0,backdropDismiss:!0,componentProps:{contactName:n,contactImage:l,contactId:t},cssClass:"modal-style"})];case 1:return[4,o.sent().present()];case 2:return[2,o.sent()]}}))}))},n.prototype.ngOnInit=function(){var n=this;this.spinner.create("Caricando Contatti..."),this.fetchContacts().finally((function(){n.spinner.dismiss()}))},n.prototype.fetchContacts=function(){var n=this;return new Promise((function(l,t){n.contactsService.getLocalContacts(!0).then((function(o){n.contactsService.postContacts(o).then((function(t){n.contactList=n.contactsService.compareContacts(t,o),l()}),(function(){console.error("Impossibile inviare contatti al server"),t()}))}),(function(){console.error("Impossibile leggere contatti dal dispositivo"),t()}))}))},n.prototype.doRefresh=function(n){this.fetchContacts().finally((function(){n.target.complete()}))},n}(),g=o.nb({encapsulation:0,styles:[[""]],data:{}});function v(n){return o.Gb(0,[(n()(),o.pb(0,0,null,null,6,"ion-item",[],null,[[null,"click"]],(function(n,l,t){var o=!0;return"click"===l&&(o=!1!==n.component.showContact(n.context.$implicit.name,n.context.$implicit.imageUrl,n.context.$implicit.userId)&&o),o}),i.U,i.p)),o.ob(1,49152,null,0,c.G,[o.h,o.k,o.x],null,null),(n()(),o.pb(2,0,null,0,2,"ion-avatar",[],null,null,null,i.G,i.b)),o.ob(3,49152,null,0,c.e,[o.h,o.k,o.x],null,null),(n()(),o.pb(4,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null)),(n()(),o.pb(5,0,null,0,1,"p",[],null,null,null,null,null)),(n()(),o.Fb(6,null,["",""]))],null,(function(n,l){n(l,4,0,l.context.$implicit.imageUrl),n(l,6,0,l.context.$implicit.name)}))}function k(n){return o.Gb(0,[(n()(),o.pb(0,0,null,null,10,"ion-header",[],null,null,null,i.Q,i.l)),o.ob(1,49152,null,0,c.A,[o.h,o.k,o.x],null,null),(n()(),o.pb(2,0,null,0,8,"ion-toolbar",[],null,null,null,i.jb,i.E)),o.ob(3,49152,null,0,c.yb,[o.h,o.k,o.x],null,null),(n()(),o.pb(4,0,null,0,2,"ion-title",[],null,null,null,i.ib,i.D)),o.ob(5,49152,null,0,c.wb,[o.h,o.k,o.x],null,null),(n()(),o.Fb(-1,0,["contacts"])),(n()(),o.pb(7,0,null,0,3,"ion-buttons",[["slot","primary"]],null,null,null,i.J,i.e)),o.ob(8,49152,null,0,c.k,[o.h,o.k,o.x],null,null),(n()(),o.pb(9,0,null,0,1,"rd-profile",[],null,null,null,r.b,r.a)),o.ob(10,114688,null,0,s.a,[a.a],null,null),(n()(),o.pb(11,0,null,null,9,"ion-content",[],null,null,null,i.M,i.h)),o.ob(12,49152,null,0,c.t,[o.h,o.k,o.x],null,null),(n()(),o.pb(13,0,null,0,3,"ion-refresher",[["slot","fixed"]],null,[[null,"ionRefresh"]],(function(n,l,t){var o=!0;return"ionRefresh"===l&&(o=!1!==n.component.doRefresh(t)&&o),o}),i.Y,i.s)),o.ob(14,49152,null,0,c.Z,[o.h,o.k,o.x],null,null),(n()(),o.pb(15,0,null,0,1,"ion-refresher-content",[["pullingIcon","lines"],["refreshingSpinner","lines"]],null,null,null,i.X,i.t)),o.ob(16,49152,null,0,c.ab,[o.h,o.k,o.x],{pullingIcon:[0,"pullingIcon"],refreshingSpinner:[1,"refreshingSpinner"]},null),(n()(),o.pb(17,0,null,0,3,"ion-list",[],null,null,null,i.W,i.r)),o.ob(18,49152,null,0,c.N,[o.h,o.k,o.x],null,null),(n()(),o.eb(16777216,null,0,1,null,v)),o.ob(20,278528,null,0,b.h,[o.M,o.J,o.q],{ngForOf:[0,"ngForOf"]},null)],(function(n,l){var t=l.component;n(l,10,0),n(l,16,0,"lines","lines"),n(l,20,0,t.contactList)}),null)}function x(n){return o.Gb(0,[(n()(),o.pb(0,0,null,null,1,"app-contacts",[],null,null,null,k,g)),o.ob(1,114688,null,0,d,[c.Db,h.a,m.a],null,null)],(function(n,l){n(l,1,0)}),null)}var C=o.lb("app-contacts",d,x,{},{},[]),z=t("gIcY"),y=t("ZYCi"),w=function(){return function(){}}(),I=t("E9nr");t.d(l,"ContactsPageModuleNgFactory",(function(){return G}));var G=o.mb(u,[],(function(n){return o.yb([o.zb(512,o.j,o.X,[[8,[e.a,C]],[3,o.j],o.v]),o.zb(4608,b.k,b.j,[o.s,[2,b.r]]),o.zb(4608,z.i,z.i,[]),o.zb(4608,c.b,c.b,[o.x,o.g]),o.zb(4608,c.Db,c.Db,[c.b,o.j,o.p]),o.zb(4608,c.Gb,c.Gb,[c.b,o.j,o.p]),o.zb(1073742336,b.b,b.b,[]),o.zb(1073742336,z.h,z.h,[]),o.zb(1073742336,z.a,z.a,[]),o.zb(1073742336,c.Ab,c.Ab,[]),o.zb(1073742336,y.o,y.o,[[2,y.t],[2,y.m]]),o.zb(1073742336,w,w,[]),o.zb(1073742336,I.a,I.a,[]),o.zb(1073742336,u,u,[]),o.zb(1024,y.k,(function(){return[[{path:"",component:d}]]}),[])])}))}}]);