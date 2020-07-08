import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canLoad: [/* AuthGuard */] // Lasciato commentato l'AuthGuard per usi futuri
  },  {
    path: 'dinner-info',
    loadChildren: () => import('./rdmodals/dinner-info/dinner-info.module').then( m => m.DinnerInfoPageModule)
  },
  {
    path: 'food-allergies-info',
    loadChildren: () => import('./rdmodals/food-allergies-info/food-allergies-info.module').then( m => m.FoodAllergiesInfoPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Dichiaro qui le rotte principali raggiungibili dall'app, impostando forRoot
  exports: [RouterModule]
})
export class AppRoutingModule { }
