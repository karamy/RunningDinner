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

  // Funzione di test per effettuare login di prova con utente Carlo
  loginToRooms() {
    const phoneNumber = "+393408552105";
    this.authService.doLogin(phoneNumber);
  }
}
