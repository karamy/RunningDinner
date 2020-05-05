import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-food-allergies',
  templateUrl: './food-allergies.page.html',
  styleUrls: ['./food-allergies.page.scss'],
})
export class FoodAllergiesPage implements OnInit {

  foodAllergyCategories = [
    {
      "name": "Cereali contenenti Glutine",
      "image": "assets/wheat.png"
    },
    {
      "name": "Lattosio",
      "image": "assets/milk.png"
    },
    {
      "name": "Frutta secca e sementi",
      "image": "assets/dried-fruit.png"
    }]

  category: string;
  food: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onModalDismiss() {
    this.modalCtrl.dismiss();
  }

  onConfirm() {
    this.category = this.category.trim()
    const value = this.foodAllergyCategories.find(x => x.name === this.category.trim())
    const image = value.image
    const foodAllergy = { "category": this.category, "image": image, "name": this.food }
    this.modalCtrl.dismiss(foodAllergy);
  }
}
