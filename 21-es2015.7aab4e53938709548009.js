(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{Z00p:function(l,n,u){"use strict";u.r(n);var e=u("8Y7J");class t{}var o=u("pMnS"),s=u("MKJQ"),i=u("sZkV"),a=u("8aRU"),r=u("Fn5J"),b=u("SVse"),p=u("qXBG"),c=u("yzu5"),h=u("8ld7");class d{constructor(l,n,u){this.authService=l,this.paramsService=n,this.contactsService=u,this.slideOpts={on:{beforeInit(){this.classNames.push(`${this.params.containerModifierClass}flip`),this.classNames.push(`${this.params.containerModifierClass}3d`);const l={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!0};this.params=Object.assign(this.params,l),this.originalParams=Object.assign(this.originalParams,l)},setTranslate(){const l=this,{slides:n,rtlTranslate:u}=l;for(let e=0;e<n.length;e+=1){const t=n.eq(e);let o=t[0].progress;l.params.flipEffect.limitRotation&&(o=Math.max(Math.min(t[0].progress,1),-1));let s=-180*o,i=0,a=-t[0].swiperSlideOffset,r=0;if(l.isHorizontal()?u&&(s=-s):(r=a,a=0,i=-s,s=0),t[0].style.zIndex=-Math.abs(Math.round(o))+n.length,l.params.flipEffect.slideShadows){let n=l.isHorizontal()?t.find(".swiper-slide-shadow-left"):t.find(".swiper-slide-shadow-top"),u=l.isHorizontal()?t.find(".swiper-slide-shadow-right"):t.find(".swiper-slide-shadow-bottom");0===n.length&&(n=l.$(`<div class="swiper-slide-shadow-${l.isHorizontal()?"left":"top"}"></div>`),t.append(n)),0===u.length&&(u=l.$(`<div class="swiper-slide-shadow-${l.isHorizontal()?"right":"bottom"}"></div>`),t.append(u)),n.length&&(n[0].style.opacity=Math.max(-o,0)),u.length&&(u[0].style.opacity=Math.max(o,0))}t.transform(`translate3d(${a}px, ${r}px, 0px) rotateX(${i}deg) rotateY(${s}deg)`)}},setTransition(l){const n=this,{slides:u,activeIndex:e,$wrapperEl:t}=n;if(u.transition(l).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(l),n.params.virtualTranslate&&0!==l){let l=!1;u.eq(e).transitionEnd((function(){if(l)return;if(!n||n.destroyed)return;l=!0,n.animating=!1;const u=["webkitTransitionEnd","transitionend"];for(let l=0;l<u.length;l+=1)t.trigger(u[l])}))}}}}}ngOnInit(){this.user=this.authService.getUserData(),this.user.profile_photo="assets/Logo.png",this.userAge=this.calcAge(this.user.birth_date),console.log(this.user)}calcAge(l){let n=new Date,u=new Date(l),e=n.getFullYear()-u.getFullYear(),t=n.getMonth()-u.getMonth();return(t<0||0===t&&n.getDate()<u.getDate())&&e--,e}showUser(){console.log(this.user.name)}onLogout(){this.authService.doLogout()}onLeaveGroup(){this.contactsService.leaveGroup(this.paramsService.getParams().groupId).then(()=>{this.paramsService.loadParams()},l=>{console.warn(l)})}}var g=e.nb({encapsulation:0,styles:[["ion-slide.swiper-slide[_ngcontent-%COMP%]{-webkit-box-align:start;align-items:flex-start}"]],data:{}});function f(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,6,"ion-row",[["class","ion-align-items-center"]],null,null,null,s.Z,s.u)),e.ob(1,49152,null,0,i.fb,[e.h,e.k,e.x],null,null),(l()(),e.pb(2,0,null,0,4,"ion-col",[["class","ion-text-center"]],null,null,null,s.L,s.g)),e.ob(3,49152,null,0,i.s,[e.h,e.k,e.x],null,null),(l()(),e.pb(4,0,null,0,2,"ion-button",[],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.onLeaveGroup()&&e),e}),s.I,s.d)),e.ob(5,49152,null,0,i.j,[e.h,e.k,e.x],null,null),(l()(),e.Fb(-1,0,["Lascia il gruppo"]))],null,null)}function m(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,17,"ion-header",[],null,null,null,s.Q,s.l)),e.ob(1,49152,null,0,i.A,[e.h,e.k,e.x],null,null),(l()(),e.pb(2,0,null,0,15,"ion-toolbar",[],null,null,null,s.jb,s.E)),e.ob(3,49152,null,0,i.yb,[e.h,e.k,e.x],null,null),(l()(),e.pb(4,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,s.J,s.e)),e.ob(5,49152,null,0,i.k,[e.h,e.k,e.x],null,null),(l()(),e.pb(6,0,null,0,2,"ion-back-button",[["defaultHref","/home/tabs/rooms"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e.Bb(l,8).onClick(u)&&t),t}),s.H,s.c)),e.ob(7,49152,null,0,i.f,[e.h,e.k,e.x],{defaultHref:[0,"defaultHref"]},null),e.ob(8,16384,null,0,i.g,[[2,i.eb],i.Eb],{defaultHref:[0,"defaultHref"]},null),(l()(),e.pb(9,0,null,0,2,"ion-title",[],null,null,null,s.ib,s.D)),e.ob(10,49152,null,0,i.wb,[e.h,e.k,e.x],null,null),(l()(),e.Fb(-1,0,["profile"])),(l()(),e.pb(12,0,null,0,5,"ion-buttons",[["slot","primary"]],null,null,null,s.J,s.e)),e.ob(13,49152,null,0,i.k,[e.h,e.k,e.x],null,null),(l()(),e.pb(14,0,null,0,3,"ion-button",[],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.onLogout()&&e),e}),s.I,s.d)),e.ob(15,49152,null,0,i.j,[e.h,e.k,e.x],null,null),(l()(),e.pb(16,0,null,0,1,"ion-icon",[["name","log-out-outline"],["slot","icon-only"]],null,null,null,s.R,s.m)),e.ob(17,49152,null,0,i.B,[e.h,e.k,e.x],{name:[0,"name"]},null),(l()(),e.pb(18,0,null,null,38,"ion-content",[],null,null,null,s.M,s.h)),e.ob(19,49152,null,0,i.t,[e.h,e.k,e.x],null,null),(l()(),e.pb(20,0,null,0,36,"ion-slides",[["pager","true"],["style","height: 100%;"]],null,null,null,s.eb,s.z)),e.ob(21,49152,null,0,i.nb,[e.h,e.k,e.x],{options:[0,"options"],pager:[1,"pager"]},null),(l()(),e.pb(22,0,null,0,30,"ion-slide",[],null,null,null,s.db,s.y)),e.ob(23,49152,null,0,i.mb,[e.h,e.k,e.x],null,null),(l()(),e.pb(24,0,null,0,28,"ion-grid",[],null,null,null,s.P,s.k)),e.ob(25,49152,null,0,i.z,[e.h,e.k,e.x],null,null),(l()(),e.pb(26,0,null,0,12,"ion-row",[],null,null,null,s.Z,s.u)),e.ob(27,49152,null,0,i.fb,[e.h,e.k,e.x],null,null),(l()(),e.pb(28,0,null,0,4,"ion-col",[["class","ion-align-items-center"]],null,null,null,s.L,s.g)),e.ob(29,49152,null,0,i.s,[e.h,e.k,e.x],null,null),(l()(),e.pb(30,0,null,0,2,"ion-avatar",[],null,null,null,s.G,s.b)),e.ob(31,49152,null,0,i.e,[e.h,e.k,e.x],null,null),(l()(),e.pb(32,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),e.pb(33,0,null,0,5,"ion-col",[["class","ion-align-items-center"]],null,null,null,s.L,s.g)),e.ob(34,49152,null,0,i.s,[e.h,e.k,e.x],null,null),(l()(),e.pb(35,0,null,0,1,"h1",[],null,null,null,null,null)),(l()(),e.Fb(36,null,["",""])),(l()(),e.pb(37,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),e.Fb(38,null,[""," anni"])),(l()(),e.pb(39,0,null,0,5,"ion-row",[],null,null,null,s.Z,s.u)),e.ob(40,49152,null,0,i.fb,[e.h,e.k,e.x],null,null),(l()(),e.pb(41,0,null,0,3,"ion-col",[["class","ion-align-items-center"]],null,null,null,s.L,s.g)),e.ob(42,49152,null,0,i.s,[e.h,e.k,e.x],null,null),(l()(),e.pb(43,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),e.Fb(44,null,["",""])),(l()(),e.pb(45,0,null,0,5,"ion-row",[],null,null,null,s.Z,s.u)),e.ob(46,49152,null,0,i.fb,[e.h,e.k,e.x],null,null),(l()(),e.pb(47,0,null,0,3,"ion-col",[],null,null,null,s.L,s.g)),e.ob(48,49152,null,0,i.s,[e.h,e.k,e.x],null,null),(l()(),e.pb(49,0,null,0,1,"app-badge",[],null,null,null,a.b,a.a)),e.ob(50,114688,null,0,r.a,[],null,null),(l()(),e.eb(16777216,null,0,1,null,f)),e.ob(52,16384,null,0,b.i,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.pb(53,0,null,0,3,"ion-slide",[["style","background: green;"]],null,null,null,s.db,s.y)),e.ob(54,49152,null,0,i.mb,[e.h,e.k,e.x],null,null),(l()(),e.pb(55,0,null,0,1,"h1",[],null,null,null,null,null)),(l()(),e.Fb(-1,null,["Slide 2"]))],(function(l,n){var u=n.component;l(n,7,0,"/home/tabs/rooms"),l(n,8,0,"/home/tabs/rooms"),l(n,17,0,"log-out-outline"),l(n,21,0,u.slideOpts,"true"),l(n,50,0),l(n,52,0,u.paramsService.getParams().groupId&&!u.paramsService.getParams().dinnerId)}),(function(l,n){var u=n.component;l(n,32,0,u.user.profile_photo),l(n,36,0,u.user.name),l(n,38,0,u.userAge),l(n,44,0,u.user.address)}))}function w(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,1,"app-profile",[],null,null,null,m,g)),e.ob(1,114688,null,0,d,[p.a,c.a,h.a],null,null)],(function(l,n){l(n,1,0)}),null)}var k=e.lb("app-profile",d,w,{},{},[]),x=u("s7LF"),v=u("iInd");class z{}var y=u("0M4o");u.d(n,"ProfilePageModuleNgFactory",(function(){return M}));var M=e.mb(t,[],(function(l){return e.yb([e.zb(512,e.j,e.X,[[8,[o.a,k]],[3,e.j],e.v]),e.zb(4608,b.k,b.j,[e.s,[2,b.q]]),e.zb(4608,x.i,x.i,[]),e.zb(4608,i.b,i.b,[e.x,e.g]),e.zb(4608,i.Db,i.Db,[i.b,e.j,e.p]),e.zb(4608,i.Gb,i.Gb,[i.b,e.j,e.p]),e.zb(1073742336,b.b,b.b,[]),e.zb(1073742336,x.h,x.h,[]),e.zb(1073742336,x.a,x.a,[]),e.zb(1073742336,i.Ab,i.Ab,[]),e.zb(1073742336,v.o,v.o,[[2,v.t],[2,v.m]]),e.zb(1073742336,z,z,[]),e.zb(1073742336,y.a,y.a,[]),e.zb(1073742336,t,t,[]),e.zb(1024,v.k,(function(){return[[{path:"",component:d}]]}),[])])}))}}]);