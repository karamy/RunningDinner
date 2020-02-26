import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressMapPage } from './address-map.page';

const routes: Routes = [
  {
    path: '',
    component: AddressMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressMapPageRoutingModule {}
