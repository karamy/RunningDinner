import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RDConstantsService } from './rdcostants.service';

@Injectable({
  providedIn: 'root'
})
export class RDParamsService {
  private _params: RDParams;
  private syncInProgress = false;

  constructor(
    private http: HttpClient,
    private rdConstants: RDConstantsService) {
    this.readParams();
  }

  // Legge i parametri utente presenti in localStorage e le carica nel Service
  private readParams() {
    this._params = JSON.parse(
      localStorage.getItem("rdparams")
    ) as RDParams;
  }

  // Aggiorna lo user in localStorage
  private writeParams(params: RDParams) {
    localStorage.setItem("rdparams", JSON.stringify(params));
    this.readParams();
  }

  // Ritorna i parametri dell'utente, o un oggetto vuoto se non inizializzati
  getParams(): RDParams {
    return this._params || {} as RDParams;
  }

  // Carica i parametri utente da DB
  async loadParams(force?: Boolean) {
    return new Promise(async (resolve, reject) => {
      if ((force || !this._params) && !this.syncInProgress) {
        this.syncInProgress = true;

        this.http.get(this.rdConstants.getApiRoute("params"))
          .toPromise()
          .then(
            res => {
              this.syncInProgress = false;
              this.writeParams(res as RDParams);
              resolve();
            },
            err => {
              this.syncInProgress = false;
              reject(err);
            }
          );
      } else {
        resolve(this._params);
      }
    });
  }

  // Cancella dal localStorage i parametri
  clearParams() {
    localStorage.setItem("rdparams", null);
    this.readParams();
  }
}

// Rappresenta i parametri 
export interface RDParams {
  groupId: number; // Gruppo di cui fa eventualmente parte l'utente
  dinnerId: number; // Cena a cui è attualmente iscritto l'utente
}
