import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodAllergiesPage } from './food-allergies.page';

const routes: Routes = [
  {
    path: '',
    component: FoodAllergiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodAllergiesPageRoutingModule {}
