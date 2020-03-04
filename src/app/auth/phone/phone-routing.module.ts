import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhonePage } from './phone.page';

const routes: Routes = [
  {
    path: '',
    component: PhonePage
  },
  {
    path: 'country-codes',
    loadChildren: () => import('./country-codes/country-codes.module').then( m => m.CountryCodesPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhonePageRoutingModule {}
