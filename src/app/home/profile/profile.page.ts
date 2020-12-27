import { Component, OnInit, NgZone } from "@angular/core";
import {
  AuthService,
  UserData,
  AuthenticatedUser,
} from "src/app/auth/auth.service";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { RDParamsService } from "src/app/rdparams.service";
import { ModalController } from "@ionic/angular";
import {
  FoodAllergiesPage,
  UserAllergy,
} from "src/app/rdmodals/food-allergies/food-allergies.page";
import { UserService } from "src/app/auth/user.service";
import { ProfileService } from "./profile.service";
import { PhotoService } from "src/app/sign-up/profile-photo/photo.service";
import { RDSpinnerService } from "src/app/rdspinner.service";
import { BadgesService } from "./badges.service";
import { FoodAllergiesService } from "src/app/rdmodals/food-allergies/food-allergies.service";
import { RDToastService } from "src/app/rdtoast.service";
import { NotificationsService } from "../notifications.service";
import { HttpClient } from "@angular/common/http";
import { RDConstantsService } from "src/app/rdcostants.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  user: UserData;
  userAge: number;
  editMode = false;
  onRefresh = false;
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
    },
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private spinner: RDSpinnerService,
    public paramsService: RDParamsService,
    public profileService: ProfileService,
    public foodAllergiesService: FoodAllergiesService,
    private photoService: PhotoService,
    public badgesService: BadgesService,
    private rdToast: RDToastService,
    private zone: NgZone,
    private modalController: ModalController,
    private http: HttpClient,
    private notificationsService: NotificationsService,
    private rdConstants: RDConstantsService
  ) {
    defineCustomElements(window);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.user = this.authService.getUserData();
    this.userAge = this.profileService.calcAge(this.user.birth_date); // Calcola età utente
  }

  async presentModalFoodAllergies() {
    const modal = await this.modalController.create({
      component: FoodAllergiesPage,
      backdropDismiss: true,
      componentProps: {
        foodAllergies: this.foodAllergiesService.getAllFoodAllergies(),
        userFoodAllergies: this.foodAllergiesService.getUserFoodAllergies(),
      },
      cssClass: "modal-style",
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
      this.user.profile_photo = "data:image/jpeg;base64," + data;
    }
  }

  triggerEditMode() {
    // Converto la stringa in Date nel formato YYYY/MM/DD
    this.user.birth_date = this.profileService.changeDateFormat(
      this.user.birth_date
    );
    // Poi la converto in stringa formato ISO (necessario per il datetime picker)
    this.user.birth_date = (this.user.birth_date.toISOString() as unknown) as Date;
    this.editMode = !this.editMode;
  }

  saveChanges() {
    this.spinner.create("Aggiorno informazioni...");
    // Comverto la stringa ISO in data
    this.user.birth_date = new Date(this.user.birth_date);
    // Poi la converto in stringa nel formato DD/MM/YYYY
    this.user.birth_date = (this.user.birth_date.toLocaleDateString() as unknown) as Date;
    this.user.birth_date = this.profileService.changeDateFormat(
      this.user.birth_date
    ); // Rendo la data in formato YYYY/MM/DD
    const profilePhoto = this.user.profile_photo.replace(
      "data:image/jpeg;base64,",
      ""
    ); // Converto l'immagine in base64
    const geocoder = new google.maps.Geocoder();

    // Dichiaro la funzione qui perchè altrimenti VS Code non la riconosceva all'interno dello scope
    // Esegue l'aggiornamento delle informazioni utente
    const updateUser = (profilePhoto: string, lat: number, lon: number) => {
      this.userService
        .updateUser(
          this.user.name,
          this.user.birth_date,
          this.user.address,
          this.user.phone_number,
          profilePhoto,
          lat,
          lon
        )
        .then(
          (res) => {
            this.authService.addExistingTokens(res as AuthenticatedUser);
            this.getUser();
          },
          () => {
            console.log("Errore updateUser");
          }
        )
        .finally(() => {
          this.spinner.dismiss();
        });
    };

    geocoder.geocode(
      { address: this.user.address },
      function (results, status) {
        if (status === "OK") {
          updateUser(
            profilePhoto,
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng()
          );
        } else {
          console.log(
            "Impossibile eseguire geocoder per la seguente ragione: " + status
          );
        }
      }
    );

    this.editMode = !this.editMode;
  }

  deleteFoodAllergy(item: UserAllergy) {
    this.foodAllergiesService
      .deleteUserFoodAllergies(
        item.allergy_id,
        item.allergy_name,
        this.authService.getUserData().userid
      )
      .then(
        () => {
          this.foodAllergiesService
            .getUserFoodAllergiesData(this.authService.getUserData().userid)
            .then(() => {
              this.rdToast.show(
                "Intolleranza " + item.allergy_name + " eliminata",
                2000
              );
            });
        },
        () => {
          console.log("Errore deleteFoodAllergy");
        }
      );
  }

  updateSearchResults() {
    if (this.user.address === "") {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.user.address },
      (predictions) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          if (predictions) {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          }
        });
      }
    );
  }

  selectSearchResult(item: any) {
    this.autocompleteItems = [];
    this.user.address = item.description;
  }

  // Effettua il logout
  onLogout() {
    this.authService.doLogout();
  }

  // Scioglie il gruppo di cui fa parte l'utente, anche qui in automatico
  // invia una notifica all'altro partecipante, che viene informato dell'azione fatta
  private async leaveGroup(groupId) {
    const leaveGroupBody = {
      groupId: groupId,
    };
    await this.spinner.create();
    return this.http
      .post(this.rdConstants.getApiRoute("leaveGroup"), leaveGroupBody)
      .toPromise()
      .finally(() => {
        this.spinner.dismiss();
      });
  }

  // Abbandona gruppo
  onLeaveGroup() {
    this.leaveGroup(this.paramsService.getParams().groupId).then(
      () => {
        // Gruppo abbandonato, ricarico parametri
        this.paramsService.loadParams(true).then(() => {
          this.profileService.clearPartner();
          this.foodAllergiesService.clearGroupFoodAllergies();
          this.badgesService.clearGroupBadges();

          // Emetto l'evento di ricaricamento parametri
          this.notificationsService.fireUpdateParamsEvent();
        });
      },
      (err) => {
        // Errore abbandono gruppo
        console.warn(err);
      }
    );
  }

  // Ricaricamento parametri secondari, utile se ad esempio non ricevo la notifica di aggiunta a gruppo
  onLoadOtherParamsInBackground() {
    this.onRefresh = true;
    this.profileService.clearPartner();
    this.foodAllergiesService.clearGroupFoodAllergies();
    this.badgesService.clearGroupBadges();

    this.rdToast.show(
      "Ricaricamento profilo...",
      4000
    );

    this.authService.loadOtherParamsInBackground().then( // Attendo con la then solo la prima chiamata 'loadParams'
      () => {
        // Imposto timeout di 5s perchè non posso sapere quando finirà la chiamata in parallelo agli altri parametri,
        // verosimilmente dopo quel tempo dovrà essersi aggiornato il profilo e si potrà nuovamente fare le operazioni
        setTimeout(() => {
          this.onRefresh = false;
        }, 5000);
      }
    );
  }
}
