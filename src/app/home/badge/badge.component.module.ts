import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BadgeComponent } from "src/app/home/badge/badge.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [BadgeComponent],
  exports: [BadgeComponent],
})
export class BadgeComponentModule {}
