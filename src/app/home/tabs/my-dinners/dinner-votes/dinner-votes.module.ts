import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DinnerVotesPageRoutingModule } from './dinner-votes-routing.module';
import { DinnerVotesPage } from './dinner-votes.page';
import { RDComponentsModule } from 'src/app/rdcomponents/rdcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DinnerVotesPageRoutingModule,
    RDComponentsModule
  ],
  declarations: [DinnerVotesPage]
})
export class DinnerVotesPageModule { }
