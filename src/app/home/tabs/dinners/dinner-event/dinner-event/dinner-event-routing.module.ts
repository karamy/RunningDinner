import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DinnerEventPage } from './dinner-event.page';

const routes: Routes = [
  {
    path: '',
    component: DinnerEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DinnerEventPageRoutingModule {}
