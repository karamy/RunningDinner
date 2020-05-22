import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RDConstantsService } from 'src/app/rdcostants.service';
import { FoodAllergy, UserAllergy } from './food-allergies.page';
import { RDParamsService } from 'src/app/rdparams.service';

@Injectable({
  providedIn: 'root'
})
export class FoodAllergiesService {

  private _allFoodAllergies: FoodAllergy[];
  private _userFoodAllergies: UserAllergy[];
  private _userFoodAllergiesCategories: string[];
  private _groupFoodAllergies: UserAllergy[];
  private _groupFoodAllergiesCategories: string[];

  constructor(
    private http: HttpClient,
    private rdConstants: RDConstantsService,
    public paramsService: RDParamsService
  ) { }

  // Carica la lista di tutte le FoodAllergies dal DB
  async getAllFoodAllergiesData(): Promise<FoodAllergy[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.rdConstants.getApiRoute('getFoodAllergies'))
        .toPromise()
        .then(
          res => {
            this.writeAllFoodAllergies(res as FoodAllergy[]);
            resolve();
          },
          () => {
            console.log('Erorre caricamento allFoodAllergies');
            reject();
          }
        );
    });
  }

  // Scrivo in localstorage la lista di tutte le intolleranze
  private writeAllFoodAllergies(allFoodAllergies: FoodAllergy[]) {
    localStorage.setItem('allFoodAllergies', JSON.stringify(allFoodAllergies));
    this.readAllFoodAllergies();
  }

  private readAllFoodAllergies() {
    this._allFoodAllergies = JSON.parse(
      localStorage.getItem('allFoodAllergies')
    ) as FoodAllergy[];
  }

  // Ritorna la lista di tutte le intolleranze
  getAllFoodAllergies() {
    return this._allFoodAllergies;
  }

  // Cancella dal localStorage la lista di tutte le intolleranze
  clearAllFoodAllergies() {
    localStorage.setItem('allFoodAllergies', null);
    this.readAllFoodAllergies();
  }

  // Carica le intolleranze dell'utente da DB
  async getUserFoodAllergiesData(userId: number) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.rdConstants.getApiRoute('getUserFoodAllergies'), { userId })
        .toPromise()
        .then(
          res => {
            this.writeUserFoodAllergies(res as UserAllergy[]);
            resolve();
          },
          err => {
            reject(err);
          }
        );
    });
  }

  private convertImagesToJpeg(userFoodAllergies: FoodAllergy[]) {
    for (let i = 0; i < userFoodAllergies.length; i++) {
      userFoodAllergies[i].allergy_photo = 'data:image/jpeg;base64,' + userFoodAllergies[i].allergy_photo;
    }
    return userFoodAllergies;
  }

  private orderFoodAllergies(userFoodAllergies: FoodAllergy[]) {
    // Ordino alfabeticamente le intolleranze
    userFoodAllergies.sort((a, b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
    return userFoodAllergies;
  }

  // Creo un array contenente solo le categorie (una sola copia) delle intolleranze, ordinandolo
  private createCategoryArray(userFoodAllergies: FoodAllergy[]) {
    let categories: string[] = [];
    for (let i = 0; i < userFoodAllergies.length; i++) {
      categories.push(userFoodAllergies[i].category);
    }
    categories = Array.from(new Set(categories));
    categories.sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    return categories;
  }

  // Scrivo in localstorage le intolleranze dell'utente e le categorie
  private writeUserFoodAllergies(userFoodAllergies: UserAllergy[]) {
    // Converto le immagini di userFoodAllergies in Jpeg
    userFoodAllergies = this.convertImagesToJpeg(userFoodAllergies);
    userFoodAllergies = this.orderFoodAllergies(userFoodAllergies);
    localStorage.setItem('userFoodAllergies', JSON.stringify(userFoodAllergies));
    localStorage.setItem('userFoodAllergiesCategories', JSON.stringify(this.createCategoryArray(userFoodAllergies)));
    this.readUserFoodAllergies();
  }

  // Legge i parametri userFoodAllergies e userFoodAllergiesCategories presenti in localStorage e le carica nel Service
  readUserFoodAllergies() {
    this._userFoodAllergies = JSON.parse(
      localStorage.getItem('userFoodAllergies')
    ) as UserAllergy[];
    this._userFoodAllergiesCategories = JSON.parse(
      localStorage.getItem('userFoodAllergiesCategories')
    );
  }

  // Ritorna le intolleranze dell'utente
  getUserFoodAllergies() {
    return this._userFoodAllergies;
  }

  // Ritorna le categorie delle intolleranze dell'utente
  getUserAllergiesCategories() {
    return this._userFoodAllergiesCategories;
  }

  // Cancella dal localStorage le intolleranze dell'utente e le categorie
  clearUserFoodAllergies() {
    localStorage.setItem('userFoodAllergies', null);
    localStorage.setItem('userFoodAllergiesCategories', null);
    this.readUserFoodAllergies();
  }

  // Post dell'intolleranza aggiunta dall'utente
  async updateUserFoodAllergies(allergyId: number, food: string, userId: number) {
    const dataToSend = {
      userAllergy: {
        allergyId: allergyId,
        allergyName: food,
        userId: userId
      }
    };
    return new Promise((resolve, reject) =>
      this.http
        .post(this.rdConstants.getApiRoute('updateFoodAllergies'), dataToSend)
        .toPromise()
        .then(
          () => {
            resolve();
          },
          () => {
            reject();
          }
        )
    );
  }

  // Cancello dal DB l'intolleranza indicata
  async deleteUserFoodAllergies(allergyId: number, food: string, userId: number) {
    const dataToSend = {
      userAllergy: {
        allergyId: allergyId,
        allergyName: food,
        userId: userId
      }
    };
    return new Promise((resolve, reject) =>
      this.http
        .post(this.rdConstants.getApiRoute('deleteFoodAllergies'), dataToSend)
        .toPromise()
        .then(
          () => {
            resolve();
          },
          () => {
            reject();
          }
        )
    );
  }

  // Ottengo da DB le intolleranze del Partner
  async getPartnerFoodAllergies(userId: number) {
    const groupId = this.paramsService.getParams().groupId;
    const dataToSend = {
      groupId: groupId,
      userId: userId
    };
    return new Promise((resolve, reject) =>
      this.http
        .post(this.rdConstants.getApiRoute('getPartnerFoodAllergies'), dataToSend)
        .toPromise()
        .then(
          res => {
            this.writeGroupFoodAllergies(res as UserAllergy[]);
            resolve();
          },
          () => {
            reject();
          }
        )
    );
  }

  // Crea due array groupFoodAllergies e groupFoodAllergiesCategories e li scrive in localstorage
  private writeGroupFoodAllergies(partnerFoodAllergies: UserAllergy[]) {
    const userFoodAllergies = JSON.parse(
      localStorage.getItem('userFoodAllergies')
    ) as UserAllergy[];
    // Converto le immagini delle FoodAllergies del partner in Jpeg
    partnerFoodAllergies = this.convertImagesToJpeg(partnerFoodAllergies);
    let groupFoodAllergies = userFoodAllergies.concat(partnerFoodAllergies);
    groupFoodAllergies = this.orderFoodAllergies(groupFoodAllergies);
    localStorage.setItem('groupFoodAllergies', JSON.stringify(groupFoodAllergies));
    localStorage.setItem('groupFoodAllergiesCategories', JSON.stringify(this.createCategoryArray(groupFoodAllergies)));
    this.readGroupFoodAllergies();
  }

  // Legge i parametri groupFoodAllergies e groupFoodAllergiesCategories e li carica nel Service
  readGroupFoodAllergies() {
    this._groupFoodAllergies = JSON.parse(
      localStorage.getItem('groupFoodAllergies')
    ) as UserAllergy[];
    this._groupFoodAllergiesCategories = JSON.parse(
      localStorage.getItem('groupFoodAllergiesCategories')
    );
  }

  // Ritorna le intolleranze del gruppo
  getGroupFoodAllergies() {
    return this._groupFoodAllergies;
  }

  // Ritorna le categorie delle intolleranze del gruppo
  getGroupAllergiesCategories() {
    return this._groupFoodAllergiesCategories;
  }

  // Cancella dal localStorage le intolleranze del gruppo e le categorie
  clearGroupFoodAllergies() {
    localStorage.setItem('groupFoodAllergies', '[]');
    localStorage.setItem('groupFoodAllergiesCategories', null);
    this.readGroupFoodAllergies();
  }
}
