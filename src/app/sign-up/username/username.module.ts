import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsernamePageRoutingModule } from './username-routing.module';

import { UsernamePage } from './username.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsernamePageRoutingModule
  ],
  declarations: [UsernamePage]
})
export class UsernamePageModule {}
