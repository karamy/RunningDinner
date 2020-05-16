import { Injectable } from "@angular/core";
import { firebase } from '@firebase/app';
import '@firebase/auth';
import { cfaSignInPhone } from "capacitor-firebase-auth";
import { cfaSignInPhoneOnCodeSent } from "capacitor-firebase-auth";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class PhoneService {
  verificationId: string;

  constructor(private platform: Platform) {
    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDit-Luu9GP7UwpZTaVerP0EsI70DO-45o",
      authDomain: "runningdinnersms.firebaseapp.com",
      databaseURL: "https://runningdinnersms.firebaseio.com",
      projectId: "runningdinnersms",
      storageBucket: "runningdinnersms.appspot.com",
      messagingSenderId: "65032950194",
      appId: "1:65032950194:web:8c98c255773e86ab5454ab"
    };

    // Inizializzazione Firebase, verificando che non sia già stato fatto in precedenza (altrimenti con Service Worker per notifiche va in errore)
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  sendOtp(phoneNumber: string): Promise<string> {
    return new Promise(resolve => {
      if (!this.platform.is("cordova")) {
        //Per test su web imposta un verificationId casuale
        this.verificationId = "test";
        resolve(this.verificationId);
      } else {
        //Ottiene provider ID
        cfaSignInPhone(phoneNumber).subscribe(() => {
          resolve();
        },
          (err) => {
            if (err.message === "Invalid phone number.") {
              alert("Numero di telefono non valido, deve avere tra le 9 e le 10 cifre")
            } else {
              alert("Si è verificato un errore nella verifica del numero")
            }
          })
        //Ottiene verificationId
        cfaSignInPhoneOnCodeSent().subscribe(verificationId => {
          this.verificationId = verificationId;
          resolve(this.verificationId);
        },
          () => {
            alert("Si è verificato un errore nella verifica del numero")
          });
      }
    });
  }

  verifyNumber(otp: string) {
    const credential: firebase.auth.AuthCredential = firebase.auth.PhoneAuthProvider.credential(
      this.verificationId,
      otp
    );
    console.log("Credential: " + JSON.stringify(credential));
    return new Promise(resolve => {
      if (!this.platform.is("cordova")) {
        //Per test su web resolve senza far nulla
        resolve();
      } else {
        //Autenticazione su Firebase e verifica del numero
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(user => {
            console.log("User: " + JSON.stringify(user));
            resolve();
          })
          .catch(error => {
            const errorCode = error.code;
            console.log(error)

            if (errorCode === "auth/invalid-verification-code") {
              alert("Codice di verifica OTP non valido");
            } else if (errorCode === "auth/invalid-verification-id") {
              alert("ID di verifica non valido");
            } else {
              alert(error);
            }
          });
      }
    });
  }
}
