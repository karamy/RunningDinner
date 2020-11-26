import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, UserData } from 'src/app/auth/auth.service';
import { IonContent } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/home/profile/profile.service';
import { ChatMsg, ChatService } from './chat.service';
import { NotificationsService } from 'src/app/home/notifications.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  // Recupero attraverso annotation @ViewChild il riferimento all'elemento del DOM su cui effettuare lo scroll
  @ViewChild('chatContent', { static: false }) chatContent: IonContent;
  newMsgText: string;
  dinnerMessages: ChatMsg[] = [];
  user: UserData;
  messagesSubscription: Subscription;

  constructor(private chatService: ChatService,
    private authService: AuthService,
    public profileService: ProfileService,
    private notificationService: NotificationsService) { }

  ngOnInit() {
    // Inizializzazione chat e caricamento messaggi
    this.user = this.authService.getUserData();
    this.messagesSubscription = this.chatService.init().subscribe((receivedMessages) => {
      this.handleNewMessages(receivedMessages);
    });

    // Registrazione observable per reagire al ricaricamento chat (es. vengo aggiunto a una cena)
    this.notificationService.getUpdateParamsObservable().subscribe(() => {
      console.log("Chat - Ricarico parametri e messaggi");
      this.dinnerMessages = [];
      this.messagesSubscription.unsubscribe();
      this.messagesSubscription = this.chatService.init().subscribe((receivedMessages) => {
        this.handleNewMessages(receivedMessages);
      });
    });
  }

  // Gestione di un nuovo messaggio
  handleNewMessages(receivedMessages) {
    if (this.dinnerMessages.length === 0) { // Scrollo in fondo solo alla prima ricezione dei messaggi
      this.scrollToBottom();
    }
    this.dinnerMessages = this.dinnerMessages.concat(receivedMessages);
  }

  // Invia il messaggio, portando la videata a scrollare in fondo
  sendMsg() {
    if (this.newMsgText) {
      this.chatService.addNewMessage(this.newMsgText).then(() => {
        this.scrollToBottom();
        this.newMsgText = '';
      });
    }
  }

  // Effettua lo scroll del contenuto della chat, inserendolo all'interno di
  // un timeout per permettere ad angular di effettuare un ciclo di digest e caricare i dati
  scrollToBottom() {
    setTimeout(() => {
      this.chatContent.scrollToBottom();
    });
  }
}