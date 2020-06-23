import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dinner, DinnersService, DinnerDetails } from '../dinners.service';

@Component({
  selector: 'app-dinner-detail',
  templateUrl: './dinner-detail.page.html',
  styleUrls: ['./dinner-detail.page.scss'],
})
export class DinnerDetailPage implements OnInit {
  dinner: Dinner;
  dinnerDetails: DinnerDetails = {
    badges: [],
    foodAllergies: [],
    minMaxAges: [],
    avgDistance: -1
  };
  dinnerType: string;

  constructor(private route: ActivatedRoute,
    private dinnersService: DinnersService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((dinner: Dinner) => {
      this.dinner = dinner;
      console.log(dinner);
      this.dinnersService.getDinnerDetails(this.dinner).then(res => {
        this.dinnerDetails = res;
        this.dinnerType = this.dinnersService.decodeType(Number(this.dinner.type));
        this.initMap(this.dinnerDetails.addressesLatLng, this.dinnerDetails.userLatLng);
      });
    });
  }

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
    map.fitBounds(bounds);
  }

}
