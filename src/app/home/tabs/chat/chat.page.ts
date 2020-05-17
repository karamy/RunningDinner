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
  @ViewChild('chatContent', { static: false }) chatContent: IonContent;
  newMsgText: String;
  dinnermessages: ChatMsg[] = [];
  user: UserData;

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {
    // Inizializzazione chat e caricamento messaggi
    this.user = this.authService.getUserData();
    this.chatService.getDinnerMessagesObservable().subscribe((firebaseMessages) => {
      if (this.dinnermessages.length == 0) { // Scrollo in fondo solo alla prima ricezione dei messaggi
        this.scrollToBottom();
      }
      this.dinnermessages = firebaseMessages;
    });
  }

  // Invia il messaggio, portando la videata a scrollare in fondo
  sendMsg() {
    this.chatService.addNewMessage(this.newMsgText).then(() => {
      this.scrollToBottom();
      this.newMsgText = '';
    });
  }

  // Effettua lo scroll del contenuto della chat, inserendolo all'interno di
  // un timeout per permettere ad angular di effettuare un ciclo di digest e caricare i dati
  scrollToBottom() {
    setTimeout(() => {
      this.chatContent.scrollToBottom();
    });
  }
}