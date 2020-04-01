import { Injectable } from '@angular/core';
import { RDContact } from '../home/tabs/contacts/contacts.service';
import { RDCostantsService } from '../rdcostants.service';
import { HttpClient } from '@angular/common/http';

// Rappresenta i dati di registrazione nuovo utente
export interface SignupData {
  name: string;
  address: string;
  phoneNumber: string;
  birthDate: Date;
  profilePhoto: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private signupData: SignupData;

  constructor(private http: HttpClient, private rdCostants: RDCostantsService) {
    this.signupData = {
      name: '',
      address: '',
      phoneNumber: '',
      birthDate: null,
      profilePhoto: ''
    };
  }

  setName(name: string) {
    this.signupData.name = name;
  }
  setAddress(address: string) {
    this.signupData.address = address;
  }
  setPhoneNumber(phoneNumber: string) {
    this.signupData.phoneNumber = phoneNumber;
  }
  setBirthDate(birthDate: Date) {
    this.signupData.birthDate = birthDate;
  }
  setProfilePhoto(profilePhoto: string) {
    this.signupData.profilePhoto = profilePhoto;
  }

  // Registra nuovo utente a DB
  signupUser(): Promise<object> {
    return this.http.post(this.rdCostants.getApiRoute('users'), this.signupData)
      .toPromise();
  }
}
