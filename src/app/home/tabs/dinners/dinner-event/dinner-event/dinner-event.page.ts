import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dinner, DinnersService, DinnerDetails, MyDinnerDetails } from '../../dinners.service';
import { ProfileService } from 'src/app/home/profile/profile.service';
import { RDParamsService } from 'src/app/rdparams.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { DinnerInfoPage } from 'src/app/rdmodals/dinner-info/dinner-info.page';
import { FoodAllergiesInfoPage } from 'src/app/rdmodals/food-allergies-info/food-allergies-info.page';

@Component({
  selector: 'app-dinner-event',
  templateUrl: './dinner-event.page.html',
  styleUrls: ['./dinner-event.page.scss'],
})
export class DinnerEventPage implements OnInit {
  dinner: Dinner;
  dinnerDetails: DinnerDetails = {
    badges: [],
    foodAllergies: [],
    minMaxAges: [],
    avgDistance: -1
  };
  dinnerType: string;
  myDinnerDetails: MyDinnerDetails = {
    dishes: [],
    myDish: {
      dishId: 0,
      dishName: ''
    },
    dishDistances: [],
    foodAllergies: [],
    foodAllergiesCategories: [],
    addressesLatLng: []
  };
  partnerName: string;

  constructor(private route: ActivatedRoute,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private dinnersService: DinnersService,
    private profileService: ProfileService,
    public paramsService: RDParamsService) { }

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
    this.route.queryParams.subscribe((dinner: Dinner) => {
      this.dinner = dinner;
      console.log(this.dinner)
      this.dinnersService.getDinnerDetails(this.dinner).then(res => {
        this.dinnerDetails = res;
        this.dinnerType = this.dinnersService.decodeType(Number(this.dinner.type));
        this.profileService.readPartner();
        this.partnerName = this.profileService.getPartner().name;
        this.initCountdown(this.dinner.date);
        this.dinnersService.getMyDinnerDetails(this.dinner).then(response => {
          this.myDinnerDetails = response;
          const myDinnerFoodAllergies = this.dinnersService.getMyDinnerFoodAllergies(this.dinnerDetails.foodAllergies);
          this.myDinnerDetails.foodAllergies = myDinnerFoodAllergies[0];
          this.myDinnerDetails.foodAllergiesCategories = myDinnerFoodAllergies[1];
          this.initMap(this.myDinnerDetails.addressesLatLng, this.dinnerDetails.userLatLng);
        });
      });
    });
  }

  // Inizializza la mappa per mostrare l'utente e gli altri partecipanti alla cena
  initMap(addresses: google.maps.LatLng[], userAddress: google.maps.LatLng[]) {
    const bounds = new google.maps.LatLngBounds();
    const markers: google.maps.Marker[] = [];

    // Istanzio la mappa
    const map = new google.maps.Map(document.getElementById('map'), {
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
      bounds.extend(markers[j].getPosition());
    }
    map.fitBounds(bounds, { top: 15, bottom: 0, left: 0, right: 0 });
  }

  initCountdown(dinnerDate: Date) {
    const countDownDate = new Date(dinnerDate).getTime();
    // Aggiorno il countdown ogni secondo
    const interval = setInterval(x => {
      // Ottengo l'ora attuale
      const now = new Date().getTime();
      // Trovo la distanza tra l'ora attuale e l'ora della cena (correggendo il formato a UTC)
      const distance = (countDownDate - now) - 7200000;
      // Calcolo giorni, ore, minuti e secondi che mancano
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
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
        document.getElementById('countdown').innerHTML = leftWord + " " + hours + " " + hoursString + " e " + minutes + " " + minutesString + " alla tua cena!";
      }
    }, 1000);
  }

}
