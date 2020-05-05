import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodAllergiesPageRoutingModule } from './food-allergies-routing.module';

import { FoodAllergiesPage } from './food-allergies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodAllergiesPageRoutingModule
  ],
  declarations: [FoodAllergiesPage]
})
export class FoodAllergiesPageModule {}
