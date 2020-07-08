import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodAllergiesInfoPageRoutingModule } from './food-allergies-info-routing.module';

import { FoodAllergiesInfoPage } from './food-allergies-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodAllergiesInfoPageRoutingModule
  ],
  declarations: [FoodAllergiesInfoPage]
})
export class FoodAllergiesInfoPageModule { }
