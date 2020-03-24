import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { RDCostantsService } from '../rdcostants.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: AuthenticatedUser;

  constructor(private http: HttpClient,
              private loadingCtrl: LoadingController,
              private rdCostants: RDCostantsService
  ) {
    this.readUser();
  }

  // Legge le informazioni utente presenti in localStorage e le carica nel Service
  private readUser() {
    this._user = JSON.parse(localStorage.getItem('user')) as unknown as AuthenticatedUser;
  }

  // Aggiorna lo user in localStorage
  private writeUser(user: AuthenticatedUser) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Indica se l'utente ha una sessione di login attiva
  isUserAuthenticated() {
    return this._user && this._user.accessToken !== undefined && this._user.accessToken !== null;
  }

  // Effettua il login e valorizza la proprietà User
  async doLogin(phoneNumber: string) {
    const dataToSend = {
      phone_number: phoneNumber
    };

    const loadingSpinner = await this.loadingCtrl.create({
      message: 'Effettuo login...'
    });
    loadingSpinner.present();

    return new Promise((resolve, reject) =>
      this.http.post(this.rdCostants.getApiRoute('login'), dataToSend)
        .toPromise().then((res) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.readUser();
          resolve();
        }, (err) => {
          reject(err);
        })).finally(() => {
          loadingSpinner.dismiss();
        });
  }

  // Effettua il logout cancellando i dati utente
  doLogout() {
    this._user = null;
    localStorage.setItem('user', null);
  }

  // Ritorna l'utente loggato
  getUser() {
    return this._user;
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

    return new Promise((resolve, reject) => {
      this.http.post(this.rdCostants.getApiRoute('refresh'), dataToSend).
        toPromise().then((token) => {
          this._user.accessToken = JSON.stringify(token);
          this.writeUser(this._user);
        }, (err) => {
          reject(err);
        });
    });
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
  phone_number: number;
  name: string;
  age: number;
  address: string;
}
