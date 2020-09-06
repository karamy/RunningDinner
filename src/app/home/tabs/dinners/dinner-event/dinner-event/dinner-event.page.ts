import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dinner, DinnersService, DinnerDetails, MyDinnerDetails } from '../../dinners.service';
import { ProfileService } from 'src/app/home/profile/profile.service';
import { RDParamsService } from 'src/app/rdparams.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { DinnerInfoPage } from 'src/app/rdmodals/dinner-info/dinner-info.page';
import { FoodAllergiesInfoPage } from 'src/app/rdmodals/food-allergies-info/food-allergies-info.page';
import { DinnerMapPage } from 'src/app/rdmodals/dinner-map/dinner-map.page';
import { NotificationsService } from 'src/app/home/notifications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dinner-event',
  templateUrl: './dinner-event.page.html',
  styleUrls: ['./dinner-event.page.scss'],
})
export class DinnerEventPage implements OnInit, OnDestroy {
  dinner: Dinner;
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

  async presentModalMapDetails(addresses, userAddress, bounds) {
    const modal = await this.modalController.create({
      component: DinnerMapPage,
      backdropDismiss: true,
      componentProps: { addresses, userAddress, bounds }
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

      // Avvio il timer
      this.initCountdown(this.dinner.date);

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
  }

  // Inizializza la mappa per mostrare l'utente e gli altri partecipanti alla cena
  initMap(addresses: google.maps.LatLng[], userAddress: google.maps.LatLng[]) {
    const markers: google.maps.Marker[] = [];

    const mapElement = document.getElementById('map');
    if (mapElement) { // Istanzio la mappa solo se sono sulla pagina, altrimenti da errore
      const map = new google.maps.Map(mapElement, {
        disableDefaultUI: true
      });

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
      map.fitBounds(this.bounds, { top: 15, bottom: 0, left: 0, right: 0 });
    }
  }

  initCountdown(dinnerDate: Date) {
    // Aggiorno il countdown ogni secondo
    const interval = setInterval(x => {
      // Ottengo quanto manca alla cena
      const dinnerTimeLeft = this.dinnersService.getDinnerTimeLeft(dinnerDate);
      // Assegno ore e minuti mancanti alle variabili
      const hours = dinnerTimeLeft[1];
      const minutes = dinnerTimeLeft[2];
      // Mostro il risultato in un elemento HTML con id="countdown"
      let hoursString = 'Ore';
      let minutesString = 'Minuti';
      let leftWord = 'Mancano';
      if (hours === 1) {
        hoursString = 'Ora';
        leftWord = 'Manca';
      }
      if (minutes === 1) {
        minutesString = 'Minuto';
      }
      if (document.getElementById('countdown')) {
        if (minutes === 0) {
          document.getElementById('countdown').innerHTML = leftWord + ' ' + hours + ' ' + hoursString + ' alla tua cena!';
        } else {
          document.getElementById('countdown').innerHTML = leftWord + ' ' + hours + ' ' + hoursString + ' e ' + minutes + ' ' + minutesString + ' alla tua cena!';
        }
      }
    }, 1000);
  }
}
