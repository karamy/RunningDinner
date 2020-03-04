import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountryCodesPageRoutingModule } from './country-codes-routing.module';

import { CountryCodesPage } from './country-codes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountryCodesPageRoutingModule
  ],
  declarations: [CountryCodesPage]
})
export class CountryCodesPageModule {}
