import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firebase } from '@firebase/app';
import '@firebase/database';
import { Observable } from 'rxjs';
import { RDConstantsService } from 'src/app/rdcostants.service';
import { RDParamsService } from 'src/app/rdparams.service';
import { RDSpinnerService } from 'src/app/rdspinner.service';
import { RDStorageService } from 'src/app/rdstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  firebaseReference: any;
  allMsgObservable: Observable<any>;
  private _chatImages: UserChat[];
  private syncInProgress = false;

  constructor(private paramsService: RDParamsService,
    private http: HttpClient, private rdConstants: RDConstantsService,
    private rdParams: RDParamsService, private rdStorage: RDStorageService,
    private spinner: RDSpinnerService) {

    // Inizializzazione Firebase, verificando che non sia già stato fatto in precedenza
    const firebaseConfig = {
      apiKey: "AIzaSyDit-Luu9GP7UwpZTaVerP0EsI70DO-45o",
      authDomain: "runningdinnersms.firebaseapp.com",
      databaseURL: "https://runningdinnersms.firebaseio.com",
      projectId: "runningdinnersms",
      storageBucket: "runningdinnersms.appspot.com",
      messagingSenderId: "65032950194",
      appId: "1:65032950194:web:8c98c255773e86ab5454ab"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.readChatImages();
  }

  // Cancella dal localStorage i contatti che matchano
  public async clearChatImages() {
    await this.rdStorage.setItem('chatImages', null);
    await this.readChatImages();
  }

  // Legge le informazioni sui contatti presenti in localStorage e le carica nel Service
  private async readChatImages() {
    this._chatImages = JSON.parse(
      await this.rdStorage.getItem('chatImages')
    ) as UserChat[] || [];
  }

  // Aggiorna le chatImages in localStorage
  private async writeChatImages(chatImages: UserChat[]) {
    await this.rdStorage.setItem('chatImages', JSON.stringify(chatImages));
    await this.readChatImages();
  }

  // Caricamento immagini degli utenti che partecipano alla chat
  private loadChatImages(force: Boolean) {
    return new Promise(async (resolve, reject) => {
      if (force || (!this._chatImages || !this._chatImages.length) && !this.syncInProgress) {
        await this.spinner.create("Caricamento immagini chat...");
        this.syncInProgress = true;

        const getChatImagesBody = {
          dinnerId: this.paramsService.getParams().dinnerId || 0
        };
        this.http.post(
          this.rdConstants.getApiRoute('getChatImages'), getChatImagesBody)
          .toPromise()
          .then(
            async (chatImages) => {
              // Converto le immagini in formato leggibile dal tag 'src' direttamente prima di salvare
              for (let i = 0; i < (chatImages as UserChat[]).length; i++) {
                chatImages[i]['profile_photo'] = 'data:image/jpeg;base64,' + chatImages[i]['profile_photo'];
              }

              await this.writeChatImages(chatImages as UserChat[]);
              this.syncInProgress = false;
              resolve(this._chatImages);
            },
            (err) => {
              this.syncInProgress = false;
              console.warn(err);
              reject();
            }
          )
          .finally(
            () => { this.spinner.dismiss(); });
      } else {
        resolve(this._chatImages);
      }
    });
  }

  public getUserChatImage(userId: Number): String {
    const userChat = this.getUserChat(userId);
    if (userChat) {
      return userChat.profile_photo;
    }
    return "";
  }

  public getUserChatName(userId: Number) {
    const userChat = this.getUserChat(userId);
    if (userChat) {
      return userChat.name;
    }
  }

  private getUserChat(userId: Number) {
    for (let i = 0; i < this._chatImages.length; i++) {
      if (this._chatImages[i].userid == userId) {
        return this._chatImages[i];
      }
    }
    return null;
  }

  // Inizializza il service, ritornando l'observable su cui effettuo la subscribe
  // per ottenere i messaggi
  // NB. Scelgo di ritornare una promise per rendere il metodo async (e rendere il metodo loadChatImages awaitable),
  // di fatto potrei non farlo perchè il caricamento ora è asincrono
  async init(force: Boolean): Promise<Observable<any[]>> {
    this.loadChatImages(force); // Lancio in background ricaricamento immagini utenti

    // Valorizzo il riferimento alla chat della cena a cui fa parte l'utente, oppure a quella generale 'noDinner' (ora si potrebbe rimuovere questa possibilità)
    this.firebaseReference = firebase.database().ref('/chat/' + (this.paramsService.getParams().dinnerId ? this.paramsService.getParams().dinnerId.toString() : 'noDinner'));

    this.allMsgObservable = new Observable((observer) => {
      let receivedMsg = {};
      let firebaseMessages = [];
      this.firebaseReference.on('child_added', (res) => {
        receivedMsg = res.val();
        if (receivedMsg) {
          console.log('Messaggio ricevuto: ', JSON.stringify(receivedMsg));
          firebaseMessages.push(receivedMsg);
          observer.next(firebaseMessages); // Informo chi si è sottoscritto dell'arrivo di nuovi messaggi, fornendoglieli
          firebaseMessages = [];
        }
      });
    });

    return this.allMsgObservable;
  }

  // Effettua la formattazione di un'orario scrivendo am/pm
  formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  // Effettua la formattazione di una data con gg/MM/yyyy
  formatDate(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
  }

  // Invia un nuovo messaggio, informando l'api per l'invio notifiche e ritornando la Promise di firebase
  addNewMessage(userId, msgText) {
    const time = this.formatAMPM(new Date());
    const date = this.formatDate(new Date());
    const msgToSend: ChatMsg = {
      userid: userId,
      message: msgText,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      timeofmsg: time,
      dateofmsg: date
    };

    this.sendNewMessageNotification();

    return this.firebaseReference.push(msgToSend);
  }

  // Invia richiesta all'api di invio notifica agli altri partecipanti della cena
  sendNewMessageNotification() {
    const sendNewNotificationBody = {
      dinnerId: this.rdParams.getParams().dinnerId
    }
    this.http.post(this.rdConstants.getApiRoute('sendNewMessageNotification'), sendNewNotificationBody)
      .toPromise()
      .catch((e) => {
        console.log('SendNewMessageNotification error', e);
      });
  }
}

// Rappresenta un messaggio della chat 
export interface ChatMsg {
  userid: number, // Indica l'id dell'utente che ha inviato il emssaggio
  message: string, // Testo del messaggio
  timestamp: any, // Timestamp di invio messaggio di firebase
  timeofmsg: string, // Datetime di invio messaggio
  dateofmsg: string // Data di invio messaggio
}

// Rappresenta un'immagine cachata della chat
export interface UserChat {
  userid: number,
  profile_photo: string,
  name: string
}
