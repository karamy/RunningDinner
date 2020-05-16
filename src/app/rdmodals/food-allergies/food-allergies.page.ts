import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { RDConstantsService } from 'src/app/rdcostants.service';

@Component({
  selector: 'app-food-allergies',
  templateUrl: './food-allergies.page.html',
  styleUrls: ['./food-allergies.page.scss'],
})
export class FoodAllergiesPage implements OnInit {

  foodAllergies: FoodAllergy[];
  selectedCategory: string;
  selectedFood: string;

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private rdConstants: RDConstantsService) { }

  ngOnInit() {
    this.getFoodAllergies();
  }

  // Carica le foodAllergies dal DB
  async getFoodAllergies() {
    return new Promise(() => {
      this.http
        .get(this.rdConstants.getApiRoute('getFoodAllergies'))
        .toPromise()
        .then(
          res => {
            this.foodAllergies = res as FoodAllergy[];
            console.log(this.foodAllergies);
          },
          () => {
            console.log('Errore nel caricamento delle intolleranze');
          }
        );
    });
  }

  // Post food allergy //TODO
  // async getFoodAllergies() {
  //   return new Promise(() => {
  //     this.http
  //       .get(this.rdConstants.getApiRoute('getFoodAllergies'))
  //       .toPromise()
  //       .then(
  //         res => {
  //           this.foodAllergies = res as FoodAllergy[]
  //           console.log(this.foodAllergies)
  //         },
  //         () => {
  //           console.log("Errore nel caricamento delle intolleranze")
  //         }
  //       )
  //   });
  // }

  onModalDismiss() {
    this.modalCtrl.dismiss();
  }

  onConfirm() { // Da sistemare
    const value = this.foodAllergies.find(x => x.category === this.selectedCategory.trim());
    // postFoodAllergy();
    const image = value.allergy_photo;
    // const foodAllergy = { "category": this.category, "image": image, "name": this.food }
    // this.modalCtrl.dismiss(foodAllergy);
    this.modalCtrl.dismiss();
  }
}

export interface FoodAllergy {
  category: string;
  allergy_photo: string;
}
