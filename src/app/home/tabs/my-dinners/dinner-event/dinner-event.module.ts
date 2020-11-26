import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DinnerEventPageRoutingModule } from './dinner-event-routing.module';
import { DinnerEventPage } from './dinner-event.page';
import { RDComponentsModule } from 'src/app/rdcomponents/rdcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DinnerEventPageRoutingModule,
    RDComponentsModule
  ],
  declarations: [DinnerEventPage]
})
export class DinnerEventPageModule { }
