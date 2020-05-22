import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDinnerPageRoutingModule } from './create-dinner-routing.module';

import { CreateDinnerPage } from './create-dinner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateDinnerPageRoutingModule
  ],
  declarations: [CreateDinnerPage]
})
export class CreateDinnerPageModule {}
