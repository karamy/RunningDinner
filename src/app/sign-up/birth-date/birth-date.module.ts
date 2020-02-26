import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BirthDatePageRoutingModule } from './birth-date-routing.module';

import { BirthDatePage } from './birth-date.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BirthDatePageRoutingModule
  ],
  declarations: [BirthDatePage]
})
export class BirthDatePageModule {}
