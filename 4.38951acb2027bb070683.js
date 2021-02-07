(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{CWoH:function(n,l,e){"use strict";e.r(l);var t=e("CcnG"),i=function(){return function(){}}(),u=e("pMnS"),o=e("MKJQ"),r=e("jy/b"),a=e("ZYCi"),d=e("Ip0R"),s=e("83py"),c=e("u77c"),g=e("gIcY"),f=e("mrSG"),m=e("rrMi"),p=e("yzu5"),h=e("98RE"),R=e("qXBG"),v=e("Ds5d"),b=e("07Uz"),D=function(){function n(n,l,e,t,i,u,o,r,a){this.route=n,this.alertController=l,this.dinnersService=e,this.paramsService=t,this.notificationsService=i,this.navController=u,this.authService=o,this.rdToast=r,this.foodAlergiesService=a,this.isEdit=!1,this.dinnerDetails={badges:[],foodAllergies:[],minMaxAges:[],avgDistance:-1}}return n.prototype.ngOnInit=function(){var n=this;this.route.queryParams.subscribe((function(l){n.dinner=f.__assign({},l),n.getDinnerDetails(!1)})),this.subscription=this.notificationsService.getUpdateParamsObservable().subscribe((function(){console.log("Dinner Detail - Ricarico cena"),n.getDinnerDetails(!0)}))},n.prototype.ngOnDestroy=function(){this.subscription.unsubscribe()},n.prototype.getDinnerDetails=function(n){var l=this;this.syncInProgress=!0,this.dinnersService.getDinnerState(this.dinner.id).then((function(e){if(!e)return console.log("Errore getDinnerDetails, ritorno alla home"),void l.navController.navigateRoot("/home/tabs/dinners");l.state=e.dinner_state,0===l.state?l.dinnersService.getDinnerDetails(l.dinner,l.authService.getUserData(),n).then((function(n){l.dinnerDetails=n;var e=n.dinnerData;l.dinner.title=e.title,l.dinner.description=e.description,l.dinner.administrator=e.administrator,l.dinnerType=l.dinnersService.decodeType(Number(l.dinner.type))[0],l.dinnerDaysLeft=l.dinnersService.getDinnerTimeLeft(l.dinner.date)[0],l.paramsService.getParams().dinnerId!==+l.dinner.id&&void 0!==l.paramsService.getParams().dinnerId&&l.showInfoAlert(),l.initMap(l.dinnerDetails.addressesLatLng,l.dinnerDetails.userLatLng),l.syncInProgress=!1}),(function(){console.log("Errore getDinnerDetails, ritorno alla home"),l.navController.navigateRoot("/home/tabs/dinners")})):l.dinnersService.detDinnerStateRoute(l.dinner,l.state)}))},n.prototype.initMap=function(n,l){var e=new google.maps.LatLngBounds,t=[],i=document.getElementById("mapDetails");if(i){var u=new google.maps.Map(i,{disableDefaultUI:!0}),o={url:"assets/you-marker.png",size:new google.maps.Size(50,50),origin:new google.maps.Point(0,0),scaledSize:new google.maps.Size(50,50)},r={url:"assets/dinner-marker.png",size:new google.maps.Size(50,50),origin:new google.maps.Point(0,0),scaledSize:new google.maps.Size(50,50)},a=new google.maps.Marker({position:l[0],map:u,icon:o});t.push(a);for(var d=0;d<n.length;d++){var s=this.dinnersService.checkIfExistingMarker(t,n[d]),c=new google.maps.Marker({position:s,map:u,icon:r});t.push(c)}for(var g=0;g<t.length;g++)e.extend(t[g].getPosition());u.fitBounds(e)}},n.prototype.showInfoAlert=function(){return f.__awaiter(this,void 0,void 0,(function(){var n,l;return f.__generator(this,(function(e){switch(e.label){case 0:return this.paramsService.getParams().groupId?this.dinnerDaysLeft?9===this.dinner.groupIds.length?(n="Non ci sono più posti liberi in questa cena",l="assets/DinnerFull.png"):(n="Stai già partecipando ad un'altra cena",l="assets/DinnerFull.png"):(n="Non ci si può iscrivere ad una cena se mancano meno di 24h",l="assets/DinnerClosed.png"):(n="Devi essere in un gruppo per partecipare ad una cena",l="assets/Group.png"),[4,this.alertController.create({header:"Attenzione!",subHeader:n,message:'<img src="'+l+'" style="border-radius: 2px">',buttons:["OK"]})];case 1:return[4,e.sent().present()];case 2:return e.sent(),[2]}}))}))},n.prototype.isMyDinner=function(){return this.paramsService.getParams().dinnerId===+this.dinner.id},n.prototype.isAdministrator=function(){return this.isMyDinner()&&this.dinner.administrator==this.paramsService.getParams().groupId},n.prototype.onLeaveDinner=function(){return f.__awaiter(this,void 0,void 0,(function(){var n=this;return f.__generator(this,(function(l){switch(l.label){case 0:return[4,this.alertController.create({header:"Abbandono",message:"Confermi di voler abbandonare la cena? Lo farà anche il tuo partner",buttons:[{text:"Cancel",role:"cancel",cssClass:"secondary",handler:function(){console.log("confirm cancel")}},{text:"Purtroppo si",handler:function(){n.sendRequestLeaveDinner()}}]})];case 1:return[4,l.sent().present()];case 2:return l.sent(),[2]}}))}))},n.prototype.onEditDinner=function(){this.isEdit=!0,this._newTitle=this.dinner.title,this._newDescription=this.dinner.description},n.prototype.onSaveDinner=function(){var n=this;this.dinnersService.updateDinner({dinnerId:this.dinner.id,title:this._newTitle,description:this._newDescription}).then((function(){n.getDinnerDetails(!0)}),(function(n){console.log(n)})).finally((function(){n.isEdit=!1}))},n.prototype.sendRequestLeaveDinner=function(){var n=this,l={dinnerId:this.dinner.id,groupId:this.paramsService.getParams().groupId};this.dinnersService.leaveDinner(l).then((function(){return f.__awaiter(n,void 0,void 0,(function(){var n=this;return f.__generator(this,(function(l){return this.paramsService.loadParams(!0).then((function(){n.notificationsService.fireUpdateParamsEvent()})),this.navController.navigateRoot("/home/tabs/dinners"),this.rdToast.show("Hai abbandonato la cena"),[2]}))}))}),(function(n){console.warn(n)}))},n.prototype.onJoinDinner=function(){return f.__awaiter(this,void 0,void 0,(function(){var n=this;return f.__generator(this,(function(l){switch(l.label){case 0:return[4,this.alertController.create({header:"Iscriviti",message:"Confermi di voler partecipare la cena? Lo farà anche il tuo partner",buttons:[{text:"Cancel",role:"cancel",cssClass:"secondary",handler:function(){console.log("confirm cancel")}},{text:"Eccerto!",handler:function(){n.sendRequestJoinDinner()}}]})];case 1:return[4,l.sent().present()];case 2:return l.sent(),[2]}}))}))},n.prototype.sendRequestJoinDinner=function(){var n=this,l={dinnerId:this.dinner.id,groupId:this.paramsService.getParams().groupId};this.dinnersService.joinDinner(l).then((function(){n.paramsService.loadParams(!0).then((function(){n.notificationsService.fireUpdateParamsEvent()})),n.navController.navigateRoot("/home/tabs/dinners")}),(function(n){console.warn(n)}))},n}(),C=t["ɵcrt"]({encapsulation:0,styles:[["ion-content[_ngcontent-%COMP%]{--background:url('sfondo_pesce.80a6cf1b6bfa41c3fac4.png') no-repeat top center/cover fixed,#fff;position:relative}ion-toolbar[_ngcontent-%COMP%]{--background:transparent}ion-grid[_ngcontent-%COMP%]{width:100%;height:100%;padding:0}ion-row[_ngcontent-%COMP%]{width:100%}ion-col[_ngcontent-%COMP%]{align-self:center;padding:0}ion-icon[_ngcontent-%COMP%]{vertical-align:middle;font-size:20px}.avatar[_ngcontent-%COMP%]{width:300px;height:240px;margin:0 auto;display:block;border-radius:8%;position:relative;border:4px solid #575757;background-color:#fff}.card-body[_ngcontent-%COMP%]{background-color:#fff;width:95%;overflow:hidden;margin-left:2.5%;border-radius:8px;padding:70px 10px 2%}.card-body[_ngcontent-%COMP%]   .dinner-meta[_ngcontent-%COMP%]{padding-top:40px}.card-body[_ngcontent-%COMP%]   .dinner-meta[_ngcontent-%COMP%]   .dinner-name[_ngcontent-%COMP%]{font-size:24px;font-weight:600;text-transform:uppercase;color:#303940}.card-body[_ngcontent-%COMP%]   .dinner-meta[_ngcontent-%COMP%]   .dinner-info[_ngcontent-%COMP%]{font-size:19px;font-weight:600;color:#949ea6;margin:0 auto}.dinner-description[_ngcontent-%COMP%]{text-align:start;background-color:#ddd;opacity:.6;border-radius:8px;padding:2%;margin:5% 0}.dinner-edit[_ngcontent-%COMP%]{background-color:pink}"]],data:{}});function E(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,5,"ion-button",[["routerLink","/home/chat"],["shape","round"],["size","large"]],null,[[null,"click"]],(function(n,l,e){var i=!0;return"click"===l&&(i=!1!==t["ɵnov"](n,2).onClick()&&i),"click"===l&&(i=!1!==t["ɵnov"](n,3).onClick(e)&&i),i}),o.T,o.d)),t["ɵdid"](1,49152,null,0,r.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{shape:[0,"shape"],size:[1,"size"]},null),t["ɵdid"](2,16384,null,0,a.o,[a.n,a.a,[8,null],t.Renderer2,t.ElementRef],{routerLink:[0,"routerLink"]},null),t["ɵdid"](3,737280,null,0,r.Hb,[d.LocationStrategy,r.Eb,t.ElementRef,a.n,[2,a.o]],null,null),(n()(),t["ɵeld"](4,0,null,0,1,"ion-icon",[["name","chatbubble-ellipses-outline"],["size","large"]],null,null,null,o.fb,o.p)),t["ɵdid"](5,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"],size:[1,"size"]},null)],(function(n,l){n(l,1,0,"round","large"),n(l,2,0,"/home/chat"),n(l,3,0),n(l,5,0,"chatbubble-ellipses-outline","large")}),null)}function y(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,3,"ion-button",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onLeaveDinner()&&t),t}),o.T,o.d)),t["ɵdid"](1,49152,null,0,r.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](2,0,null,0,1,"ion-icon",[["name","person-remove"],["slot","icon-only"]],null,null,null,o.fb,o.p)),t["ɵdid"](3,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null)],(function(n,l){n(l,3,0,"person-remove")}),null)}function N(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,3,"ion-button",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onEditDinner()&&t),t}),o.T,o.d)),t["ɵdid"](1,49152,null,0,r.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](2,0,null,0,1,"ion-icon",[["name","create-outline"],["slot","icon-only"]],null,null,null,o.fb,o.p)),t["ɵdid"](3,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null)],(function(n,l){n(l,3,0,"create-outline")}),null)}function I(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,3,"ion-button",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onSaveDinner()&&t),t}),o.T,o.d)),t["ɵdid"](1,49152,null,0,r.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](2,0,null,0,1,"ion-icon",[["name","save-outline"],["slot","icon-only"]],null,null,null,o.fb,o.p)),t["ɵdid"](3,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null)],(function(n,l){n(l,3,0,"save-outline")}),null)}function Z(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,54,"div",[],null,null,null,null,null)),(n()(),t["ɵeld"](1,0,null,null,53,"div",[["class","card-body"],["style","height: fit-content; margin-bottom: 2%;"]],null,null,null,null,null)),(n()(),t["ɵeld"](2,0,null,null,52,"div",[["class","dinner-meta ion-text-center"]],null,null,null,null,null)),(n()(),t["ɵeld"](3,0,null,null,4,"div",[["style","text-align: -webkit-center;"]],null,null,null,null,null)),(n()(),t["ɵeld"](4,0,null,null,1,"ion-skeleton-text",[["animated",""],["style","width: 50%; margin-bottom: 0.5em; margin-top: 0.5em;"]],null,null,null,o.xb,o.H)),t["ɵdid"](5,49152,null,0,r.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](6,0,null,null,1,"ion-skeleton-text",[["animated",""],["style","width: 50%; margin-bottom: 0.5em;"]],null,null,null,o.xb,o.H)),t["ɵdid"](7,49152,null,0,r.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](8,0,null,null,41,"ion-grid",[],null,null,null,o.db,o.n)),t["ɵdid"](9,49152,null,0,r.z,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](10,0,null,0,9,"ion-row",[],null,null,null,o.tb,o.D)),t["ɵdid"](11,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](12,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.Z,o.j)),t["ɵdid"](13,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](14,0,null,0,1,"ion-icon",[["name","rocket-outline"]],null,null,null,o.fb,o.p)),t["ɵdid"](15,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](16,0,null,0,3,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.Z,o.j)),t["ɵdid"](17,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](18,0,null,0,1,"ion-skeleton-text",[["animated",""],["style","width: 100%;"]],null,null,null,o.xb,o.H)),t["ɵdid"](19,49152,null,0,r.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](20,0,null,0,9,"ion-row",[["style","padding-top: 2%;"]],null,null,null,o.tb,o.D)),t["ɵdid"](21,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](22,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.Z,o.j)),t["ɵdid"](23,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](24,0,null,0,1,"ion-icon",[["name","time-outline"]],null,null,null,o.fb,o.p)),t["ɵdid"](25,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](26,0,null,0,3,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.Z,o.j)),t["ɵdid"](27,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](28,0,null,0,1,"ion-skeleton-text",[["animated",""],["style","width: 100%;"]],null,null,null,o.xb,o.H)),t["ɵdid"](29,49152,null,0,r.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](30,0,null,0,9,"ion-row",[["style","padding-top: 2%;"]],null,null,null,o.tb,o.D)),t["ɵdid"](31,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](32,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.Z,o.j)),t["ɵdid"](33,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](34,0,null,0,1,"ion-icon",[["name","people-circle-outline"]],null,null,null,o.fb,o.p)),t["ɵdid"](35,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](36,0,null,0,3,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.Z,o.j)),t["ɵdid"](37,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](38,0,null,0,1,"ion-skeleton-text",[["animated",""],["style","width: 100%;"]],null,null,null,o.xb,o.H)),t["ɵdid"](39,49152,null,0,r.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](40,0,null,0,9,"ion-row",[["style","padding-top: 2%;"]],null,null,null,o.tb,o.D)),t["ɵdid"](41,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](42,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.Z,o.j)),t["ɵdid"](43,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](44,0,null,0,1,"ion-icon",[["name","map-outline"]],null,null,null,o.fb,o.p)),t["ɵdid"](45,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](46,0,null,0,3,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.Z,o.j)),t["ɵdid"](47,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](48,0,null,0,1,"ion-skeleton-text",[["animated",""],["style","width: 100%;"]],null,null,null,o.xb,o.H)),t["ɵdid"](49,49152,null,0,r.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](50,0,null,null,2,"div",[["style","text-align: -webkit-center;"]],null,null,null,null,null)),(n()(),t["ɵeld"](51,0,null,null,1,"ion-skeleton-text",[["animated",""],["style","width: 70%; margin-bottom: 1.5em; margin-top: 1em;"]],null,null,null,o.xb,o.H)),t["ɵdid"](52,49152,null,0,r.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](53,0,null,null,1,"rd-slider",[],null,null,null,s.b,s.a)),t["ɵdid"](54,114688,null,0,c.a,[r.Gb],{route:[0,"route"],type:[1,"type"],descriptionVoid:[2,"descriptionVoid"]},null)],(function(n,l){n(l,5,0,""),n(l,7,0,""),n(l,13,0,"1"),n(l,15,0,"rocket-outline"),n(l,19,0,""),n(l,23,0,"1"),n(l,25,0,"time-outline"),n(l,29,0,""),n(l,33,0,"1"),n(l,35,0,"people-circle-outline"),n(l,39,0,""),n(l,43,0,"1"),n(l,45,0,"map-outline"),n(l,49,0,""),n(l,52,0,""),n(l,54,0,"dinner-details","skeleton-badge","Nessun badge presente")}),null)}function w(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h3",[["class","dinner-name"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["",""]))],null,(function(n,l){n(l,1,0,l.component.dinner.title)}))}function k(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,6,"ion-input",[["class","dinner-edit"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,e){var i=!0,u=n.component;return"ionBlur"===l&&(i=!1!==t["ɵnov"](n,1)._handleBlurEvent(e.target)&&i),"ionChange"===l&&(i=!1!==t["ɵnov"](n,1)._handleInputEvent(e.target)&&i),"ngModelChange"===l&&(i=!1!==(u._newTitle=e)&&i),i}),o.jb,o.t)),t["ɵdid"](1,4341760,null,0,r.Jb,[t.Injector,t.ElementRef],null,null),t["ɵprd"](1024,null,g.d,(function(n){return[n]}),[r.Jb]),t["ɵdid"](3,671744,null,0,g.i,[[8,null],[8,null],[8,null],[6,g.d]],{model:[0,"model"]},{update:"ngModelChange"}),t["ɵprd"](2048,null,g.e,null,[g.i]),t["ɵdid"](5,16384,null,0,g.f,[[4,g.e]],null,null),t["ɵdid"](6,49152,null,0,r.F,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null)],(function(n,l){n(l,3,0,l.component._newTitle)}),(function(n,l){n(l,0,0,t["ɵnov"](l,5).ngClassUntouched,t["ɵnov"](l,5).ngClassTouched,t["ɵnov"](l,5).ngClassPristine,t["ɵnov"](l,5).ngClassDirty,t["ɵnov"](l,5).ngClassValid,t["ɵnov"](l,5).ngClassInvalid,t["ɵnov"](l,5).ngClassPending)}))}function z(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,7,"ion-col",[["offset","6"]],null,null,null,o.Z,o.j)),t["ɵdid"](1,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{offset:[0,"offset"]},null),(n()(),t["ɵeld"](2,0,null,0,5,"div",[["class","foodAllergies"]],null,null,null,null,null)),(n()(),t["ɵeld"](3,0,null,null,4,"ion-button",[["fill","clear"],["size","small"],["style","margin: 0%; color: black;"]],null,[[null,"click"]],(function(n,l,e){var t=!0,i=n.component;return"click"===l&&(t=!1!==i.foodAlergiesService.presentModalFoodAllergies(i.dinnerDetails.foodAllergies,i.dinnerDetails.foodAllergiesCategories)&&t),t}),o.T,o.d)),t["ɵdid"](4,49152,null,0,r.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{fill:[0,"fill"],size:[1,"size"]},null),(n()(),t["ɵted"](-1,0,[" Sono presenti intolleranze "])),(n()(),t["ɵeld"](6,0,null,0,1,"ion-icon",[["name","heart-circle-outline"],["size","default"],["slot","start"]],null,null,null,o.fb,o.p)),t["ɵdid"](7,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"],size:[1,"size"]},null)],(function(n,l){n(l,1,0,"6"),n(l,4,0,"clear","small"),n(l,7,0,"heart-circle-outline","default")}),null)}function x(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["Età partecipanti dai "," ai "," anni"]))],null,(function(n,l){var e=l.component;n(l,1,0,e.dinnerDetails.minMaxAges[0],e.dinnerDetails.minMaxAges[1])}))}function _(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["Età partecipanti "," anni"]))],null,(function(n,l){n(l,1,0,l.component.dinnerDetails.minMaxAges[0])}))}function M(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,4,"div",[],null,null,null,null,null)),(n()(),t["ɵand"](16777216,null,null,1,null,x)),t["ɵdid"](2,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,null,1,null,_)),t["ɵdid"](4,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,2,0,e.dinnerDetails.minMaxAges[0]!==e.dinnerDetails.minMaxAges[1]),n(l,4,0,e.dinnerDetails.minMaxAges[0]===e.dinnerDetails.minMaxAges[1])}),null)}function P(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,2,"div",[],null,null,null,null,null)),(n()(),t["ɵeld"](1,0,null,null,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](2,null,["Distanza media "," km da te"]))],null,(function(n,l){n(l,2,0,l.component.dinnerDetails.avgDistance)}))}function S(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"div",[["class","dinner-description"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,[" "," "]))],null,(function(n,l){n(l,1,0,l.component.dinner.description)}))}function T(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,6,"ion-input",[["class","dinner-edit"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,e){var i=!0,u=n.component;return"ionBlur"===l&&(i=!1!==t["ɵnov"](n,1)._handleBlurEvent(e.target)&&i),"ionChange"===l&&(i=!1!==t["ɵnov"](n,1)._handleInputEvent(e.target)&&i),"ngModelChange"===l&&(i=!1!==(u._newDescription=e)&&i),i}),o.jb,o.t)),t["ɵdid"](1,4341760,null,0,r.Jb,[t.Injector,t.ElementRef],null,null),t["ɵprd"](1024,null,g.d,(function(n){return[n]}),[r.Jb]),t["ɵdid"](3,671744,null,0,g.i,[[8,null],[8,null],[8,null],[6,g.d]],{model:[0,"model"]},{update:"ngModelChange"}),t["ɵprd"](2048,null,g.e,null,[g.i]),t["ɵdid"](5,16384,null,0,g.f,[[4,g.e]],null,null),t["ɵdid"](6,49152,null,0,r.F,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null)],(function(n,l){n(l,3,0,l.component._newDescription)}),(function(n,l){n(l,0,0,t["ɵnov"](l,5).ngClassUntouched,t["ɵnov"](l,5).ngClassTouched,t["ɵnov"](l,5).ngClassPristine,t["ɵnov"](l,5).ngClassDirty,t["ɵnov"](l,5).ngClassValid,t["ɵnov"](l,5).ngClassInvalid,t["ɵnov"](l,5).ngClassPending)}))}function j(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,60,"div",[],null,null,null,null,null)),(n()(),t["ɵeld"](1,0,null,null,59,"div",[["class","card-body"],["style","height: fit-content; margin-bottom: 2%;"]],null,null,null,null,null)),(n()(),t["ɵeld"](2,0,null,null,58,"div",[["class","dinner-meta ion-text-center"]],null,null,null,null,null)),(n()(),t["ɵand"](16777216,null,null,1,null,w)),t["ɵdid"](4,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,null,1,null,k)),t["ɵdid"](6,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](7,0,null,null,1,"h3",[["class","dinner-name"]],null,null,null,null,null)),(n()(),t["ɵted"](8,null,["",""])),(n()(),t["ɵeld"](9,0,null,null,45,"ion-grid",[],null,null,null,o.db,o.n)),t["ɵdid"](10,49152,null,0,r.z,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](11,0,null,0,3,"ion-row",[["style","height: 100%;"]],null,null,null,o.tb,o.D)),t["ɵdid"](12,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,z)),t["ɵdid"](14,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](15,0,null,0,9,"ion-row",[["style","margin-top: 15px;"]],null,null,null,o.tb,o.D)),t["ɵdid"](16,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](17,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.Z,o.j)),t["ɵdid"](18,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](19,0,null,0,1,"ion-icon",[["name","rocket-outline"]],null,null,null,o.fb,o.p)),t["ɵdid"](20,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](21,0,null,0,3,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.Z,o.j)),t["ɵdid"](22,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](23,0,null,0,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](24,null,["Partecipanti alla cena "," su 9"])),(n()(),t["ɵeld"](25,0,null,0,9,"ion-row",[["style","padding-top: 2%;"]],null,null,null,o.tb,o.D)),t["ɵdid"](26,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](27,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.Z,o.j)),t["ɵdid"](28,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](29,0,null,0,1,"ion-icon",[["name","time-outline"]],null,null,null,o.fb,o.p)),t["ɵdid"](30,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](31,0,null,0,3,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.Z,o.j)),t["ɵdid"](32,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](33,0,null,0,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](34,null,[""," alle ",""])),(n()(),t["ɵeld"](35,0,null,0,9,"ion-row",[["style","padding-top: 2%;"]],null,null,null,o.tb,o.D)),t["ɵdid"](36,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](37,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.Z,o.j)),t["ɵdid"](38,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](39,0,null,0,1,"ion-icon",[["name","people-circle-outline"]],null,null,null,o.fb,o.p)),t["ɵdid"](40,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](41,0,null,0,3,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.Z,o.j)),t["ɵdid"](42,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,M)),t["ɵdid"](44,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](45,0,null,0,9,"ion-row",[["style","padding-top: 2%;"]],null,null,null,o.tb,o.D)),t["ɵdid"](46,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](47,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.Z,o.j)),t["ɵdid"](48,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](49,0,null,0,1,"ion-icon",[["name","map-outline"]],null,null,null,o.fb,o.p)),t["ɵdid"](50,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](51,0,null,0,3,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.Z,o.j)),t["ɵdid"](52,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,P)),t["ɵdid"](54,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,null,1,null,S)),t["ɵdid"](56,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,null,1,null,T)),t["ɵdid"](58,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](59,0,null,null,1,"rd-slider",[],null,null,null,s.b,s.a)),t["ɵdid"](60,114688,null,0,c.a,[r.Gb],{route:[0,"route"],objectsArray:[1,"objectsArray"],type:[2,"type"],descriptionVoid:[3,"descriptionVoid"]},null)],(function(n,l){var e=l.component;n(l,4,0,!e.isEdit),n(l,6,0,e.isEdit),n(l,14,0,e.dinnerDetails.foodAllergies.length>0),n(l,18,0,"1"),n(l,20,0,"rocket-outline"),n(l,28,0,"1"),n(l,30,0,"time-outline"),n(l,38,0,"1"),n(l,40,0,"people-circle-outline"),n(l,44,0,e.dinnerDetails&&e.dinnerDetails.minMaxAges.length>0),n(l,48,0,"1"),n(l,50,0,"map-outline"),n(l,54,0,e.dinnerDetails&&e.dinnerDetails.avgDistance>=0),n(l,56,0,!e.isEdit),n(l,58,0,e.isEdit),n(l,60,0,"dinner-details",e.dinnerDetails.badges,"badge","Nessun badge presente")}),(function(n,l){var e=l.component;n(l,8,0,e.dinnerType),n(l,24,0,e.dinner.groupIds.length),n(l,34,0,e.dinner.dateString,e.dinner.time)}))}function A(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,2,"ion-button",[["color","success"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onJoinDinner()&&t),t}),o.T,o.d)),t["ɵdid"](1,49152,null,0,r.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{color:[0,"color"]},null),(n()(),t["ɵted"](-1,0,["Partecipa "]))],(function(n,l){n(l,1,0,"success")}),null)}function L(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,22,"ion-header",[["class","ion-no-border"]],null,null,null,o.eb,o.o)),t["ɵdid"](1,49152,[["header",4]],0,r.A,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](2,0,null,0,20,"ion-toolbar",[],null,null,null,o.Fb,o.P)),t["ɵdid"](3,49152,null,0,r.yb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](4,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,o.U,o.e)),t["ɵdid"](5,49152,null,0,r.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](6,0,null,0,2,"ion-back-button",[],null,[[null,"click"]],(function(n,l,e){var i=!0;return"click"===l&&(i=!1!==t["ɵnov"](n,8).onClick(e)&&i),i}),o.S,o.c)),t["ɵdid"](7,49152,null,0,r.f,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),t["ɵdid"](8,16384,null,0,r.g,[[2,r.eb],r.Eb,r.c],null,null),(n()(),t["ɵeld"](9,0,null,0,13,"ion-buttons",[["slot","primary"]],null,null,null,o.U,o.e)),t["ɵdid"](10,49152,null,0,r.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](11,0,null,0,3,"ion-button",[["shape","round"],["size","large"],["slot","icon-only"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.getDinnerDetails(!0)&&t),t}),o.T,o.d)),t["ɵdid"](12,49152,null,0,r.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{shape:[0,"shape"],size:[1,"size"]},null),(n()(),t["ɵeld"](13,0,null,0,1,"ion-icon",[["name","refresh-circle-outline"],["size","large"]],null,null,null,o.fb,o.p)),t["ɵdid"](14,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"],size:[1,"size"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,E)),t["ɵdid"](16,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,y)),t["ɵdid"](18,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,N)),t["ɵdid"](20,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,I)),t["ɵdid"](22,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](23,0,null,null,9,"ion-content",[["fullscreen","true"],["slot","fixed"]],null,null,null,o.ab,o.k)),t["ɵdid"](24,49152,null,0,r.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{fullscreen:[0,"fullscreen"],scrollEvents:[1,"scrollEvents"]},null),(n()(),t["ɵeld"](25,0,null,0,1,"div",[["style","height: 130px;position: relative;"]],null,null,null,null,null)),(n()(),t["ɵeld"](26,0,null,null,0,"div",[["class","avatar"],["id","mapDetails"]],null,null,null,null,null)),(n()(),t["ɵand"](16777216,null,0,1,null,Z)),t["ɵdid"](28,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,j)),t["ɵdid"](30,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,A)),t["ɵdid"](32,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,12,0,"round","large"),n(l,14,0,"refresh-circle-outline","large"),n(l,16,0,e.isMyDinner()),n(l,18,0,e.isMyDinner()&&!e.isEdit),n(l,20,0,e.isAdministrator()&&!e.isEdit),n(l,22,0,e.isEdit),n(l,24,0,"true",!0),n(l,28,0,e.syncInProgress),n(l,30,0,!e.syncInProgress),n(l,32,0,!e.paramsService.getParams().dinnerId&&e.paramsService.getParams().groupId&&e.dinnerDaysLeft&&e.dinner.groupIds.length<9)}),null)}function B(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"app-dinner-detail",[],null,null,null,L,C)),t["ɵdid"](1,245760,null,0,D,[a.a,r.a,m.a,p.a,h.a,r.Eb,R.a,v.a,b.a],null,null)],(function(n,l){n(l,1,0)}),null)}var O=t["ɵccf"]("app-dinner-detail",D,B,{},{},[]),V=function(){return function(){}}(),F=e("RnAK"),H=e("E9nr");e.d(l,"DinnerDetailPageModuleNgFactory",(function(){return J}));var J=t["ɵcmf"](i,[],(function(n){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[u.a,O]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,d.NgLocalization,d.NgLocaleLocalization,[t.LOCALE_ID,[2,d["ɵangular_packages_common_common_a"]]]),t["ɵmpd"](4608,g.l,g.l,[]),t["ɵmpd"](4608,r.b,r.b,[t.NgZone,t.ApplicationRef]),t["ɵmpd"](4608,r.Db,r.Db,[r.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](4608,r.Gb,r.Gb,[r.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](1073742336,d.CommonModule,d.CommonModule,[]),t["ɵmpd"](1073742336,g.k,g.k,[]),t["ɵmpd"](1073742336,g.b,g.b,[]),t["ɵmpd"](1073742336,r.Ab,r.Ab,[]),t["ɵmpd"](1073742336,a.p,a.p,[[2,a.u],[2,a.n]]),t["ɵmpd"](1073742336,V,V,[]),t["ɵmpd"](1073742336,F.a,F.a,[]),t["ɵmpd"](1073742336,H.a,H.a,[]),t["ɵmpd"](1073742336,i,i,[]),t["ɵmpd"](1024,a.l,(function(){return[[{path:"",component:D}]]}),[])])}))}}]);