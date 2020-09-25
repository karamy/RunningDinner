import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { IonicModule } from '@ionic/angular';
import { SliderComponent } from './slider/slider.component';
import { FormsModule } from '@angular/forms';
import { DinnerComponent } from './dinner/dinner.component';
import { RouterModule } from '@angular/router';
import { MyDinnerComponent } from './my-dinner/my-dinner.component';
import { RDPipesModule } from '../rdpipes/rdpipes.module';
import { StarRatingComponent } from './star-rating/star-rating.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, RDPipesModule],
  declarations: [ProfileComponent, SliderComponent, DinnerComponent, MyDinnerComponent, StarRatingComponent], // Component che fanno parte del modulo
  exports: [ProfileComponent, SliderComponent, DinnerComponent, MyDinnerComponent, StarRatingComponent] // Component che permetto di importare dove serve tramite import
})
export class RDComponentsModule { }
