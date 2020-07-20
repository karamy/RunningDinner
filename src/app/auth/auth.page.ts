import { Component, OnInit } from "@angular/core";

import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit {
  debugLoginUsers: any[];
  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.debugLoginUsers = [
      {
        userName: "Carlo",
        userNumber: "+393408552105"
      },
      {
        userName: "Paolo",
        userNumber: "+393483773817"
      },
      {
        userName: "Nadia",
        userNumber: "+393450166161"
      },
      {
        userName: "Andrea",
        userNumber: "+393495339159"
      },
      {
        userName: "Chiara",
        userNumber: "+393496824393"
      },
      {
        userName: "Sid",
        userNumber: "+393914174499"
      },
      {
        userName: "Ale",
        userNumber: "+393408552107"
      },
      {
        userName: "Matteo",
        userNumber: "+393338829439"
      },
      {
        userName: "Emulatore",
        userNumber: "+391234567890"
      }
    ];
  }

  // Funzione di test per effettuare login di prova
  debugLoginToDinners(phoneNumber: string) {
    this.authService.doLogin(phoneNumber);
  }
}
