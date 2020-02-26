import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BirthDatePage } from './birth-date.page';

const routes: Routes = [
  {
    path: '',
    component: BirthDatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BirthDatePageRoutingModule {}
