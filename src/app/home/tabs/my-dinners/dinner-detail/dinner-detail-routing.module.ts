import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DinnerDetailPage } from './dinner-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DinnerDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DinnerDetailPageRoutingModule {}
