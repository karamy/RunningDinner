import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DinnerDetailPageRoutingModule } from './dinner-detail-routing.module';

import { DinnerDetailPage } from './dinner-detail.page';
import { RDComponentsModule } from 'src/app/rdcomponents/rdcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DinnerDetailPageRoutingModule,
    RDComponentsModule
  ],
  declarations: [DinnerDetailPage]
})
export class DinnerDetailPageModule { }
