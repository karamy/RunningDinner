import { Component, OnInit } from '@angular/core';
import { PermissionsService } from '../permissions.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {

  constructor(private permServ: PermissionsService, private router: Router) {
  }

  ngOnInit() {
    this.permServ.hasGpsPermission().then(
      () => { // Permesso GPS dato, proseguo a notification
        this.router.navigateByUrl('/auth/notification');
      }, () => { // Richiedo permesso GPS
        this.requestPermission();
      }
    );
  }

  // Richiesta permessi gps
  requestPermission() {
    this.permServ.requestGpsPermission().then(
      () => { // Permesso dato
        this.router.navigateByUrl('/auth/notification');
      }, () => { // Permesso negato
        alert('Permission per il gps obbligatoria');
      });
  }
}
