import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.notificationsService.init(); // Inizializzo notifiche push
  }
}
