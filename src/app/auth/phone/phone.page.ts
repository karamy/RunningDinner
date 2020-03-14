import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CountryCodesPage } from './country-codes/country-codes.page';
import { CountryService } from './country-codes/country.service';
import { UserService } from '../user.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss'],
})
export class PhonePage implements OnInit {

  inputNumber: number;
  prefix = '+39';
  phoneNumber: string;
  otpSent = false;
  otp: string;
  recaptchaVerifier: any;
  confirmationResult: firebase.auth.ConfirmationResult;

  constructor(private modalController: ModalController, private countryService: CountryService,
              private userService: UserService, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    // Inizializzazione verifier di Firebase
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible'
    });
  }

  // Scelta codice paese
  async presentModalCountryCodes() {
    const modal = await this.modalController.create({
      component: CountryCodesPage
    });
    modal.onDidDismiss()
      .then((res) => {
        this.prefix = res['data'];
      });
    return modal.present();
  }

  // Effettua un tentativo di login, o va alla registrazione
  tryLogin() {
    this.confirmationResult.confirm(this.otp)
      .then(user => {
        console.log(user);
        const reqBody = {
          phone_number: this.phoneNumber + ''
        };
        this.userService.existsUser(reqBody).then(
          data => {
            if (!data) { // Utente non esiste a DB
              this.router.navigateByUrl('/auth/instructions');
            } else { // Effettua il login in automatico
              this.authService.doLogin(this.phoneNumber).then(() => {
                this.router.navigateByUrl('/home/tabs/rooms');
              }, (err) => {
                alert('errore login');
                this.router.navigateByUrl('/auth');
              });
            }
          });
      }).catch(err => {
        console.log(err);
        alert('Codice di verifica non valido');
      });
  }

  // Invia richiesta di invio codice via sms a Firebase
  sendOtp() {
    this.phoneNumber = this.prefix + this.inputNumber;
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPhoneNumber(this.phoneNumber, this.recaptchaVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        this.confirmationResult = confirmationResult;
        this.otpSent = true;
      }).catch(err => {
        console.log(err);
      });
  }
}
