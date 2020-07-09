import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DinnerInfoPage } from './dinner-info.page';

const routes: Routes = [
  {
    path: '',
    component: DinnerInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DinnerInfoPageRoutingModule {}
