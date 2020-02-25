import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DinnerPageRoutingModule } from './dinner-routing.module';

import { DinnerPage } from './dinner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DinnerPageRoutingModule
  ],
  declarations: [DinnerPage]
})
export class DinnerPageModule {}
