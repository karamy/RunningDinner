import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RDConstantsService } from 'src/app/rdcostants.service';
import { RDSpinnerService } from 'src/app/rdspinner.service';

@Injectable({
  providedIn: 'root'
})
export class DinnersService {

  constructor(private http: HttpClient, private rdConstants: RDConstantsService, private spinner: RDSpinnerService) { }

  // Registra nuova cena a DB, e aggiunge il mio gruppo in automatico
  async createDinner(createDinnerBody): Promise<object> {
    await this.spinner.create();
    return this.http.post(this.rdConstants.getApiRoute('dinners'), createDinnerBody)
      .toPromise()
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }

  // Ottiene l'elenco delle cene (e dell'eventuale cena a cui partecipo)
  async getDinners(): Promise<object> {
    await this.spinner.create();
    return this.http.get(this.rdConstants.getApiRoute('dinners'))
      .toPromise()
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }

  // Abbandona cena, eliminandola se sono l'unico partecipante
  async leaveDinner(leaveDinnerBody): Promise<object> {
    await this.spinner.create();
    return this.http.post(this.rdConstants.getApiRoute('leaveDinner'), leaveDinnerBody)
      .toPromise()
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }

  // Partecipa a cena
  async joinDinner(joinDinnerBody): Promise<object> {
    await this.spinner.create();
    return this.http.post(this.rdConstants.getApiRoute('joinDinner'), joinDinnerBody)
      .toPromise()
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }
}

// Rappresenta una tipologia di cena 
export interface DinnerType {
  code: number; //1: italiano, 2: sushi, 3: vegan, 4: flash dinner
  description: string;
  background?: string; //TODO aggiungere gestione backgound della card in base alla tipologia di cena
}

// Rappresenta una cena 
export interface Dinner {
  id: number;
  title: string;
  description: string;
  type: number; // rappresenta la tipologia di cena
  date: Date;
  administrator: number; // rappresenta l'id del gruppo amministratore della cena
}