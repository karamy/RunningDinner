import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  { path: '', redirectTo: 'tabs/rooms', pathMatch: 'full' },
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'contacts',
        loadChildren: () => import('./tabs/contacts/contacts.module').then(m => m.ContactsPageModule)
      },
      {
        path: 'rooms',
        loadChildren: () => import('./tabs/rooms/rooms.module').then(m => m.RoomsPageModule),
      },
      {
        path: 'chat',
        loadChildren: () => import('./tabs/chat/chat.module').then(m => m.ChatPageModule),
      }
    ]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
