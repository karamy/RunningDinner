import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'dinner',
    loadChildren: () => import('./home/tabs/dinner/dinner.module').then( m => m.DinnerPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Dichiaro qui le rotte principali raggiungibili dall'app, impostando forRoot
  exports: [RouterModule]
})
export class AppRoutingModule {}
