import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DinnerWinnersPageRoutingModule } from './dinner-winners-routing.module';
import { DinnerWinnersPage } from './dinner-winners.page';
import { RDPipesModule } from 'src/app/rdpipes/rdpipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DinnerWinnersPageRoutingModule,
    RDPipesModule
  ],
  declarations: [DinnerWinnersPage]
})
export class DinnerWinnersPageModule {}
