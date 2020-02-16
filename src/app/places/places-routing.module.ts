import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlacesPage } from './places.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: PlacesPage,
    children: [
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: './profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: './chat/chat.module#ChatPageModule'
          }
        ]
      },
      {
        path: 'rooms',
        children: [
          {
            path: '',
            loadChildren: './rooms/rooms.module#RoomsPageModule'
          },
        {
          path: 'createRoom', // apro chat attuale
          loadChildren:
          './rooms/create-room/create-room.module#CreateRoomPageModule'
        }
        ]
      },
      {
        path: 'contacts',
        children: [
          {
            path: '',
            loadChildren: './contacts/contacts.module#ContactsPageModule'
          }
        ]
      }
    ]
  },
  {
    path: 'create-room',
    loadChildren: () => import('./rooms/create-room/create-room.module').then( m => m.CreateRoomPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule {}
