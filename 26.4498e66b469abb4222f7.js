(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{VBSJ:function(n,e,l){"use strict";l.r(e);var t=l("CcnG"),i=function(){return function(){}}(),u=l("pMnS"),o=l("MKJQ"),s=l("jy/b"),r=l("Ip0R"),a=l("ZYCi"),d=l("mrSG"),c=l("rrMi"),g=l("0+Dt"),f=l("yzu5"),m=l("kOZ4"),p=l("vf8/"),h=l("98RE"),D=l("6HIw"),R=l("qXBG"),b=function(){function n(n,e,l,t,i,u,o,s){this.route=n,this.popoverController=e,this.dinnersService=l,this.profileService=t,this.notificationsService=i,this.paramsService=u,this.launchNavigator=o,this.authService=s,this.firstDish={name:null,startTime:null,endTime:null},this.secondDish={name:null,startTime:null,endTime:null},this.thirdDish={name:null,startTime:null,endTime:null},this.myDinnerDetails={houses:{firstHouse:{groupid:null,firstUserId:null,firstName:"",secondUserId:null,secondName:"",firstImage:"",secondImage:"",groupAddress:""},secondHouse:{groupid:null,firstUserId:null,firstName:"",secondUserId:null,secondName:"",firstImage:"",secondImage:"",groupAddress:""},thirdHouse:{groupid:null,firstUserId:null,firstName:"",secondUserId:null,secondName:"",firstImage:"",secondImage:"",groupAddress:""}},houseDistances:[],foodAllergies:[],foodAllergiesCategories:[],addressesLatLng:[]},this.directionsRenderer=new google.maps.DirectionsRenderer,this.bounds=new google.maps.LatLngBounds}return n.prototype.presentPopover=function(n,e){return d.__awaiter(this,void 0,void 0,(function(){return d.__generator(this,(function(l){switch(l.label){case 0:return[4,this.popoverController.create({component:m.a,componentProps:{dinnerTime:e},event:n,translucent:!0})];case 1:return[4,l.sent().present()];case 2:return[2,l.sent()]}}))}))},n.prototype.ngOnInit=function(){var n=this;this.route.queryParams.subscribe((function(e){n.dinner=d.__assign({},e),n.getDinnerPhasesData()})),this.subscription=this.notificationsService.getUpdateParamsObservable().subscribe((function(){console.log("Dinner Phases - Ricarico cena"),n.getDinnerPhasesData()}))},n.prototype.ngOnDestroy=function(){this.subscription.unsubscribe()},n.prototype.getDinnerPhasesData=function(){var n=this;this.dinnersService.getDinnerState(this.dinner.id).then((function(e){if(n.state=e.dinner_state,n.phase=n.dinnersService.setPhase(n.state),console.log("Phase Number: "+n.phase),4!==n.phase){n.bottomPanel||n.presentBottomPanel(),n.dinnerType=n.dinnersService.decodeType(Number(n.dinner.type))[0];var l=n.dinnersService.setDinnerDishes(n.dinner);n.firstDish=l[0],n.secondDish=l[1],n.thirdDish=l[2],n.dinnersService.getMyDinnerDetails(n.dinner,n.paramsService.getParams().groupId).then((function(e){n.myDinnerDetails=e,1===n.phase?n.paramsService.getParams().groupId===n.myDinnerDetails.houses.firstHouse.groupid?(n.distanceFromUser="Sei a casa tua! Preparati ad accogliere gli ospiti",n.travelTime="Beh direi che non devi spostarti xD",n.initMap([],n.myDinnerDetails.userLatLng)):n.dinnersService.setVariables(n.profileService.getPartner().group_address,n.myDinnerDetails.houses.firstHouse.groupAddress).then((function(e){n.phaseVariables=e,n.distanceFromUser=n.phaseVariables[0],n.travelTime=n.phaseVariables[1],n.directionsRenderer=n.phaseVariables[2],n.initMap([n.myDinnerDetails.addressesLatLng[0]],n.myDinnerDetails.userLatLng,n.directionsRenderer)})):2===n.phase?n.dinnersService.setVariables(n.myDinnerDetails.houses.firstHouse.groupAddress,n.myDinnerDetails.houses.secondHouse.groupAddress).then((function(e){n.phaseVariables=e,n.distanceFromUser=n.phaseVariables[0],n.travelTime=n.phaseVariables[1],n.directionsRenderer=n.phaseVariables[2],n.paramsService.getParams().groupId===n.myDinnerDetails.houses.firstHouse.groupid?n.initMap([n.myDinnerDetails.addressesLatLng[0]],n.myDinnerDetails.userLatLng,n.directionsRenderer):n.paramsService.getParams().groupId===n.myDinnerDetails.houses.secondHouse.groupid?n.initMap(n.myDinnerDetails.userLatLng,[n.myDinnerDetails.addressesLatLng[0]],n.directionsRenderer):n.initMap([n.myDinnerDetails.addressesLatLng[1]],[n.myDinnerDetails.addressesLatLng[0]],n.directionsRenderer)})):3===n.phase&&n.dinnersService.setVariables(n.myDinnerDetails.houses.secondHouse.groupAddress,n.myDinnerDetails.houses.thirdHouse.groupAddress).then((function(e){n.phaseVariables=e,n.distanceFromUser=n.phaseVariables[0],n.travelTime=n.phaseVariables[1],n.directionsRenderer=n.phaseVariables[2],n.paramsService.getParams().groupId===n.myDinnerDetails.houses.thirdHouse.groupid?n.initMap(n.myDinnerDetails.userLatLng,[n.myDinnerDetails.addressesLatLng[1]],n.directionsRenderer):n.paramsService.getParams().groupId===n.myDinnerDetails.houses.secondHouse.groupid?n.initMap([n.myDinnerDetails.addressesLatLng[1]],n.myDinnerDetails.userLatLng,n.directionsRenderer):n.initMap([n.myDinnerDetails.addressesLatLng[1]],[n.myDinnerDetails.addressesLatLng[0]],n.directionsRenderer)}))}))}else n.dinnersService.detDinnerStateRoute(n.dinner,n.state)}))},n.prototype.presentBottomPanel=function(){var n=this,e=document.getElementById("cupertinoPhases"),l={initialBreak:"top",breaks:{top:{enabled:!0,height:.6*window.screen.height,bounce:!0},middle:{enabled:!1,height:.25*window.screen.height,bounce:!0},bottom:{enabled:!0,height:.15*window.screen.height}},topperOverflow:!1,bottomClose:!1,buttonClose:!1,showDraggable:!1,onBackdropTap:function(){return n.bottomPanel.destroy({animate:!0})}};this.bottomPanel=new D.a(e,l),this.bottomPanel.present({animate:!0})},n.prototype.initMap=function(n,e,l){var t=this,i=[],u=document.getElementById("map");if(u){var o=new google.maps.Map(u,{disableDefaultUI:!0});l&&(l.setMap(o),l.setOptions({suppressMarkers:!0,preserveViewport:!0}));var s={url:"assets/you-marker.png",size:new google.maps.Size(50,50),origin:new google.maps.Point(0,0),scaledSize:new google.maps.Size(50,50)},r={url:"assets/dinner-marker.png",size:new google.maps.Size(50,50),origin:new google.maps.Point(0,0),scaledSize:new google.maps.Size(50,50)},a=new google.maps.Marker({position:e[0],map:o,icon:s});i.push(a),new google.maps.Circle({center:e[0],radius:100,fillColor:"#0000FF",fillOpacity:.1,map:o,strokeColor:"#FFFFFF",strokeOpacity:.1,strokeWeight:2});for(var d=0;d<n.length;d++){var c=new google.maps.Marker({position:n[d],map:o,icon:r});i.push(c),new google.maps.Circle({center:n[d],radius:100,fillColor:"#0000FF",fillOpacity:.1,map:o,strokeColor:"#FFFFFF",strokeOpacity:.1,strokeWeight:2})}for(var g=0;g<i.length;g++)this.bounds.extend(i[g].getPosition());o.fitBounds(this.bounds,{top:0,bottom:0,left:0,right:0});var f=document.getElementById("cupertinoPhases").getBoundingClientRect(),m=google.maps.event.addListener(o,"idle",(function(){o.setZoom(o.getZoom()-1);var n=t.getPixelOffset(o,i);o.panBy(0,Math.abs(n-f.top+.5*f.top)),google.maps.event.removeListener(m)}))}},n.prototype.getPixelOffset=function(n,e){for(var l=Math.pow(2,n.getZoom()),t=new google.maps.LatLng(n.getBounds().getNorthEast().lat(),n.getBounds().getSouthWest().lng()),i=n.getProjection().fromLatLngToPoint(t),u=0,o=0;o<e.length;o++){var s=n.getProjection().fromLatLngToPoint(e[o].getPosition());u+=new google.maps.Point(Math.floor((s.x-i.x)*l),Math.floor((s.y-i.y)*l)).y}return u/e.length},n.prototype.startNavigation=function(){var n,e;1===this.phase?(n=this.profileService.getPartner().group_address,e=this.myDinnerDetails.houses.firstHouse.groupAddress):2===this.phase?(n=this.myDinnerDetails.houses.firstHouse.groupAddress,e=this.myDinnerDetails.houses.secondHouse.groupAddress):3===this.phase&&(n=this.myDinnerDetails.houses.secondHouse.groupAddress,e=this.myDinnerDetails.houses.thirdHouse.groupAddress),this.launchNavigator.navigate(e,{start:n,appSelection:{dialogHeaderText:"Seleziona un'app per la navigazione",cancelButtonText:"Annulla",rememberChoice:{prompt:{headerText:"Ricordare la scelta?",bodyText:"Vuoi usare la stessa app anche le prossime volte?",yesButtonText:"Si",noButtonText:"No"}}}})},n}(),v=t["ɵcrt"]({encapsulation:0,styles:[["ion-toolbar[_ngcontent-%COMP%]{--background:transparent}ion-grid[_ngcontent-%COMP%]{width:100%;height:100%;padding:0}ion-row[_ngcontent-%COMP%]{width:100%}ion-col[_ngcontent-%COMP%]{align-self:center;padding:0}ion-icon[_ngcontent-%COMP%]{vertical-align:middle;font-size:20px}.background-map[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;top:0}.dinner-title[_ngcontent-%COMP%]{margin:0;padding-top:8px}.dinner-name[_ngcontent-%COMP%]{font-size:17px;font-weight:600;color:#303940;margin:0}.dinner-info[_ngcontent-%COMP%]{font-size:17px;font-weight:600;color:#949ea6;margin:0 auto}.avatar-left[_ngcontent-%COMP%]{width:50px;height:50px;display:block;border-radius:50%;position:relative;background-color:#fff}.avatar-right[_ngcontent-%COMP%]{width:50px;height:50px;display:block;right:5%;border-radius:50%;position:relative;background-color:#fff}.bottomPanel[_ngcontent-%COMP%]{display:block;margin:5px 20px 20px;text-align:center}.ion-bulletin[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:0;color:#9c9c9c}.ion-bulletin[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:20px;font-size:18px;color:#666;line-height:1.5;margin-top:0}.ion-bulletin[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{height:50px;font-size:16px;font-weight:700}"]],data:{}});function y(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h3",[["class","dinner-title"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["",""]))],null,(function(n,e){n(e,1,0,e.component.firstDish.name)}))}function C(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h3",[["class","dinner-title"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["",""]))],null,(function(n,e){n(e,1,0,e.component.secondDish.name)}))}function I(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h3",[["class","dinner-title"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["",""]))],null,(function(n,e){n(e,1,0,e.component.thirdDish.name)}))}function N(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["Dalle "," alle "," "]))],null,(function(n,e){var l=e.component;n(e,1,0,l.dinnersService.formatDate(l.firstDish.startTime)[1],l.dinnersService.formatDate(l.firstDish.endTime)[1])}))}function w(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["Dalle "," alle "," "]))],null,(function(n,e){var l=e.component;n(e,1,0,l.dinnersService.formatDate(l.secondDish.startTime)[1],l.dinnersService.formatDate(l.secondDish.endTime)[1])}))}function P(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["Dalle "," alle "," "]))],null,(function(n,e){var l=e.component;n(e,1,0,l.dinnersService.formatDate(l.thirdDish.startTime)[1],l.dinnersService.formatDate(l.thirdDish.endTime)[1])}))}function Z(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"span",[["class","dinner-name"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,[" "," & "," "]))],null,(function(n,e){var l=e.component;n(e,1,0,l.myDinnerDetails.houses.firstHouse.firstName,l.myDinnerDetails.houses.firstHouse.secondName)}))}function T(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"span",[["class","dinner-name"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,[" "," & "," "]))],null,(function(n,e){var l=e.component;n(e,1,0,l.myDinnerDetails.houses.secondHouse.firstName,l.myDinnerDetails.houses.secondHouse.secondName)}))}function L(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"span",[["class","dinner-name"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,[" "," & "," "]))],null,(function(n,e){var l=e.component;n(e,1,0,l.myDinnerDetails.houses.thirdHouse.firstName,l.myDinnerDetails.houses.thirdHouse.secondName)}))}function k(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,9,"ion-col",[["class","ion-text-center"]],null,null,null,o.Z,o.j)),t["ɵdid"](1,49152,null,0,s.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](2,0,null,0,1,"p",[["class","dinner-name"]],null,null,null,null,null)),(n()(),t["ɵted"](-1,null,["A casa di "])),(n()(),t["ɵand"](16777216,null,0,1,null,Z)),t["ɵdid"](5,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,T)),t["ɵdid"](7,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,L)),t["ɵdid"](9,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,e){var l=e.component;n(e,5,0,1===l.phase),n(e,7,0,2===l.phase),n(e,9,0,3===l.phase)}),null)}function z(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(n,e){n(e,0,0,e.component.myDinnerDetails.houses.firstHouse.firstImage)}))}function E(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(n,e){n(e,0,0,e.component.myDinnerDetails.houses.secondHouse.firstImage)}))}function S(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(n,e){n(e,0,0,e.component.myDinnerDetails.houses.thirdHouse.firstImage)}))}function M(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,7,"ion-avatar",[["class","avatar-left"]],null,null,null,o.R,o.b)),t["ɵdid"](1,49152,null,0,s.e,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,z)),t["ɵdid"](3,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,E)),t["ɵdid"](5,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,S)),t["ɵdid"](7,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,e){var l=e.component;n(e,3,0,1===l.phase),n(e,5,0,2===l.phase),n(e,7,0,3===l.phase)}),null)}function H(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(n,e){n(e,0,0,e.component.myDinnerDetails.houses.firstHouse.secondImage)}))}function x(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(n,e){n(e,0,0,e.component.myDinnerDetails.houses.secondHouse.secondImage)}))}function V(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(n,e){n(e,0,0,e.component.myDinnerDetails.houses.thirdHouse.secondImage)}))}function _(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,7,"ion-avatar",[["class","avatar-right"]],null,null,null,o.R,o.b)),t["ɵdid"](1,49152,null,0,s.e,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,H)),t["ɵdid"](3,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,x)),t["ɵdid"](5,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,V)),t["ɵdid"](7,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,e){var l=e.component;n(e,3,0,1===l.phase),n(e,5,0,2===l.phase),n(e,7,0,3===l.phase)}),null)}function O(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["",""]))],null,(function(n,e){n(e,1,0,e.component.myDinnerDetails.houses.firstHouse.groupAddress)}))}function F(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["",""]))],null,(function(n,e){n(e,1,0,e.component.myDinnerDetails.houses.secondHouse.groupAddress)}))}function A(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["",""]))],null,(function(n,e){n(e,1,0,e.component.myDinnerDetails.houses.thirdHouse.groupAddress)}))}function B(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,2,"ion-button",[],null,[[null,"click"]],(function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.startNavigation()&&t),t}),o.T,o.d)),t["ɵdid"](1,49152,null,0,s.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵted"](-1,0,[" Inizia Navigazione "]))],null,null)}function j(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,24,"ion-header",[["class","ion-no-border"]],null,null,null,o.eb,o.o)),t["ɵdid"](1,49152,null,0,s.A,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](2,0,null,0,22,"ion-toolbar",[],null,null,null,o.Fb,o.P)),t["ɵdid"](3,49152,null,0,s.yb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](4,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,o.U,o.e)),t["ɵdid"](5,49152,null,0,s.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](6,0,null,0,2,"ion-back-button",[["defaultHref","/home/tabs/my-dinners"]],null,[[null,"click"]],(function(n,e,l){var i=!0;return"click"===e&&(i=!1!==t["ɵnov"](n,8).onClick(l)&&i),i}),o.S,o.c)),t["ɵdid"](7,49152,null,0,s.f,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{defaultHref:[0,"defaultHref"]},null),t["ɵdid"](8,16384,null,0,s.g,[[2,s.eb],s.Eb,s.c],{defaultHref:[0,"defaultHref"]},null),(n()(),t["ɵeld"](9,0,null,0,15,"ion-buttons",[["slot","end"]],null,null,null,o.U,o.e)),t["ɵdid"](10,49152,null,0,s.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](11,0,null,0,3,"ion-button",[["shape","round"],["size","large"],["slot","icon-only"]],null,[[null,"click"]],(function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.getDinnerPhasesData()&&t),t}),o.T,o.d)),t["ɵdid"](12,49152,null,0,s.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{shape:[0,"shape"],size:[1,"size"]},null),(n()(),t["ɵeld"](13,0,null,0,1,"ion-icon",[["name","refresh-circle-outline"],["size","large"]],null,null,null,o.fb,o.p)),t["ɵdid"](14,49152,null,0,s.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"],size:[1,"size"]},null),(n()(),t["ɵeld"](15,0,null,0,5,"ion-button",[["routerLink","/home/chat"],["shape","round"],["size","large"],["slot","icon-only"]],null,[[null,"click"]],(function(n,e,l){var i=!0;return"click"===e&&(i=!1!==t["ɵnov"](n,17).onClick()&&i),"click"===e&&(i=!1!==t["ɵnov"](n,18).onClick(l)&&i),i}),o.T,o.d)),t["ɵdid"](16,49152,null,0,s.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{shape:[0,"shape"],size:[1,"size"]},null),t["ɵdid"](17,16384,null,0,a.o,[a.n,a.a,[8,null],t.Renderer2,t.ElementRef],{routerLink:[0,"routerLink"]},null),t["ɵdid"](18,737280,null,0,s.Hb,[r.LocationStrategy,s.Eb,t.ElementRef,a.n,[2,a.o]],null,null),(n()(),t["ɵeld"](19,0,null,0,1,"ion-icon",[["name","chatbubble-ellipses-outline"],["size","large"]],null,null,null,o.fb,o.p)),t["ɵdid"](20,49152,null,0,s.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"],size:[1,"size"]},null),(n()(),t["ɵeld"](21,0,null,0,3,"ion-button",[["shape","round"],["size","large"],["slot","icon-only"]],null,[[null,"click"]],(function(n,e,l){var t=!0,i=n.component;return"click"===e&&(t=!1!==i.presentPopover(l,i.dinner.time)&&t),t}),o.T,o.d)),t["ɵdid"](22,49152,null,0,s.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{shape:[0,"shape"],size:[1,"size"]},null),(n()(),t["ɵeld"](23,0,null,0,1,"ion-icon",[["name","help-circle-outline"],["size","large"]],null,null,null,o.fb,o.p)),t["ɵdid"](24,49152,null,0,s.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"],size:[1,"size"]},null),(n()(),t["ɵeld"](25,0,null,null,82,"ion-content",[["fullscreen","true"],["scrollY","false"],["slot","fixed"]],null,null,null,o.ab,o.k)),t["ɵdid"](26,49152,null,0,s.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{fullscreen:[0,"fullscreen"],scrollY:[1,"scrollY"]},null),(n()(),t["ɵeld"](27,0,null,0,0,"div",[["class","background-map"],["id","map"]],null,null,null,null,null)),(n()(),t["ɵeld"](28,0,null,0,79,"div",[["class","bottomPanel"],["id","cupertinoPhases"]],null,null,null,null,null)),(n()(),t["ɵeld"](29,0,null,null,78,"ion-grid",[],null,null,null,o.db,o.n)),t["ɵdid"](30,49152,null,0,s.z,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](31,0,null,0,9,"ion-row",[],null,null,null,o.tb,o.D)),t["ɵdid"](32,49152,null,0,s.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](33,0,null,0,7,"ion-col",[],null,null,null,o.Z,o.j)),t["ɵdid"](34,49152,null,0,s.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,y)),t["ɵdid"](36,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,C)),t["ɵdid"](38,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,I)),t["ɵdid"](40,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](41,0,null,0,9,"ion-row",[["style","margin-top: 5%;"]],null,null,null,o.tb,o.D)),t["ɵdid"](42,49152,null,0,s.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](43,0,null,0,7,"ion-col",[["class","ion-text-center"],["style","display: contents;"]],null,null,null,o.Z,o.j)),t["ɵdid"](44,49152,null,0,s.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,N)),t["ɵdid"](46,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,w)),t["ɵdid"](48,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,P)),t["ɵdid"](50,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](51,0,null,0,10,"ion-row",[["style","margin-top: 3%;"]],null,null,null,o.tb,o.D)),t["ɵdid"](52,49152,null,0,s.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,k)),t["ɵdid"](54,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](55,0,null,0,6,"ion-col",[["class","ion-text-center"]],null,null,null,o.Z,o.j)),t["ɵdid"](56,49152,null,0,s.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](57,0,null,0,4,"div",[["style","display: -webkit-box;"]],null,null,null,null,null)),(n()(),t["ɵand"](16777216,null,null,1,null,M)),t["ɵdid"](59,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,null,1,null,_)),t["ɵdid"](61,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](62,0,null,0,5,"ion-row",[["class","ion-text-center"],["style","margin-top: 3%;"]],null,null,null,o.tb,o.D)),t["ɵdid"](63,49152,null,0,s.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](64,0,null,0,3,"ion-col",[],null,null,null,o.Z,o.j)),t["ɵdid"](65,49152,null,0,s.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](66,0,null,0,1,"h3",[["style","margin: 0%;"]],null,null,null,null,null)),(n()(),t["ɵted"](-1,null,["Indicazioni"])),(n()(),t["ɵeld"](68,0,null,0,13,"ion-row",[["class","ion-text-center"],["style","margin-top: 3%;"]],null,null,null,o.tb,o.D)),t["ɵdid"](69,49152,null,0,s.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](70,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.Z,o.j)),t["ɵdid"](71,49152,null,0,s.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](72,0,null,0,1,"ion-icon",[["name","home-outline"]],null,null,null,o.fb,o.p)),t["ɵdid"](73,49152,null,0,s.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](74,0,null,0,7,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.Z,o.j)),t["ɵdid"](75,49152,null,0,s.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,O)),t["ɵdid"](77,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,F)),t["ɵdid"](79,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,A)),t["ɵdid"](81,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](82,0,null,0,9,"ion-row",[["class","ion-text-center"],["style","margin-top: 3%;"]],null,null,null,o.tb,o.D)),t["ɵdid"](83,49152,null,0,s.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](84,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.Z,o.j)),t["ɵdid"](85,49152,null,0,s.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](86,0,null,0,1,"ion-icon",[["name","map-outline"]],null,null,null,o.fb,o.p)),t["ɵdid"](87,49152,null,0,s.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](88,0,null,0,3,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.Z,o.j)),t["ɵdid"](89,49152,null,0,s.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](90,0,null,0,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](91,null,["",""])),(n()(),t["ɵeld"](92,0,null,0,9,"ion-row",[["class","ion-text-center"],["style","margin-top: 3%;"]],null,null,null,o.tb,o.D)),t["ɵdid"](93,49152,null,0,s.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](94,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.Z,o.j)),t["ɵdid"](95,49152,null,0,s.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](96,0,null,0,1,"ion-icon",[["name","car-sport-outline"]],null,null,null,o.fb,o.p)),t["ɵdid"](97,49152,null,0,s.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](98,0,null,0,3,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.Z,o.j)),t["ɵdid"](99,49152,null,0,s.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](100,0,null,0,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](101,null,["",""])),(n()(),t["ɵeld"](102,0,null,0,5,"ion-row",[["class","ion-text-center"],["style","margin-top: 7%;"]],null,null,null,o.tb,o.D)),t["ɵdid"](103,49152,null,0,s.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](104,0,null,0,3,"ion-col",[["class","ion-align-items-center"]],null,null,null,o.Z,o.j)),t["ɵdid"](105,49152,null,0,s.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,B)),t["ɵdid"](107,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,e){var l=e.component;n(e,7,0,"/home/tabs/my-dinners"),n(e,8,0,"/home/tabs/my-dinners"),n(e,12,0,"round","large"),n(e,14,0,"refresh-circle-outline","large"),n(e,16,0,"round","large"),n(e,17,0,"/home/chat"),n(e,18,0),n(e,20,0,"chatbubble-ellipses-outline","large"),n(e,22,0,"round","large"),n(e,24,0,"help-circle-outline","large"),n(e,26,0,"true","false"),n(e,36,0,1===l.phase),n(e,38,0,2===l.phase),n(e,40,0,3===l.phase),n(e,46,0,1===l.phase),n(e,48,0,2===l.phase),n(e,50,0,3===l.phase),n(e,54,0,l.myDinnerDetails.houses),n(e,59,0,l.myDinnerDetails.houses),n(e,61,0,l.myDinnerDetails.houses),n(e,71,0,"1"),n(e,73,0,"home-outline"),n(e,77,0,1===l.phase),n(e,79,0,2===l.phase),n(e,81,0,3===l.phase),n(e,85,0,"1"),n(e,87,0,"map-outline"),n(e,95,0,"1"),n(e,97,0,"car-sport-outline"),n(e,107,0,1===l.phase&&l.paramsService.getParams().groupId!=l.myDinnerDetails.houses.firstHouse.groupid||2===l.phase||3===l.phase)}),(function(n,e){var l=e.component;n(e,91,0,l.distanceFromUser),n(e,101,0,l.travelTime)}))}function U(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"app-dinner-phases",[],null,null,null,j,v)),t["ɵdid"](1,245760,null,0,b,[a.a,s.Gb,c.a,g.a,h.a,f.a,p.a,R.a],null,null)],(function(n,e){n(e,1,0)}),null)}var G=t["ɵccf"]("app-dinner-phases",b,U,{},{},[]),Y=l("gIcY"),J=function(){return function(){}}();l.d(e,"DinnerPhasesPageModuleNgFactory",(function(){return W}));var W=t["ɵcmf"](i,[],(function(n){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[u.a,G]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,r.NgLocalization,r.NgLocaleLocalization,[t.LOCALE_ID,[2,r["ɵangular_packages_common_common_a"]]]),t["ɵmpd"](4608,Y.l,Y.l,[]),t["ɵmpd"](4608,s.b,s.b,[t.NgZone,t.ApplicationRef]),t["ɵmpd"](4608,s.Db,s.Db,[s.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](4608,s.Gb,s.Gb,[s.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](1073742336,r.CommonModule,r.CommonModule,[]),t["ɵmpd"](1073742336,Y.k,Y.k,[]),t["ɵmpd"](1073742336,Y.b,Y.b,[]),t["ɵmpd"](1073742336,s.Ab,s.Ab,[]),t["ɵmpd"](1073742336,a.p,a.p,[[2,a.u],[2,a.n]]),t["ɵmpd"](1073742336,J,J,[]),t["ɵmpd"](1073742336,i,i,[]),t["ɵmpd"](1024,a.l,(function(){return[[{path:"",component:b}]]}),[])])}))}}]);