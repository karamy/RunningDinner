import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DinnersPage } from './dinners.page';
import { RDComponentsModule } from 'src/app/rdcomponents/rdcomponents.module';
import { DinnersPageRoutingModule } from './dinners-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DinnersPageRoutingModule,
    RDComponentsModule
  ],
  declarations: [DinnersPage]
})
export class DinnersPageModule { }
