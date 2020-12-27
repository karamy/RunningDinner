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
  ) {
    this.readAllFoodAllergies();
    this.readUserFoodAllergies();
    this.readGroupFoodAllergies();
  }

  // Salva la lista di tutte le intolleranze su DB
  async getAllFoodAllergiesData(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
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

  // Legge intolleranze da localStorage
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

  // Salva le intolleranze dell'utente su DB
  async getUserFoodAllergiesData(userId: number) {
    return new Promise<void>((resolve, reject) => {
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

  // Converte in formato utilizzabile da HTML i dati in base64 delle intolleranze
  public convertImagesToJpeg(userFoodAllergies: FoodAllergy[]) {
    for (let i = 0; i < userFoodAllergies.length; i++) {
      userFoodAllergies[i].allergy_photo = 'data:image/jpeg;base64,' + userFoodAllergies[i].allergy_photo;
    }
    return userFoodAllergies;
  }

  // Ritorna le intolleranze ordinate alfabeticamente
  public orderFoodAllergies(userFoodAllergies: FoodAllergy[]) {
    userFoodAllergies.sort((a, b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
    return userFoodAllergies;
  }

  // Creo un array contenente solo le categorie (una sola copia) delle intolleranze, ordinandolo
  public createCategoryArray(userFoodAllergies: FoodAllergy[]) {
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
  private readUserFoodAllergies() {
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
  async insertUserFoodAllergies(allergyId: number, food: string, userId: number) {
    const dataToSend = {
      userAllergy: {
        allergyId: allergyId,
        allergyName: food,
        userId: userId
      }
    };
    return new Promise<void>((resolve, reject) =>
      this.http
        .post(this.rdConstants.getApiRoute('insertFoodAllergies'), dataToSend)
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
    return new Promise<void>((resolve, reject) =>
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
    return new Promise<void>((resolve, reject) =>
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
    ) as UserAllergy[] || [];

    // Converto le immagini delle FoodAllergies del partner in Jpeg
    partnerFoodAllergies = this.convertImagesToJpeg(partnerFoodAllergies);
    let groupFoodAllergies = [...userFoodAllergies];

    // Controllo che in groupFoodAllergies non siano presenti elementi con stesso nome e stessa categoria di quelli in partnerFoodAllergies
    for (let i = 0; i < partnerFoodAllergies.length; i++) {
      if (groupFoodAllergies.find(x => x.allergy_name.toLowerCase() === partnerFoodAllergies[i].allergy_name.toLowerCase()) !== undefined) {
        const allergyToControl = groupFoodAllergies.find(x => x.allergy_name.toLowerCase() === partnerFoodAllergies[i].allergy_name.toLowerCase())
        if (allergyToControl.category !== partnerFoodAllergies[i].category) {
          groupFoodAllergies.push(partnerFoodAllergies[i])
        }
      } else {
        groupFoodAllergies.push(partnerFoodAllergies[i])
      }
    }
    groupFoodAllergies = this.orderFoodAllergies(groupFoodAllergies);

    localStorage.setItem('groupFoodAllergies', JSON.stringify(groupFoodAllergies));
    localStorage.setItem('groupFoodAllergiesCategories', JSON.stringify(this.createCategoryArray(groupFoodAllergies)));
    this.readGroupFoodAllergies();
  }

  // Legge i parametri groupFoodAllergies e groupFoodAllergiesCategories e li carica nel Service
  private readGroupFoodAllergies() {
    this._groupFoodAllergies = JSON.parse(
      localStorage.getItem('groupFoodAllergies')
    ) as UserAllergy[] || [];
    this._groupFoodAllergiesCategories = JSON.parse(
      localStorage.getItem('groupFoodAllergiesCategories')
    ) as string[] || [];
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
    localStorage.setItem('groupFoodAllergies', null);
    localStorage.setItem('groupFoodAllergiesCategories', null);
    this.readGroupFoodAllergies();
  }
}
