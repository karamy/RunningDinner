import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { RoomsPage } from './rooms.page';
import { DinnerComponent } from './dinner/dinner.component';


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
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [DinnerComponent],
  declarations: [RoomsPage, DinnerComponent]
})
export class RoomsPageModule {}
