import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { IonicModule } from '@ionic/angular';
import { BadgeComponent } from './badge/badge.component';
import { FormsModule } from '@angular/forms';
import { DinnerComponent } from './dinner/dinner.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [ProfileComponent, BadgeComponent, DinnerComponent], // Component che fanno parte del modulo
  exports: [ProfileComponent, BadgeComponent, DinnerComponent] // Component che permetto di importare dove serve tramite import
})
export class RDComponentsModule { }
