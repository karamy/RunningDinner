import { Injectable } from '@angular/core';
import { CountryService } from './country.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  countries: any[];

  constructor(private countryService: CountryService) {
    this.countries = this.countryService.countries;
  }

  filterItems(searchTerm) {
    return this.countries.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
