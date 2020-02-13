import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss']
})
export class RoomsPage implements OnInit {
  loadedPlaces: Place[];

  constructor(
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.loadedPlaces = this.placesService.places;
  }
}
