import { Injectable } from '@angular/core';
import { RDParamsService } from 'src/app/rdparams.service';
import { UserData } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { RDConstantsService } from 'src/app/rdcostants.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _partner: PartnerData;

  constructor(
    public paramsService: RDParamsService,
    private http: HttpClient, private rdConstants: RDConstantsService) {
    this.readPartner();
  }

  // Trasformo data in formato YYYY/MM/DD
  changeDateFormat(userBirthdate: any) {
    const dateArray = userBirthdate.split('/');
    const birthDate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0], 10);
    return birthDate;
  }

  // Calcolo età utente
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

  // Carica i dati del partner da DB
  // Scelto di passare user come parametro per evitare injection di auth.service che causa circular dependency
  async getPartnerData(user: UserData) {
    const groupId = this.paramsService.getParams().groupId;
    const dataToSend = {
      groupId: groupId
    };
    return new Promise<void>((resolve, reject) => {
      this.http
        .post(this.rdConstants.getApiRoute('getGroupPartner'), dataToSend)
        .toPromise()
        .then(
          res => {
            this.writePartner(res as PartnerData, user);
            resolve();
          },
          err => {
            reject(err);
          }
        );
    });
  }

  // Aggiunge i parametri avgAge e distance al partner e lo scrive in localStorage
  private writePartner(partner: PartnerData, user: UserData) {
    const userAge = this.calcAge(user.birth_date); // Ottengo l'età dello user

    // Trasformo la data in stringa nel formato DD/MM/YYYY
    partner.birth_date = new Date(partner.birth_date);
    partner.birth_date = partner.birth_date.toLocaleDateString() as unknown as Date;
    partner.avgAge = this.calcAvgAge(userAge, partner.birth_date);
    partner.profile_photo = 'data:image/jpeg;base64,' + partner.profile_photo;
    localStorage.setItem('partner', JSON.stringify(partner));
    this.readPartner();
  }

  // Legge i parametri partner presenti in localStorage e le carica nel Service
  private readPartner() {
    this._partner = JSON.parse(
      localStorage.getItem('partner')
    ) as PartnerData;
  }

  // Ritorna il partner
  getPartner() {
    return this._partner;
  }

  // Cancella dal localStorage il partner
  clearPartner() {
    localStorage.setItem('partner', null);
    this.readPartner();
  }

  // Calcolo età media tra utente e partner
  calcAvgAge(userAge: number, friendBirthDate: any) {
    const friendAge = this.calcAge(friendBirthDate);
    const avgAge = (userAge + friendAge) / 2;
    return Math.round(avgAge);
  }

  // Individuo se la casa del gruppo è quella dello user o del partner
  findHouseOwner(user: UserData, partner: PartnerData) {
    if (partner.group_address === partner.address) {
      return partner.name;
    } else {
      return user.name;
    }
  }

}

export interface PartnerData extends UserData {
  avgAge: number;
  group_address: string;
}
