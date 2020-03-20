import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private androidPermissions: AndroidPermissions,
    private platform: Platform,
    private diagnostic: Diagnostic) { }

  // Ritorna se l'app può utilizzare il gps
  hasGpsPermission(): Promise<any> {
    if (!this.platform.is('cordova')) {
      console.warn('Su browser, do sempre permesso');
      return Promise.resolve(); // as unknown as Promise<AndroidPermissionResponse>; al posto di 'null'
    } else if (this.platform.is('ios')) {
      // Codice di esempio da testare su IOS -> https://pointdeveloper.com/ionic-requesting-permissions-run-time/
      /* this.diagnostic.isLocationAuthorized().then((status) => {
        console.warn(`AuthorizationStatus`);
        console.warn(status);
        if (status !== this.diagnostic.permissionStatus.GRANTED) {
          this.diagnostic.requestRuntimePermission(this.diagnostic.permission.ACCESS_FINE_LOCATION).then((data) => {
            console.warn(`getGpsPermission`);
            console.warn(data);
          });
        } else {
          console.log("We have the permission");
        }
      }, (statusError) => {
        console.log(`statusError`);
        console.log(statusError);
      }); */
    } else if (this.platform.is('android')) {
      return new Promise((resolve, reject) => {
        console.warn('Info se utente ha permesso GPS');
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
          .then(
            (res) => {
              if (res.hasPermission) {
                resolve();
              } else {
                reject();
              }
            }, () => {
              reject();
            });
      });
    }


  }

  // Forza la richiesta di utilizzare il gps
  requestGpsPermission(): Promise<any> {
    console.warn('Richiesta permesso GPS');
    if (!this.platform.is('cordova')) {
      console.warn('Su browser, do sempre permesso');
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
        (res) => {
          if (res.hasPermission) {
            resolve();
          } else {
            reject();
          }
        }, () => {
          reject();
        });
    });
  }

  // Ritorna se l'app ha concesso di utilizzare le notifiche
  hasNotificationPermission(): Promise<any> {
    if (!this.platform.is('cordova')) {
      console.warn('Su browser, do sempre permesso');
      return Promise.resolve();
    } else if (this.platform.is('android')) {
      console.warn('Su android, do sempre permesso');
      return Promise.resolve();
    } else if (this.platform.is('ios')) {
      // TODO --> https://github.com/dpa99c/cordova-diagnostic-plugin#notifications-module
    }
  }

  // Forza la richiesta di utilizzare le notifiche
  requestNotificationPermission(): Promise<any> {
    if (!this.platform.is('cordova')) {
      console.warn('Su browser, do sempre permesso');
      return Promise.resolve();
    } else if (this.platform.is('android')) {
      console.warn('Su android, do sempre permesso');
      return Promise.resolve();
    } else if (this.platform.is('ios')) {
      //TODO --> https://github.com/dpa99c/cordova-diagnostic-plugin#notifications-module
    }
  }
}
