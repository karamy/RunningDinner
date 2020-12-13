import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // Dal momento che non esiste rotta 'signup', andare qui significa andare a 'instructions'
  { path: '', redirectTo: 'instructions', pathMatch: 'full' },
  {
    path: 'instructions',
    loadChildren: () => import('./instructions/instructions.module').then(m => m.InstructionsPageModule)
  },
  {
    path: 'username',
    loadChildren: () => import('./username/username.module').then(m => m.UsernamePageModule)
  },
  {
    path: 'birth-date',
    loadChildren: () => import('./birth-date/birth-date.module').then(m => m.BirthDatePageModule)
  },
  {
    path: 'profile-photo',
    loadChildren: () => import('./profile-photo/profile-photo.module').then(m => m.ProfilePhotoPageModule)
  },
  {
    path: 'address-map',
    loadChildren: () => import('./address-map/address-map.module').then(m => m.AddressMapPageModule)
  },  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpPageRoutingModule { }
