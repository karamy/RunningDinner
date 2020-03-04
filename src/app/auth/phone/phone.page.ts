import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CountryCodesPage } from './country-codes/country-codes.page';
import { CountryService } from './country-codes/country.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss'],
})
export class PhonePage implements OnInit {

  phoneNumber: number;
  prefix: number;

  constructor(private modalController: ModalController, private countryService: CountryService) {
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
}
