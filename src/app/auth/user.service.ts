import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  sendPostRequest() {
    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let postData = {
      "userid": 8,
      "name": "Domenico",
      "address": "Via Viterbo 2",
      "age": 59,
      "phone_number": "3389082282",
      "created_on": "2020-02-27T00:22:27.000Z",
      "last_login": null
    }

    this.http.post("https://runningdinnerapi.herokuapp.com/users", postData)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });

    /* this.http.get('http://runningdinnerapi.herokuapp.com/users')
    .subscribe(data => {
      alert(JSON.stringify(data));
    }) 

    this.http.get('http://runningdinnerapi.herokuapp.com/existsUser')
    .subscribe(data => {
      alert(data);
    })  */
  }
}