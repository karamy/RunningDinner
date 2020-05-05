import { Injectable } from '@angular/core';
import { RDSpinnerService } from '../rdspinner.service';
import { RDConstantsService } from '../rdcostants.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

//NB l'ordine di questi import è fondamentale per utilizzare correttamente il plugin su tutti i platform
import "capacitor-pwa-firebase-msg";
import { Plugins, PushNotificationToken, PushNotification, PushNotificationActionPerformed } from '@capacitor/core';
const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private firebaseToken: string;

  constructor(private spinner: RDSpinnerService, private rdConstants: RDConstantsService,
    private http: HttpClient, private alertController: AlertController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Nuovo invito',
      message: 'Qualcuno ti ha aggiunta a un gruppo, accetti?',
      buttons: ['OK']
    });

    await alert.present();
  }
  // Inizializza la gestione notifiche push
  init() {
    // Richiedo permission a ricevere notifiche per compatibilità web, su mobile già richiesto in precedenza
    PushNotifications.requestPermissions().then(
      (result) => {
        if (result) {
          // Registrazione a servizi Apple / Google per ricevere notifiche push via APNS/FCM
          PushNotifications.register();
        } else {
          console.warn("Permesso notifiche non dato, non saranno attive");
        }
      },
      (err) => console.log(err)
    );

    // Gestione evento 'registration' per ottenere token
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        console.log("Firebase Token: " + token.value);
        this.firebaseToken = token.value;
        this.updateFirebaseToken().catch(
          () => { console.error("Errore durante la registrazione del token"); }
        );
      });

    // Gestione evento 'registrationError'
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.warn('Errore registrazione per ricevere notifiche: ' + JSON.stringify(error));
      }
    );

    // Gestione evento 'pushNotificationReceived' di ricezione notifica
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        console.log('Push received: ' + JSON.stringify(notification));
        this.presentAlert();
      }
    );

    // Gestione evento 'pushNotificationActionPerformed' di apertura app per click su notifica
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
        this.presentAlert();
      }
    );
  }

  // Aggiorna il token firebase per l'utente
  async updateFirebaseToken(): Promise<any> {
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
