import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { PermissionsService } from '../permissions.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(private router: Router, private permServ: PermissionsService) { }

  ngOnInit() {
    this.permServ.hasNotificationPermission().then(
      () => { // Permesso notification dato, proseguo a notification
        this.router.navigateByUrl('/auth');
      }, () => { // Richiedo permesso Notification
        this.requestPermission();
      }
    );
  }

  // Richiesta permessi Notification
  requestPermission() {
    this.permServ.requestNotificationPermission().then(
      () => { // Permesso Notification dato
        this.router.navigateByUrl('/auth/notification');
      }, () => { // Permesso negato
        alert('Permission Notification obbligatoria');
      });
  }
}
