import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsDetailPageRoutingModule } from './contacts-detail-routing.module';

import { ContactsDetailPage } from './contacts-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsDetailPageRoutingModule
  ],
  declarations: [ContactsDetailPage]
})
export class ContactsDetailPageModule {}
