import { Injectable } from '@angular/core';
import { firebase } from '@firebase/app';
import '@firebase/database';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { RDParamsService } from 'src/app/rdparams.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  firebaseReference: any;
  allMsgObservable: Observable<any>

  constructor(private authService: AuthService, private paramsService: RDParamsService) {
    const firebaseConfig = {
      apiKey: "AIzaSyDit-Luu9GP7UwpZTaVerP0EsI70DO-45o",
      authDomain: "runningdinnersms.firebaseapp.com",
      databaseURL: "https://runningdinnersms.firebaseio.com",
      projectId: "runningdinnersms",
      storageBucket: "runningdinnersms.appspot.com",
      messagingSenderId: "65032950194",
      appId: "1:65032950194:web:8c98c255773e86ab5454ab"
    };

    // Inizializzazione Firebase, verificando che non sia già stato fatto in precedenza
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  // Inizializza il service, ritornando l'observable su cui effettuo la subscribe
  // per ottenere i messaggi
  init(): Observable<any[]> {
    // Valorizzo il riferimento alla chat della cena a cui fa parte l'utente, oppure a quella generale 'noDinner'
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

  // Invia un nuovo messaggio, ritornando la Promise di firebase
  addNewMessage(msgText) {
    const time = this.formatAMPM(new Date());
    const date = this.formatDate(new Date());
    const msgToSend: ChatMsg = {
      sentby: this.authService.getUserData().name,
      message: msgText,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      timeofmsg: time,
      dateofmsg: date
    };

    return this.firebaseReference.push(msgToSend);
  }
}

// Rappresenta un messaggio della chat 
export interface ChatMsg {
  sentby: string, // Indica il nome dell'utente che ha inviato il messaggio
  message: string, // Testo del messaggio
  timestamp: any, // Timestamp di invio messaggio di firebase
  timeofmsg: string, // Datetime di invio messaggio
  dateofmsg: string // Data di invio messaggio
}
