import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dinner, DinnersService, DinnerDetails, MyDinnerDetails, DinnerDish } from '../dinners.service';
import { ProfileService } from 'src/app/home/profile/profile.service';
import { RDParamsService } from 'src/app/rdparams.service';
import { PopoverController } from '@ionic/angular';
import { DinnerInfoPage } from 'src/app/rdmodals/dinner-info/dinner-info.page';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { NotificationsService } from 'src/app/home/notifications.service';
import { Subscription } from 'rxjs';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dinner-phases',
  templateUrl: './dinner-phases.page.html',
  styleUrls: ['./dinner-phases.page.scss'],
})
export class DinnerPhasesPage implements OnInit {
  dinner: Dinner;
  dinnerDetails: DinnerDetails = {
    badges: [],
    foodAllergies: [],
    minMaxAges: [],
    avgDistance: -1
  };
  dinnerType: string;
  firstDish: DinnerDish = { name: null, startTime: null, endTime: null };
  secondDish: DinnerDish = { name: null, startTime: null, endTime: null };
  thirdDish: DinnerDish = { name: null, startTime: null, endTime: null };
  myDish: string;
  myDinnerDetails: MyDinnerDetails = {
    houses: {
      firstHouse: { groupid: null, firstUserId: null, firstName: "", secondUserId: null, secondName: "", firstImage: "", secondImage: "", groupAddress: "" },
      secondHouse: { groupid: null, firstUserId: null, firstName: "", secondUserId: null, secondName: "", firstImage: "", secondImage: "", groupAddress: "" },
      thirdHouse: { groupid: null, firstUserId: null, firstName: "", secondUserId: null, secondName: "", firstImage: "", secondImage: "", groupAddress: "" }
    },
    houseDistances: [],
    foodAllergies: [],
    foodAllergiesCategories: [],
    addressesLatLng: []
  };
  phase: number;
  distanceFromUser: string;
  travelTime: string;
  directionsRenderer = new google.maps.DirectionsRenderer();
  partnerName: string;
  dinnerPhase: number;
  phaseVariables: any[];
  bounds = new google.maps.LatLngBounds();

  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
    private popoverController: PopoverController,
    public dinnersService: DinnersService,
    private profileService: ProfileService,
    private notificationsService: NotificationsService,
    private router: Router,
    public paramsService: RDParamsService,
    private launchNavigator: LaunchNavigator) { }

  async presentPopover(ev: any, dinnerTime) {
    const popover = await this.popoverController.create({
      component: DinnerInfoPage,
      componentProps: { dinnerTime },
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  ngOnInit() {
    // Ottengo i dati della cena dai parametri della rotta
    this.route.queryParams.subscribe((dinner: Dinner) => {
      this.dinner = { ...dinner };
      this.getDinnerPhasesData();
    });

    // Registrazione observable per reagire al ricaricamento cena (es. vengo rimosso da una cena)
    this.subscription = this.notificationsService.getUpdateParamsObservable().subscribe(() => {
      console.log('Dinner Phases - Ricarico cena');
      this.getDinnerPhasesData();
    });
  }

  // Rimuovo la sottoscrizione all'observable quando esco dalla videata
  ngOnDestroy() {
    console.log('OnDestroy');
    this.subscription.unsubscribe();
  }

  getDinnerPhasesData() {
    // Istanzio il pannello inferiore
    this.presentBottomPanel();

    this.dinnersService.getDinnerDetails(this.dinner).then(res => {
      this.dinnerDetails = res;

      // Dal dinner_type ottengo nome della tipologia ed i piatti che verranno cucinati nella cena
      this.dinnerType = this.dinnersService.decodeType(Number(this.dinner.type))[0];
      const dishesArray = this.dinnersService.setDinnerDishes(this.dinner);
      this.firstDish = dishesArray[0];
      this.secondDish = dishesArray[1];
      this.thirdDish = dishesArray[2];

      // Determino in che fase sono
      this.phase = this.dinnersService.setPhase(this.firstDish, this.secondDish, this.thirdDish);
      console.log('Phase Number: ' + this.phase);

      // Ottengo i dati relativi alla mia cena
      this.dinnersService.getMyDinnerDetails(this.dinner, this.paramsService.getParams().groupId).then(response => {
        this.myDinnerDetails = response;

        // Imposto le variabili a seconda della fase
        if (this.phase === 1) {
          if (this.paramsService.getParams().groupId === this.myDinnerDetails.houses.firstHouse.groupid) {
            this.distanceFromUser = 'Sei a casa tua! Preparati ad accogliere gli ospiti';
            this.travelTime = 'Beh direi che non devi spostarti xD';
            this.initMap([], this.dinnerDetails.userLatLng);
          } else {
            this.dinnersService.setVariables(this.profileService.getPartner().group_address, this.myDinnerDetails.houses.firstHouse.groupAddress).then(res => {
              this.phaseVariables = res as [];
              this.distanceFromUser = this.phaseVariables[0];
              this.travelTime = this.phaseVariables[1];
              this.directionsRenderer = this.phaseVariables[2];
              this.initMap([this.myDinnerDetails.addressesLatLng[0]], this.dinnerDetails.userLatLng, this.directionsRenderer);
            });
          }
          this.initCountdown(this.firstDish.endTime, this.dinner.date);
        } else if (this.phase === 2) {
          this.dinnersService.setVariables(this.myDinnerDetails.houses.firstHouse.groupAddress, this.myDinnerDetails.houses.secondHouse.groupAddress).then(res => {
            this.phaseVariables = res as [];
            this.distanceFromUser = this.phaseVariables[0];
            this.travelTime = this.phaseVariables[1];
            this.directionsRenderer = this.phaseVariables[2];
            if (this.paramsService.getParams().groupId === this.myDinnerDetails.houses.firstHouse.groupid) {
              this.initMap([this.myDinnerDetails.addressesLatLng[0]], this.dinnerDetails.userLatLng, this.directionsRenderer);
            } else if (this.paramsService.getParams().groupId === this.myDinnerDetails.houses.secondHouse.groupid) {
              this.initMap(this.dinnerDetails.userLatLng, [this.myDinnerDetails.addressesLatLng[0]], this.directionsRenderer);
            } else {
              this.initMap([this.myDinnerDetails.addressesLatLng[1]], [this.myDinnerDetails.addressesLatLng[0]], this.directionsRenderer);
            }
          });
          this.initCountdown(this.secondDish.endTime);
        } else if (this.phase === 3) {
          this.dinnersService.setVariables(this.myDinnerDetails.houses.secondHouse.groupAddress, this.myDinnerDetails.houses.thirdHouse.groupAddress).then(res => {
            this.phaseVariables = res as [];
            this.distanceFromUser = this.phaseVariables[0];
            this.travelTime = this.phaseVariables[1];
            this.directionsRenderer = this.phaseVariables[2];
            if (this.paramsService.getParams().groupId === this.myDinnerDetails.houses.thirdHouse.groupid) {
              this.initMap(this.dinnerDetails.userLatLng, [this.myDinnerDetails.addressesLatLng[1]], this.directionsRenderer);
            } else if (this.paramsService.getParams().groupId === this.myDinnerDetails.houses.secondHouse.groupid) {
              this.initMap([this.myDinnerDetails.addressesLatLng[1]], this.dinnerDetails.userLatLng, this.directionsRenderer);
            } else {
              this.initMap([this.myDinnerDetails.addressesLatLng[1]], [this.myDinnerDetails.addressesLatLng[0]], this.directionsRenderer);
            }
          });
          this.initCountdown(this.thirdDish.endTime);
        } else if (this.phase === 4) {
          this.router.navigate(['/home/tabs/dinners/dinner-votes'], { queryParams: this.dinner });
        }
      });
    });
  }

  // Istanzia il pannello inferiore
  presentBottomPanel() {
    const element = document.getElementById('cupertino');

    // Opzioni pannello
    const panelSettings: CupertinoSettings = {
      initialBreak: 'top',
      breaks: {
        top: { enabled: true, height: window.screen.height * 0.5, bounce: true },
        middle: { enabled: false, height: window.screen.height * 0.25, bounce: true },
        bottom: { enabled: true, height: window.screen.height * 0.15 },
      },
      topperOverflow: false,
      bottomClose: false,
      buttonClose: false,
      showDraggable: false,
      onBackdropTap: () => panel.destroy({ animate: true })
    };

    // Inizializzo il pannello
    const panel = new CupertinoPane(element, panelSettings);

    // Presento il pannello
    panel.present({ animate: true });
  }

  // Inizializza la mappa per mostrare l'utente e gli altri partecipanti alla cena
  initMap(addresses: google.maps.LatLng[], userAddress: google.maps.LatLng[], directionsRenderer?: google.maps.DirectionsRenderer) {
    const markers: google.maps.Marker[] = [];
    const mapElement = document.getElementById('map');

    if (mapElement) { // Istanzio la mappa solo se sono sulla pagina, altrimenti da errore
      const map = new google.maps.Map(mapElement, {
        disableDefaultUI: true
      });

      if (directionsRenderer) {
        directionsRenderer.setMap(map); // Disegna il percorso sulla mappa
        directionsRenderer.setOptions({ suppressMarkers: true }); // Elimina i marker di default (A e B)
      }

      // Creo marker per indirizzo user
      const userMarker = {
        url: '../../../../../assets/you-marker.png',
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(50, 50)
      };

      // Creo marker per le cene
      const dinnerMarker = {
        url: '../../../../../assets/dinner-marker.png',
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(50, 50)
      };

      // Imposto la posizione sulla mappa per lo user
      const mapUserMarker = new google.maps.Marker({
        position: userAddress[0],
        map: map,
        icon: userMarker
      });
      markers.push(mapUserMarker);
      const userCircle = new google.maps.Circle({
        center: userAddress[0],
        radius: 100,
        fillColor: '#0000FF',
        fillOpacity: 0.1,
        map: map,
        strokeColor: '#FFFFFF',
        strokeOpacity: 0.1,
        strokeWeight: 2
      });

      // Imposto la posizione sulla mappa per le cene
      for (let i = 0; i < addresses.length; i++) {
        const mapDinnerMarker = new google.maps.Marker({
          position: addresses[i],
          map: map,
          icon: dinnerMarker
        });
        markers.push(mapDinnerMarker);
        const dinnerCircle = new google.maps.Circle({
          center: addresses[i],
          radius: 100,
          fillColor: '#0000FF',
          fillOpacity: 0.1,
          map: map,
          strokeColor: '#FFFFFF',
          strokeOpacity: 0.1,
          strokeWeight: 2
        });
      }

      for (var j = 0; j < markers.length; j++) {
        this.bounds.extend(markers[j].getPosition());
      }
      map.fitBounds(this.bounds, { top: 0, bottom: 0, left: 0, right: 0 });

      const bottomPanel = document.getElementById('cupertino');

      // Posizione relativa alla finestra del pannello inferiore
      const bottomPanelPos = bottomPanel.getBoundingClientRect();

      // Listener che attende che la mappa sia caricata
      const listener = google.maps.event.addListener(map, 'idle', () => {
        const pixelOffset = this.getPixelOffset(map, markers);

        // Eseguo il pan della mappa 
        // Spostando in alto la mappa di un valore pari alla differenza tra la posizione del marker (y) e quella del top del pannello 
        // + il 25% della distanza tra il top del pannello e il top della pagina
        map.panBy(0, Math.abs((pixelOffset - bottomPanelPos.top) + (bottomPanelPos.top * 0.25)));
        google.maps.event.removeListener(listener);
      });
    }
  }

  getPixelOffset(map: google.maps.Map, markers: google.maps.Marker[]) {
    // Ottengo le coordinate della mappa nella scala attuale
    const scale = Math.pow(2, map.getZoom());
    const nw = new google.maps.LatLng(
      map.getBounds().getNorthEast().lat(),
      map.getBounds().getSouthWest().lng()
    );
    const worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);

    // Ottengo la posizione dei marker (y) in pixel calcolata dall'angolo in alto a sinistra e tengo quello più in basso
    let pixelOffset = 0;
    for (let i = 0; i < markers.length; i++) {
      const worldCoordinate = map.getProjection().fromLatLngToPoint(markers[i].getPosition());
      const markerOffset = new google.maps.Point(
        Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
        Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
      );
      if (pixelOffset < markerOffset.y) {
        pixelOffset = markerOffset.y;
      }
    }
    return pixelOffset;
  }

  // Avvio il plugin per aprire l'app per la navigazione (funziona solo in ambiente nativo)
  startNavigation() {
    let startAddress: string;
    let endAddress: string;

    if (this.phase === 1) {
      startAddress = this.profileService.getPartner().group_address;
      endAddress = this.myDinnerDetails.houses.firstHouse.groupAddress;
    } else if (this.phase === 2) {
      startAddress = this.myDinnerDetails.houses.firstHouse.groupAddress;
      endAddress = this.myDinnerDetails.houses.secondHouse.groupAddress;
    } else if (this.phase === 3) {
      startAddress = this.myDinnerDetails.houses.secondHouse.groupAddress;
      endAddress = this.myDinnerDetails.houses.thirdHouse.groupAddress;
    }

    // Imposto le opzioni del plugin
    const options: LaunchNavigatorOptions = {
      start: startAddress,
      appSelection: {
        dialogHeaderText: "Seleziona un'app per la navigazione",
        cancelButtonText: 'Annulla',
        rememberChoice: {
          prompt: {
            headerText: 'Ricordare la scelta?',
            bodyText: 'Vuoi usare la stessa app anche le prossime volte?',
            yesButtonText: 'Si',
            noButtonText: 'No'
          }
        }
      }
    };

    // Avvio il plugin con le opzioni impostate
    this.launchNavigator.navigate(endAddress, options);
  }

  initCountdown(phaseDate: Date, dinnerDate?: Date) {
    let countDownDate: number;
    let distanceDinnerNow: number;

    if (dinnerDate) {
      distanceDinnerNow = (new Date(dinnerDate).getTime() - new Date().getTime()) - 7200000;
      if (distanceDinnerNow > 0) {
        countDownDate = new Date(dinnerDate).getTime();
      } else {
        countDownDate = new Date(phaseDate).getTime();
      }
    } else {
      countDownDate = new Date(phaseDate).getTime();
    }

    // Aggiorno il countdown ogni secondo
    const interval = setInterval(x => {
      // Ottengo l'ora attuale
      const now = new Date().getTime();
      // Trovo la distanza tra l'ora attuale e l'ora della cena (correggendo il formato a UTC)
      const distance = (countDownDate - now) - 7200000;
      // Calcolo giorni, ore, minuti e secondi che mancano
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      // Mostro il risultato in un elemento HTML con id="countdown"
      let hoursString: string;
      let minutesString: string;
      let leftWord: string;

      if (dinnerDate) {
        hoursString = 'Ora';
        minutesString = 'Minuti';
        leftWord = 'Mancano';
        if (minutes === 1) {
          leftWord = 'Manca';
          minutesString = 'Minuto';
        }
      } else {
        minutesString = 'Minuti';
        leftWord = 'Mancano';
        if (minutes === 1) {
          leftWord = 'Manca';
          minutesString = 'Minuto';
        }
      }
      if (document.getElementById('countdown')) {
        if (dinnerDate && distanceDinnerNow > 0) {
          document.getElementById('countdown').innerHTML = leftWord + ' ' + minutes + ' ' + minutesString + ' alla tua cena!';
        } else {
          document.getElementById('countdown').innerHTML = leftWord + ' ' + minutes + ' ' + minutesString + ' alla fine della tappa!';
        }
      }
    }, 1000);
  }
}
