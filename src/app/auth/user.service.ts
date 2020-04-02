import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RDConstantsService } from '../rdcostants.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private rdConstants: RDConstantsService) { }

  // Ritorna se l'utente esiste o no su DB
  existsUser(phoneNumber): Promise<object> {
    return this.http.post(this.rdConstants.getApiRoute('existsUser'), phoneNumber)
      .toPromise();
  }
}
