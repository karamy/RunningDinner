import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { TabsService } from './tabs/tabs.service'; // Per nascondere le tabs in dinner-details e dinner-event

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private notificationsService: NotificationsService,
    private tabsService: TabsService) { }

  ngOnInit() {
    this.notificationsService.init(); // Inizializzo notifiche push
  }
}
