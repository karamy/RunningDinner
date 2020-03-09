import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth',
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
      },
      {
        path: 'phone',
        loadChildren: () => import('./auth/phone/phone.module').then( m => m.PhonePageModule)
      },
      {
        path: 'instructions',
        loadChildren: () => import('./auth/instructions/instructions.module').then( m => m.InstructionsPageModule)
      },
      {
        path: 'geolocation',
        loadChildren: () => import('./auth/geolocation/geolocation.module').then( m => m.GeolocationPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('./auth/notification/notification.module').then( m => m.NotificationPageModule)
      }
    ]
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canLoad: [/* AuthGuard */]
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'dinner',
    loadChildren: () => import('./home/tabs/dinner/dinner.module').then( m => m.DinnerPageModule)
  },
  {
    path: 'phone',
    loadChildren: () => import('./auth/phone/phone.module').then( m => m.PhonePageModule)
  },
  {
    path: 'instructions',
    loadChildren: () => import('./auth/instructions/instructions.module').then( m => m.InstructionsPageModule)
  },
  {
    path: 'geolocation',
    loadChildren: () => import('./auth/geolocation/geolocation.module').then( m => m.GeolocationPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./auth/notification/notification.module').then( m => m.NotificationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Dichiaro qui le rotte principali raggiungibili dall'app, impostando forRoot
  exports: [RouterModule]
})
export class AppRoutingModule {}
