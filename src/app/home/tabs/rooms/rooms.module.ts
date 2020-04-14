import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { RoomsPage } from './rooms.page';
import { RDComponentsModule } from 'src/app/rdcomponents/rdcomponents.module';
import { RoomsPageRoutingModule } from './rooms-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomsPageRoutingModule,
    RDComponentsModule
  ],
  declarations: [RoomsPage]
})
export class RoomsPageModule { }
