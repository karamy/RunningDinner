import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactDetailPageRoutingModule } from './contact-detail-routing.module';

import { ContactDetailPage } from './contact-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactDetailPageRoutingModule
  ],
  declarations: [ContactDetailPage]
})
export class ContactDetailPageModule {}
