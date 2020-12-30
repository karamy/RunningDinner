import { AfterViewInit, Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { SignupService } from '../signup-service.service';
import { RDSpinnerService } from 'src/app/rdspinner.service';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { PhotoService } from 'src/app/photo.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit, AfterViewInit {

  @ViewChild('slider', { static: false }) Slider: IonSlides;
  @ViewChild('map', { static: false }) mapElementRef: ElementRef;

  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  isItem: boolean;
  placeId: string;
  map: any;
  service: google.maps.places.PlacesService;
  mapPreview: any = null;
  progressvalue = 0.25;

  username: string;
  birthdate: Date;
  photoData: string;
  index = 0;

  constructor(public photoService: PhotoService, private signupService: SignupService, private router: Router, private render: Renderer2,
    private zone: NgZone, private authService: AuthService, private spinner: RDSpinnerService) {
    defineCustomElements(window);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  ngAfterViewInit() {
    //Get Map from Google Maps
    this.getGoogleMaps().then(googleMaps => {
      if (this.mapElementRef) {
        const mapEl = this.mapElementRef.nativeElement;
        const map = new googleMaps.Map(mapEl, {
          center: { lat: 44.5464311, lng: 7.7184579 },
          zoom: 16
        });
        googleMaps.event.addListenerOnce(map, 'idle', () => {
          this.render.addClass(mapEl, 'visible');
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  // All'avvio carico l'immagine eventualmente salvata in localStorage
  ngOnInit() {
    this.username = null;
    this.loadPicture();
  }

  activeIndex() {
    this.Slider.getActiveIndex()
      .then(activeIndex => {
        console.log('active index = ', activeIndex);
        this.index = activeIndex;
        this.progressvalue = 0.25 + (activeIndex * 0.25);
      });
  }

  // Ottengo foto da camera o galleria
  async getPicture() {
    const data = await this.photoService.getPicture();
    if (data) {
      this.loadPicture();
    }
  }

  private loadPicture() {
    const data = this.photoService.profilePhotoData;
    if (data) {
      this.photoData = 'data:image/png;base64,' + data;
    }
  }

  goToProfilePhoto() {
    this.signupService.setProfilePhoto(this.photoService.profilePhotoData);
    this.router.navigateByUrl('/sign-up/address-map');
  }

  // Effettua la registrazione utente, e in caso positivo entra nella home
  onSignup() {
    // Inserisco tutte le informazioni delle slide nel signupservice
    this.signupService.setName(this.username);
    this.signupService.setBirthDate(this.birthdate);
    this.signupService.setProfilePhoto(this.photoService.profilePhotoData);

    // Dichiaro la funzione qui perchè altrimenti VS Code non la riconosceva all'interno dello scope
    // Esegue la registrazione e il successivo login
    const signUpAndLogin = (lat: number, lon: number) => {
      this.signupService.setAddressAndCoordinates(this.autocomplete.input, lat, lon);

      this.spinner.create("Effettuo login..."); // Creo lo spinner ma non lo rimuovo tanto ci pensa l'authService dopo il login a farlo
      this.signupService.signupUser().then(
        () => {
          this.authService.doLogin(this.signupService.getSignupData().phoneNumber);
        },
        (err) => {
          alert('Errore registrazione');
          this.spinner.dismiss();
          this.authService.doLogout();
          console.warn(err);
        }
      );
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': this.autocomplete.input }, function (results, status) {
      if (status === 'OK') {
        signUpAndLogin(results[0].geometry.location.lat(), results[0].geometry.location.lng());
      } else {
        console.log('Impossibile eseguire geocoder per la seguente ragione: ' + status);
      }
    });
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
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
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available');
        }
      };
    });
  }

  // Autocomplete Address
  updateSearchResults() {
    if (this.autocomplete.input === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          if (predictions) {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          }
        });
      });
  }

  selectSearchResult(item) {
    this.autocompleteItems = [];
    this.autocomplete.input = item.description;
    this.getMapImage(item.description);
  }

  // Get a static Map image
  public getMapImage(place) {
    if (place) {
      this.mapPreview = `https://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=roadmap
    &markers=color:red%7Clabel:Place%7C${place}
    &key=${environment.googleMapsAPIKey}`;
    }
  }
}
