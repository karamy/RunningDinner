import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsDetailPage } from './contacts-detail/contacts-detail.page';
import { CountryCodesPage } from './country-codes/country-codes.page';
import { FoodAllergiesPage } from './food-allergies/food-allergies.page';
import { IonicModule } from '@ionic/angular';
import { RDComponentsModule } from '../rdcomponents/rdcomponents.module';
import { FormsModule } from '@angular/forms';
import { DinnerInfoPage } from './dinner-info/dinner-info.page';
import { FoodAllergiesInfoPage } from './food-allergies-info/food-allergies-info.page';
import { RDPipesModule } from '../rdpipes/rdpipes.module';
import { DinnerMapPage } from './dinner-map/dinner-map.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RDComponentsModule, RDPipesModule],
  declarations: [ContactsDetailPage, CountryCodesPage, FoodAllergiesPage, DinnerInfoPage, FoodAllergiesInfoPage, DinnerMapPage],
  entryComponents: [ContactsDetailPage, CountryCodesPage, FoodAllergiesPage, DinnerInfoPage, FoodAllergiesInfoPage, DinnerMapPage] // Dichiaro le pagine come entryComponents per essere disponibili al ModalController di Ionic
})
export class RDModalsModule { }