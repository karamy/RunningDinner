import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService, UserData, AuthenticatedUser } from 'src/app/auth/auth.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { RDParamsService } from 'src/app/rdparams.service';
import { ContactsService } from '../tabs/contacts/contacts.service';
import { ModalController } from '@ionic/angular';
import { FoodAllergiesPage, FoodAllergy, UserAllergy } from 'src/app/rdmodals/food-allergies/food-allergies.page';
import { UserService } from 'src/app/auth/user.service';
import { ProfileService } from './profile.service';
import { PhotoService } from 'src/app/sign-up/profile-photo/photo.service';
import { RDSpinnerService } from 'src/app/rdspinner.service';
import { BadgesService } from './badges.service';
import { FoodAllergiesService } from 'src/app/rdmodals/food-allergies/food-allergies.service';
import { RDToastService } from 'src/app/rdtoast.service';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  user: UserData;
  userAge: number;
  editMode = false;
  badgeExpand = false;
  foodExpand = false;
  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocompleteItems: any[];

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
  };

  constructor(private authService: AuthService,
    private userService: UserService,
    private spinner: RDSpinnerService,
    public paramsService: RDParamsService,
    private contactsService: ContactsService,
    public profileService: ProfileService,
    public foodAllergiesService: FoodAllergiesService,
    private photoService: PhotoService,
    public badgesService: BadgesService,
    private rdToast: RDToastService,
    private zone: NgZone,
    private modalController: ModalController,
    private notificationService: NotificationsService) {
    defineCustomElements(window);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
  }

  ngOnInit() {
    this.getUser();
    if (this.paramsService.getParams().groupId) {
      // Per evitare errori se refresh della pagina
      this.profileService.readPartner();
      this.foodAllergiesService.readGroupFoodAllergies();
      this.badgesService.readGroupBadges();
    } else {
      this.badgesService.readUserBadges();
      this.foodAllergiesService.readUserFoodAllergies();
      // Valorizzo groupFoodAllergies e groupBadges per evitare errori se refresh della pagina
      localStorage.setItem('groupFoodAllergies', '[]');
      this.foodAllergiesService.readGroupFoodAllergies();
      localStorage.setItem('groupBadges', '[]');
      this.badgesService.readGroupBadges();
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
      componentProps: { 'foodAllergies': this.foodAllergiesService.getAllFoodAllergies(), 'userFoodAllergies': this.foodAllergiesService.getUserFoodAllergies() },
      cssClass: 'modal-style'
    });
    await modal.present();
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
    this.spinner.create('Aggiorno informazioni...');
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

  deleteFoodAllergy(item: UserAllergy) {
    this.foodAllergiesService.deleteUserFoodAllergies(item.allergy_id, item.allergy_name, this.authService.getUserData().userid).then(() => {
      this.foodAllergiesService.getUserFoodAllergiesData(this.authService.getUserData().userid).then(() => {
        this.rdToast.show('Intolleranza ' + item.allergy_name + ' eliminata', 2000);
      });
    },
      () => {
        console.log('Errore deleteFoodAllergy');
      });
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
        this.paramsService.loadParams().then(() => {
          this.profileService.clearPartner();
          this.foodAllergiesService.clearGroupFoodAllergies();
          this.badgesService.clearGroupBadges();

          // Emetto l'evento di ricaricamento parametri anche se attualmente essendo
          // utilizzato solo nella chat, è inutile ricaricarla dopo la creazione gruppo
          this.notificationService.fireUpdateParamsEvent();
        });
      },
      (err) => { // Errore abbandono gruppo
        console.warn(err);
      }
    );
  }
}
