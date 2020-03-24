import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { CountryCodesPage } from "./country-codes/country-codes.page";
import { PhoneService } from "./phone.service";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-phone",
  templateUrl: "./phone.page.html",
  styleUrls: ["./phone.page.scss"]
})
export class PhonePage implements OnInit {
  inputNumber: number;
  prefix = "+39";
  phoneNumber: string;
  otp: string;
  otpSent = false;

  constructor(
    private modalController: ModalController,
    private phoneService: PhoneService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  // Scelta codice paese
  async presentModalCountryCodes() {
    const modal = await this.modalController.create({
      component: CountryCodesPage
    });
    modal.onDidDismiss().then(res => {
      this.prefix = res["data"];
    });
    return modal.present();
  }

  // Invia richiesta di invio codice via sms a Firebase e riceve verificationID
  sendOtp() {
    this.phoneNumber = this.prefix + this.inputNumber;
    this.phoneService.sendOtp(this.phoneNumber).then(() => {
      this.otpSent = true;
    });
  }

  // Effettua un tentativo di login, o va alla registrazione
  tryLogin() {
    this.phoneService.verifyNumber(this.otp).then(() => {
      const reqBody = {
        phone_number: this.phoneNumber + ""
      };
      this.userService.existsUser(reqBody).then(data => {
        if (!data) {
          // Utente non esiste a DB
          this.router.navigateByUrl("/auth/instructions");
        } else {
          // Effettua il login in automatico
          this.authService.doLogin(this.phoneNumber).then(
            () => {
              this.router.navigateByUrl("/home/tabs/rooms");
            },
            err => {
              alert("errore login");
              this.router.navigateByUrl("/auth");
            }
          );
        }
      });
    });
  }
}
