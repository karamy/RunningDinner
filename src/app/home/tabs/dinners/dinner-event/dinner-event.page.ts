import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dinner, DinnersService, DinnerDetails, MyDinnerDetails } from '../dinners.service';
import { ProfileService } from 'src/app/home/profile/profile.service';
import { RDParamsService } from 'src/app/rdparams.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { DinnerInfoPage } from 'src/app/rdmodals/dinner-info/dinner-info.page';
import { FoodAllergiesInfoPage } from 'src/app/rdmodals/food-allergies-info/food-allergies-info.page';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { NotificationsService } from 'src/app/home/notifications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dinner-event',
  templateUrl: './dinner-event.page.html',
  styleUrls: ['./dinner-event.page.scss'],
})
export class DinnerEventPage implements OnInit, OnDestroy {
  dinner: Dinner;
  state: number;
  dinnerDetails: DinnerDetails = {
    badges: [],
    foodAllergies: [],
    minMaxAges: [],
    avgDistance: -1
  };
  dinnerType: string;
  firstDish: string;
  secondDish: string;
  thirdDish: string;
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
  partnerName: string;
  bounds = new google.maps.LatLngBounds();
  bottomPanel: CupertinoPane;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private dinnersService: DinnersService,
    private profileService: ProfileService,
    public paramsService: RDParamsService,
    private notificationsService: NotificationsService) { }

  async presentPopover(ev: any, dinnerTime) {
    const popover = await this.popoverController.create({
      component: DinnerInfoPage,
      componentProps: { dinnerTime },
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async presentModalFoodAllergies(foodAllergies, categories) {
    const modal = await this.modalController.create({
      component: FoodAllergiesInfoPage,
      backdropDismiss: true,
      componentProps: { foodAllergies, categories },
      cssClass: 'modal-style'
    });
    await modal.present();
  }

  ngOnInit() {
    // Ottengo i dati della cena dai parametri della rotta
    this.route.queryParams.subscribe((dinner: Dinner) => {
      this.dinner = { ...dinner };
      this.getDinnerEventData();
    });

    // Registrazione observable per reagire al ricaricamento cena (es. vengo rimosso da una cena)
    this.subscription = this.notificationsService.getUpdateParamsObservable().subscribe(() => {
      console.log('Dinner Event - Ricarico cena');
      this.getDinnerEventData();
    });
  }

  // Rimuovo la sottoscrizione all'observable quando esco dalla videata
  ngOnDestroy() {
    console.log('OnDestroy');
    this.subscription.unsubscribe();
  }

  getDinnerEventData() {
    this.dinnersService.getDinnerState(this.dinner.id).then(resp => {
      this.state = resp.dinner_state;

      if (this.state === 1) {

        // Istanzio il pannello inferiore se non ancora istanziato
        if (!this.bottomPanel) {
          this.presentBottomPanel();
        }

        this.dinnersService.getDinnerDetails(this.dinner).then(res => {
          this.dinnerDetails = res;

          // Dal dinner_type ottengo nome della tipologia ed i piatti che verranno cucinati nella cena
          this.dinnerType = this.dinnersService.decodeType(Number(this.dinner.type))[0];
          this.firstDish = this.dinnersService.decodeType(Number(this.dinner.type))[1];
          this.secondDish = this.dinnersService.decodeType(Number(this.dinner.type))[2];
          this.thirdDish = this.dinnersService.decodeType(Number(this.dinner.type))[3];

          // Ottengo dati del partner
          this.profileService.readPartner();
          this.partnerName = this.profileService.getPartner().name;

          // Ottengo i dati relativi alla mia cena
          this.dinnersService.getMyDinnerDetails(this.dinner, this.paramsService.getParams().groupId).then(response => {
            this.myDinnerDetails = response;
            this.myDish = this.dinnersService.detMyDish(this.myDinnerDetails.houses, this.firstDish, this.secondDish, this.thirdDish);
            const myDinnerFoodAllergies = this.dinnersService.getMyDinnerFoodAllergies(this.myDinnerDetails.houses, this.dinnerDetails.allFoodAllergies);
            this.myDinnerDetails.foodAllergies = myDinnerFoodAllergies[0];
            this.myDinnerDetails.foodAllergiesCategories = myDinnerFoodAllergies[1];

            // Istanzio la mappa
            this.initMap(this.myDinnerDetails.addressesLatLng, this.dinnerDetails.userLatLng);
          });
        });
      } else {
        this.dinnersService.detDinnerStateRoute(this.dinner, this.state);
      }
    });
  }

  // Istanzia il pannello inferiore
  presentBottomPanel() {
    const panel = document.getElementById('cupertinoEvent');

    // Opzioni pannello
    const panelSettings: CupertinoSettings = {
      initialBreak: 'top',
      breaks: {
        top: { enabled: true, height: window.screen.height * 0.65, bounce: true },
        middle: { enabled: false, height: window.screen.height * 0.25, bounce: true },
        bottom: { enabled: true, height: window.screen.height * 0.15 },
      },
      topperOverflow: false,
      bottomClose: false,
      buttonClose: false,
      showDraggable: false,
      onBackdropTap: () => this.bottomPanel.destroy({ animate: true })
    };

    // Inizializzo il pannello
    this.bottomPanel = new CupertinoPane(panel, panelSettings);

    // Presento il pannello
    this.bottomPanel.present({ animate: true });
  }

  // Inizializza la mappa per mostrare l'utente e gli altri partecipanti alla cena
  initMap(addresses: google.maps.LatLng[], userAddress: google.maps.LatLng[]) {
    const markers: google.maps.Marker[] = [];

    const mapElement = document.getElementById('mapEvent');
    if (mapElement) { // Istanzio la mappa solo se sono sulla pagina, altrimenti da errore
      const map = new google.maps.Map(mapElement, {
        disableDefaultUI: true
      });

      // Creo marker per indirizzo user
      const userMarker = {
        url: 'assets/you-marker.png',
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(50, 50)
      };

      // Creo marker per le cene
      const dinnerMarker = {
        url: 'assets/dinner-marker.png',
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
        const markerAddress = this.dinnersService.checkIfExistingMarker(markers, addresses[i])
        const mapDinnerMarker = new google.maps.Marker({
          position: markerAddress,
          map: map,
          icon: dinnerMarker,
          label: (i + 1).toString()
        });
        markers.push(mapDinnerMarker);
        const dinnerCircle = new google.maps.Circle({
          center: markerAddress,
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

      const bottomPanel = document.getElementById('cupertinoEvent');

      // Posizione relativa alla finestra del pannello inferiore
      const bottomPanelPos = bottomPanel.getBoundingClientRect();

      // Listener che attende che la mappa sia caricata
      const listener = google.maps.event.addListener(map, 'idle', () => {

        // Riduco lo zoom della mappa
        map.setZoom(map.getZoom() - 1);

        const pixelOffset = this.getPixelOffset(map, markers);

        // Eseguo il pan della mappa
        // Spostando in alto la mappa di un valore pari alla differenza tra la posizione del marker (y) e quella del top del pannello
        // + il 50% della distanza tra il top del pannello e il top della pagina
        map.panBy(0, Math.abs((pixelOffset - bottomPanelPos.top) + (bottomPanelPos.top * 0.5)));

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

    // Ottengo la posizione dei marker (y) in pixel calcolata dall'angolo in alto a sinistra
    let pixelOffsetSum = 0;
    for (let i = 0; i < markers.length; i++) {
      const worldCoordinate = map.getProjection().fromLatLngToPoint(markers[i].getPosition());
      const markerOffset = new google.maps.Point(
        Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
        Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
      );
      // Ottengo la somma degli offset (y) dei vari marker
      pixelOffsetSum = pixelOffsetSum + markerOffset.y;
    }
    // Imposto come pixelOffset un punto medio tra i 3
    const pixelOffset = pixelOffsetSum / markers.length;

    return pixelOffset;
  }
}
