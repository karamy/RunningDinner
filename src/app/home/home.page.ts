import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
    private tabsService: TabsService,
    private navController: NavController) { }

  ngOnInit() {
    this.notificationsService.init(); // Inizializzo notifiche push
  }

  tabChange(event) { // Se passo al tab my-dinners viene cancellato lo stack
    if (event.tab === 'my-dinners') {
      console.log('verificato');
      this.navController.navigateRoot('/home/tabs/my-dinners');
    }
  }
}
