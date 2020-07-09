import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DinnerInfoPageRoutingModule } from './dinner-info-routing.module';
import { DinnerInfoPage } from './dinner-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DinnerInfoPageRoutingModule
  ],
  declarations: [DinnerInfoPage]
})
export class DinnerInfoPageModule {}
