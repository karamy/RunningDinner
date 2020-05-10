import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NavController } from "@ionic/angular";
import { RDConstantsService } from "../rdcostants.service";
import { tap } from 'rxjs/operators';
import { RDSpinnerService } from '../rdspinner.service';
import { RDParamsService } from '../rdparams.service';
import { NotificationsService } from '../home/notifications.service';
import { RDToastService } from '../rdtoast.service';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _user: AuthenticatedUser;

  constructor(
    private http: HttpClient,
    private spinner: RDSpinnerService,
    private rdConstants: RDConstantsService,
    private rdToast: RDToastService,
    private navController: NavController,
    private rdParams: RDParamsService,
    private notificationsService: NotificationsService
  ) {
    this.readUser();
  }

  // Legge le informazioni utente presenti in localStorage e le carica nel Service
  private readUser() {
    this._user = JSON.parse(
      localStorage.getItem("user")
    ) as AuthenticatedUser;
    if (this._user) {
      this._user.userData.birth_date = new Date(this._user.userData.birth_date)
      this._user.userData.birth_date = this._user.userData.birth_date.toLocaleDateString() as unknown as Date
    }
  }

  // Aggiorna lo user in localStorage
  public writeUser(user: AuthenticatedUser) {
    localStorage.setItem("user", JSON.stringify(user));
    this.readUser();
  }

  // Indica se l'utente ha una sessione di login attiva
  isUserAuthenticated() {
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

    this.spinner.create("Effettuo login...");
    return new Promise((resolve, reject) =>
      this.http
        .post(this.rdConstants.getApiRoute("login"), dataToSend)
        .toPromise()
        .then(
          res => {
            this.writeUser(res as AuthenticatedUser);
            console.log(this._user);

            // Carico i parametri utente prima di risolvere la promise
            this.rdParams.loadParams().then(
              () => {
                this.navController.navigateRoot("/home/tabs/rooms");
                resolve();
              },
              (err) => {
                this.doLogout();
                reject(err);
              }
            ).finally(() => {
              this.spinner.dismiss();
            });
          },
          err => {
            reject(err);
          }
        )
    ).finally(() => {
      this.spinner.dismiss();
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
        () => {
          localStorage.setItem("user", null);
          this.readUser();
          this.rdParams.clearParams();
          this.notificationsService.clearFirebaseToken();
          this.navController.navigateRoot("/auth");
        },
        (err) => {
          console.error("Errore logout");
        }
      )
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }

  // Ritorna l'utente loggato completo
  getUser() {
    return this._user;
  }

  // Ritorna i dati dell'utente loggato
  getUserData(): UserData {
    return this._user.userData;
  }

  // Ritorna il token dell'utente loggato, se login attivo
  getUserToken() {
    return this.isUserAuthenticated() ? this._user.accessToken : null;
  }

  // Effettua chiamata per ottenere un accessToken passando il refreshToken
  refreshToken() {
    const dataToSend = {
      refreshToken: this.getRefreshToken()
    };

    var httpPost = this.http.post(this.rdConstants.getApiRoute("refreshToken"), dataToSend)
    return httpPost.pipe(
      tap((res) => {
        this._user.accessToken = JSON.stringify(res['accessToken']);
        this.writeUser(this._user);
      }, () => {
        // Se la procedura di refresh ritorna errore (di solito per riavvio server torno a login)
        this.onServerRestart();
      })
    )
  }

  private async onServerRestart() {
    this.rdToast.show('Server riavviato, effettua nuovamente login',2000);
    this.doLogout();
  }

  private getRefreshToken() {
    return this.isUserAuthenticated() ? this._user.refreshToken : null;
  }
}

// Rappresenta l'utente loggato
export interface AuthenticatedUser {
  refreshToken: string; // Token utilizzato per aggiornare la validità del login
  userData: UserData;
  accessToken: string; // Token utilizzato per effettuare chiamate autenticate
}

// Rappresente i dati di un utente loggato
export interface UserData {
  userid: number;
  name: string;
  address: string;
  phone_number: number;
  birth_date: Date;
  profile_photo: string;
}
