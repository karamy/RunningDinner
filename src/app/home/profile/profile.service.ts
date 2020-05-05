import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  calcAge(userBirthdate: any) {
    let today = new Date();
    let dateArray = userBirthdate.split("/");
    let birthDate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  changeDateFormat(userBirthdate: any) {
    let dateArray = userBirthdate.split("/");
    let birthDate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0], 10);
    return birthDate
  }

}
