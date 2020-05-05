import { Component, OnInit, NgZone } from "@angular/core";
import { AuthService, UserData, AuthenticatedUser } from "src/app/auth/auth.service";
import { RDParamsService } from 'src/app/rdparams.service';
import { ContactsService } from '../tabs/contacts/contacts.service';
import { ModalController } from '@ionic/angular';
import { FoodAllergiesPage } from 'src/app/rdmodals/food-allergies/food-allergies.page';
import { UserService } from 'src/app/auth/user.service';
import { ProfileService } from './profile.service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  user: UserData;
  userAge: number;
  editMode: boolean = false;
  badgeExpand: boolean = false;
  foodExpand: boolean = false;
  foodAllergies = []
  categories = [];
  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocompleteItems: any[];

  constructor(private authService: AuthService,
    private userService: UserService,
    public paramsService: RDParamsService,
    private contactsService: ContactsService,
    private profileService: ProfileService,
    private zone: NgZone,
    private modalController: ModalController) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
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
    this.user.profile_photo = "assets/Logo.png";
    this.userAge = this.profileService.calcAge(this.user.birth_date);
  }

  async presentModalFoodAllergies() {
    const modal = await this.modalController.create({
      component: FoodAllergiesPage,
      backdropDismiss: true,
      cssClass: "modal-style"
    });
    modal.onDidDismiss().then(res => {
      if (res.data !== undefined) {
        this.foodAllergies = [...this.foodAllergies, res.data]
        this.foodAllergies.sort((a, b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
        if (!this.categories.includes(res.data.category)) {
          this.categories = [...this.categories, res.data.category]
          this.categories.sort();
        }
      }
    });
    return await modal.present();
  }

  saveChanges() {
    this.user.birth_date = this.profileService.changeDateFormat(this.user.birth_date)
    this.userService.updateUser(this.user.name, this.user.birth_date, this.user.address, this.user.phone_number).then(
      res => {
        this.authService.writeUser(res as AuthenticatedUser)
        this.getUser();
      },
      () => {
        console.log("Errore")
      }
    )
    this.editMode = !this.editMode
  }

  cancelFood(item: any) {
    const index = this.foodAllergies.indexOf(item);
    this.foodAllergies.splice(index, 1);
    this.foodAllergies = [...this.foodAllergies]
    if (this.foodAllergies.find(x => x.category === item.category) === undefined) {
      const indexCategory = this.categories.indexOf(item.category)
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
