import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CountryCodesPage } from '../../rdmodals/country-codes/country-codes.page';
import { PhoneService } from './phone.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { SignupService } from 'src/app/sign-up/signup-service.service';
import { RDSpinnerService } from 'src/app/rdspinner.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss']
})
export class PhonePage implements OnInit {
  phoneNumber: string; // Numero completo che funge da ID utente
  inputNumber: string;
  prefix = '+39';
  otp: string;
  otpSent = false;

  constructor(
    private modalController: ModalController,
    private phoneService: PhoneService,
    private userService: UserService,
    private spinner: RDSpinnerService,
    private navController: NavController,
    private authService: AuthService,
    private signupService: SignupService
  ) { }

  ngOnInit() { }

  // Scelta codice paese
  async presentModalCountryCodes() {
    const modal = await this.modalController.create({
      component: CountryCodesPage
    });
    modal.onDidDismiss().then(res => {
      this.prefix = res.data;
    });
    return modal.present();
  }

  // Invia richiesta di invio codice via sms a Firebase e riceve verificationID (in iOS) oppure verificationID e OTP (in Android)
  sendOtp() {
    this.phoneNumber = this.prefix + this.inputNumber;
    this.phoneService.sendOtp(this.phoneNumber).then((verificationId) => {
      if (verificationId) {
        this.otpSent = true;
      } else {
        this.tryLogin()
      }
    })
      .catch(() => {
        alert("Si è verificato un errore nella verifica del numero");
      })
  }

  // Verifica il numero ed effettua login su Firebase
  verifyNumber() {
    this.phoneService.verifyNumber(this.otp).then(() => {
      this.tryLogin();
    })
      .catch(() => {
        alert("Si è verificato un errore nella verifica del numero di telefono")
      })
  }

  // Effettua un tentativo di login, o va alle istruzioni
  tryLogin() {
    const reqBody = {
      phone_number: this.phoneNumber
    };
    this.spinner.create("Effettuo login...");
    this.userService.existsUser(reqBody).then(data => {
      this.spinner.dismiss();
      if (!data) {
        // Utente non esiste a DB, inizio registrazione
        this.signupService.setPhoneNumber(this.phoneNumber);
        this.navController.navigateRoot('/sign-up/instructions');
      } else {
        // Effettua il login in automatico
        this.authService.doLogin(this.phoneNumber);
      }
    },
      () => { this.spinner.dismiss() }
    );
  }
}
