import { Component, OnInit } from "@angular/core";
import { PermissionsService } from "../permissions.service";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.page.html",
  styleUrls: ["./notification.page.scss"]
})
export class NotificationPage implements OnInit {
  permissionGranted: string;

  constructor(
    private permServ: PermissionsService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.permServ.hasNotificationPermission().then(
      () => {
        // Permesso Notifications dato
        this.permissionGranted = "true";
        console.log("Permesso dato");
      },
      () => {
        //Permesso Notifications non dato.
        if (this.platform.is("ios")) {
          // Mostro bottone notifiche
          this.permissionGranted = "false";
          console.log(this.permissionGranted);
        } else if (this.platform.is("android")) {
          // Mostro bottone impostazioni
          this.permissionGranted = "settings";
          console.log(this.permissionGranted);
        }
      }
    );
  }

  // Richiesta permessi Notifications (solo iOS)
  requestPermission() {
    this.permServ
      .requestNotificationPermission()
      .then(() => {
        // Permesso dato
        this.permissionGranted = "true";
      })
      // Errore
      .catch(err => {
        console.log("Errore: " + err);
      });
  }

  //Richiesta accesso a impostazioni e ri-controllo
  forcePermissions() {
    this.permServ
      .forcePermissions()
      .then(() => {
        console.log("resolved");
        this.permServ
          .hasNotificationPermission()
          .then(() => {
            // Permesso Notifiche dato
            this.permissionGranted = "true";
          })
          .catch(() => {
            console.log("Permission Denied");
          });
      })
      .catch(() => {
        console.log("rejected");
      });
  }
}
