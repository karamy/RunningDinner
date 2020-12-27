import { Injectable } from "@angular/core";
import { Diagnostic } from "@ionic-native/diagnostic/ngx";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class PermissionsService {
  constructor(private platform: Platform, private diagnostic: Diagnostic) { }

  // Ritorna se l'app può utilizzare il gps
  hasGpsPermission(): Promise<any> {
    if (!this.platform.is("cordova")) {
      console.warn("Su browser, do sempre permesso");
      return Promise.resolve();
    } else {
      return new Promise<void>((resolve, reject) => {
        console.warn("Info se utente ha permesso GPS");
        this.diagnostic.getLocationAuthorizationStatus().then(status => {
          console.warn("Auth status" + status);
          status = status.toLowerCase();
          if (status === "granted" || status === "authorized_when_in_use") {
            reject(status);
          } else {
            reject(status);
          }
        });
      });
    }
  }

  // Richiesta per poter utilizzare il GPS
  requestGpsPermission(): Promise<any> {
    console.warn("Richiesta permesso GPS");
    if (!this.platform.is("cordova")) {
      console.warn("Su browser, do sempre permesso");
      return Promise.resolve();
    } else {
      return new Promise<void>((resolve, reject) => {
        this.diagnostic.requestLocationAuthorization().then(status => {
          console.log("Status: " + status);
          status = status.toLowerCase();
          if (status === "granted" || status === "authorized_when_in_use") {
            resolve();
          } else {
            reject(status);
          }
        });
      });
    }
  }

  // Richiesta di accesso a impostazioni per attivazione manuale GPS
  forcePermissions() {
    return new Promise<void>((resolve, reject) => {
      function handleResume() {
        resolve();
      }
      this.diagnostic.switchToSettings();
      document.addEventListener("resume", handleResume);
      () => {
        reject();
      };
    });
  }

  // Ritorna se l'app ha concesso di utilizzare le notifiche
  hasNotificationPermission(): Promise<any> {
    if (!this.platform.is("cordova")) {
      console.warn("Su browser, do sempre permesso");
      return Promise.resolve();
    } else if (this.platform.is("ios")) {
      //Su iOS skippo avanti perchè da implementare con APN
      console.warn("Su ios, vado avanti");
      return Promise.resolve();
    } else {
      return new Promise<void>((resolve, reject) => {
        this.diagnostic.isRemoteNotificationsEnabled().then(status => {
          console.warn("Auth status: " + status);
          if (status === true) {
            resolve();
          } else {
            reject();
          }
        });
      });
    }
  }

  // Richiesta di attivare le notifiche
  requestNotificationPermission() {
    return new Promise<void>((resolve, reject) => {
      this.diagnostic
        .requestRemoteNotificationsAuthorization()
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
