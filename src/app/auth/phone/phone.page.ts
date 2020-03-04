import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CountryCodesPage } from './country-codes/country-codes.page';
import { CountryService } from './country-codes/country.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss'],
})
export class PhonePage implements OnInit {

  inputNumber: number;
  prefix: number;
  phoneNumber: number;
  existUser;

  constructor(private modalController: ModalController, private countryService: CountryService, private userService: UserService) {
    this.userService.existsUser(this.phoneNumber).then(data => {this.existUser = data;})
   }

  ngOnInit() {
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

  getPhone(){
    this.phoneNumber = this.prefix + this.inputNumber;
    this.userService.existsUser(this.phoneNumber);
    this.userService.userExist = this.existUser;
  }
}