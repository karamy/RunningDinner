import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DinnerPhasesPageRoutingModule } from './dinner-phases-routing.module';

import { DinnerPhasesPage } from './dinner-phases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DinnerPhasesPageRoutingModule
  ],
  declarations: [DinnerPhasesPage]
})
export class DinnerPhasesPageModule {}
