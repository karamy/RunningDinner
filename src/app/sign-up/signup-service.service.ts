import { Injectable } from '@angular/core';
import { RDConstantsService } from '../rdcostants.service';
import { HttpClient } from '@angular/common/http';

// Rappresenta i dati di registrazione nuovo utente
export interface SignupData {
  name: string;
  address: string;
  phoneNumber: string;
  birthDate: Date;
  profilePhoto: string;
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private signupData: SignupData;

  constructor(private http: HttpClient, private rdConstants: RDConstantsService) {
    this.signupData = {
      name: '',
      address: '',
      phoneNumber: '',
      birthDate: null,
      profilePhoto: '',
      latitude: 0,
      longitude: 0
    };
  }

  setName(name: string) {
    this.signupData.name = name;
  }
  setAddressAndCoordinates(address: string, lat: number, lon: number) {
    this.signupData.address = address;
    this.signupData.latitude = lat;
    this.signupData.longitude = lon;
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
  getSignupData(): SignupData {
    return this.signupData;
  }

  // Registra nuovo utente a DB
  signupUser(): Promise<object> {
    return this.http.post(this.rdConstants.getApiRoute('users'), this.signupData)
      .toPromise();
  }
}
