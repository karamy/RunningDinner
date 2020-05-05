import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ProfilePageRoutingModule } from "./profile-routing.module";
import { ProfilePage } from "./profile.page";
import { RDComponentsModule } from 'src/app/rdcomponents/rdcomponents.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { BadgeFilterPipe } from './badge-filter.pipe';
import { CategoryFilterPipe } from './category-filter.pipe';
import { HideHeaderDirective } from './hide-header.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    RDComponentsModule,
    RoundProgressModule
  ],
  declarations: [ProfilePage, BadgeFilterPipe, CategoryFilterPipe, HideHeaderDirective]
})
export class ProfilePageModule { }
