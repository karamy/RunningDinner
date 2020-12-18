import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NotificationsService } from './notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private notificationsService: NotificationsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.notificationsService.init(); // Inizializzo notifiche push
    this.authService.loadOtherParamsInBackground(); // Carico dati profilo, badge ecc. in background ad avvio app
  }
}
