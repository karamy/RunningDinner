import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RDComponentsModule } from 'src/app/rdcomponents/rdcomponents.module';
import { DinnerHistoryPage } from './dinner-history.page';
import { DinnerHistoryRoutingModule } from './dinner-history-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DinnerHistoryRoutingModule,
    RDComponentsModule
  ],
  declarations: [DinnerHistoryPage]
})
export class DinnerHistoryPageModule {}
