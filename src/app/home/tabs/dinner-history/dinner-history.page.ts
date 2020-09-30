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

   // this.dinnersService
}

  goToDinnerChat(dinner: Dinner) {
      this.router.navigate(['/home/tabs/dinner-history/chat'], {queryParams: dinner});
  }
}