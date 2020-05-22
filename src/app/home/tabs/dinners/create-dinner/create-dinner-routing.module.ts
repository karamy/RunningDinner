import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateDinnerPage } from './create-dinner.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDinnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDinnerPageRoutingModule {}
