(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{cAcB:function(l,n,u){"use strict";u.r(n);var o=u("8Y7J"),e=u("qXBG"),i=u("IheW");let r=(()=>{class l{constructor(l){this.http=l}sendPostRequest(){var l=new i.g;l.append("Accept","application/json"),l.append("Content-Type","application/json"),this.http.post("https://runningdinnerapi.herokuapp.com/users",{userid:12,name:"Pina",address:"Via Viterbo 2",age:57,phone_number:"3335631919",created_on:"2020-02-27T00:22:27.000Z",last_login:null}).subscribe(l=>{console.log(l._body)},l=>{console.log(l)}),this.http.get("https://runningdinnerapi.herokuapp.com/users").subscribe(l=>{alert(JSON.stringify(l))}),this.http.get("https://runningdinnerapi.herokuapp.com/existsUser").subscribe(l=>{alert(l)})}}return l.ngInjectableDef=o.Jb({factory:function(){return new l(o.Kb(i.c))},token:l,providedIn:"root"}),l})();class t{constructor(l,n,u){this.authService=l,this.router=n,this.userService=u}ngOnInit(){}onLogin(){this.authService.login(),this.router.navigateByUrl("/home/tabs/rooms"),this.userService.sendPostRequest()}}class s{}var a=u("pMnS"),c=u("MKJQ"),b=u("sZkV"),p=u("iInd"),d=u("SVse"),h=o.nb({encapsulation:0,styles:[["ion-content[_ngcontent-%COMP%]{--overflow:hidden}"]],data:{}});function k(l){return o.Gb(0,[(l()(),o.pb(0,0,null,null,39,"ion-content",[["class","ion-padding"],["color","secondary"]],null,null,null,c.F,c.g)),o.ob(1,49152,null,0,b.t,[o.h,o.k,o.x],{color:[0,"color"]},null),(l()(),o.pb(2,0,null,0,37,"ion-grid",[],null,null,null,c.H,c.i)),o.ob(3,49152,null,0,b.z,[o.h,o.k,o.x],null,null),(l()(),o.pb(4,0,null,0,35,"ion-row",[["class","ion-align-self-center ion-align-items-center"]],null,null,null,c.P,c.q)),o.ob(5,49152,null,0,b.fb,[o.h,o.k,o.x],null,null),(l()(),o.pb(6,0,null,0,8,"ion-col",[["class","ion-align-self-center"],["size-md","6"],["size-sm","12"],["size-xs","12"]],null,null,null,c.E,c.f)),o.ob(7,49152,null,0,b.s,[o.h,o.k,o.x],null,null),(l()(),o.pb(8,0,null,0,2,"div",[["class","ion-padding"]],null,null,null,null,null)),(l()(),o.pb(9,0,null,null,1,"ion-img",[["src","assets/Logo.png"]],null,null,null,c.K,c.l)),o.ob(10,49152,null,0,b.C,[o.h,o.k,o.x],{src:[0,"src"]},null),(l()(),o.pb(11,0,null,0,3,"div",[["class","ion-text-center"]],null,null,null,null,null)),(l()(),o.pb(12,0,null,null,2,"ion-label",[["color","primary"]],null,null,null,c.N,c.o)),o.ob(13,49152,null,0,b.M,[o.h,o.k,o.x],{color:[0,"color"]},null),(l()(),o.Fb(-1,0,[" Selezionando Accedi o Crea un nuovo account, accetti i nostri Termini. Per maggiori informazioni su come elaboriamo i tuoi dati, puoi consultare l'informativa sulla Privacy e sui Cookie "])),(l()(),o.pb(15,0,null,0,24,"ion-col",[["class","ion-align-self-center"],["size-md","6"],["size-sm","12"],["size-xs","12"]],null,null,null,c.E,c.f)),o.ob(16,49152,null,0,b.s,[o.h,o.k,o.x],null,null),(l()(),o.pb(17,0,null,0,5,"div",[],null,null,null,null,null)),(l()(),o.pb(18,0,null,null,4,"ion-button",[["color","primary"],["expand","block"],["fill","outline"],["routerLink","/auth/phone"],["shape","round"],["size","large"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==o.Bb(l,20).onClick()&&e),"click"===n&&(e=!1!==o.Bb(l,21).onClick(u)&&e),e}),c.C,c.d)),o.ob(19,49152,null,0,b.j,[o.h,o.k,o.x],{color:[0,"color"],expand:[1,"expand"],fill:[2,"fill"],shape:[3,"shape"],size:[4,"size"]},null),o.ob(20,16384,null,0,p.n,[p.m,p.a,[8,null],o.B,o.k],{routerLink:[0,"routerLink"]},null),o.ob(21,737280,null,0,b.Gb,[d.g,b.Db,o.k,p.m,[2,p.n]],null,null),(l()(),o.Fb(-1,0,["LOGIN"])),(l()(),o.pb(23,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),o.pb(24,0,null,0,5,"div",[],null,null,null,null,null)),(l()(),o.pb(25,0,null,null,4,"ion-button",[["color","primary"],["expand","block"],["fill","outline"],["routerLink","/sign-up/username"],["shape","round"],["size","large"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==o.Bb(l,27).onClick()&&e),"click"===n&&(e=!1!==o.Bb(l,28).onClick(u)&&e),e}),c.C,c.d)),o.ob(26,49152,null,0,b.j,[o.h,o.k,o.x],{color:[0,"color"],expand:[1,"expand"],fill:[2,"fill"],shape:[3,"shape"],size:[4,"size"]},null),o.ob(27,16384,null,0,p.n,[p.m,p.a,[8,null],o.B,o.k],{routerLink:[0,"routerLink"]},null),o.ob(28,737280,null,0,b.Gb,[d.g,b.Db,o.k,p.m,[2,p.n]],null,null),(l()(),o.Fb(-1,0,["SIGNUP"])),(l()(),o.pb(30,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),o.pb(31,0,null,0,3,"div",[],null,null,null,null,null)),(l()(),o.pb(32,0,null,null,2,"ion-button",[["color","primary"],["expand","block"],["fill","outline"],["shape","round"],["size","large"]],null,[[null,"click"]],(function(l,n,u){var o=!0;return"click"===n&&(o=!1!==l.component.onLogin()&&o),o}),c.C,c.d)),o.ob(33,49152,null,0,b.j,[o.h,o.k,o.x],{color:[0,"color"],expand:[1,"expand"],fill:[2,"fill"],shape:[3,"shape"],size:[4,"size"]},null),(l()(),o.Fb(-1,0,["TO ROOMS"])),(l()(),o.pb(35,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),o.pb(36,0,null,0,3,"div",[["class","ion-text-center"]],null,null,null,null,null)),(l()(),o.pb(37,0,null,null,2,"ion-label",[["color","primary"]],null,null,null,c.N,c.o)),o.ob(38,49152,null,0,b.M,[o.h,o.k,o.x],{color:[0,"color"]},null),(l()(),o.Fb(-1,0,["Non riesci ad accedere?"]))],(function(l,n){l(n,1,0,"secondary"),l(n,10,0,"assets/Logo.png"),l(n,13,0,"primary"),l(n,19,0,"primary","block","outline","round","large"),l(n,20,0,"/auth/phone"),l(n,21,0),l(n,26,0,"primary","block","outline","round","large"),l(n,27,0,"/sign-up/username"),l(n,28,0),l(n,33,0,"primary","block","outline","round","large"),l(n,38,0,"primary")}),null)}function g(l){return o.Gb(0,[(l()(),o.pb(0,0,null,null,1,"app-auth",[],null,null,null,k,h)),o.ob(1,114688,null,0,t,[e.a,p.m,r],null,null)],(function(l,n){l(n,1,0)}),null)}var m=o.lb("app-auth",t,g,{},{},[]),f=u("s7LF");u.d(n,"AuthPageModuleNgFactory",(function(){return z}));var z=o.mb(s,[],(function(l){return o.yb([o.zb(512,o.j,o.X,[[8,[a.a,m]],[3,o.j],o.v]),o.zb(4608,d.k,d.j,[o.s,[2,d.q]]),o.zb(4608,f.i,f.i,[]),o.zb(4608,b.b,b.b,[o.x,o.g]),o.zb(4608,b.Cb,b.Cb,[b.b,o.j,o.p]),o.zb(4608,b.Fb,b.Fb,[b.b,o.j,o.p]),o.zb(1073742336,d.b,d.b,[]),o.zb(1073742336,f.h,f.h,[]),o.zb(1073742336,f.a,f.a,[]),o.zb(1073742336,b.Ab,b.Ab,[]),o.zb(1073742336,p.o,p.o,[[2,p.t],[2,p.m]]),o.zb(1073742336,s,s,[]),o.zb(1024,p.k,(function(){return[[{path:"",component:t}]]}),[])])}))}}]);