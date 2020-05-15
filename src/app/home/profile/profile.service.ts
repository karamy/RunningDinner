import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RDConstantsService } from 'src/app/rdcostants.service';
import { UserData } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private rdConstants: RDConstantsService
  ) { }

  calcAge(userBirthdate: any) {
    const today = new Date();
    const dateArray = userBirthdate.split('/');
    const birthDate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // Trasformo data in formato YYYY/MM/DD
  changeDateFormat(userBirthdate: any) {
    const dateArray = userBirthdate.split('/');
    const birthDate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0], 10);
    return birthDate;
  }

  // Provvisorio
  getFriend(): Promise<UserData> {
    const dataToSend = {
      query: 'SELECT * FROM users WHERE userid = 48'
    }
    return new Promise((resolve, reject) =>
      this.http
        .post(this.rdConstants.getApiRoute('runQuery'), dataToSend)
        .toPromise()
        .then(
          res => {
            resolve(res as UserData);
          },
          () => {
            console.log('Errore');
          }
        )
    )
  }

  calcAvgAge(userAge, friendBirthDate) {
    const friendAge = this.calcAge(friendBirthDate)
    const avgAge = (userAge + friendAge) / 2;
    return Math.round(avgAge);
  }

}
