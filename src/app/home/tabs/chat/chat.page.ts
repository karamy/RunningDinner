import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, UserData } from "src/app/auth/auth.service";
import { ChatService, ChatMsg } from "src/app/home/tabs/chat/chat.service";
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  // Recupero attraverso annotation @ViewChild il riferimento all'elemento del DOM su cui effettuare lo scroll
  @ViewChild('content', { static: false }) content: IonContent;
  newMsgText: String;
  dinnermessages: ChatMsg[] = [];
  user: UserData;

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {
    // Inizializzazione chat e caricamento messaggi
    this.user = this.authService.getUserData();
    this.chatService.getDinnerMessagesObservable().subscribe((data) => {
      this.dinnermessages = this.dinnermessages.concat(data);
    });
  }

  // Invia il messaggio, portando la videata a scrollare in fondo
  sendMsg() {
    this.chatService.addNewMessage(this.newMsgText).then(() => {
      this.content.scrollToBottom();
      this.newMsgText = '';
    });
  }
  // scrollto() {
  //   setTimeout(() => {
  //       this.content.scrollToBottom();
  //     }, 1000);
  //   }
}