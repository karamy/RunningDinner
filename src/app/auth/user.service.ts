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

  async updateUser(name: string, birth_date: Date, address: string, phone_number: number, profile_photo: string) {
    const dataToSend = {
      user: {
        name: name,
        birth_date: birth_date,
        address: address,
        phone_number: phone_number,
        profile_photo: profile_photo
      }
    };

    return new Promise((resolve, reject) =>
      this.http
        .post(this.rdConstants.getApiRoute('updateUser'), dataToSend)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          () => {
            reject();
          }
        )
    );
  }
}
