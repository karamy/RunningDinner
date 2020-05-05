import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RDConstantsService {

  private apiUrl = 'https://runningdinnerapi.herokuapp.com/';  //'http://localhost:1111/'

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
