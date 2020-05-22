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

  // Funzione di test per effettuare login di prova
  debugLoginToDinners(phoneNumber: string) {
    this.authService.doLogin(phoneNumber);
  }
}
