import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://runningdinnerapi.herokuapp.com';

  constructor(private http: HttpClient) { }

  // Ritorna se l'utente esiste o no su DB
  existsUser(phoneNumber): Promise<object> {
    return this.http.post(this.apiUrl + '/existsUser', phoneNumber)
      .toPromise();
  }
}
