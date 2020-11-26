import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DinnerPhasesPage } from './dinner-phases.page';

const routes: Routes = [
  {
    path: '',
    component: DinnerPhasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DinnerPhasesPageRoutingModule {}
