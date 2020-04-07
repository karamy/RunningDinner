import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoadingController, NavController } from "@ionic/angular";
import { RDConstantsService } from "../rdcostants.service";
import { tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { RDSpinnerService } from '../rdspinner.service';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _user: AuthenticatedUser;

  constructor(
    private http: HttpClient,
    private spinner: RDSpinnerService,
    private rdConstants: RDConstantsService,
    private toastController: ToastController,
    private navController: NavController
  ) {
    this.readUser();
  }

  // Legge le informazioni utente presenti in localStorage e le carica nel Service
  private readUser() {
    this._user = JSON.parse(
      localStorage.getItem("user")
    ) as AuthenticatedUser;
  }

  // Aggiorna lo user in localStorage
  private writeUser(user: AuthenticatedUser) {
    localStorage.setItem("user", JSON.stringify(user));
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

    this.spinner.create(/* "Effettuo login..." */);
    return new Promise((resolve, reject) =>
      this.http
        .post(this.rdConstants.getApiRoute("login"), dataToSend)
        .toPromise()
        .then(
          res => {
            localStorage.setItem("user", JSON.stringify(res));
            this.readUser();
            console.log(this._user);
            this.navController.navigateRoot("/home/tabs/rooms");
            resolve();
          },
          err => {
            reject(err);
          }
        )
    ).finally(() => {
      this.spinner.dismiss();
    });
  }

  // Effettua il logout cancellando i dati utente
  doLogout() {
    this._user = null;
    localStorage.setItem("user", null);
    this.navController.navigateRoot("/auth");
  }

  // Ritorna l'utente loggato completo
  getUser() {
    return this._user;
  }

  // Ritorna i dati dell'utente loggato
  getUserData() {
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
    const toast = await this.toastController.create({
      message: 'Server riavviato, effettua nuovamente login',
      duration: 2000
    });
    toast.present();
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
