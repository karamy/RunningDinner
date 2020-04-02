import { Component, OnInit } from '@angular/core';
import { PermissionsService } from '../permissions.service';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss']
})
export class GeolocationPage implements OnInit {
  permissionGranted: string;

  constructor(private permServ: PermissionsService) { }

  ngOnInit() {
    this.permServ.hasGpsPermission().then(
      () => {
        // Permesso GPS dato
        this.permissionGranted = 'true';
        console.log('Permesso dato');
      },
      status => {
        // Permesso GPS non dato
        if (
          status === 'not_requested' ||
          status === 'not_determined' ||
          status === 'denied_once'
        ) {
          // Mostro tasto per chiedere permesso
          this.permissionGranted = 'false';
          console.log(this.permissionGranted);
        } else {
          // Mostro tasto impostazioni
          this.permissionGranted = 'settings';
          console.log(this.permissionGranted);
        }
      }
    );
  }

  // Richiesta permessi gps
  requestPermission() {
    this.permServ.requestGpsPermission().then(
      () => {
        // Permesso dato
        this.permissionGranted = 'true';
      },
      status => {
        // Permesso negato
        console.log('Status ritornato: ' + status);
        if (status !== 'denied_once') {
          // Mostro tasto impostazioni
          this.permissionGranted = 'settings';
        }
      }
    );
  }

  // Richiesta accesso a impostazioni e ri-controllo
  forcePermissions() {
    this.permServ
      .forcePermissions()
      .then(() => {
        console.log('resolved');
        this.permServ
          .hasGpsPermission()
          .then(() => {
            // Permesso GPS dato
            this.permissionGranted = 'true';
          })
          .catch(() => {
            // Permesso GPS non dato
            console.log('Permission Denied');
          });
      })
      .catch(() => {
        console.log('rejected');
      });
  }
}
