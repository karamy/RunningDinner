import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Observable, BehaviorSubject } from 'rxjs';

const firebaseConfig = {
  apiKey: "AIzaSyDit-Luu9GP7UwpZTaVerP0EsI70DO-45o",
  authDomain: "runningdinnersms.firebaseapp.com",
  databaseURL: "https://runningdinnersms.firebaseio.com",
  projectId: "runningdinnersms",
  storageBucket: "runningdinnersms.appspot.com",
  messagingSenderId: "65032950194",
  appId: "1:65032950194:web:8c98c255773e86ab5454ab"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user;
  fireuserchats = firebase.database().ref('/allmsg/dinner1');
  allmsgs: string[];
  http: any;
  public allmsg: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() { }

  initializeuser(user) {
    this.user = user;
  }

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
  formatDate(date){
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if ( dd < 10 ){
      dd = '0' + dd;
    }
    if ( mm < 10) {
      mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
  }

  addnewmessage(msg) {
    let time = this.formatAMPM(new Date());
    let date = this.formatDate(new Date());
    console.log('date>>>', date);

    if (this.user) {
      var promise = new Promise((resolve, reject) => {
        this.fireuserchats.push({
          sentby: this.user.name,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          timeofmsg: time,
          dateofmsg: date
        }).then(() => {
          resolve(true);
          })
          .catch((err) => {
            reject(err);
          })
      });
      return promise;
    }
  }
  getdinnermessages() : Observable<any[]>{
    let temp;
    let allmsgs = [];
    this.fireuserchats.on('value', (snapshot) => {
      temp = snapshot.val();
      console.log('counter Message ', temp)
      for (let tempkey in temp) {
        allmsgs.push(temp[tempkey]);
      }
      this.allmsg.next(allmsgs);
    });
    return this.allmsg;
  }
}
