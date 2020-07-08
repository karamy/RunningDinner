import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-food-allergies-info',
  templateUrl: './food-allergies-info.page.html',
  styleUrls: ['./food-allergies-info.page.scss'],
})
export class FoodAllergiesInfoPage implements OnInit {

  @Input() categories;
  @Input() foodAllergies;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onModalDismiss() {
    this.modalCtrl.dismiss();
  }

}
