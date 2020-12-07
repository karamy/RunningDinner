import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { RDConstantsService } from '../rdcostants.service';
import { tap } from 'rxjs/operators';
import { RDSpinnerService } from '../rdspinner.service';
import { RDParamsService } from '../rdparams.service';
import { RDToastService } from '../rdtoast.service';
import { ProfileService } from '../home/profile/profile.service';
import { FoodAllergiesService } from '../rdmodals/food-allergies/food-allergies.service';
import { BadgesService } from '../home/profile/badges.service';
import { ContactsService } from '../home/tabs/contacts/contacts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: AuthenticatedUser;
  private firebaseToken: string;

  constructor(
    private http: HttpClient,
    private spinner: RDSpinnerService,
    private rdConstants: RDConstantsService,
    private rdToast: RDToastService,
    private navController: NavController,
    private rdParams: RDParamsService,
    private profileService: ProfileService,
    private foodAllergiesService: FoodAllergiesService,
    private badgesService: BadgesService,
    private contactsService: ContactsService
  ) {
    this.readUser();
  }

  // Cancella dal localStorage le informazioni sull'utente
  public clearUser() {
    localStorage.setItem('user', null);
    this.readUser();
  }

  // Legge le informazioni utente presenti in localStorage e le carica nel Service
  public readUser() {
    this._user = JSON.parse(
      localStorage.getItem('user')
    ) as AuthenticatedUser;
    if (this._user) {
      // Trasformo la data in stringa nel formato DD/MM/YYYY
      this._user.userData.birth_date = new Date(this._user.userData.birth_date);
      this._user.userData.birth_date = this._user.userData.birth_date.toLocaleDateString() as unknown as Date;
    }
  }

  // Aggiorna lo user in localStorage
  private writeUser(user: AuthenticatedUser) {
    user.userData.profile_photo = 'data:image/jpeg;base64,' + user.userData.profile_photo;
    localStorage.setItem('user', JSON.stringify(user));
    this.readUser();
  }

  // Aggiunge ad user i Tokens già esistenti senza aggiornarli
  public addExistingTokens(user: AuthenticatedUser) {
    const tempUser = JSON.parse(
      localStorage.getItem('user')
    ) as AuthenticatedUser;
    user.accessToken = tempUser.accessToken;
    user.refreshToken = tempUser.refreshToken;
    this.writeUser(user);
  }

  // Indica se l'utente ha una sessione di login attiva
  public isUserAuthenticated() {
    return (
      this._user &&
      this._user.accessToken !== undefined &&
      this._user.accessToken !== null
    );
  }

  // Effettua il login e valorizza la proprietà User
  async doLogin(phoneNumber: string) {
    const dataToSend = {
      phone_number: phoneNumber
    };

    this.spinner.create('Effettuo login...');
    return new Promise((resolve, reject) =>
      this.http
        .post(this.rdConstants.getApiRoute('login'), dataToSend)
        .toPromise()
        .then(
          res => {
            this.writeUser(res as AuthenticatedUser);
            console.log("Login user", this._user);

            //Lascio in thread parallelo parte di caricamento iniziale Params, Food Allergies e Partner, parto subito su /dinners
            this.navController.navigateRoot('/home/tabs/dinners');
            resolve();

            // Carico i parametri utente
            this.loadOtherParamsInBackground();
          },
          err => {
            this.doLogout();
            reject(err);
          }
        )
    ).finally(() => {
      this.spinner.dismiss();
    });
  }

  // Carica gli altri parametri in background
  private loadOtherParamsInBackground() {
    this.foodAllergiesService.getAllFoodAllergiesData().then(() => { // Tutte le intolleranze
      this.foodAllergiesService.getUserFoodAllergiesData(this.getUserData().userid).then(() => { // Food allergies
        this.badgesService.getUserBadges(this.getUserData().userid).then(() => { // Badges utente
          if (this.rdParams.getParams().groupId) {
            this.profileService.getPartnerData(this.getUserData()).then(() => { // Dati partner
              this.foodAllergiesService.getPartnerFoodAllergies(this.getUserData().userid).then(() => { //Food allergies partner
                this.badgesService.getPartnerBadges(this.getUserData().userid).catch( // Badges del partner
                  () => {
                    console.log('Errore getPartnerBadges');
                    this.doLogout();
                  });
              },
                () => {
                  console.log('Errore getPartnerFoodAllergies');
                  this.doLogout();
                });
            },
              () => {
                console.log('Errore getPartnerData');
                this.doLogout();
              });
          }
        },
          () => {
            console.log('Errore getUserBadges');
            this.doLogout();
          });
      },
        () => {
          console.log('Errore getUserFoodAllergiesData');
          this.doLogout();
        });
    },
      () => {
        console.log('Errore getAllFoodAllergiesData');
        this.doLogout();
      });
  }

  // Effettua il logout richiedendo la cancellazione del token
  // di Firebase e cancellando i dati utente
  // NB la rotta non è autenticata perchè potrebbe essere scaduto il token,
  // ma voglio comunque disattivare le notifiche push
  async doLogout() {
    await this.spinner.create();
    this.http.post(this.rdConstants.getApiRoute('logout'), { userId: this.getUserData().userid })
      .toPromise()
      .then(
        async () => {
          // Cancellazione di tutte le info
          this.clearUser();
          this.clearFirebaseToken();
          this.rdParams.clearParams();
          this.profileService.clearPartner();
          this.foodAllergiesService.clearUserFoodAllergies();
          this.foodAllergiesService.clearAllFoodAllergies();
          this.foodAllergiesService.clearGroupFoodAllergies();
          this.badgesService.clearUserBadges();
          this.badgesService.clearGroupBadges();
          await this.contactsService.clearLocalContacts();
          await this.contactsService.clearMatchingContacts();

          // Uscita dall'app
          this.navController.navigateRoot('/auth');
        },
        (err) => {
          console.error('Errore logout');
        }
      )
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }

  // Ritorna l'utente loggato completo
  public getUser() {
    return this._user;
  }

  // Ritorna i dati dell'utente loggato
  public getUserData(): UserData {
    console.log(this._user.userData)
    return this._user.userData;
  }

  // Ritorna il token dell'utente loggato, se login attivo
  public getUserToken() {
    return this.isUserAuthenticated() ? this._user.accessToken : null;
  }

  // Effettua chiamata per ottenere un accessToken passando il refreshToken
  public refreshToken() {
    const dataToSend = {
      refreshToken: this.getRefreshToken()
    };

    const httpPost = this.http.post(this.rdConstants.getApiRoute('refreshToken'), dataToSend);
    return httpPost.pipe(
      tap((res) => {
        this._user.accessToken = JSON.stringify(res['accessToken']);
        this.writeUser(this._user);
      }, () => {
        // Se la procedura di refresh ritorna errore (di solito per riavvio server torno a login)
        this.onServerRestart();
      })
    );
  }

  private async onServerRestart() {
    this.rdToast.show('Server riavviato, effettua nuovamente login', 2000);
    this.doLogout();
  }

  private getRefreshToken() {
    return this.isUserAuthenticated() ? this._user.refreshToken : null;
  }

  // Aggiorna il token firebase per l'utente
  async updateFirebaseToken(firebaseToken: string): Promise<any> {
    this.firebaseToken = firebaseToken;
    const updateFirebaseTokenBody = {
      firebaseToken: this.firebaseToken
    };

    await this.spinner.create();
    return this.http.post(this.rdConstants.getApiRoute('updateFirebaseToken'), updateFirebaseTokenBody)
      .toPromise()
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }

  // Ritorna il token di Firebase precedentemente salvato
  getFirebaseToken() {
    return this.firebaseToken;
  }

  // Rimuove il token di Firebase precedentemente salvato
  clearFirebaseToken() {
    this.firebaseToken = null;
  }
}

// Rappresenta l'utente loggato
export interface AuthenticatedUser {
  refreshToken: string; // Token utilizzato per aggiornare la validità del login
  userData: UserData;
  accessToken: string; // Token utilizzato per effettuare chiamate autenticate
}

// Rappresenta i dati di un utente loggato
export interface UserData {
  groupid?: number;
  userid: number;
  name: string;
  address: string;
  group_address?: string;
  phone_number?: number;
  birth_date: Date;
  profile_photo: string;
}
