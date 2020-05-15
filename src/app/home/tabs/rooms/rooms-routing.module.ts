import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomsPage } from './rooms.page';

const routes: Routes = [
    {
      path: '',
      component: RoomsPage
    },
    {
      path: 'create-room',
      loadChildren: () => import('./create-room/create-room.module').then( m => m.CreateRoomPageModule)
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsPageRoutingModule {}
