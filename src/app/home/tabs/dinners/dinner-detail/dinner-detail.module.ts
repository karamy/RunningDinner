import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DinnerDetailPageRoutingModule } from './dinner-detail-routing.module';

import { DinnerDetailPage } from './dinner-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DinnerDetailPageRoutingModule
  ],
  declarations: [DinnerDetailPage]
})
export class DinnerDetailPageModule {}
