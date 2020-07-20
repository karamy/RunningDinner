import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dinner-map',
  templateUrl: './dinner-map.page.html',
  styleUrls: ['./dinner-map.page.scss'],
})
export class DinnerMapPage implements OnInit {

  @Input() addresses;
  @Input() userAddress;
  @Input() bounds;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.initMap(this.addresses, this.userAddress).then(res => {
      // Imposto zoom per fittare i marker inseriti
      res.fitBounds(this.bounds);
    });
  }

  onModalDismiss() {
    this.modalCtrl.dismiss();
  }

  // Inizializza la mappa per mostrare l'utente e gli altri partecipanti alla cena
  initMap(addresses: google.maps.LatLng[], userAddress: google.maps.LatLng[]): Promise<google.maps.Map> {
    return new Promise((res) => {
      const markers: google.maps.Marker[] = [];

      // Istanzio la mappa
      const map = new google.maps.Map(document.getElementById('mapfullscreen'), {
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

      // Attendo che la mappa sia caricata
      google.maps.event.addListener(map, 'idle', () => {
        res(map);
      });
    });
  }
}
