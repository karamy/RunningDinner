import { Injectable } from '@angular/core';
import { RDSpinnerService } from '../rdspinner.service';
import { RDConstantsService } from '../rdcostants.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

//NB l'ordine di questi import è fondamentale per utilizzare correttamente il plugin su tutti i platform
import "capacitor-pwa-firebase-msg";
import { Plugins, PushNotificationToken, PushNotification, PushNotificationActionPerformed } from '@capacitor/core';
import { RDParamsService } from '../rdparams.service';
const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private firebaseToken: string;

  constructor(private spinner: RDSpinnerService, private rdConstants: RDConstantsService,
    private http: HttpClient, private alertController: AlertController,
    private paramsService: RDParamsService) { }

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
        const notificationContent = this.getNotificationContent(notification);
        this.handleNotification(notificationContent);
      }
    );

    // Gestione evento 'pushNotificationActionPerformed' di apertura app per click su notifica
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notificationAction: PushNotificationActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notificationAction));
        const notificationContent = this.getNotificationContent(notificationAction.notification);
        this.handleNotification(notificationContent);
      }
    );
  }

  // Deserializza il contenuto della notifica
  getNotificationContent(notification: PushNotification) {
    const notifContent = JSON.parse(notification.data.msg);
    return notifContent;
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

  // Gestisce la ricezione di una notifica
  handleNotification(notificationContent: any) {
    const notificationType: string = notificationContent.type;
    switch (notificationType) {
      case "confirmGroupInvite": // Richiesta di aggiunta a gruppo
        this.presentAlertAddToGroup(notificationContent.userIdThatInvites as number, notificationContent.userNameThatInvites as string);
        break;
      case "updateParams": // Richiesta di ricaricamento parametri
        this.paramsService.loadParams().then(
          () => { },
          () => { // Errore ricaricamento parametri
            console.warn("Errore caricamento parametri");
          }
        );
        break;
      default:
        console.warn("Ricevuta notifica di tipologia non gestita");
    }
  }

  // Mostra popup di conferma aggiunta a gruppo a seguito di ricezione notifica
  async presentAlertAddToGroup(userIdThatInvites: number, userNameThatInvites: string) {
    const alert = await this.alertController.create({
      header: 'Nuovo invito',
      message: userNameThatInvites + ' ti ha aggiunto a un gruppo, accetti?',
      buttons: [
        'Cancel',
        {
          text: 'Certo!',
          handler: () => {
            // Confermo l'aggiunta dell'utente al gruppo
            this.sendGroupConfirm(userIdThatInvites).then(
              () => {
                // Gruppo creato, ricarico parametri
                this.paramsService.loadParams();
              },
              () => {
                console.warn("Errore conferma aggiunta a gruppo");
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }

  // Conferma la richiesta di partecipazione a un gruppo
  // Scelto di metterlo qui invece che in ContactsService per evitare dipendenza circolare in fase di build
  async sendGroupConfirm(userIdThatInvites) {
    const addGroupConfirmBody = {
      userId: userIdThatInvites
    };
    await this.spinner.create();
    return this.http.post(this.rdConstants.getApiRoute('inviteGroupConfirm'), addGroupConfirmBody)
      .toPromise()
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }
}
