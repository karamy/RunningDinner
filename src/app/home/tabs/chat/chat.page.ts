import { Component, OnInit, ViewChild  } from '@angular/core';
import {AuthService} from "src/app/auth/auth.service";
import firebase from 'firebase';
import {ChatService} from "src/app/home/tabs/chat/chat.service";
import {IonContent} from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild('content', {static: false}) content: IonContent;
  user;
  newmsg;
  dinnermessages = [];

  constructor(private authService: AuthService, private chatService: ChatService) {}


  ngOnInit() {
    this.user = this.authService.getUserData();
    this.chatService.initializeuser(this.user);
    this.chatService.getdinnermessages().subscribe((data) => {
      this.dinnermessages= this.dinnermessages.concat(data);
    });
  }

  sendMsg(){
  this.chatService.addnewmessage(this.newmsg).then(() => {
    this.content.scrollToBottom();
    this.newmsg = '';
  });
}
// scrollto() {
//   setTimeout(() => {
//       this.content.scrollToBottom();
//     }, 1000);
//   }
}