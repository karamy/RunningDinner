(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{QJOm:function(n,l,e){"use strict";e.r(l);var t=e("8Y7J");class o{}var u=e("pMnS"),r=e("MKJQ"),s=e("sZkV"),i=e("iInd"),a=e("SVse"),c=e("mrSG"),p=e("q/sB"),b=e("Mv9M"),h=e("BV2u"),m=e("qXBG"),g=e("IheW"),f=e("cUpR");class d{constructor(){this.phoneNumber=[]}}let C=(()=>{class n{constructor(n,l,e,t,o,u){this.http=n,this.contacts=l,this.sanitizer=e,this.platform=t,this.rdConstants=o,this.authService=u}getLocalContacts(n){return new Promise((l,e)=>{if(this.platform.is("cordova")){const t=[],o=this.authService.getUserData().phone_number;this.contacts.find(["displayName","phoneNumbers","photos"]).then(u=>{if(0===u.length)console.warn("No contacts found"),e();else{for(let n=0;n<u.length;n++)if(null!==u[n].phoneNumbers){const l=new d;null!==u[n].name&&(l.name=u[n].name.formatted),l.imageUrl=null!==u[n].photos?this.sanitizer.bypassSecurityTrustUrl(window.Ionic.WebView.convertFileSrc(u[n].photos[0].value)):"assets/dummy.png";for(let e=0;e<u[n].phoneNumbers.length;e++)u[n].phoneNumbers[e].value.replace(/\s+/g,"")!==o&&l.phoneNumber.push(u[n].phoneNumbers[e].value.replace(/\s+/g,""));t.push(l)}if(n){const n=Array.from(new Set(t.map(n=>n.phoneNumber))).map(n=>t.find(l=>l.phoneNumber===n));l(n)}else l(t)}})}else l([{name:"Paolo",phoneNumber:["+393483773819","+393381887043"],imageUrl:"assets/Logo.png"},{name:"Fringo",phoneNumber:["+393483773817"],imageUrl:"assets/Logo.png"},{name:"Chiara",phoneNumber:["+393496824393"],imageUrl:"assets/Logo.png"},{name:"Carlo",phoneNumber:["+393408552105","+393483773819"],imageUrl:"assets/dummy.png"},{name:"Pange",phoneNumber:["+393495339159","+393483773819"],imageUrl:"assets/dummy.png"},{name:"Nadia",phoneNumber:["+393450166161"],imageUrl:"assets/dummy.png"},{name:"Emulatore",phoneNumber:["+391234567890"],imageUrl:"assets/dummy.png"}])})}postContacts(n){return new Promise((l,e)=>{this.http.post(this.rdConstants.getApiRoute("compareContacts"),n).subscribe(n=>{l(n)},n=>{console.warn(n),e()})})}compareContacts(n,l){let e=[];for(let t=0;t<l.length;t++)for(let o=0;o<l[t].phoneNumber.length;o++)for(let u=0;u<n.length;u++)if(n[u].phoneNumber===l[t].phoneNumber[o]&&!e.find(n=>n.phoneNumber[0]===l[t].phoneNumber[o])){l[t].imageUrl="data:image/png;base64,"+n[u].imageUrl;let r=l[t].phoneNumber[o];l[t].phoneNumber=[],l[t].phoneNumber.push(r),e.push(l[t])}return e=e.sort((n,l)=>n.name.localeCompare(l.name)),e}}return n.ngInjectableDef=t.Jb({factory:function(){return new n(t.Kb(g.c),t.Kb(b.a),t.Kb(f.b),t.Kb(s.Eb),t.Kb(h.a),t.Kb(m.a))},token:n,providedIn:"root"}),n})();var k=e("DP//");class v{constructor(n,l,e){this.modalController=n,this.contactsService=l,this.spinner=e,this.contactList=[]}showContact(n,l){return c.__awaiter(this,void 0,void 0,(function*(){const e=yield this.modalController.create({component:p.a,swipeToClose:!0,backdropDismiss:!0,componentProps:{contactName:n,contactImage:l},cssClass:"modal-style"});return yield e.present()}))}ngOnInit(){this.spinner.create("Caricando Contatti..."),this.fetchContacts().finally(()=>{this.spinner.dismiss()})}fetchContacts(){return new Promise((n,l)=>{this.contactsService.getLocalContacts(!0).then(e=>{this.contactsService.postContacts(e).then(l=>{this.contactList=this.contactsService.compareContacts(l,e),n()},()=>{console.error("Impossibile inviare contatti al server"),l()})},()=>{console.error("Impossibile leggere contatti dal dispositivo"),l()})})}doRefresh(n){this.fetchContacts().finally(()=>{n.target.complete()})}}var N=t.nb({encapsulation:0,styles:[[""]],data:{}});function w(n){return t.Gb(0,[(n()(),t.pb(0,0,null,null,6,"ion-item",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.showContact(n.context.$implicit.name,n.context.$implicit.imageUrl)&&t),t}),r.S,r.p)),t.ob(1,49152,null,0,s.F,[t.h,t.k,t.x],null,null),(n()(),t.pb(2,0,null,0,2,"ion-avatar",[],null,null,null,r.E,r.b)),t.ob(3,49152,null,0,s.d,[t.h,t.k,t.x],null,null),(n()(),t.pb(4,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null)),(n()(),t.pb(5,0,null,0,1,"p",[],null,null,null,null,null)),(n()(),t.Fb(6,null,["",""]))],null,(function(n,l){n(l,4,0,l.context.$implicit.imageUrl),n(l,6,0,l.context.$implicit.name)}))}function y(n){return t.Gb(0,[(n()(),t.pb(0,0,null,null,14,"ion-header",[],null,null,null,r.O,r.l)),t.ob(1,49152,null,0,s.z,[t.h,t.k,t.x],null,null),(n()(),t.pb(2,0,null,0,12,"ion-toolbar",[],null,null,null,r.fb,r.C)),t.ob(3,49152,null,0,s.xb,[t.h,t.k,t.x],null,null),(n()(),t.pb(4,0,null,0,2,"ion-title",[],null,null,null,r.eb,r.B)),t.ob(5,49152,null,0,s.vb,[t.h,t.k,t.x],null,null),(n()(),t.Fb(-1,0,["contacts"])),(n()(),t.pb(7,0,null,0,7,"ion-buttons",[["slot","primary"]],null,null,null,r.H,r.e)),t.ob(8,49152,null,0,s.j,[t.h,t.k,t.x],null,null),(n()(),t.pb(9,0,null,0,5,"ion-button",[["routerLink","/home/profile"]],null,[[null,"click"]],(function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t.Bb(n,11).onClick()&&o),"click"===l&&(o=!1!==t.Bb(n,12).onClick(e)&&o),o}),r.G,r.d)),t.ob(10,49152,null,0,s.i,[t.h,t.k,t.x],null,null),t.ob(11,16384,null,0,i.n,[i.m,i.a,[8,null],t.B,t.k],{routerLink:[0,"routerLink"]},null),t.ob(12,737280,null,0,s.Gb,[a.g,s.Db,t.k,i.m,[2,i.n]],null,null),(n()(),t.pb(13,0,null,0,1,"ion-icon",[["name","person-circle-outline"],["slot","icon-only"]],null,null,null,r.P,r.m)),t.ob(14,49152,null,0,s.A,[t.h,t.k,t.x],{name:[0,"name"]},null),(n()(),t.pb(15,0,null,null,9,"ion-content",[],null,null,null,r.K,r.h)),t.ob(16,49152,null,0,s.s,[t.h,t.k,t.x],null,null),(n()(),t.pb(17,0,null,0,3,"ion-refresher",[["slot","fixed"]],null,[[null,"ionRefresh"]],(function(n,l,e){var t=!0;return"ionRefresh"===l&&(t=!1!==n.component.doRefresh(e)&&t),t}),r.W,r.s)),t.ob(18,49152,null,0,s.Y,[t.h,t.k,t.x],null,null),(n()(),t.pb(19,0,null,0,1,"ion-refresher-content",[["pullingIcon","lines"],["refreshingSpinner","lines"]],null,null,null,r.V,r.t)),t.ob(20,49152,null,0,s.Z,[t.h,t.k,t.x],{pullingIcon:[0,"pullingIcon"],refreshingSpinner:[1,"refreshingSpinner"]},null),(n()(),t.pb(21,0,null,0,3,"ion-list",[],null,null,null,r.U,r.r)),t.ob(22,49152,null,0,s.M,[t.h,t.k,t.x],null,null),(n()(),t.eb(16777216,null,0,1,null,w)),t.ob(24,278528,null,0,a.h,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null)],(function(n,l){var e=l.component;n(l,11,0,"/home/profile"),n(l,12,0),n(l,14,0,"person-circle-outline"),n(l,20,0,"lines","lines"),n(l,24,0,e.contactList)}),null)}function x(n){return t.Gb(0,[(n()(),t.pb(0,0,null,null,1,"app-contacts",[],null,null,null,y,N)),t.ob(1,114688,null,0,v,[s.Cb,C,k.a],null,null)],(function(n,l){n(l,1,0)}),null)}var z=t.lb("app-contacts",v,x,{},{},[]),S=e("s7LF");const U=()=>e.e(23).then(e.bind(null,"BixF")).then(n=>n.ContactsDetailPageModuleNgFactory);class F{}e.d(l,"ContactsPageModuleNgFactory",(function(){return I}));var I=t.mb(o,[],(function(n){return t.yb([t.zb(512,t.j,t.X,[[8,[u.a,z]],[3,t.j],t.v]),t.zb(4608,a.k,a.j,[t.s,[2,a.q]]),t.zb(4608,S.i,S.i,[]),t.zb(4608,s.a,s.a,[t.x,t.g]),t.zb(4608,s.Cb,s.Cb,[s.a,t.j,t.p]),t.zb(4608,s.Fb,s.Fb,[s.a,t.j,t.p]),t.zb(1073742336,a.b,a.b,[]),t.zb(1073742336,S.h,S.h,[]),t.zb(1073742336,S.a,S.a,[]),t.zb(1073742336,s.zb,s.zb,[]),t.zb(1073742336,i.o,i.o,[[2,i.t],[2,i.m]]),t.zb(1073742336,F,F,[]),t.zb(1073742336,o,o,[]),t.zb(1024,i.k,(function(){return[[{path:"",component:v},{path:"contacts-detail",loadChildren:U}]]}),[])])}))}}]);