import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RDCostantsService {

  private apiUrl = 'http://localhost:1111/';  //'https://runningdinnerapi.herokuapp.com/';

  constructor() { }

  // Ritorna l'indirizzo base dell'API
  getApiUrl() {
    return this.apiUrl;
  }

  // Ritorna l'indirizzo per la rotta specificata
  getApiRoute(route: string) {
    return this.apiUrl + route;
  }
}
