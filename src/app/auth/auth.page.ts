import { Component, OnInit } from "@angular/core";

import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() { }

  // Funzioni di test per effettuare login di prova
  debugLoginToRoomsCarlo() {
    const phoneNumber = "+393408552105";
    this.authService.doLogin(phoneNumber);
  }
  debugLoginToRoomsChiara() {
    const phoneNumber = "+393496824393";
    this.authService.doLogin(phoneNumber);
  }
  debugLoginToRoomsPaolo() {
    const phoneNumber = "+393483773817";
    this.authService.doLogin(phoneNumber);
  }
  debugLoginToRoomsNadia() {
    const phoneNumber = "+393450166161";
    this.authService.doLogin(phoneNumber);
  }
}
