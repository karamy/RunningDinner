import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, UserData } from 'src/app/auth/auth.service';
import { NotificationsService } from '../../notifications.service';
import { ProfileService } from '../../profile/profile.service';
import { Dinner, DinnersService } from '../dinners/dinners.service';
import { ChatMsg, ChatService } from './chat/chat.service';


@Component({
  selector: 'app-dinner-history',
  templateUrl: './dinner-history.page.html',
  styleUrls: ['./dinner-history.page.scss'],
})

export class DinnerHistoryPage implements OnInit {

dinnerMessages: ChatMsg[] = [];
user: UserData;
messagesSubscription: Subscription;

  myDinner: Dinner;
  dinnerList: Dinner[];
  
  constructor(    
    private chatService: ChatService,
    private dinnersService: DinnersService,
    private router: Router,
    private authService: AuthService,
  public profileService: ProfileService,
  private notificationService: NotificationsService
    ) { }

  ngOnInit() {
    
    this.loadDinners();
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

  loadDinners(event?) {
    this.dinnersService.getDinners().then(
      (response: DinnerResponse) => {
        console.log(response);
        this.myDinner = response.myDinner;
        this.dinnerList = response.otherDinners;
        if (this.myDinner) {
          const myDinnerDateTime = this.dinnersService.formatDate(this.myDinner.date);
          this.myDinner.dateString = myDinnerDateTime[0];
          this.myDinner.time = Number(myDinnerDateTime[1]);
        }
        for (let i = 0; i < this.dinnerList.length; i++) {
          const dinnerDateTime = this.dinnersService.formatDate(this.dinnerList[i].date);
          this.dinnerList[i].dateString = dinnerDateTime[0];
          this.dinnerList[i].time = Number(dinnerDateTime[1]);
        }
      }
        );
    }

    handleNewMessages(receivedMessages) {
      if (this.dinnerMessages.length === 0) { // Scrollo in fondo solo alla prima ricezione dei messaggi
      }
      this.dinnerMessages = this.dinnerMessages.concat(receivedMessages);
    }

  goToDinnerChat(dinner: Dinner) {
      this.router.navigate(['/home/tabs/dinner-history/chat'], {queryParams: dinner});
  }
  goToDinnerWinner(dinner: Dinner) {
    this.router.navigate(['/home/tabs/dinner-history/dinner-winners'], {queryParams: dinner});
}
}

export interface DinnerResponse {
  // Scelto di separare la cena di cui faccio parte dalle altre
  // per poterle in futuro caricare a pagine
  myDinner: Dinner;
  otherDinners: Dinner[];
}