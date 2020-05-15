import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsDetailPage } from './contacts-detail/contacts-detail.page';
import { CountryCodesPage } from './country-codes/country-codes.page';
import { FoodAllergiesPage } from './food-allergies/food-allergies.page';
import { IonicModule } from '@ionic/angular';
import { RDComponentsModule } from '../rdcomponents/rdcomponents.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RDComponentsModule],
  declarations: [ContactsDetailPage, CountryCodesPage, FoodAllergiesPage],
  entryComponents: [ContactsDetailPage, CountryCodesPage, FoodAllergiesPage] // Dichiaro le pagine come entryComponents per essere disponibili al ModalController di Ionic
})
export class RDModalsModule { }
