import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RDConstantsService } from 'src/app/rdcostants.service';
import { RDSpinnerService } from 'src/app/rdspinner.service';

@Injectable({
  providedIn: 'root'
})
export class DinnerService {

  constructor(private http: HttpClient, private rdConstants: RDConstantsService, private spinner: RDSpinnerService) { }

  // Registra nuova cena a DB, e aggiunge il mio gruppo in automatico
  async createDinner(dinnerBody): Promise<object> {
    await this.spinner.create();
    return this.http.post(this.rdConstants.getApiRoute('dinners'), dinnerBody)
      .toPromise()
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }
}
