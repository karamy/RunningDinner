import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DinnerVotesPage } from './dinner-votes.page';

const routes: Routes = [
  {
    path: '',
    component: DinnerVotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DinnerVotesPageRoutingModule {}
