(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{VBSJ:function(n,l,e){"use strict";e.r(l);var t=e("CcnG"),u=function(){return function(){}}(),i=e("pMnS"),o=e("MKJQ"),a=e("jy/b"),s=e("Ip0R"),r=e("ZYCi"),d=e("mrSG"),c=e("rrMi"),g=e("0+Dt"),f=e("yzu5"),m=e("vf8/"),p=e("98RE"),h=e("6HIw"),R=e("qXBG"),D=function(){function n(n,l,e,t,u,i,o,a){this.route=n,this.popoverController=l,this.dinnersService=e,this.profileService=t,this.notificationsService=u,this.paramsService=i,this.launchNavigator=o,this.authService=a,this.firstDish={name:null,startTime:null,endTime:null},this.secondDish={name:null,startTime:null,endTime:null},this.thirdDish={name:null,startTime:null,endTime:null},this.myDinnerDetails={houses:{firstHouse:{groupid:null,firstUserId:null,firstName:"",secondUserId:null,secondName:"",firstImage:"",secondImage:"",groupAddress:""},secondHouse:{groupid:null,firstUserId:null,firstName:"",secondUserId:null,secondName:"",firstImage:"",secondImage:"",groupAddress:""},thirdHouse:{groupid:null,firstUserId:null,firstName:"",secondUserId:null,secondName:"",firstImage:"",secondImage:"",groupAddress:""}},houseDistances:[],foodAllergies:[],foodAllergiesCategories:[],addressesLatLng:[]},this.directionsRenderer=new google.maps.DirectionsRenderer,this.bounds=new google.maps.LatLngBounds}return n.prototype.ngOnInit=function(){var n=this;this.route.queryParams.subscribe((function(l){n.dinner=d.__assign({},l),n.getDinnerPhasesData()})),this.subscription=this.notificationsService.getUpdateParamsObservable().subscribe((function(){console.log("Dinner Phases - Ricarico cena"),n.getDinnerPhasesData()}))},n.prototype.ngOnDestroy=function(){this.subscription.unsubscribe()},n.prototype.getDinnerPhasesData=function(){var n=this;this.syncInProgress=!0,this.dinnersService.getDinnerState(this.dinner.id).then((function(l){if(n.state=l.dinner_state,n.phase=n.dinnersService.setPhase(n.state),console.log("Phase Number: "+n.phase),4!==n.phase){n.bottomPanel||n.presentBottomPanel(),n.dinnerType=n.dinnersService.decodeType(Number(n.dinner.type))[0];var e=n.dinnersService.setDinnerDishes(n.dinner);n.firstDish=e[0],n.secondDish=e[1],n.thirdDish=e[2],n.dinnersService.getMyDinnerDetails(n.dinner,n.paramsService.getParams().groupId).then((function(l){n.myDinnerDetails=l,1===n.phase?n.paramsService.getParams().groupId===n.myDinnerDetails.houses.firstHouse.groupid?(n.distanceFromUser="Sei a casa tua! Preparati ad accogliere gli ospiti",n.travelTime="Beh direi che non devi spostarti xD",n.initMap([],n.myDinnerDetails.userLatLng)):n.dinnersService.setVariables(n.profileService.getPartner().group_address,n.myDinnerDetails.houses.firstHouse.groupAddress).then((function(l){n.phaseVariables=l,n.distanceFromUser=n.phaseVariables[0],n.travelTime=n.phaseVariables[1],n.directionsRenderer=n.phaseVariables[2],n.initMap([n.myDinnerDetails.addressesLatLng[0]],n.myDinnerDetails.userLatLng,n.directionsRenderer)})):2===n.phase?n.dinnersService.setVariables(n.myDinnerDetails.houses.firstHouse.groupAddress,n.myDinnerDetails.houses.secondHouse.groupAddress).then((function(l){n.phaseVariables=l,n.distanceFromUser=n.phaseVariables[0],n.travelTime=n.phaseVariables[1],n.directionsRenderer=n.phaseVariables[2],n.paramsService.getParams().groupId===n.myDinnerDetails.houses.firstHouse.groupid?n.initMap([n.myDinnerDetails.addressesLatLng[0]],n.myDinnerDetails.userLatLng,n.directionsRenderer):n.paramsService.getParams().groupId===n.myDinnerDetails.houses.secondHouse.groupid?n.initMap(n.myDinnerDetails.userLatLng,[n.myDinnerDetails.addressesLatLng[0]],n.directionsRenderer):n.initMap([n.myDinnerDetails.addressesLatLng[1]],[n.myDinnerDetails.addressesLatLng[0]],n.directionsRenderer)})):3===n.phase&&n.dinnersService.setVariables(n.myDinnerDetails.houses.secondHouse.groupAddress,n.myDinnerDetails.houses.thirdHouse.groupAddress).then((function(l){n.phaseVariables=l,n.distanceFromUser=n.phaseVariables[0],n.travelTime=n.phaseVariables[1],n.directionsRenderer=n.phaseVariables[2],n.paramsService.getParams().groupId===n.myDinnerDetails.houses.thirdHouse.groupid?n.initMap(n.myDinnerDetails.userLatLng,[n.myDinnerDetails.addressesLatLng[1]],n.directionsRenderer):n.paramsService.getParams().groupId===n.myDinnerDetails.houses.secondHouse.groupid?n.initMap([n.myDinnerDetails.addressesLatLng[1]],n.myDinnerDetails.userLatLng,n.directionsRenderer):n.initMap([n.myDinnerDetails.addressesLatLng[1]],[n.myDinnerDetails.addressesLatLng[0]],n.directionsRenderer)})),n.syncInProgress=!1}))}else n.dinnersService.detDinnerStateRoute(n.dinner,n.state)}))},n.prototype.presentBottomPanel=function(){var n=this,l=document.getElementById("cupertinoPhases"),e={initialBreak:"top",breaks:{top:{enabled:!0,height:.6*window.screen.height,bounce:!0},middle:{enabled:!1,height:.25*window.screen.height,bounce:!0},bottom:{enabled:!0,height:.15*window.screen.height}},topperOverflow:!1,bottomClose:!1,buttonClose:!1,showDraggable:!1,onBackdropTap:function(){return n.bottomPanel.destroy({animate:!0})}};this.bottomPanel=new h.a(l,e),this.bottomPanel.present({animate:!0})},n.prototype.initMap=function(n,l,e){var t=this,u=[],i=document.getElementById("map");if(i){var o=new google.maps.Map(i,{disableDefaultUI:!0});e&&(e.setMap(o),e.setOptions({suppressMarkers:!0,preserveViewport:!0}));var a={url:"assets/you-marker.png",size:new google.maps.Size(50,50),origin:new google.maps.Point(0,0),scaledSize:new google.maps.Size(50,50)},s={url:"assets/dinner-marker.png",size:new google.maps.Size(50,50),origin:new google.maps.Point(0,0),scaledSize:new google.maps.Size(50,50)},r=new google.maps.Marker({position:l[0],map:o,icon:a});u.push(r),new google.maps.Circle({center:l[0],radius:100,fillColor:"#0000FF",fillOpacity:.1,map:o,strokeColor:"#FFFFFF",strokeOpacity:.1,strokeWeight:2});for(var d=0;d<n.length;d++){var c=new google.maps.Marker({position:n[d],map:o,icon:s});u.push(c),new google.maps.Circle({center:n[d],radius:100,fillColor:"#0000FF",fillOpacity:.1,map:o,strokeColor:"#FFFFFF",strokeOpacity:.1,strokeWeight:2})}for(var g=0;g<u.length;g++)this.bounds.extend(u[g].getPosition());o.fitBounds(this.bounds,{top:0,bottom:0,left:0,right:0});var f=document.getElementById("cupertinoPhases").getBoundingClientRect(),m=google.maps.event.addListener(o,"idle",(function(){o.setZoom(o.getZoom()-1);var n=t.getPixelOffset(o,u);o.panBy(0,Math.abs(n-f.top+.5*f.top)),google.maps.event.removeListener(m)}))}},n.prototype.getPixelOffset=function(n,l){for(var e=Math.pow(2,n.getZoom()),t=new google.maps.LatLng(n.getBounds().getNorthEast().lat(),n.getBounds().getSouthWest().lng()),u=n.getProjection().fromLatLngToPoint(t),i=0,o=0;o<l.length;o++){var a=n.getProjection().fromLatLngToPoint(l[o].getPosition());i+=new google.maps.Point(Math.floor((a.x-u.x)*e),Math.floor((a.y-u.y)*e)).y}return i/l.length},n.prototype.startNavigation=function(){var n,l;1===this.phase?(n=this.profileService.getPartner().group_address,l=this.myDinnerDetails.houses.firstHouse.groupAddress):2===this.phase?(n=this.myDinnerDetails.houses.firstHouse.groupAddress,l=this.myDinnerDetails.houses.secondHouse.groupAddress):3===this.phase&&(n=this.myDinnerDetails.houses.secondHouse.groupAddress,l=this.myDinnerDetails.houses.thirdHouse.groupAddress),this.launchNavigator.navigate(l,{start:n,appSelection:{dialogHeaderText:"Seleziona un'app per la navigazione",cancelButtonText:"Annulla",rememberChoice:{prompt:{headerText:"Ricordare la scelta?",bodyText:"Vuoi usare la stessa app anche le prossime volte?",yesButtonText:"Si",noButtonText:"No"}}}})},n}(),b=t["ɵcrt"]({encapsulation:0,styles:[["[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}ion-toolbar[_ngcontent-%COMP%]{--background:transparent}ion-grid[_ngcontent-%COMP%]{width:100%;height:100%;padding:0}ion-row[_ngcontent-%COMP%]{width:100%}ion-col[_ngcontent-%COMP%]{align-self:center;padding:0}ion-icon[_ngcontent-%COMP%]{vertical-align:middle;font-size:20px}.background-map[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;top:0}.dinner-title[_ngcontent-%COMP%]{margin:0;padding-top:8px}.dinner-name[_ngcontent-%COMP%]{font-size:17px;font-weight:600;color:#303940;margin:0}.dinner-info[_ngcontent-%COMP%]{font-size:17px;font-weight:600;color:#949ea6;margin:0 auto}.avatar-left[_ngcontent-%COMP%]{width:50px;height:50px;display:block;border-radius:50%;position:relative;background-color:#fff}.avatar-right[_ngcontent-%COMP%]{width:50px;height:50px;display:block;right:5%;border-radius:50%;position:relative;background-color:#fff}.bottomPanel[_ngcontent-%COMP%]{display:block;margin:5px 20px 20px;text-align:center}.ion-bulletin[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:0;color:#9c9c9c}.ion-bulletin[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:20px;font-size:18px;color:#666;line-height:1.5;margin-top:0}.ion-bulletin[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{height:50px;font-size:16px;font-weight:700}"]],data:{}});function C(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,76,"div",[],null,null,null,null,null)),(n()(),t["ɵeld"](1,0,null,null,75,"ion-grid",[],null,null,null,o.Z,o.l)),t["ɵdid"](2,49152,null,0,a.z,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](3,0,null,0,5,"ion-row",[],null,null,null,o.pb,o.B)),t["ɵdid"](4,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](5,0,null,0,3,"ion-col",[["style","text-align: -webkit-center;"]],null,null,null,o.V,o.h)),t["ɵdid"](6,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](7,0,null,0,1,"ion-skeleton-text",[["animated",""],["style","width: 50%; margin-top: 0.5em;"]],null,null,null,o.tb,o.F)),t["ɵdid"](8,49152,null,0,a.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](9,0,null,0,5,"ion-row",[],null,null,null,o.pb,o.B)),t["ɵdid"](10,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](11,0,null,0,3,"ion-col",[["style","text-align: -webkit-center;"]],null,null,null,o.V,o.h)),t["ɵdid"](12,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](13,0,null,0,1,"ion-skeleton-text",[["animated",""],["style","width: 30%; margin-top: 1em; margin-bottom: 1em;"]],null,null,null,o.tb,o.F)),t["ɵdid"](14,49152,null,0,a.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](15,0,null,0,19,"ion-row",[["style","margin-top: 3%;"]],null,null,null,o.pb,o.B)),t["ɵdid"](16,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](17,0,null,0,6,"ion-col",[["style","text-align: -webkit-center;"]],null,null,null,o.V,o.h)),t["ɵdid"](18,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](19,0,null,0,1,"ion-skeleton-text",[["animated",""],["style","width: 30%; margin-top: 0.5em;"]],null,null,null,o.tb,o.F)),t["ɵdid"](20,49152,null,0,a.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](21,0,null,0,2,"span",[],null,null,null,null,null)),(n()(),t["ɵeld"](22,0,null,null,1,"ion-skeleton-text",[["animated",""],["style","width: 40%;"]],null,null,null,o.tb,o.F)),t["ɵdid"](23,49152,null,0,a.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](24,0,null,0,10,"ion-col",[["class","ion-text-center"]],null,null,null,o.V,o.h)),t["ɵdid"](25,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](26,0,null,0,8,"div",[["style","display: -webkit-box;"]],null,null,null,null,null)),(n()(),t["ɵeld"](27,0,null,null,3,"ion-avatar",[["class","avatar-left"]],null,null,null,o.P,o.b)),t["ɵdid"](28,49152,null,0,a.e,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](29,0,null,0,1,"ion-skeleton-text",[["animated",""]],null,null,null,o.tb,o.F)),t["ɵdid"](30,49152,null,0,a.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](31,0,null,null,3,"ion-avatar",[["class","avatar-right"]],null,null,null,o.P,o.b)),t["ɵdid"](32,49152,null,0,a.e,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](33,0,null,0,1,"ion-skeleton-text",[["animated",""]],null,null,null,o.tb,o.F)),t["ɵdid"](34,49152,null,0,a.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](35,0,null,0,5,"ion-row",[["class","ion-text-center"],["style","margin-top: 3%;"]],null,null,null,o.pb,o.B)),t["ɵdid"](36,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](37,0,null,0,3,"ion-col",[["style","text-align: -webkit-center;"]],null,null,null,o.V,o.h)),t["ɵdid"](38,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](39,0,null,0,1,"ion-skeleton-text",[["animated",""],["style","width: 50%; margin-top: 1em; margin-bottom: 1em;"]],null,null,null,o.tb,o.F)),t["ɵdid"](40,49152,null,0,a.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](41,0,null,0,9,"ion-row",[["class","ion-text-center"],["style","margin-top: 3%;"]],null,null,null,o.pb,o.B)),t["ɵdid"](42,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](43,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.V,o.h)),t["ɵdid"](44,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](45,0,null,0,1,"ion-icon",[["name","home-outline"]],null,null,null,o.bb,o.n)),t["ɵdid"](46,49152,null,0,a.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](47,0,null,0,3,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.V,o.h)),t["ɵdid"](48,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](49,0,null,0,1,"ion-skeleton-text",[["animated",""],["style","width: 100%; margin-top: 0.5em;"]],null,null,null,o.tb,o.F)),t["ɵdid"](50,49152,null,0,a.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](51,0,null,0,9,"ion-row",[["class","ion-text-center"],["style","margin-top: 3%;"]],null,null,null,o.pb,o.B)),t["ɵdid"](52,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](53,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.V,o.h)),t["ɵdid"](54,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](55,0,null,0,1,"ion-icon",[["name","map-outline"]],null,null,null,o.bb,o.n)),t["ɵdid"](56,49152,null,0,a.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](57,0,null,0,3,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.V,o.h)),t["ɵdid"](58,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](59,0,null,0,1,"ion-skeleton-text",[["animated",""],["style","width: 100%; margin-top: 0.5em;"]],null,null,null,o.tb,o.F)),t["ɵdid"](60,49152,null,0,a.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](61,0,null,0,9,"ion-row",[["class","ion-text-center"],["style","margin-top: 3%;"]],null,null,null,o.pb,o.B)),t["ɵdid"](62,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](63,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.V,o.h)),t["ɵdid"](64,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](65,0,null,0,1,"ion-icon",[["name","car-sport-outline"]],null,null,null,o.bb,o.n)),t["ɵdid"](66,49152,null,0,a.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](67,0,null,0,3,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.V,o.h)),t["ɵdid"](68,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](69,0,null,0,1,"ion-skeleton-text",[["animated",""],["style","width: 100%; margin-top: 0.5em;"]],null,null,null,o.tb,o.F)),t["ɵdid"](70,49152,null,0,a.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null),(n()(),t["ɵeld"](71,0,null,0,5,"ion-row",[["class","ion-text-center"],["style","margin-top: 7%;"]],null,null,null,o.pb,o.B)),t["ɵdid"](72,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](73,0,null,0,3,"ion-col",[["style","text-align: -webkit-center;"]],null,null,null,o.V,o.h)),t["ɵdid"](74,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](75,0,null,0,1,"ion-skeleton-text",[["animated",""],["style","width: 40%; height: 40%; margin-top: 0.5em;"]],null,null,null,o.tb,o.F)),t["ɵdid"](76,49152,null,0,a.lb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{animated:[0,"animated"]},null)],(function(n,l){n(l,8,0,""),n(l,14,0,""),n(l,20,0,""),n(l,23,0,""),n(l,30,0,""),n(l,34,0,""),n(l,40,0,""),n(l,44,0,"1"),n(l,46,0,"home-outline"),n(l,50,0,""),n(l,54,0,"1"),n(l,56,0,"map-outline"),n(l,60,0,""),n(l,64,0,"1"),n(l,66,0,"car-sport-outline"),n(l,70,0,""),n(l,76,0,"")}),null)}function y(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h3",[["class","dinner-title"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["",""]))],null,(function(n,l){n(l,1,0,l.component.firstDish.name)}))}function v(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h3",[["class","dinner-title"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["",""]))],null,(function(n,l){n(l,1,0,l.component.secondDish.name)}))}function N(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h3",[["class","dinner-title"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["",""]))],null,(function(n,l){n(l,1,0,l.component.thirdDish.name)}))}function I(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["Dalle "," alle "," "]))],null,(function(n,l){var e=l.component;n(l,1,0,e.dinnersService.formatDate(e.firstDish.startTime)[1],e.dinnersService.formatDate(e.firstDish.endTime)[1])}))}function w(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["Dalle "," alle "," "]))],null,(function(n,l){var e=l.component;n(l,1,0,e.dinnersService.formatDate(e.secondDish.startTime)[1],e.dinnersService.formatDate(e.secondDish.endTime)[1])}))}function E(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["Dalle "," alle "," "]))],null,(function(n,l){var e=l.component;n(l,1,0,e.dinnersService.formatDate(e.thirdDish.startTime)[1],e.dinnersService.formatDate(e.thirdDish.endTime)[1])}))}function Z(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"span",[["class","dinner-name"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,[" "," & "," "]))],null,(function(n,l){var e=l.component;n(l,1,0,e.myDinnerDetails.houses.firstHouse.firstName,e.myDinnerDetails.houses.firstHouse.secondName)}))}function P(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"span",[["class","dinner-name"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,[" "," & "," "]))],null,(function(n,l){var e=l.component;n(l,1,0,e.myDinnerDetails.houses.secondHouse.firstName,e.myDinnerDetails.houses.secondHouse.secondName)}))}function x(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"span",[["class","dinner-name"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,[" "," & "," "]))],null,(function(n,l){var e=l.component;n(l,1,0,e.myDinnerDetails.houses.thirdHouse.firstName,e.myDinnerDetails.houses.thirdHouse.secondName)}))}function V(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,9,"ion-col",[["class","ion-text-center"]],null,null,null,o.V,o.h)),t["ɵdid"](1,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](2,0,null,0,1,"p",[["class","dinner-name"]],null,null,null,null,null)),(n()(),t["ɵted"](-1,null,["A casa di "])),(n()(),t["ɵand"](16777216,null,0,1,null,Z)),t["ɵdid"](5,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,P)),t["ɵdid"](7,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,x)),t["ɵdid"](9,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,5,0,1===e.phase),n(l,7,0,2===e.phase),n(l,9,0,3===e.phase)}),null)}function k(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(n,l){n(l,0,0,l.component.myDinnerDetails.houses.firstHouse.firstImage)}))}function z(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(n,l){n(l,0,0,l.component.myDinnerDetails.houses.secondHouse.firstImage)}))}function T(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(n,l){n(l,0,0,l.component.myDinnerDetails.houses.thirdHouse.firstImage)}))}function L(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,7,"ion-avatar",[["class","avatar-left"]],null,null,null,o.P,o.b)),t["ɵdid"](1,49152,null,0,a.e,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,k)),t["ɵdid"](3,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,z)),t["ɵdid"](5,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,T)),t["ɵdid"](7,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,3,0,1===e.phase),n(l,5,0,2===e.phase),n(l,7,0,3===e.phase)}),null)}function S(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(n,l){n(l,0,0,l.component.myDinnerDetails.houses.firstHouse.secondImage)}))}function B(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(n,l){n(l,0,0,l.component.myDinnerDetails.houses.secondHouse.secondImage)}))}function M(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(n,l){n(l,0,0,l.component.myDinnerDetails.houses.thirdHouse.secondImage)}))}function H(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,7,"ion-avatar",[["class","avatar-right"]],null,null,null,o.P,o.b)),t["ɵdid"](1,49152,null,0,a.e,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,S)),t["ɵdid"](3,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,B)),t["ɵdid"](5,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,M)),t["ɵdid"](7,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,3,0,1===e.phase),n(l,5,0,2===e.phase),n(l,7,0,3===e.phase)}),null)}function F(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["",""]))],null,(function(n,l){n(l,1,0,l.component.myDinnerDetails.houses.firstHouse.groupAddress)}))}function O(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["",""]))],null,(function(n,l){n(l,1,0,l.component.myDinnerDetails.houses.secondHouse.groupAddress)}))}function _(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](1,null,["",""]))],null,(function(n,l){n(l,1,0,l.component.myDinnerDetails.houses.thirdHouse.groupAddress)}))}function A(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,2,"ion-button",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.startNavigation()&&t),t}),o.R,o.d)),t["ɵdid"](1,49152,null,0,a.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵted"](-1,0,[" Inizia Navigazione "]))],null,null)}function U(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,79,"div",[],null,null,null,null,null)),(n()(),t["ɵeld"](1,0,null,null,78,"ion-grid",[],null,null,null,o.Z,o.l)),t["ɵdid"](2,49152,null,0,a.z,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](3,0,null,0,9,"ion-row",[],null,null,null,o.pb,o.B)),t["ɵdid"](4,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](5,0,null,0,7,"ion-col",[],null,null,null,o.V,o.h)),t["ɵdid"](6,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,y)),t["ɵdid"](8,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,v)),t["ɵdid"](10,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,N)),t["ɵdid"](12,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](13,0,null,0,9,"ion-row",[["style","margin-top: 5%;"]],null,null,null,o.pb,o.B)),t["ɵdid"](14,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](15,0,null,0,7,"ion-col",[["class","ion-text-center"],["style","display: contents;"]],null,null,null,o.V,o.h)),t["ɵdid"](16,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,I)),t["ɵdid"](18,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,w)),t["ɵdid"](20,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,E)),t["ɵdid"](22,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](23,0,null,0,10,"ion-row",[["style","margin-top: 3%;"]],null,null,null,o.pb,o.B)),t["ɵdid"](24,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,V)),t["ɵdid"](26,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](27,0,null,0,6,"ion-col",[["class","ion-text-center"]],null,null,null,o.V,o.h)),t["ɵdid"](28,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](29,0,null,0,4,"div",[["style","display: -webkit-box;"]],null,null,null,null,null)),(n()(),t["ɵand"](16777216,null,null,1,null,L)),t["ɵdid"](31,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,null,1,null,H)),t["ɵdid"](33,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](34,0,null,0,5,"ion-row",[["class","ion-text-center"],["style","margin-top: 3%;"]],null,null,null,o.pb,o.B)),t["ɵdid"](35,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](36,0,null,0,3,"ion-col",[],null,null,null,o.V,o.h)),t["ɵdid"](37,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](38,0,null,0,1,"h3",[["style","margin: 0%;"]],null,null,null,null,null)),(n()(),t["ɵted"](-1,null,["Indicazioni"])),(n()(),t["ɵeld"](40,0,null,0,13,"ion-row",[["class","ion-text-center"],["style","margin-top: 3%;"]],null,null,null,o.pb,o.B)),t["ɵdid"](41,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](42,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.V,o.h)),t["ɵdid"](43,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](44,0,null,0,1,"ion-icon",[["name","home-outline"]],null,null,null,o.bb,o.n)),t["ɵdid"](45,49152,null,0,a.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](46,0,null,0,7,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.V,o.h)),t["ɵdid"](47,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,F)),t["ɵdid"](49,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,O)),t["ɵdid"](51,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,_)),t["ɵdid"](53,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵeld"](54,0,null,0,9,"ion-row",[["class","ion-text-center"],["style","margin-top: 3%;"]],null,null,null,o.pb,o.B)),t["ɵdid"](55,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](56,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.V,o.h)),t["ɵdid"](57,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](58,0,null,0,1,"ion-icon",[["name","map-outline"]],null,null,null,o.bb,o.n)),t["ɵdid"](59,49152,null,0,a.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](60,0,null,0,3,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.V,o.h)),t["ɵdid"](61,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](62,0,null,0,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](63,null,["",""])),(n()(),t["ɵeld"](64,0,null,0,9,"ion-row",[["class","ion-text-center"],["style","margin-top: 3%;"]],null,null,null,o.pb,o.B)),t["ɵdid"](65,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](66,0,null,0,3,"ion-col",[["class","ion-align-items-center"],["size","1"]],null,null,null,o.V,o.h)),t["ɵdid"](67,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](68,0,null,0,1,"ion-icon",[["name","car-sport-outline"]],null,null,null,o.bb,o.n)),t["ɵdid"](69,49152,null,0,a.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null),(n()(),t["ɵeld"](70,0,null,0,3,"ion-col",[["class","ion-text-start"],["style","padding-left: 2%;"]],null,null,null,o.V,o.h)),t["ɵdid"](71,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](72,0,null,0,1,"h6",[["class","dinner-info"]],null,null,null,null,null)),(n()(),t["ɵted"](73,null,["",""])),(n()(),t["ɵeld"](74,0,null,0,5,"ion-row",[["class","ion-text-center"],["style","margin-top: 7%;"]],null,null,null,o.pb,o.B)),t["ɵdid"](75,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](76,0,null,0,3,"ion-col",[["class","ion-align-items-center"]],null,null,null,o.V,o.h)),t["ɵdid"](77,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,A)),t["ɵdid"](79,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,8,0,1===e.phase),n(l,10,0,2===e.phase),n(l,12,0,3===e.phase),n(l,18,0,1===e.phase),n(l,20,0,2===e.phase),n(l,22,0,3===e.phase),n(l,26,0,e.myDinnerDetails.houses),n(l,31,0,e.myDinnerDetails.houses),n(l,33,0,e.myDinnerDetails.houses),n(l,43,0,"1"),n(l,45,0,"home-outline"),n(l,49,0,1===e.phase),n(l,51,0,2===e.phase),n(l,53,0,3===e.phase),n(l,57,0,"1"),n(l,59,0,"map-outline"),n(l,67,0,"1"),n(l,69,0,"car-sport-outline"),n(l,79,0,1===e.phase&&e.paramsService.getParams().groupId!=e.myDinnerDetails.houses.firstHouse.groupid||2===e.phase||3===e.phase)}),(function(n,l){var e=l.component;n(l,63,0,e.distanceFromUser),n(l,73,0,e.travelTime)}))}function j(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,24,"ion-header",[["class","ion-no-border"]],null,null,null,o.ab,o.m)),t["ɵdid"](1,49152,null,0,a.A,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](2,0,null,0,22,"ion-toolbar",[],null,null,null,o.Bb,o.N)),t["ɵdid"](3,49152,null,0,a.yb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](4,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,o.S,o.e)),t["ɵdid"](5,49152,null,0,a.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](6,0,null,0,2,"ion-back-button",[["defaultHref","/home/tabs/my-dinners"]],null,[[null,"click"]],(function(n,l,e){var u=!0;return"click"===l&&(u=!1!==t["ɵnov"](n,8).onClick(e)&&u),u}),o.Q,o.c)),t["ɵdid"](7,49152,null,0,a.f,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{defaultHref:[0,"defaultHref"]},null),t["ɵdid"](8,16384,null,0,a.g,[[2,a.eb],a.Eb],{defaultHref:[0,"defaultHref"]},null),(n()(),t["ɵeld"](9,0,null,0,15,"ion-buttons",[["slot","end"]],null,null,null,o.S,o.e)),t["ɵdid"](10,49152,null,0,a.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](11,0,null,0,3,"ion-button",[["shape","round"],["size","large"],["slot","icon-only"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.getDinnerPhasesData()&&t),t}),o.R,o.d)),t["ɵdid"](12,49152,null,0,a.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{shape:[0,"shape"],size:[1,"size"]},null),(n()(),t["ɵeld"](13,0,null,0,1,"ion-icon",[["name","refresh-circle-outline"],["size","large"]],null,null,null,o.bb,o.n)),t["ɵdid"](14,49152,null,0,a.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"],size:[1,"size"]},null),(n()(),t["ɵeld"](15,0,null,0,5,"ion-button",[["routerLink","/home/chat"],["shape","round"],["size","large"],["slot","icon-only"]],null,[[null,"click"]],(function(n,l,e){var u=!0;return"click"===l&&(u=!1!==t["ɵnov"](n,17).onClick()&&u),"click"===l&&(u=!1!==t["ɵnov"](n,18).onClick(e)&&u),u}),o.R,o.d)),t["ɵdid"](16,49152,null,0,a.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{shape:[0,"shape"],size:[1,"size"]},null),t["ɵdid"](17,16384,null,0,r.o,[r.n,r.a,[8,null],t.Renderer2,t.ElementRef],{routerLink:[0,"routerLink"]},null),t["ɵdid"](18,737280,null,0,a.Hb,[s.LocationStrategy,a.Eb,t.ElementRef,r.n,[2,r.o]],null,null),(n()(),t["ɵeld"](19,0,null,0,1,"ion-icon",[["name","chatbubble-ellipses-outline"],["size","large"]],null,null,null,o.bb,o.n)),t["ɵdid"](20,49152,null,0,a.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"],size:[1,"size"]},null),(n()(),t["ɵeld"](21,0,null,0,3,"ion-button",[["shape","round"],["size","large"],["slot","icon-only"]],null,[[null,"click"]],(function(n,l,e){var t=!0,u=n.component;return"click"===l&&(t=!1!==u.dinnersService.presentDinnerInfoPopover(e,u.dinner.time)&&t),t}),o.R,o.d)),t["ɵdid"](22,49152,null,0,a.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{shape:[0,"shape"],size:[1,"size"]},null),(n()(),t["ɵeld"](23,0,null,0,1,"ion-icon",[["name","help-circle-outline"],["size","large"]],null,null,null,o.bb,o.n)),t["ɵdid"](24,49152,null,0,a.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"],size:[1,"size"]},null),(n()(),t["ɵeld"](25,0,null,null,7,"ion-content",[["fullscreen","true"],["scrollY","false"],["slot","fixed"]],null,null,null,o.W,o.i)),t["ɵdid"](26,49152,null,0,a.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{fullscreen:[0,"fullscreen"],scrollY:[1,"scrollY"]},null),(n()(),t["ɵeld"](27,0,null,0,0,"div",[["class","background-map"],["id","map"]],null,null,null,null,null)),(n()(),t["ɵeld"](28,0,null,0,4,"div",[["class","bottomPanel"],["id","cupertinoPhases"]],null,null,null,null,null)),(n()(),t["ɵand"](16777216,null,null,1,null,C)),t["ɵdid"](30,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,null,1,null,U)),t["ɵdid"](32,16384,null,0,s.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,7,0,"/home/tabs/my-dinners"),n(l,8,0,"/home/tabs/my-dinners"),n(l,12,0,"round","large"),n(l,14,0,"refresh-circle-outline","large"),n(l,16,0,"round","large"),n(l,17,0,"/home/chat"),n(l,18,0),n(l,20,0,"chatbubble-ellipses-outline","large"),n(l,22,0,"round","large"),n(l,24,0,"help-circle-outline","large"),n(l,26,0,"true","false"),n(l,30,0,e.syncInProgress&&e.bottomPanel),n(l,32,0,!e.syncInProgress&&e.bottomPanel)}),null)}function G(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"app-dinner-phases",[],null,null,null,j,b)),t["ɵdid"](1,245760,null,0,D,[r.a,a.Gb,c.a,g.a,p.a,f.a,m.a,R.a],null,null)],(function(n,l){n(l,1,0)}),null)}var Y=t["ɵccf"]("app-dinner-phases",D,G,{},{},[]),J=e("gIcY"),W=function(){return function(){}}();e.d(l,"DinnerPhasesPageModuleNgFactory",(function(){return q}));var q=t["ɵcmf"](u,[],(function(n){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[i.a,Y]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,s.NgLocalization,s.NgLocaleLocalization,[t.LOCALE_ID,[2,s["ɵangular_packages_common_common_a"]]]),t["ɵmpd"](4608,J.i,J.i,[]),t["ɵmpd"](4608,a.b,a.b,[t.NgZone,t.ApplicationRef]),t["ɵmpd"](4608,a.Db,a.Db,[a.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](4608,a.Gb,a.Gb,[a.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](1073742336,s.CommonModule,s.CommonModule,[]),t["ɵmpd"](1073742336,J.h,J.h,[]),t["ɵmpd"](1073742336,J.a,J.a,[]),t["ɵmpd"](1073742336,a.Ab,a.Ab,[]),t["ɵmpd"](1073742336,r.p,r.p,[[2,r.u],[2,r.n]]),t["ɵmpd"](1073742336,W,W,[]),t["ɵmpd"](1073742336,u,u,[]),t["ɵmpd"](1024,r.l,(function(){return[[{path:"",component:D}]]}),[])])}))}}]);