import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePhotoPageRoutingModule } from './profile-photo-routing.module';

import { ProfilePhotoPage } from './profile-photo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePhotoPageRoutingModule
  ],
  declarations: [ProfilePhotoPage]
})
export class ProfilePhotoPageModule {}
