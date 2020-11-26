import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  { path: '', redirectTo: 'tabs/dinners', pathMatch: 'full' },
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'contacts',
        loadChildren: () => import('./tabs/contacts/contacts.module').then(m => m.ContactsPageModule)
      },
      {
        path: 'dinners',
        loadChildren: () => import('./tabs/dinners/dinners.module').then(m => m.DinnersPageModule),
      },
      {
        path: 'my-dinners',
        loadChildren: () => import('./tabs/my-dinners/my-dinners.module').then(m => m.MyDinnersPageModule),
      }
    ]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
