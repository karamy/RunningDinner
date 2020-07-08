import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodAllergiesInfoPage } from './food-allergies-info.page';

const routes: Routes = [
  {
    path: '',
    component: FoodAllergiesInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodAllergiesInfoPageRoutingModule {}
