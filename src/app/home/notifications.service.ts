import { Injectable } from '@angular/core';
import { PushNotificationToken, PushNotification, PushNotificationActionPerformed, Plugins } from '@capacitor/core';
const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

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
      }
    );

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
      }
    );

    // Gestione evento 'pushNotificationActionPerformed' di apertura app per click su notifica
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }
}
