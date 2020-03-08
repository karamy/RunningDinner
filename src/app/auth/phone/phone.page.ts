import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CountryCodesPage } from './country-codes/country-codes.page';
import { CountryService } from './country-codes/country.service';
import { UserService } from '../user.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss'],
})
export class PhonePage implements OnInit {

  inputNumber: number;
  prefix = "+39";
  phoneNumber;
  existUser;
  otpSent: boolean = false;
  otp: string = null;
  recaptchaVerifier: any;
  confirmationResult: any;

  constructor(private modalController: ModalController, private countryService: CountryService, private userService: UserService, private router: Router) {
    this.userService.existsUser(this.phoneNumber).then(data => {this.existUser = data;})
   }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible'
    });
  }
 
  async presentModal() {
    const modal = await this.modalController.create({
      component: CountryCodesPage
    });
    modal.onDidDismiss()
    .then((data) => {
      const number = data['data'];
      this.prefix = number;
    });
    return modal.present();
  }

  signIn(){
    this.confirmationResult.confirm(this.otp)
    .then(user=>{
      console.log(user)
      this.userService.existsUser(this.phoneNumber);
      this.userService.userExist = this.existUser;
      this.router.navigateByUrl('/auth/instructions');
    }).catch(err => {
      console.log(err)
      alert("Codice di verifica non valido")
    })
  }

  sendOtp(){
    this.phoneNumber = this.prefix + this.inputNumber;
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPhoneNumber(this.phoneNumber, this.recaptchaVerifier)
    .then((confirmationResult) => {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    this.confirmationResult = confirmationResult;
    this.otpSent = true;
    }).catch(err => {
    console.log(err)
    })
  }
}