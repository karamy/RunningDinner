import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressMapPageRoutingModule } from './address-map-routing.module';

import { AddressMapPage } from './address-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressMapPageRoutingModule
  ],
  declarations: [AddressMapPage]
})
export class AddressMapPageModule {}
