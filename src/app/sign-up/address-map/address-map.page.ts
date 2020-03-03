/// <reference types="@types/googlemaps" />
import { Component, OnInit, NgZone, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-address-map',
  templateUrl: './address-map.page.html',
  styleUrls: ['./address-map.page.scss'],
})
export class AddressMapPage implements OnInit, AfterViewInit {
  @ViewChild('map', {static: false}) mapElementRef: ElementRef;

  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  isItem: boolean;
  placeId: string;
  map: any;
  service: google.maps.places.PlacesService;
  mapPreview: any = null;


  constructor(private authService: AuthService, private router: Router, private render: Renderer2, public zone: NgZone) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
   }

  ngOnInit() {
  }

  onLogin() {
    this.authService.login();
    this.router.navigateByUrl('/home/tabs/rooms');
  }

  /*  Get Map from Google Maps */

  ngAfterViewInit(){
    this.getGoogleMaps().then(googleMaps => {
      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: { lat: 44.5464311, lng: 7.7184579},
        zoom: 16
      });
      googleMaps.event.addListenerOnce(map, 'idle', () => {
        this.render.addClass(mapEl, 'visible');
      });
    }).catch(err => {
      console.log(err);
    });
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps){
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsAPIKey}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps){
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available');
        }
      }
    })
  }


  /* Autocomplete Address */

  updateSearchResults(){
    if (this.autocomplete.input == '' || this.isItem ) {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        if (predictions){
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      }
      });
    });
  }

  selectSearchResult(item) {
    console.log(item)
    this.isItem = true;
    this.autocomplete.input = item.description
    this.getMapImage(item.description)
  }

    /* Get a static Map image */

  public getMapImage(place) {
    if (place) {
      this.mapPreview = `https://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=roadmap
    &markers=color:red%7Clabel:Place%7C${place}
    &key=${environment.googleMapsAPIKey}`;
    } else {

    }
  }

}
