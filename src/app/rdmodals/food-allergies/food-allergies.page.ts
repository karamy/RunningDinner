import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodAllergiesService } from './food-allergies.service';
import { RDToastService } from 'src/app/rdtoast.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-food-allergies',
  templateUrl: './food-allergies.page.html',
  styleUrls: ['./food-allergies.page.scss'],
})
export class FoodAllergiesPage implements OnInit {

  @Input() foodAllergies: FoodAllergy[];
  @Input() userFoodAllergies: UserAllergy[];

  selectedCategory: string;
  selectedFood: string;

  constructor(
    private modalCtrl: ModalController,
    private foodAllergiesService: FoodAllergiesService,
    private authService: AuthService,
    private rdToast: RDToastService) { }

  ngOnInit() { }

  onModalDismiss() {
    this.modalCtrl.dismiss();
  }

  onConfirm() {
    if (this.isAllergyUnique() === true) {
      // Creo l'intolleranza dell'utente cercando la categoria corrisponente nell'array di tutte le intolleranze
      const userAllergy: UserAllergy = this.foodAllergies.find(x => x.category === this.selectedCategory.trim());
      userAllergy.allergy_name = this.selectedFood;
      this.foodAllergiesService.insertUserFoodAllergies(userAllergy.allergy_id, userAllergy.allergy_name, this.authService.getUserData().userid).then(() => {
        this.foodAllergiesService.getUserFoodAllergiesData(this.authService.getUserData().userid).then(() => {
          this.modalCtrl.dismiss();
        });
      });
    } else {
      this.rdToast.show('Intolleranza già presente', 2000, 'danger');
    }
  }

  isAllergyUnique() {
    // Controllo che in userFoodAllergies non esista già un elemento con stesso nome e stessa categoria scelti
    if (this.userFoodAllergies.find(x => x.allergy_name.toLowerCase() === this.selectedFood.trim().toLowerCase()) !== undefined) {
      const allergyToControl = this.userFoodAllergies.find(x => x.allergy_name.toLowerCase() === this.selectedFood.trim().toLowerCase())
      if (allergyToControl.category === this.selectedCategory.trim()) {
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  }
}

export interface FoodAllergy {
  allergy_id: number;
  category: string;
  allergy_photo: string;
}

export interface UserAllergy extends FoodAllergy {
  allergy_name?: string;
  user_id?: number;
}
