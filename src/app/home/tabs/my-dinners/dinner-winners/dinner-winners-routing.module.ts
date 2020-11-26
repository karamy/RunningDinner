import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DinnerWinnersPage } from './dinner-winners.page';

const routes: Routes = [
  {
    path: '',
    component: DinnerWinnersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DinnerWinnersPageRoutingModule {}
