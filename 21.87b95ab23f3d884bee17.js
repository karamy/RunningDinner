(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{qHb4:function(n,l,e){"use strict";e.r(l);var t=e("CcnG"),u=function(){return function(){}}(),o=e("pMnS"),i=e("MKJQ"),a=e("jy/b"),r=e("Ip0R"),s=e("gIcY"),c=e("qXBG"),d=e("0+Dt"),g=e("DRZ3"),p=e("98RE"),m=function(){function n(n,l,e,t){this.chatService=n,this.authService=l,this.profileService=e,this.notificationService=t,this.dinnerMessages=[]}return n.prototype.ngOnInit=function(){var n=this;this.user=this.authService.getUserData(),this.chatService.init(!1).then((function(l){n.messagesSubscription=l.subscribe((function(l){n.handleNewMessages(l)}))})),this.notificationService.getUpdateParamsObservable().subscribe((function(){n.onReinitChat()}))},n.prototype.handleNewMessages=function(n){0===this.dinnerMessages.length&&this.scrollToBottom(),this.dinnerMessages=this.dinnerMessages.concat(n)},n.prototype.sendMsg=function(){var n=this;this.newMsgText&&this.chatService.addNewMessage(this.authService.getUserData().userid,this.newMsgText).then((function(){n.scrollToBottom(),n.newMsgText=""}))},n.prototype.scrollToBottom=function(){var n=this;setTimeout((function(){n.chatContent.scrollToBottom()}))},n.prototype.onReinitChat=function(){var n=this;console.log("Chat - Ricarico parametri e messaggi"),this.dinnerMessages=[],this.messagesSubscription.unsubscribe(),this.chatService.init(!0).then((function(l){n.messagesSubscription=l.subscribe((function(l){n.handleNewMessages(l)}))}))},n}(),f=t["ɵcrt"]({encapsulation:0,styles:[['body[_ngcontent-%COMP%]{font-family:Ubuntu-Italic,"Lucida Sans",helvetica,sans}ion-icon[_ngcontent-%COMP%]{font-size:1.5em;color:#9cc7ae}.send[_ngcontent-%COMP%]{font-size:2em}.sendbutton[_ngcontent-%COMP%]{float:right}#chatContent[_ngcontent-%COMP%]{opacity:0;margin-top:30px;width:290px;height:270px;overflow-y:scroll;overflow-x:hidden;padding-right:20px;transition:all .2s cubic-bezier(0,.995,.99,1)}div.message[_ngcontent-%COMP%]{padding:0 0 30px 40px;clear:both;margin-bottom:10px}div.message.right[_ngcontent-%COMP%]{padding:0 50px 30px 0;margin-left:auto}.message[_ngcontent-%COMP%]   .bubble[_ngcontent-%COMP%]{background:#f0f4f7;font-size:13px;font-weight:600;padding:12px 13px;border-radius:5px 5px 5px 0;color:#8495a3;position:relative;min-width:50px}div.message.right[_ngcontent-%COMP%]   .bubble[_ngcontent-%COMP%]{float:right;border-radius:5px 5px 0}.bubble[_ngcontent-%COMP%]   .corner[_ngcontent-%COMP%]{background:url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/bubble-corner.png) no-repeat;position:absolute;width:7px;height:7px;left:-5px;bottom:0}div.message.right[_ngcontent-%COMP%]   .corner[_ngcontent-%COMP%]{background:url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/bubble-cornerR.png) no-repeat;left:auto;right:-5px}.bubble[_ngcontent-%COMP%]   span.time[_ngcontent-%COMP%]{color:#aab8c2;font-size:11px;position:absolute;right:0;bottom:-22px}ion-avatar[_ngcontent-%COMP%]{float:left;margin-left:-38px;width:35px;height:35px;border:3px solid #9cc7ae}div.message.right[_ngcontent-%COMP%]   ion-avatar[_ngcontent-%COMP%]{float:right;margin-left:0;margin-right:-38px}ion-textarea[_ngcontent-%COMP%]{border-radius:7px;margin-left:5%;--padding-start:20px;margin-top:2.5%;max-height:100px;max-width:80%}']],data:{}});function h(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,11,"div",[["class","message"]],null,null,null,null,null)),(n()(),t["ɵeld"](1,0,null,null,2,"ion-avatar",[],null,null,null,i.P,i.b)),t["ɵdid"](2,49152,null,0,a.e,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](3,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null)),(n()(),t["ɵeld"](4,0,null,null,7,"div",[["class","bubble"]],null,null,null,null,null)),(n()(),t["ɵeld"](5,0,null,null,1,"span",[["style","color: lightcoral"]],null,null,null,null,null)),(n()(),t["ɵted"](6,null,["",""])),(n()(),t["ɵeld"](7,0,null,null,0,"br",[],null,null,null,null,null)),(n()(),t["ɵted"](8,null,[" "," "])),(n()(),t["ɵeld"](9,0,null,null,0,"div",[["class","corner"]],null,null,null,null,null)),(n()(),t["ɵeld"](10,0,null,null,1,"span",[["class","time"]],null,null,null,null,null)),(n()(),t["ɵted"](11,null,["",""]))],null,(function(n,l){var e=l.component;n(l,3,0,e.chatService.getUserChatImage(l.parent.context.$implicit.userid)),n(l,6,0,e.chatService.getUserChatName(l.parent.context.$implicit.userid)),n(l,8,0,l.parent.context.$implicit.message),n(l,11,0,l.parent.context.$implicit.timeofmsg)}))}function b(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,11,"div",[["class","message right"]],null,null,null,null,null)),(n()(),t["ɵeld"](1,0,null,null,2,"ion-avatar",[],null,null,null,i.P,i.b)),t["ɵdid"](2,49152,null,0,a.e,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](3,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null)),(n()(),t["ɵeld"](4,0,null,null,7,"div",[["class","bubble"]],null,null,null,null,null)),(n()(),t["ɵeld"](5,0,null,null,1,"span",[["style","color: green"]],null,null,null,null,null)),(n()(),t["ɵted"](6,null,["",""])),(n()(),t["ɵeld"](7,0,null,null,0,"br",[],null,null,null,null,null)),(n()(),t["ɵted"](8,null,[" "," "])),(n()(),t["ɵeld"](9,0,null,null,0,"div",[["class","corner"]],null,null,null,null,null)),(n()(),t["ɵeld"](10,0,null,null,1,"span",[["class","time"]],null,null,null,null,null)),(n()(),t["ɵted"](11,null,["",""]))],null,(function(n,l){var e=l.component;n(l,3,0,e.user.profile_photo),n(l,6,0,e.chatService.getUserChatName(l.parent.context.$implicit.userid)),n(l,8,0,l.parent.context.$implicit.message),n(l,11,0,l.parent.context.$implicit.timeofmsg)}))}function C(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,5,"ion-item",[["text-wrap",""]],null,null,null,i.jb,i.s)),t["ɵdid"](1,49152,null,0,a.G,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,h)),t["ɵdid"](3,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,b)),t["ɵdid"](5,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,3,0,l.context.$implicit.userid!=e.user.userid),n(l,5,0,l.context.$implicit.userid===e.user.userid)}),null)}function v(n){return t["ɵvid"](0,[t["ɵqud"](671088640,1,{chatContent:0}),(n()(),t["ɵeld"](1,0,null,null,14,"ion-header",[["class","ion-no-border"]],null,null,null,i.ab,i.m)),t["ɵdid"](2,49152,null,0,a.A,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](3,0,null,0,12,"ion-toolbar",[],null,null,null,i.Bb,i.N)),t["ɵdid"](4,49152,null,0,a.yb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](5,0,null,0,4,"ion-buttons",[["slot","secondary"]],null,null,null,i.S,i.e)),t["ɵdid"](6,49152,null,0,a.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](7,0,null,0,2,"ion-back-button",[["defaultHref","/home/tabs/my-dinners"],["text","Indietro"]],null,[[null,"click"]],(function(n,l,e){var u=!0;return"click"===l&&(u=!1!==t["ɵnov"](n,9).onClick(e)&&u),u}),i.Q,i.c)),t["ɵdid"](8,49152,null,0,a.f,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{defaultHref:[0,"defaultHref"],text:[1,"text"]},null),t["ɵdid"](9,16384,null,0,a.g,[[2,a.eb],a.Eb,a.c],{defaultHref:[0,"defaultHref"]},null),(n()(),t["ɵeld"](10,0,null,0,5,"ion-buttons",[["slot","primary"]],null,null,null,i.S,i.e)),t["ɵdid"](11,49152,null,0,a.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](12,0,null,0,3,"ion-button",[["shape","round"],["size","large"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onReinitChat()&&t),t}),i.R,i.d)),t["ɵdid"](13,49152,null,0,a.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{shape:[0,"shape"],size:[1,"size"]},null),(n()(),t["ɵeld"](14,0,null,0,1,"ion-icon",[["name","refresh-circle-outline"],["size","large"]],null,null,null,i.bb,i.n)),t["ɵdid"](15,49152,null,0,a.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"],size:[1,"size"]},null),(n()(),t["ɵeld"](16,0,null,null,6,"ion-content",[],null,null,null,i.W,i.i)),t["ɵdid"](17,49152,[[1,4],["chatContent",4]],0,a.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](18,0,null,0,4,"div",[],null,null,null,null,null)),(n()(),t["ɵeld"](19,0,null,null,3,"ion-list",[["lines","none"]],null,null,null,i.lb,i.x)),t["ɵdid"](20,49152,null,0,a.N,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{lines:[0,"lines"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,C)),t["ɵdid"](22,278528,null,0,r.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["ɵeld"](23,0,null,null,14,"ion-footer",[],null,null,null,i.Y,i.k)),t["ɵdid"](24,49152,null,0,a.y,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](25,0,null,0,12,"ion-toolbar",[["color","primary"]],null,null,null,i.Bb,i.N)),t["ɵdid"](26,49152,null,0,a.yb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{color:[0,"color"]},null),(n()(),t["ɵeld"](27,0,null,0,6,"ion-textarea",[["autoGrow","true"],["class","newmsg"],["maxLength","200"],["name","newmessage"],["placeholder","Write your message ..."],["rows","1"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,e){var u=!0,o=n.component;return"ionBlur"===l&&(u=!1!==t["ɵnov"](n,28)._handleBlurEvent(e.target)&&u),"ionChange"===l&&(u=!1!==t["ɵnov"](n,28)._handleInputEvent(e.target)&&u),"ngModelChange"===l&&(u=!1!==(o.newMsgText=e)&&u),u}),i.zb,i.L)),t["ɵdid"](28,4341760,null,0,a.Jb,[t.Injector,t.ElementRef],null,null),t["ɵprd"](1024,null,s.c,(function(n){return[n]}),[a.Jb]),t["ɵdid"](30,671744,null,0,s.f,[[8,null],[8,null],[8,null],[6,s.c]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["ɵprd"](2048,null,s.d,null,[s.f]),t["ɵdid"](32,16384,null,0,s.e,[[4,s.d]],null,null),t["ɵdid"](33,49152,[["newmsg",4]],0,a.ub,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{autoGrow:[0,"autoGrow"],name:[1,"name"],placeholder:[2,"placeholder"],rows:[3,"rows"]},null),(n()(),t["ɵeld"](34,0,null,0,3,"ion-button",[["class","sendbutton"],["slot","primary"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.sendMsg()&&t),t}),i.R,i.d)),t["ɵdid"](35,49152,null,0,a.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{disabled:[0,"disabled"]},null),(n()(),t["ɵeld"](36,0,null,0,1,"ion-icon",[["class","send"],["name","arrow-up-circle"]],null,null,null,i.bb,i.n)),t["ɵdid"](37,49152,null,0,a.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null)],(function(n,l){var e=l.component;n(l,8,0,"/home/tabs/my-dinners","Indietro"),n(l,9,0,"/home/tabs/my-dinners"),n(l,13,0,"round","large"),n(l,15,0,"refresh-circle-outline","large"),n(l,20,0,"none"),n(l,22,0,e.dinnerMessages),n(l,26,0,"primary"),n(l,30,0,"newmessage",e.newMsgText),n(l,33,0,"true","newmessage","Write your message ...","1"),n(l,35,0,!e.newMsgText),n(l,37,0,"arrow-up-circle")}),(function(n,l){n(l,27,0,t["ɵnov"](l,32).ngClassUntouched,t["ɵnov"](l,32).ngClassTouched,t["ɵnov"](l,32).ngClassPristine,t["ɵnov"](l,32).ngClassDirty,t["ɵnov"](l,32).ngClassValid,t["ɵnov"](l,32).ngClassInvalid,t["ɵnov"](l,32).ngClassPending)}))}function x(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"app-chat",[],null,null,null,v,f)),t["ɵdid"](1,114688,null,0,m,[g.a,c.a,d.a,p.a],null,null)],(function(n,l){n(l,1,0)}),null)}var R=t["ɵccf"]("app-chat",m,x,{},{},[]),M=e("ZYCi"),w=function(){return function(){}}(),y=e("RnAK"),N=e("E9nr");e.d(l,"ChatPageModuleNgFactory",(function(){return _}));var _=t["ɵcmf"](u,[],(function(n){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[o.a,R]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,r.NgLocalization,r.NgLocaleLocalization,[t.LOCALE_ID,[2,r["ɵangular_packages_common_common_a"]]]),t["ɵmpd"](4608,s.i,s.i,[]),t["ɵmpd"](4608,a.b,a.b,[t.NgZone,t.ApplicationRef]),t["ɵmpd"](4608,a.Db,a.Db,[a.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](4608,a.Gb,a.Gb,[a.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](1073742336,r.CommonModule,r.CommonModule,[]),t["ɵmpd"](1073742336,s.h,s.h,[]),t["ɵmpd"](1073742336,s.a,s.a,[]),t["ɵmpd"](1073742336,a.Ab,a.Ab,[]),t["ɵmpd"](1073742336,M.p,M.p,[[2,M.u],[2,M.n]]),t["ɵmpd"](1073742336,w,w,[]),t["ɵmpd"](1073742336,y.a,y.a,[]),t["ɵmpd"](1073742336,N.a,N.a,[]),t["ɵmpd"](1073742336,u,u,[]),t["ɵmpd"](1024,M.l,(function(){return[[{path:"",component:m}]]}),[])])}))}}]);