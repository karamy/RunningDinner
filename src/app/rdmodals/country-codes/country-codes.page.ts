import { Component, OnInit } from '@angular/core';
import { CountryService } from './country.service';
import { FilterService } from './filter.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'rd-country-codes',
  templateUrl: './country-codes.page.html',
  styleUrls: ['./country-codes.page.scss'],
})
export class CountryCodesPage implements OnInit {

  countries: any[] = [];
  searchTerm: string = "";

  constructor(private countryService: CountryService, private filterService: FilterService, public modalCtrl: ModalController) {
    this.countries = this.countryService.countries;
  }

  ngOnInit() { }

  setFilteredItems() {
    this.countries = this.filterService.filterItems(this.searchTerm);
  }

  dismiss(prefix) {
    this.modalCtrl.dismiss(prefix);
  }
}
