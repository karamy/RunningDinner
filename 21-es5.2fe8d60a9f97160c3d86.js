(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{Z00p:function(l,n,t){"use strict";t.r(n);var u=t("8Y7J");class e{}var s=t("pMnS"),i=t("MKJQ"),o=t("sZkV"),a=t("qXBG");class r{constructor(l,n){this.authService=l,this.router=n,this.slideOpts={on:{beforeInit(){this.classNames.push("".concat(this.params.containerModifierClass,"flip")),this.classNames.push("".concat(this.params.containerModifierClass,"3d"));const l={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!0};this.params=Object.assign(this.params,l),this.originalParams=Object.assign(this.originalParams,l)},setTranslate(){const l=this,{slides:n,rtlTranslate:t}=l;for(let u=0;u<n.length;u+=1){const e=n.eq(u);let s=e[0].progress;l.params.flipEffect.limitRotation&&(s=Math.max(Math.min(e[0].progress,1),-1));let i=-180*s,o=0,a=-e[0].swiperSlideOffset,r=0;if(l.isHorizontal()?t&&(i=-i):(r=a,a=0,o=-i,i=0),e[0].style.zIndex=-Math.abs(Math.round(s))+n.length,l.params.flipEffect.slideShadows){let n=l.isHorizontal()?e.find(".swiper-slide-shadow-left"):e.find(".swiper-slide-shadow-top"),t=l.isHorizontal()?e.find(".swiper-slide-shadow-right"):e.find(".swiper-slide-shadow-bottom");0===n.length&&(n=l.$('<div class="swiper-slide-shadow-'.concat(l.isHorizontal()?"left":"top",'"></div>')),e.append(n)),0===t.length&&(t=l.$('<div class="swiper-slide-shadow-'.concat(l.isHorizontal()?"right":"bottom",'"></div>')),e.append(t)),n.length&&(n[0].style.opacity=Math.max(-s,0)),t.length&&(t[0].style.opacity=Math.max(s,0))}e.transform("translate3d(".concat(a,"px, ").concat(r,"px, 0px) rotateX(").concat(o,"deg) rotateY(").concat(i,"deg)"))}},setTransition(l){const n=this,{slides:t,activeIndex:u,$wrapperEl:e}=n;if(t.transition(l).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(l),n.params.virtualTranslate&&0!==l){let l=!1;t.eq(u).transitionEnd((function(){if(l)return;if(!n||n.destroyed)return;l=!0,n.animating=!1;const t=["webkitTransitionEnd","transitionend"];for(let l=0;l<t.length;l+=1)e.trigger(t[l])}))}}}}}ngOnInit(){this.user=this.authService.getUserData(),this.user.image="assets/Logo.png",this.user.age=this.calcAge(this.user.birth_date.slice(0,10)),console.log(this.user)}calcAge(l){let n=new Date,t=new Date(l),u=n.getFullYear()-t.getFullYear(),e=n.getMonth()-t.getMonth();return(e<0||0===e&&n.getDate()<t.getDate())&&u--,u}showUser(){console.log(this.user.name)}onLogout(){this.authService.doLogout(),this.router.navigateByUrl("/auth")}}var b=t("iInd"),p=u.nb({encapsulation:0,styles:[["ion-slide.swiper-slide[_ngcontent-%COMP%]{-webkit-box-align:start;align-items:flex-start}"]],data:{}});function c(l){return u.Gb(0,[(l()(),u.pb(0,0,null,null,9,"ion-header",[],null,null,null,i.M,i.l)),u.ob(1,49152,null,0,o.z,[u.h,u.k,u.x],null,null),(l()(),u.pb(2,0,null,0,7,"ion-toolbar",[],null,null,null,i.bb,i.A)),u.ob(3,49152,null,0,o.xb,[u.h,u.k,u.x],null,null),(l()(),u.pb(4,0,null,0,5,"ion-buttons",[["slot","primary"]],null,null,null,i.F,i.e)),u.ob(5,49152,null,0,o.j,[u.h,u.k,u.x],null,null),(l()(),u.pb(6,0,null,0,3,"ion-button",[],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.onLogout()&&u),u}),i.E,i.d)),u.ob(7,49152,null,0,o.i,[u.h,u.k,u.x],null,null),(l()(),u.pb(8,0,null,0,1,"ion-icon",[["name","log-out-outline"],["slot","icon-only"]],null,null,null,i.N,i.m)),u.ob(9,49152,null,0,o.A,[u.h,u.k,u.x],{name:[0,"name"]},null),(l()(),u.pb(10,0,null,null,30,"ion-content",[],null,null,null,i.I,i.h)),u.ob(11,49152,null,0,o.s,[u.h,u.k,u.x],null,null),(l()(),u.pb(12,0,null,0,28,"ion-slides",[["pager","true"],["style","height:100%;"]],null,null,null,i.W,i.v)),u.ob(13,49152,null,0,o.mb,[u.h,u.k,u.x],{options:[0,"options"],pager:[1,"pager"]},null),(l()(),u.pb(14,0,null,0,22,"ion-slide",[],null,null,null,i.V,i.u)),u.ob(15,49152,null,0,o.lb,[u.h,u.k,u.x],null,null),(l()(),u.pb(16,0,null,0,20,"ion-grid",[],null,null,null,i.L,i.k)),u.ob(17,49152,null,0,o.y,[u.h,u.k,u.x],null,null),(l()(),u.pb(18,0,null,0,12,"ion-row",[],null,null,null,i.T,i.s)),u.ob(19,49152,null,0,o.eb,[u.h,u.k,u.x],null,null),(l()(),u.pb(20,0,null,0,4,"ion-col",[["class","ion-align-items-center"]],null,null,null,i.H,i.g)),u.ob(21,49152,null,0,o.r,[u.h,u.k,u.x],null,null),(l()(),u.pb(22,0,null,0,2,"ion-avatar",[],null,null,null,i.C,i.b)),u.ob(23,49152,null,0,o.d,[u.h,u.k,u.x],null,null),(l()(),u.pb(24,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),u.pb(25,0,null,0,5,"ion-col",[["class","ion-align-items-center"]],null,null,null,i.H,i.g)),u.ob(26,49152,null,0,o.r,[u.h,u.k,u.x],null,null),(l()(),u.pb(27,0,null,0,1,"h1",[],null,null,null,null,null)),(l()(),u.Fb(28,null,["",""])),(l()(),u.pb(29,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),u.Fb(30,null,[""," anni"])),(l()(),u.pb(31,0,null,0,5,"ion-row",[],null,null,null,i.T,i.s)),u.ob(32,49152,null,0,o.eb,[u.h,u.k,u.x],null,null),(l()(),u.pb(33,0,null,0,3,"ion-col",[["class","ion-align-items-center"]],null,null,null,i.H,i.g)),u.ob(34,49152,null,0,o.r,[u.h,u.k,u.x],null,null),(l()(),u.pb(35,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),u.Fb(36,null,["",""])),(l()(),u.pb(37,0,null,0,3,"ion-slide",[["style","Background:green;"]],null,null,null,i.V,i.u)),u.ob(38,49152,null,0,o.lb,[u.h,u.k,u.x],null,null),(l()(),u.pb(39,0,null,0,1,"h1",[],null,null,null,null,null)),(l()(),u.Fb(-1,null,["Slide 2"]))],(function(l,n){var t=n.component;l(n,9,0,"log-out-outline"),l(n,13,0,t.slideOpts,"true")}),(function(l,n){var t=n.component;l(n,24,0,t.user.image),l(n,28,0,t.user.name),l(n,30,0,t.user.age),l(n,36,0,t.user.address)}))}var h=u.lb("app-profile",r,(function(l){return u.Gb(0,[(l()(),u.pb(0,0,null,null,1,"app-profile",[],null,null,null,c,p)),u.ob(1,114688,null,0,r,[a.a,b.m],null,null)],(function(l,n){l(n,1,0)}),null)}),{},{},[]),d=t("SVse"),g=t("s7LF");class m{}t.d(n,"ProfilePageModuleNgFactory",(function(){return f}));var f=u.mb(e,[],(function(l){return u.yb([u.zb(512,u.j,u.X,[[8,[s.a,h]],[3,u.j],u.v]),u.zb(4608,d.k,d.j,[u.s,[2,d.q]]),u.zb(4608,g.i,g.i,[]),u.zb(4608,o.a,o.a,[u.x,u.g]),u.zb(4608,o.Cb,o.Cb,[o.a,u.j,u.p]),u.zb(4608,o.Gb,o.Gb,[o.a,u.j,u.p]),u.zb(1073742336,d.b,d.b,[]),u.zb(1073742336,g.h,g.h,[]),u.zb(1073742336,g.a,g.a,[]),u.zb(1073742336,o.zb,o.zb,[]),u.zb(1073742336,b.o,b.o,[[2,b.t],[2,b.m]]),u.zb(1073742336,m,m,[]),u.zb(1073742336,e,e,[]),u.zb(1024,b.k,(function(){return[[{path:"",component:r}]]}),[])])}))}}]);