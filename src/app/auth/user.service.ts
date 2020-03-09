import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Metodo di prova per testare post verso API
  sendExampleRequests() {
    var headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let postData = {
      'userid': 12,
      'name': 'Pina',
      'address': 'Via Viterbo 2',
      'age': 57,
      'phone_number': '3335631919',
      'created_on': '2020-02-27T00:22:27.000Z',
      'last_login': null
    }


    this.http.post('https://runningdinnerapi.herokuapp.com/users', postData)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      });

    /* this.http.get('https://runningdinnerapi.herokuapp.com/users')
      .subscribe(data => {
        alert(JSON.stringify(data))
      }) */
  }

  // Ritorna se l'utente esiste o no su DB
  existsUser(phoneNumber): Promise<object> {
    return this.http.post('https://runningdinnerapi.herokuapp.com/existsUser', phoneNumber)
      .toPromise();
  }
}
