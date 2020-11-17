import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slider-filters',
  templateUrl: './slider-filters.component.html',
  styleUrls: ['./slider-filters.component.scss'],
})
export class SliderFiltersComponent implements OnInit {

  filterType = 0;
  @Output() filter = new EventEmitter();

  // Impostazioni ion-slides
  slideOpts = {
    slidesPerView: 3,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  };

  constructor() { }

  ngOnInit() { }

  setFilter(filter) {
    if (this.filterType !== filter) {
      this.filterType = filter;
    } else {
      this.filterType = 0;
    }
    this.filter.emit(this.filterType);
  }

}
