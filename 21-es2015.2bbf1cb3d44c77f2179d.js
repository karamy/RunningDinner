(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{Z00p:function(l,n,t){"use strict";t.r(n);var e=t("8Y7J");class s{}var o=t("pMnS"),i=t("MKJQ"),u=t("sZkV"),a=t("qXBG");class r{constructor(l,n){this.authService=l,this.router=n,this.slideOpts={on:{beforeInit(){this.classNames.push(`${this.params.containerModifierClass}flip`),this.classNames.push(`${this.params.containerModifierClass}3d`);const l={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!0};this.params=Object.assign(this.params,l),this.originalParams=Object.assign(this.originalParams,l)},setTranslate(){const l=this,{slides:n,rtlTranslate:t}=l;for(let e=0;e<n.length;e+=1){const s=n.eq(e);let o=s[0].progress;l.params.flipEffect.limitRotation&&(o=Math.max(Math.min(s[0].progress,1),-1));let i=-180*o,u=0,a=-s[0].swiperSlideOffset,r=0;if(l.isHorizontal()?t&&(i=-i):(r=a,a=0,u=-i,i=0),s[0].style.zIndex=-Math.abs(Math.round(o))+n.length,l.params.flipEffect.slideShadows){let n=l.isHorizontal()?s.find(".swiper-slide-shadow-left"):s.find(".swiper-slide-shadow-top"),t=l.isHorizontal()?s.find(".swiper-slide-shadow-right"):s.find(".swiper-slide-shadow-bottom");0===n.length&&(n=l.$(`<div class="swiper-slide-shadow-${l.isHorizontal()?"left":"top"}"></div>`),s.append(n)),0===t.length&&(t=l.$(`<div class="swiper-slide-shadow-${l.isHorizontal()?"right":"bottom"}"></div>`),s.append(t)),n.length&&(n[0].style.opacity=Math.max(-o,0)),t.length&&(t[0].style.opacity=Math.max(o,0))}s.transform(`translate3d(${a}px, ${r}px, 0px) rotateX(${u}deg) rotateY(${i}deg)`)}},setTransition(l){const n=this,{slides:t,activeIndex:e,$wrapperEl:s}=n;if(t.transition(l).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(l),n.params.virtualTranslate&&0!==l){let l=!1;t.eq(e).transitionEnd((function(){if(l)return;if(!n||n.destroyed)return;l=!0,n.animating=!1;const t=["webkitTransitionEnd","transitionend"];for(let l=0;l<t.length;l+=1)s.trigger(t[l])}))}}}}}ngOnInit(){this.user=this.authService.getUserData()}showUser(){console.log(this.user.name)}onLogout(){this.authService.doLogout(),this.router.navigateByUrl("/auth")}}var b=t("iInd"),p=e.nb({encapsulation:0,styles:[[""]],data:{}});function d(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,17,"ion-header",[],null,null,null,i.M,i.l)),e.ob(1,49152,null,0,u.z,[e.h,e.k,e.x],null,null),(l()(),e.pb(2,0,null,0,15,"ion-toolbar",[],null,null,null,i.bb,i.A)),e.ob(3,49152,null,0,u.xb,[e.h,e.k,e.x],null,null),(l()(),e.pb(4,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,i.F,i.e)),e.ob(5,49152,null,0,u.j,[e.h,e.k,e.x],null,null),(l()(),e.pb(6,0,null,0,2,"ion-back-button",[["defaultHref","/home/tabs/rooms"]],null,[[null,"click"]],(function(l,n,t){var s=!0;return"click"===n&&(s=!1!==e.Bb(l,8).onClick(t)&&s),s}),i.D,i.c)),e.ob(7,49152,null,0,u.e,[e.h,e.k,e.x],{defaultHref:[0,"defaultHref"]},null),e.ob(8,16384,null,0,u.f,[[2,u.db],u.Db],{defaultHref:[0,"defaultHref"]},null),(l()(),e.pb(9,0,null,0,2,"ion-title",[],null,null,null,i.ab,i.z)),e.ob(10,49152,null,0,u.vb,[e.h,e.k,e.x],null,null),(l()(),e.Fb(-1,0,["profile"])),(l()(),e.pb(12,0,null,0,5,"ion-buttons",[["slot","primary"]],null,null,null,i.F,i.e)),e.ob(13,49152,null,0,u.j,[e.h,e.k,e.x],null,null),(l()(),e.pb(14,0,null,0,3,"ion-button",[],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.onLogout()&&e),e}),i.E,i.d)),e.ob(15,49152,null,0,u.i,[e.h,e.k,e.x],null,null),(l()(),e.pb(16,0,null,0,1,"ion-icon",[["name","log-out-outline"],["slot","icon-only"]],null,null,null,i.N,i.m)),e.ob(17,49152,null,0,u.A,[e.h,e.k,e.x],{name:[0,"name"]},null),(l()(),e.pb(18,0,null,null,12,"ion-content",[],null,null,null,i.I,i.h)),e.ob(19,49152,null,0,u.s,[e.h,e.k,e.x],null,null),(l()(),e.pb(20,0,null,0,10,"ion-slides",[["pager","true"],["style","height:100%;"]],null,null,null,i.W,i.v)),e.ob(21,49152,null,0,u.mb,[e.h,e.k,e.x],{options:[0,"options"],pager:[1,"pager"]},null),(l()(),e.pb(22,0,null,0,4,"ion-slide",[["style","Background:red;"]],null,null,null,i.V,i.u)),e.ob(23,49152,null,0,u.lb,[e.h,e.k,e.x],null,null),(l()(),e.pb(24,0,null,0,2,"ion-button",[],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.showUser()&&e),e}),i.E,i.d)),e.ob(25,49152,null,0,u.i,[e.h,e.k,e.x],null,null),(l()(),e.Fb(-1,0,["Mostra utente"])),(l()(),e.pb(27,0,null,0,3,"ion-slide",[["style","Background:green;"]],null,null,null,i.V,i.u)),e.ob(28,49152,null,0,u.lb,[e.h,e.k,e.x],null,null),(l()(),e.pb(29,0,null,0,1,"h1",[],null,null,null,null,null)),(l()(),e.Fb(-1,null,["Slide 2"]))],(function(l,n){var t=n.component;l(n,7,0,"/home/tabs/rooms"),l(n,8,0,"/home/tabs/rooms"),l(n,17,0,"log-out-outline"),l(n,21,0,t.slideOpts,"true")}),null)}function h(l){return e.Gb(0,[(l()(),e.pb(0,0,null,null,1,"app-profile",[],null,null,null,d,p)),e.ob(1,114688,null,0,r,[a.a,b.m],null,null)],(function(l,n){l(n,1,0)}),null)}var c=e.lb("app-profile",r,h,{},{},[]),f=t("SVse"),m=t("s7LF");class g{}t.d(n,"ProfilePageModuleNgFactory",(function(){return w}));var w=e.mb(s,[],(function(l){return e.yb([e.zb(512,e.j,e.X,[[8,[o.a,c]],[3,e.j],e.v]),e.zb(4608,f.k,f.j,[e.s,[2,f.q]]),e.zb(4608,m.i,m.i,[]),e.zb(4608,u.a,u.a,[e.x,e.g]),e.zb(4608,u.Cb,u.Cb,[u.a,e.j,e.p]),e.zb(4608,u.Gb,u.Gb,[u.a,e.j,e.p]),e.zb(1073742336,f.b,f.b,[]),e.zb(1073742336,m.h,m.h,[]),e.zb(1073742336,m.a,m.a,[]),e.zb(1073742336,u.zb,u.zb,[]),e.zb(1073742336,b.o,b.o,[[2,b.t],[2,b.m]]),e.zb(1073742336,g,g,[]),e.zb(1073742336,s,s,[]),e.zb(1024,b.k,(function(){return[[{path:"",component:r}]]}),[])])}))}}]);