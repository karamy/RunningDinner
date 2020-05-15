import { Component, OnInit, NgZone } from "@angular/core";
import { AuthService, UserData, AuthenticatedUser } from "src/app/auth/auth.service";
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { RDParamsService } from 'src/app/rdparams.service';
import { ContactsService } from '../tabs/contacts/contacts.service';
import { ModalController } from '@ionic/angular';
import { FoodAllergiesPage } from 'src/app/rdmodals/food-allergies/food-allergies.page';
import { UserService } from 'src/app/auth/user.service';
import { ProfileService } from './profile.service';
import { PhotoService } from 'src/app/sign-up/profile-photo/photo.service';
import { RDSpinnerService } from 'src/app/rdspinner.service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  user: UserData;
  userAge: number;
  group: boolean = false;
  friend: UserData = {
    userid: null,
    name: null,
    profile_photo: null,
    birth_date: null,
    address: null,
    phone_number: null
  }
  avgAge: number;
  editMode: boolean = false;
  badgeExpand: boolean = false;
  foodExpand: boolean = false;
  foodAllergies = []
  categories = [];
  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocompleteItems: any[];
  directionsService: google.maps.DirectionsService;
  groupDistance: string;

  constructor(private authService: AuthService,
    private userService: UserService,
    private spinner: RDSpinnerService,
    public paramsService: RDParamsService,
    private contactsService: ContactsService,
    private profileService: ProfileService,
    private photoService: PhotoService,
    private zone: NgZone,
    private modalController: ModalController) {
    defineCustomElements(window);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.directionsService = new google.maps.DirectionsService();
  }

  badges = [
    {
      "name": "goldmedal",
      "image": "assets/goldmedal.png",
      "descriptionOwned": "Ottenuto per aver ricevuto il miglior voto in una cena",
      "descriptionNotOwned": "Ottieni il miglior voto in una cena",
      "owned": true
    },
    {
      "name": "silvermedal",
      "image": "assets/silvermedal.png",
      "descriptionOwned": "Ottenuto per aver invitato 10 amici",
      "descriptionNotOwned": "Invita 10 amici. Amici invitati 4/10",
      "owned": false
    },
    {
      "name": "dress",
      "image": "assets/dress.png",
      "descriptionOwned": "Ottenuto per esser stato il più simpatico in una cena",
      "descriptionNotOwned": "Ricevi il voto di più simpatico in una cena",
      "owned": false
    },
    {
      "name": "dummy",
      "image": "assets/dummy.png",
      "descriptionOwned": "Ottenuto per esser stato il meno simpatico in una cena",
      "descriptionNotOwned": "Ricevi il voto di meno simpatico in una cena",
      "owned": true
    },
    {
      "name": "dress",
      "image": "assets/dress.png",
      "descriptionOwned": "Ottenuto per esserti iscritto a RunningDinner",
      "descriptionNotOwned": "Iscriviti a RunningDinner",
      "owned": true
    },
    {
      "name": "fish",
      "image": "assets/fish.png",
      "descriptionOwned": "Ottenuto per aver fatto la tua prima cena di pesce",
      "descriptionNotOwned": "Partecipa ad una cena di pesce",
      "owned": false
    },
    {
      "name": "meat",
      "image": "assets/meat.png",
      "descriptionOwned": "Ottenuto per aver fatto la tua prima cena di carne",
      "descriptionNotOwned": "Partecipa ad una cena di carne",
      "owned": true
    },
  ]

  ngOnInit() {
    this.getUser();
  }

  // Impostazioni ion-slides
  slideOpts = {
    slidesPerView: 5,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  getUser() {
    this.user = this.authService.getUserData();
    this.userAge = this.profileService.calcAge(this.user.birth_date); // Calcola età utente
  }

  async presentModalFoodAllergies() {
    const modal = await this.modalController.create({
      component: FoodAllergiesPage,
      backdropDismiss: true,
      cssClass: 'modal-style'
    });
    modal.onDidDismiss().then(res => {
      if (res.data !== undefined) {
        // Aggiungo l'intolleranza alla lista e la ordino in base alla categoria
        this.foodAllergies = [...this.foodAllergies, res.data]
        this.foodAllergies.sort((a, b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
        if (!this.categories.includes(res.data.category)) {
          // Aggiungo la categoria alla lista e la ordino
          this.categories = [...this.categories, res.data.category]
          this.categories.sort();
        }
      }
    });
    return await modal.present();
  }

  async editImage() {
    const data = await this.photoService.getPicture();
    if (data) {
      this.loadPicture();
    }
  }

  private loadPicture() {
    const data = this.photoService.profilePhotoData;
    if (data) {
      // Converto l'immagine in jpeg
      this.user.profile_photo = 'data:image/jpeg;base64,' + data;
    }
  }

  saveChanges() {
    this.spinner.create("Aggiorno informazioni...");
    this.user.birth_date = this.profileService.changeDateFormat(this.user.birth_date); // Rendo la data in formato YYYY/MM/DD
    const profilePhoto = this.user.profile_photo.replace('data:image/jpeg;base64,', ''); // Converto l'immagine in base64
    this.userService.updateUser(this.user.name, this.user.birth_date, this.user.address, this.user.phone_number, profilePhoto).then(
      res => {
        this.authService.addExistingTokens(res as AuthenticatedUser);
        this.getUser();
        this.spinner.dismiss();
      },
      () => {
        console.log('Errore updateUser');
        this.spinner.dismiss();
      }
    );
    this.editMode = !this.editMode;
  }

  cancelFood(item: any) {
    const index = this.foodAllergies.indexOf(item);
    this.foodAllergies.splice(index, 1);
    this.foodAllergies = [...this.foodAllergies]
    if (this.foodAllergies.find(x => x.category === item.category) === undefined) {
      const indexCategory = this.categories.indexOf(item.category);
      this.categories.splice(indexCategory, 1);
    }
  }

  updateSearchResults() {
    if (this.user.address === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.user.address },
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

  selectSearchResult(item: any) {
    this.autocompleteItems = [];
    this.user.address = item.description;
  }

  // Calcolo distanza tra user e friend
  calcDistance(): Promise<string> {
    return new Promise((res, rej) => {
      this.directionsService.route({
        origin: this.user.address,
        destination: this.friend.address,
        travelMode: google.maps.TravelMode['DRIVING']
      }, (response, status) => {
        if (status === 'OK') {
          const distance = response.routes[0].legs[0].distance.text;
          res(distance);
        } else {
          window.alert('Directions request failed due to ' + status);
          rej();
        }
      });
    });
  }

  // Metodo provvisorio in attesa della possibilità di creare gruppi reali
  createGroup() {
    this.profileService.getFriend().then(res => {
      this.friend.name = res[0].name;
      this.friend.profile_photo = 'data:image/jpeg;base64,' + res[0].profile_photo;
      this.friend.address = res[0].address;
      this.friend.birth_date = new Date(res[0].birth_date)
      this.friend.birth_date = this.friend.birth_date.toLocaleDateString() as unknown as Date;
      this.avgAge = this.profileService.calcAvgAge(this.userAge, this.friend.birth_date);
      this.calcDistance().then(res => {
        this.groupDistance = res;
        this.group = !this.group;
      });
    });
  }

  onLogout() {
    this.authService.doLogout();
  }

  // Abbandona gruppo
  onLeaveGroup() {
    this.contactsService.leaveGroup(this.paramsService.getParams().groupId).then(
      () => { // Gruppo abbandonato, ricarico parametri
        this.paramsService.loadParams();
      },
      (err) => { // Errore abbandono gruppo
        console.warn(err);
      }
    );
  }
}
