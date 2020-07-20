import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DinnerMapPage } from './dinner-map.page';

const routes: Routes = [
  {
    path: '',
    component: DinnerMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DinnerMapPageRoutingModule {}
