(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{"3YE8":function(l,n,e){"use strict";e.r(n);var t=e("CcnG"),o=function(){return function(){}}(),u=e("pMnS"),i=e("MKJQ"),r=e("jy/b"),s=e("ZYCi"),a=e("Ip0R"),d=e("mrSG"),c=e("rrMi"),g=e("0+Dt"),f=e("yzu5"),m=e("kOZ4"),p=e("yJMm"),h=e("6HIw"),D=e("98RE"),b=e("qXBG"),R=function(){function l(l,n,e,t,o,u,i,r){this.route=l,this.popoverController=n,this.modalController=e,this.dinnersService=t,this.profileService=o,this.paramsService=u,this.notificationsService=i,this.authService=r,this.myDinnerDetails={houses:{firstHouse:{groupid:null,firstUserId:null,firstName:"",secondUserId:null,secondName:"",firstImage:"",secondImage:"",groupAddress:""},secondHouse:{groupid:null,firstUserId:null,firstName:"",secondUserId:null,secondName:"",firstImage:"",secondImage:"",groupAddress:""},thirdHouse:{groupid:null,firstUserId:null,firstName:"",secondUserId:null,secondName:"",firstImage:"",secondImage:"",groupAddress:""}},houseDistances:[],foodAllergies:[],foodAllergiesCategories:[],addressesLatLng:[]},this.bounds=new google.maps.LatLngBounds}return l.prototype.presentPopover=function(l,n){return d.__awaiter(this,void 0,void 0,(function(){return d.__generator(this,(function(e){switch(e.label){case 0:return[4,this.popoverController.create({component:m.a,componentProps:{dinnerTime:n},event:l,translucent:!0})];case 1:return[4,e.sent().present()];case 2:return[2,e.sent()]}}))}))},l.prototype.presentModalFoodAllergies=function(l,n){return d.__awaiter(this,void 0,void 0,(function(){return d.__generator(this,(function(e){switch(e.label){case 0:return[4,this.modalController.create({component:p.a,backdropDismiss:!0,componentProps:{foodAllergies:l,categories:n},cssClass:"modal-style"})];case 1:return[4,e.sent().present()];case 2:return e.sent(),[2]}}))}))},l.prototype.ngOnInit=function(){var l=this;this.route.queryParams.subscribe((function(n){l.dinner=d.__assign({},n),l.getDinnerEventData()})),this.subscription=this.notificationsService.getUpdateParamsObservable().subscribe((function(){console.log("Dinner Event - Ricarico cena"),l.getDinnerEventData()}))},l.prototype.ngOnDestroy=function(){this.subscription.unsubscribe()},l.prototype.getDinnerEventData=function(){var l=this;this.dinnersService.getDinnerState(this.dinner.id).then((function(n){l.state=n.dinner_state,1===l.state?(l.bottomPanel||l.presentBottomPanel(),l.dinnerType=l.dinnersService.decodeType(Number(l.dinner.type))[0],l.firstDish=l.dinnersService.decodeType(Number(l.dinner.type))[1],l.secondDish=l.dinnersService.decodeType(Number(l.dinner.type))[2],l.thirdDish=l.dinnersService.decodeType(Number(l.dinner.type))[3],l.partnerName=l.profileService.getPartner().name,l.dinnersService.getMyDinnerDetails(l.dinner,l.paramsService.getParams().groupId).then((function(n){l.myDinnerDetails=n,l.myDish=l.dinnersService.detMyDish(l.myDinnerDetails.houses,l.firstDish,l.secondDish,l.thirdDish);var e=l.dinnersService.getMyDinnerFoodAllergies(l.myDinnerDetails.houses,l.myDinnerDetails.foodAllergies);l.myDinnerDetails.foodAllergies=e[0],l.myDinnerDetails.foodAllergiesCategories=e[1],l.initMap(l.myDinnerDetails.addressesLatLng,l.myDinnerDetails.userLatLng)}))):l.dinnersService.detDinnerStateRoute(l.dinner,l.state)}))},l.prototype.presentBottomPanel=function(){var l=this,n=document.getElementById("cupertinoEvent"),e={initialBreak:"top",breaks:{top:{enabled:!0,height:.65*window.screen.height,bounce:!0},middle:{enabled:!1,height:.25*window.screen.height,bounce:!0},bottom:{enabled:!0,height:.15*window.screen.height}},topperOverflow:!1,bottomClose:!1,buttonClose:!1,showDraggable:!1,onBackdropTap:function(){return l.bottomPanel.destroy({animate:!0})}};this.bottomPanel=new h.a(n,e),this.bottomPanel.present({animate:!0})},l.prototype.initMap=function(l,n){var e=this,t=[],o=document.getElementById("mapEvent");if(o){var u=new google.maps.Map(o,{disableDefaultUI:!0}),i={url:"assets/you-marker.png",size:new google.maps.Size(50,50),origin:new google.maps.Point(0,0),scaledSize:new google.maps.Size(50,50)},r={url:"assets/dinner-marker.png",size:new google.maps.Size(50,50),origin:new google.maps.Point(0,0),scaledSize:new google.maps.Size(50,50)},s=new google.maps.Marker({position:n[0],map:u,icon:i});t.push(s),new google.maps.Circle({center:n[0],radius:100,fillColor:"#0000FF",fillOpacity:.1,map:u,strokeColor:"#FFFFFF",strokeOpacity:.1,strokeWeight:2});for(var a=0;a<l.length;a++){var d=this.dinnersService.checkIfExistingMarker(t,l[a]),c=new google.maps.Marker({position:d,map:u,icon:r,label:(a+1).toString()});t.push(c),new google.maps.Circle({center:d,radius:100,fillColor:"#0000FF",fillOpacity:.1,map:u,strokeColor:"#FFFFFF",strokeOpacity:.1,strokeWeight:2})}for(var g=0;g<t.length;g++)this.bounds.extend(t[g].getPosition());u.fitBounds(this.bounds,{top:0,bottom:0,left:0,right:0});var f=document.getElementById("cupertinoEvent").getBoundingClientRect(),m=google.maps.event.addListener(u,"idle",(function(){u.setZoom(u.getZoom()-1);var l=e.getPixelOffset(u,t);u.panBy(0,Math.abs(l-f.top+.5*f.top)),google.maps.event.removeListener(m)}))}},l.prototype.getPixelOffset=function(l,n){for(var e=Math.pow(2,l.getZoom()),t=new google.maps.LatLng(l.getBounds().getNorthEast().lat(),l.getBounds().getSouthWest().lng()),o=l.getProjection().fromLatLngToPoint(t),u=0,i=0;i<n.length;i++){var r=l.getProjection().fromLatLngToPoint(n[i].getPosition());u+=new google.maps.Point(Math.floor((r.x-o.x)*e),Math.floor((r.y-o.y)*e)).y}return u/n.length},l}(),y=t["ɵcrt"]({encapsulation:0,styles:[['ion-toolbar[_ngcontent-%COMP%]{--background:transparent}ion-grid[_ngcontent-%COMP%]{width:100%;height:100%;padding:0}ion-row[_ngcontent-%COMP%]{width:100%}ion-col[_ngcontent-%COMP%]{align-self:center;padding:0}ion-icon[_ngcontent-%COMP%]{vertical-align:middle;font-size:20px}.background-map[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;top:0}.dinner-title[_ngcontent-%COMP%]{margin:0;padding-top:8px}.dinner-name[_ngcontent-%COMP%]{font-size:17px;font-weight:600;color:#303940;margin:0}.dinner-info[_ngcontent-%COMP%]{font-size:19px;font-weight:600;color:#949ea6;margin:0 auto}.foodAllergies[_ngcontent-%COMP%]{border-radius:20px;background-color:#9cc7ae}.avatar-left[_ngcontent-%COMP%]{width:50px;height:50px;display:block;border-radius:50%;position:relative;background-color:#fff}.avatar-right[_ngcontent-%COMP%]{width:50px;height:50px;display:block;right:5%;border-radius:50%;position:relative;background-color:#fff}.dotted-line[_ngcontent-%COMP%]:after{content:"";position:absolute;top:0;bottom:0;right:0;border-left:3px dotted #444}.bottomPanel[_ngcontent-%COMP%]{display:block;margin:5px 20px 20px;text-align:center}.ion-bulletin[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:0;color:#9c9c9c}.ion-bulletin[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:20px;font-size:18px;color:#666;line-height:1.5;margin-top:0}.ion-bulletin[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{height:50px;font-size:16px;font-weight:700}']],data:{}});function v(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,7,"ion-col",[],null,null,null,i.Z,i.j)),t["ɵdid"](1,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](2,0,null,0,5,"div",[["class","foodAllergies"]],null,null,null,null,null)),(l()(),t["ɵeld"](3,0,null,null,4,"ion-button",[["fill","clear"],["size","small"],["style","margin: 0%; color: black;"]],null,[[null,"click"]],(function(l,n,e){var t=!0,o=l.component;return"click"===n&&(t=!1!==o.presentModalFoodAllergies(o.myDinnerDetails.foodAllergies,o.myDinnerDetails.foodAllergiesCategories)&&t),t}),i.T,i.d)),t["ɵdid"](4,49152,null,0,r.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{fill:[0,"fill"],size:[1,"size"]},null),(l()(),t["ɵted"](-1,0,[" Sono presenti intolleranze "])),(l()(),t["ɵeld"](6,0,null,0,1,"ion-icon",[["name","heart-circle-outline"],["size","default"],["slot","start"]],null,null,null,i.fb,i.p)),t["ɵdid"](7,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"],size:[1,"size"]},null)],(function(l,n){l(n,4,0,"clear","small"),l(n,7,0,"heart-circle-outline","default")}),null)}function C(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,1,"h6",[["style","margin-bottom: 0px; margin-top: 10px;"]],null,null,null,null,null)),(l()(),t["ɵted"](1,null,["Tu e "," dovrete cucinare ",""]))],null,(function(l,n){var e=n.component;l(n,1,0,e.partnerName,e.myDish)}))}function N(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,2,"ion-avatar",[["class","avatar-left"]],null,null,null,i.R,i.b)),t["ɵdid"](1,49152,null,0,r.e,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](2,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(l,n){l(n,2,0,n.component.myDinnerDetails.houses.firstHouse.firstImage)}))}function E(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,2,"ion-avatar",[["class","avatar-right"]],null,null,null,i.R,i.b)),t["ɵdid"](1,49152,null,0,r.e,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](2,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(l,n){l(n,2,0,n.component.myDinnerDetails.houses.firstHouse.secondImage)}))}function Z(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,6,"ion-col",[["class","ion-text-center"]],null,null,null,i.Z,i.j)),t["ɵdid"](1,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](2,0,null,0,1,"p",[["style","margin: 0px;"]],null,null,null,null,null)),(l()(),t["ɵted"](3,null,[""," a casa di "," & ",""])),(l()(),t["ɵeld"](4,0,null,0,2,"span",[],null,null,null,null,null)),(l()(),t["ɵeld"](5,0,null,null,1,"p",[["style","margin: 0px;"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,["Alle 21.20"]))],null,(function(l,n){var e=n.component;l(n,3,0,e.firstDish,e.myDinnerDetails.houses.firstHouse.firstName,e.myDinnerDetails.houses.firstHouse.secondName)}))}function w(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,2,"ion-avatar",[["class","avatar-left"]],null,null,null,i.R,i.b)),t["ɵdid"](1,49152,null,0,r.e,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](2,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(l,n){l(n,2,0,n.component.myDinnerDetails.houses.secondHouse.firstImage)}))}function I(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,2,"ion-avatar",[["class","avatar-right"]],null,null,null,i.R,i.b)),t["ɵdid"](1,49152,null,0,r.e,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](2,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(l,n){l(n,2,0,n.component.myDinnerDetails.houses.secondHouse.secondImage)}))}function k(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,6,"ion-col",[["class","ion-text-center"]],null,null,null,i.Z,i.j)),t["ɵdid"](1,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](2,0,null,0,1,"p",[["style","margin: 0px;"]],null,null,null,null,null)),(l()(),t["ɵted"](3,null,[""," a casa di "," & ",""])),(l()(),t["ɵeld"](4,0,null,0,2,"span",[],null,null,null,null,null)),(l()(),t["ɵeld"](5,0,null,null,1,"p",[["style","margin: 0px;"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,["Alle 22.30"]))],null,(function(l,n){var e=n.component;l(n,3,0,e.secondDish,e.myDinnerDetails.houses.secondHouse.firstName,e.myDinnerDetails.houses.secondHouse.secondName)}))}function z(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,2,"ion-avatar",[["class","avatar-left"]],null,null,null,i.R,i.b)),t["ɵdid"](1,49152,null,0,r.e,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](2,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(l,n){l(n,2,0,n.component.myDinnerDetails.houses.thirdHouse.firstImage)}))}function P(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,2,"ion-avatar",[["class","avatar-right"]],null,null,null,i.R,i.b)),t["ɵdid"](1,49152,null,0,r.e,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](2,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(l,n){l(n,2,0,n.component.myDinnerDetails.houses.thirdHouse.secondImage)}))}function x(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,6,"ion-col",[["class","ion-text-center"]],null,null,null,i.Z,i.j)),t["ɵdid"](1,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](2,0,null,0,1,"p",[["style","margin: 0px;"]],null,null,null,null,null)),(l()(),t["ɵted"](3,null,[""," a casa di "," & ",""])),(l()(),t["ɵeld"](4,0,null,0,2,"span",[],null,null,null,null,null)),(l()(),t["ɵeld"](5,0,null,null,1,"p",[["style","margin: 0px;"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,["Alle 23.00"]))],null,(function(l,n){var e=n.component;l(n,3,0,e.thirdDish,e.myDinnerDetails.houses.thirdHouse.firstName,e.myDinnerDetails.houses.thirdHouse.secondName)}))}function M(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,24,"ion-header",[["class","ion-no-border"]],null,null,null,i.eb,i.o)),t["ɵdid"](1,49152,null,0,r.A,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](2,0,null,0,22,"ion-toolbar",[],null,null,null,i.Fb,i.P)),t["ɵdid"](3,49152,null,0,r.yb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](4,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,i.U,i.e)),t["ɵdid"](5,49152,null,0,r.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](6,0,null,0,2,"ion-back-button",[["defaultHref","/home/tabs/my-dinners"]],null,[[null,"click"]],(function(l,n,e){var o=!0;return"click"===n&&(o=!1!==t["ɵnov"](l,8).onClick(e)&&o),o}),i.S,i.c)),t["ɵdid"](7,49152,null,0,r.f,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{defaultHref:[0,"defaultHref"]},null),t["ɵdid"](8,16384,null,0,r.g,[[2,r.eb],r.Eb,r.c],{defaultHref:[0,"defaultHref"]},null),(l()(),t["ɵeld"](9,0,null,0,15,"ion-buttons",[["slot","end"]],null,null,null,i.U,i.e)),t["ɵdid"](10,49152,null,0,r.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](11,0,null,0,5,"ion-button",[["routerLink","/home/chat"],["shape","round"],["size","large"],["slot","icon-only"]],null,[[null,"click"]],(function(l,n,e){var o=!0;return"click"===n&&(o=!1!==t["ɵnov"](l,13).onClick()&&o),"click"===n&&(o=!1!==t["ɵnov"](l,14).onClick(e)&&o),o}),i.T,i.d)),t["ɵdid"](12,49152,null,0,r.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{shape:[0,"shape"],size:[1,"size"]},null),t["ɵdid"](13,16384,null,0,s.o,[s.n,s.a,[8,null],t.Renderer2,t.ElementRef],{routerLink:[0,"routerLink"]},null),t["ɵdid"](14,737280,null,0,r.Hb,[a.LocationStrategy,r.Eb,t.ElementRef,s.n,[2,s.o]],null,null),(l()(),t["ɵeld"](15,0,null,0,1,"ion-icon",[["name","chatbubble-ellipses-outline"],["size","large"]],null,null,null,i.fb,i.p)),t["ɵdid"](16,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"],size:[1,"size"]},null),(l()(),t["ɵeld"](17,0,null,0,3,"ion-button",[["shape","round"],["size","large"],["slot","icon-only"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.getDinnerEventData()&&t),t}),i.T,i.d)),t["ɵdid"](18,49152,null,0,r.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{shape:[0,"shape"],size:[1,"size"]},null),(l()(),t["ɵeld"](19,0,null,0,1,"ion-icon",[["name","refresh-circle-outline"],["size","large"]],null,null,null,i.fb,i.p)),t["ɵdid"](20,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"],size:[1,"size"]},null),(l()(),t["ɵeld"](21,0,null,0,3,"ion-button",[["shape","round"],["size","large"],["slot","icon-only"]],null,[[null,"click"]],(function(l,n,e){var t=!0,o=l.component;return"click"===n&&(t=!1!==o.presentPopover(e,o.dinner.time)&&t),t}),i.T,i.d)),t["ɵdid"](22,49152,null,0,r.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{shape:[0,"shape"],size:[1,"size"]},null),(l()(),t["ɵeld"](23,0,null,0,1,"ion-icon",[["name","help-circle-outline"],["size","large"]],null,null,null,i.fb,i.p)),t["ɵdid"](24,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"],size:[1,"size"]},null),(l()(),t["ɵeld"](25,0,null,null,83,"ion-content",[["fullscreen","true"],["scrollY","false"],["slot","fixed"]],null,null,null,i.ab,i.k)),t["ɵdid"](26,49152,null,0,r.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{fullscreen:[0,"fullscreen"],scrollY:[1,"scrollY"]},null),(l()(),t["ɵeld"](27,0,null,0,0,"div",[["class","background-map"],["id","mapEvent"]],null,null,null,null,null)),(l()(),t["ɵeld"](28,0,null,0,80,"div",[["class","bottomPanel"],["id","cupertinoEvent"]],null,null,null,null,null)),(l()(),t["ɵeld"](29,0,null,null,79,"ion-grid",[],null,null,null,i.db,i.n)),t["ɵdid"](30,49152,null,0,r.z,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](31,0,null,0,5,"ion-row",[],null,null,null,i.tb,i.D)),t["ɵdid"](32,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](33,0,null,0,3,"ion-col",[["style","height: 100%;"]],null,null,null,i.Z,i.j)),t["ɵdid"](34,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](35,0,null,0,1,"h3",[["class","dinner-title"]],null,null,null,null,null)),(l()(),t["ɵted"](36,null,["",""])),(l()(),t["ɵeld"](37,0,null,0,7,"ion-row",[["style","height: 100%; margin-top: 5%"]],null,null,null,i.tb,i.D)),t["ɵdid"](38,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](39,0,null,0,3,"ion-col",[["style","height: 100%;"]],null,null,null,i.Z,i.j)),t["ɵdid"](40,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](41,0,null,0,1,"h3",[["class","dinner-name"]],null,null,null,null,null)),(l()(),t["ɵted"](42,null,["Cena di ",""])),(l()(),t["ɵand"](16777216,null,0,1,null,v)),t["ɵdid"](44,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵeld"](45,0,null,0,5,"ion-row",[],null,null,null,i.tb,i.D)),t["ɵdid"](46,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](47,0,null,0,3,"ion-col",[["class","ion-text-center"],["style","padding-left: 2%;"]],null,null,null,i.Z,i.j)),t["ɵdid"](48,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵand"](16777216,null,0,1,null,C)),t["ɵdid"](50,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵeld"](51,0,null,0,9,"ion-row",[["class","ion-text-center"],["style","padding-top: 2%;"]],null,null,null,i.tb,i.D)),t["ɵdid"](52,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](53,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,i.Z,i.j)),t["ɵdid"](54,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(l()(),t["ɵeld"](55,0,null,0,1,"ion-icon",[["name","time-outline"]],null,null,null,i.fb,i.p)),t["ɵdid"](56,49152,null,0,r.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(l()(),t["ɵeld"](57,0,null,0,3,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,i.Z,i.j)),t["ɵdid"](58,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](59,0,null,0,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(l()(),t["ɵted"](60,null,[""," alle ",""])),(l()(),t["ɵeld"](61,0,null,0,9,"ion-row",[["style","margin-top: 3%;"]],null,null,null,i.tb,i.D)),t["ɵdid"](62,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](63,0,null,0,5,"ion-col",[["class","ion-text-center"],["style","display: contents;"]],null,null,null,i.Z,i.j)),t["ɵdid"](64,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵand"](16777216,null,0,1,null,N)),t["ɵdid"](66,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵand"](16777216,null,0,1,null,E)),t["ɵdid"](68,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵand"](16777216,null,0,1,null,Z)),t["ɵdid"](70,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵeld"](71,0,null,0,8,"ion-row",[],null,null,null,i.tb,i.D)),t["ɵdid"](72,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](73,0,null,0,2,"ion-col",[["size","1"],["style","height: 40px; margin-left: 4%;"]],null,null,null,i.Z,i.j)),t["ɵdid"](74,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(l()(),t["ɵeld"](75,0,null,0,0,"div",[["class","dotted-line"]],null,null,null,null,null)),(l()(),t["ɵeld"](76,0,null,0,3,"ion-col",[["class","ion-text-start"]],null,null,null,i.Z,i.j)),t["ɵdid"](77,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](78,0,null,0,1,"p",[["style","margin: 0px; margin-left: 2%;"]],null,null,null,null,null)),(l()(),t["ɵted"](79,null,["",""])),(l()(),t["ɵeld"](80,0,null,0,9,"ion-row",[],null,null,null,i.tb,i.D)),t["ɵdid"](81,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](82,0,null,0,5,"ion-col",[["class","ion-text-center"],["style","display: contents;"]],null,null,null,i.Z,i.j)),t["ɵdid"](83,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵand"](16777216,null,0,1,null,w)),t["ɵdid"](85,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵand"](16777216,null,0,1,null,I)),t["ɵdid"](87,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵand"](16777216,null,0,1,null,k)),t["ɵdid"](89,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵeld"](90,0,null,0,8,"ion-row",[],null,null,null,i.tb,i.D)),t["ɵdid"](91,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](92,0,null,0,2,"ion-col",[["size","1"],["style","height: 40px; margin-left: 4%;"]],null,null,null,i.Z,i.j)),t["ɵdid"](93,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(l()(),t["ɵeld"](94,0,null,0,0,"div",[["class","dotted-line"]],null,null,null,null,null)),(l()(),t["ɵeld"](95,0,null,0,3,"ion-col",[["class","ion-text-start"]],null,null,null,i.Z,i.j)),t["ɵdid"](96,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](97,0,null,0,1,"p",[["style","margin: 0px; margin-left: 2%;"]],null,null,null,null,null)),(l()(),t["ɵted"](98,null,["",""])),(l()(),t["ɵeld"](99,0,null,0,9,"ion-row",[],null,null,null,i.tb,i.D)),t["ɵdid"](100,49152,null,0,r.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](101,0,null,0,5,"ion-col",[["class","ion-text-center"],["style","display: contents;"]],null,null,null,i.Z,i.j)),t["ɵdid"](102,49152,null,0,r.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵand"](16777216,null,0,1,null,z)),t["ɵdid"](104,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵand"](16777216,null,0,1,null,P)),t["ɵdid"](106,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵand"](16777216,null,0,1,null,x)),t["ɵdid"](108,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){var e=n.component;l(n,7,0,"/home/tabs/my-dinners"),l(n,8,0,"/home/tabs/my-dinners"),l(n,12,0,"round","large"),l(n,13,0,"/home/chat"),l(n,14,0),l(n,16,0,"chatbubble-ellipses-outline","large"),l(n,18,0,"round","large"),l(n,20,0,"refresh-circle-outline","large"),l(n,22,0,"round","large"),l(n,24,0,"help-circle-outline","large"),l(n,26,0,"true","false"),l(n,44,0,e.myDinnerDetails.foodAllergies.length>0),l(n,50,0,e.myDish),l(n,54,0,"1"),l(n,56,0,"time-outline"),l(n,66,0,e.myDinnerDetails.houses),l(n,68,0,e.myDinnerDetails.houses),l(n,70,0,e.myDinnerDetails.houses),l(n,74,0,"1"),l(n,85,0,e.myDinnerDetails.houses),l(n,87,0,e.myDinnerDetails.houses),l(n,89,0,e.myDinnerDetails.houses),l(n,93,0,"1"),l(n,104,0,e.myDinnerDetails.houses),l(n,106,0,e.myDinnerDetails.houses),l(n,108,0,e.myDinnerDetails.houses)}),(function(l,n){var e=n.component;l(n,36,0,e.dinner.title),l(n,42,0,e.dinnerType),l(n,60,0,e.dinner.dateString,e.dinner.time),l(n,79,0,e.myDinnerDetails.houseDistances[0]),l(n,98,0,e.myDinnerDetails.houseDistances[1])}))}function _(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,1,"app-dinner-event",[],null,null,null,M,y)),t["ɵdid"](1,245760,null,0,R,[s.a,r.Gb,r.Db,c.a,g.a,f.a,D.a,b.a],null,null)],(function(l,n){l(n,1,0)}),null)}var S=t["ɵccf"]("app-dinner-event",R,_,{},{},[]),O=e("gIcY"),A=function(){return function(){}}(),F=e("RnAK"),T=e("E9nr");e.d(n,"DinnerEventPageModuleNgFactory",(function(){return j}));var j=t["ɵcmf"](o,[],(function(l){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[u.a,S]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,a.NgLocalization,a.NgLocaleLocalization,[t.LOCALE_ID,[2,a["ɵangular_packages_common_common_a"]]]),t["ɵmpd"](4608,O.l,O.l,[]),t["ɵmpd"](4608,r.b,r.b,[t.NgZone,t.ApplicationRef]),t["ɵmpd"](4608,r.Db,r.Db,[r.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](4608,r.Gb,r.Gb,[r.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](1073742336,a.CommonModule,a.CommonModule,[]),t["ɵmpd"](1073742336,O.k,O.k,[]),t["ɵmpd"](1073742336,O.b,O.b,[]),t["ɵmpd"](1073742336,r.Ab,r.Ab,[]),t["ɵmpd"](1073742336,s.p,s.p,[[2,s.u],[2,s.n]]),t["ɵmpd"](1073742336,A,A,[]),t["ɵmpd"](1073742336,F.a,F.a,[]),t["ɵmpd"](1073742336,T.a,T.a,[]),t["ɵmpd"](1073742336,o,o,[]),t["ɵmpd"](1024,s.l,(function(){return[[{path:"",component:R}]]}),[])])}))}}]);