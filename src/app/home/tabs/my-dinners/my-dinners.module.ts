import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RDComponentsModule } from 'src/app/rdcomponents/rdcomponents.module';
import { MyDinnersPage } from './my-dinners.page';
import { MyDinnersRoutingModule } from './my-dinners-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyDinnersRoutingModule,
    RDComponentsModule
  ],
  declarations: [MyDinnersPage]
})
export class MyDinnersPageModule { }
