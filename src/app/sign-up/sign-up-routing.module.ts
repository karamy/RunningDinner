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
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpPageRoutingModule { }
