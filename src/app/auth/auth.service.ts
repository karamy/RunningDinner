import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: AuthenticatedUser;

  constructor(private http: HttpClient, private loadingCtrl: LoadingController) {
    this.refreshUser();
  }

  // Legge le informazioni utente presenti in localStorage e le carica nel Service
  private refreshUser() {
    this._user = JSON.parse(localStorage.getItem('user')) as unknown as AuthenticatedUser;
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
      this.http.post('https://runningdinnerapi.herokuapp.com/login', dataToSend)
        .toPromise().then((res) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.refreshUser();
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
}

// Rappresenta l'utente loggato
export interface AuthenticatedUser {
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
