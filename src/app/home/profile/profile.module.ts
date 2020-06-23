import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ProfilePageRoutingModule } from "./profile-routing.module";
import { ProfilePage } from "./profile.page";
import { RDComponentsModule } from 'src/app/rdcomponents/rdcomponents.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { HideHeaderDirective } from './hide-header.directive';
import { RDPipesModule } from 'src/app/rdpipes/rdpipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    RDComponentsModule,
    RDPipesModule,
    RoundProgressModule
  ],
  declarations: [ProfilePage, HideHeaderDirective]
})
export class ProfilePageModule { }
