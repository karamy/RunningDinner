import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpPage } from './sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpPage
  },  {
    path: 'username',
    loadChildren: () => import('./username/username.module').then( m => m.UsernamePageModule)
  },
  {
    path: 'birth-date',
    loadChildren: () => import('./birth-date/birth-date.module').then( m => m.BirthDatePageModule)
  },
  {
    path: 'profile-photo',
    loadChildren: () => import('./profile-photo/profile-photo.module').then( m => m.ProfilePhotoPageModule)
  },
  {
    path: 'address-map',
    loadChildren: () => import('./address-map/address-map.module').then( m => m.AddressMapPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpPageRoutingModule {}
