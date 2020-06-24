import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rd-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

  @Input() objectsArray = [];
  @Input() type: string;
  @Input() categories: string[];
  @Input() expandable: boolean;
  @Input() descriptionVoid: string;

  expand = false;

  // Impostazioni ion-slides
  slideOpts = {
    slidesPerView: 5,
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

}
