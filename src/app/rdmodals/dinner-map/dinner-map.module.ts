import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DinnerMapPageRoutingModule } from './dinner-map-routing.module';

import { DinnerMapPage } from './dinner-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DinnerMapPageRoutingModule
  ],
  declarations: [DinnerMapPage]
})
export class DinnerMapPageModule {}
