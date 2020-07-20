import { Injectable } from '@angular/core';
import { RDSpinnerService } from '../rdspinner.service';
import { RDConstantsService } from '../rdcostants.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ProfileService } from './profile/profile.service';
import { RDToastService } from '../rdtoast.service';
import { AuthService } from '../auth/auth.service';

//NB l'ordine di questi import è fondamentale per utilizzare correttamente il plugin su tutti i platform
import "capacitor-pwa-firebase-msg";
import { Plugins, PushNotificationToken, PushNotification, PushNotificationActionPerformed } from '@capacitor/core';
import { RDParamsService } from '../rdparams.service';
import { FoodAllergiesService } from '../rdmodals/food-allergies/food-allergies.service';
import { Observable, Subscriber } from 'rxjs';
import { BadgesService } from './profile/badges.service';
const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private lastNotificationTime: Date; // Utilizzato per evitare la gestione multipla della stessa notifica
  private readonly notificationLatencySec: number = 1; // Tempo di latenza (in secondi) per cui, se minore, ignoro la notifica
  private updateParamsObserver: Subscriber<any>;
  updateParamsObservable: Observable<any>; // Observable utilizzato per gestire l'evento 'updateParams' nelle videate 

  constructor(private spinner: RDSpinnerService, private rdConstants: RDConstantsService,
    private http: HttpClient, private alertController: AlertController,
    private paramsService: RDParamsService,
    private profileService: ProfileService,
    private authService: AuthService,
    private foodAllergiesService: FoodAllergiesService,
    private badgesService: BadgesService,
    private rdToast: RDToastService) {

    // Inizializzo l'observable per gestire evento di ricaricamento parametri
    this.updateParamsObservable = new Observable((observer) => {
      this.updateParamsObserver = observer;
    });
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
        this.lastNotificationTime = new Date(); // Imposto alla data attuale l'ultima notifica ricevuta
        this.authService.updateFirebaseToken(token.value).catch(
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

  // Gestisce la ricezione di una notifica
  handleNotification(notificationContent: any) {
    // Check per evitare di far scattare due volte la gestione notifica, impostato tempo di latenza tra notifiche di 1 secondo
    if ((new Date().getTime() - this.lastNotificationTime.getTime()) / 1000 < this.notificationLatencySec) {
      console.log("Ricevuta notifica doppia, ignoro");
      return;
    }

    // Effettiva gestione notifica
    this.lastNotificationTime = new Date();
    const notificationType: string = notificationContent.type;
    switch (notificationType) {
      case "confirmGroupInvite": // Richiesta di aggiunta a gruppo
        this.presentAlertAddToGroup(notificationContent.userIdThatInvites as number, notificationContent.userNameThatInvites as string, notificationContent.userIdThatInvitesHouse as boolean);
        break;
      case "updateParams": // Richiesta di ricaricamento parametri
        this.paramsService.loadParams()
          .then(() => {
            if (this.paramsService.getParams().groupId) {
              this.profileService.getPartnerData(this.authService.getUserData()).then(() => {
                this.foodAllergiesService.getPartnerFoodAllergies(this.authService.getUserData().userid);
                this.badgesService.getPartnerBadges(this.authService.getUserData().userid);
              },
                () => {
                  console.log("Errore getPartnerData")
                })
            } else {
              this.profileService.clearPartner();
              this.foodAllergiesService.clearGroupFoodAllergies();
              this.badgesService.clearGroupBadges();
              this.rdToast.show('Il gruppo è stato sciolto', 2000);
            }
            this.fireUpdateParamsEvent();
          })
          .catch(
            () => { // Errore ricaricamento parametri
              console.warn("Errore caricamento parametri");
            }
          );
        break;
      default:
        console.warn("Ricevuta notifica di tipologia non gestita");
    }
  }

  // Scateno evento di ricaricamento parametri (undefined se non ci sono sottoscrizioni)
  fireUpdateParamsEvent() {
    if (this.updateParamsObserver) {
      this.updateParamsObserver.next();
    }
  }

  // Ritorna l'observable per gestire ricaricamento parametri in videate
  getUpdateParamsObservable(): Observable<any> {
    return this.updateParamsObservable;
  }

  // Mostra popup di conferma aggiunta a gruppo a seguito di ricezione notifica
  async presentAlertAddToGroup(userIdThatInvites: number, userNameThatInvites: string, userIdThatInvitesHouse: boolean) {
    const addToGroupMsg = userIdThatInvitesHouse ? userNameThatInvites + ' ti ha aggiunto a un gruppo a casa sua, accetti?' : userNameThatInvites + ' ti ha aggiunto a un gruppo a casa tua, accetti?'

    const alert = await this.alertController.create({
      header: 'Nuovo invito',
      message: addToGroupMsg,
      buttons: [
        'Cancel',
        {
          text: 'Certo!',
          handler: () => {
            // Confermo l'aggiunta dell'utente al gruppo
            const houseUserId = userIdThatInvitesHouse ? userIdThatInvites : this.authService.getUserData().userid;
            this.sendGroupConfirm(userIdThatInvites, houseUserId).then(
              () => {
                // Gruppo creato, ricarico parametri e carico i dati del partner
                this.paramsService.loadParams().then(() => {
                  this.profileService.getPartnerData(this.authService.getUserData()).then(
                    () => {
                      this.foodAllergiesService.getPartnerFoodAllergies(this.authService.getUserData().userid);
                      this.badgesService.getPartnerBadges(this.authService.getUserData().userid);

                      // Emetto l'evento di ricaricamento parametri anche se attualmente essendo
                      // utilizzato solo nella chat, è inutile ricaricarla dopo la creazione gruppo
                      this.fireUpdateParamsEvent();
                    },
                    () => {
                      console.log('Errore getPartnerData');
                    });
                });
              },
              () => {
                console.warn('Errore conferma aggiunta a gruppo');
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }

  // Conferma la richiesta di partecipazione a un gruppo, specificando chi mette la casa
  // Scelto di metterlo qui invece che in ContactsService per evitare dipendenza circolare
  // in fase di build
  async sendGroupConfirm(userIdThatInvites: number, contactHouseId: number) {
    const addGroupConfirmBody = {
      userId: userIdThatInvites,
      contactHouseId: contactHouseId
    };
    await this.spinner.create();
    return this.http.post(this.rdConstants.getApiRoute('inviteGroupConfirm'), addGroupConfirmBody)
      .toPromise()
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }
}
