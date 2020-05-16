import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RDConstantsService } from 'src/app/rdcostants.service';

@Injectable({
  providedIn: 'root'
})
export class BadgesService {

  constructor(
    private http: HttpClient,
    private rdConstants: RDConstantsService
  ) { }

  // Carica i badge dal DB
  async getBadges() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.rdConstants.getApiRoute('getBadges'))
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
