import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RDConstantsService } from 'src/app/rdcostants.service';
import { RDSpinnerService } from 'src/app/rdspinner.service';
import { UserBadge, BadgesService } from '../../profile/badges.service';
import { UserAllergy } from 'src/app/rdmodals/food-allergies/food-allergies.page';
import { UserData } from 'src/app/auth/auth.service';
import { FoodAllergiesService } from 'src/app/rdmodals/food-allergies/food-allergies.service';
import { RDParamsService } from 'src/app/rdparams.service';
import { ProfileService } from '../../profile/profile.service';
import { NavController } from '@ionic/angular';
import { RDStorageService } from 'src/app/rdstorage.service';

@Injectable({
  providedIn: 'root'
})
export class DinnersService {

  // Variabili per il caching
  private _otherDinners: Dinner[];
  private _myDinner: Dinner;
  private _dinnerHistory: Dinner[];
  private _dinnerDetailsDict: any;
  private _myDinnerDetailsDict: any;
  private _dinnerWinnersDict: any;

  usersData: UserData[];
  geocoder = new google.maps.Geocoder();
  directionsService: google.maps.DirectionsService;

  // Tipologie cena, per ora scritte hardcoded
  dinnerTypes: DinnerType[] = [
    {
      code: 1,
      description: 'Italiano',
      dishes: ['Antipasto', 'Primo', 'Secondo']
    },
    {
      code: 2,
      description: 'Pesce',
      dishes: ['Antipasto', 'Primo', 'Secondo']
    },
    {
      code: 3,
      description: 'Vegan',
      dishes: ['Antipasto', 'Primo', 'Secondo']
    },
    {
      code: 4,
      description: 'Sushi',
      dishes: ['Primo piatto', 'Secondo piatto', 'Terzo piatto']
    }
  ];

  constructor(
    private http: HttpClient,
    private rdConstants: RDConstantsService,
    private spinner: RDSpinnerService,
    private navController: NavController,
    private profileService: ProfileService,
    public paramsService: RDParamsService,
    private foodAllergiesService: FoodAllergiesService,
    private badgesService: BadgesService,
    private rdStorage: RDStorageService) {

    // Lettura dati in cache
    this.readMyDinner();
    this.readOtherDinners();
    this.readDinnerHistory();
    this.readDinnerDetails();
    this.readMyDinnerDetails();
    this.readDinnerWinners();

    this.directionsService = new google.maps.DirectionsService();
  }

  // Registra nuova cena a DB, e aggiunge il mio gruppo in automatico
  async createDinner(createDinnerBody): Promise<object> {
    await this.spinner.create();
    return this.http.post(this.rdConstants.getApiRoute('dinners'), createDinnerBody)
      .toPromise()
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }

  // Aggiorna la myDinner in localStorage
  private async writeMyDinner(myDinner: Dinner) {
    await this.rdStorage.setItem('myDinner', JSON.stringify(myDinner));
    await this.readMyDinner();
  }

  // Cancella dal localStorage la myDinner
  public async clearMyDinner() {
    await this.rdStorage.setItem('myDinner', null);
    await this.readMyDinner();
  }

  // Legge la myDinner presente in localStorage e la carica nel Service
  private async readMyDinner() {
    this._myDinner = JSON.parse(
      await this.rdStorage.getItem('myDinner')
    ) as Dinner || null;
  }

  // Ottiene l'eventuale cena a cui partecipo
  async getMyDinner(force: Boolean): Promise<object> {
    return new Promise(async (resolve, reject) => {
      if (force || !this._myDinner) {

        await this.spinner.create(); // Lascio l'await perchè a volta è così veloce che non fa in tempo a creare lo spinner
        this.http.get(this.rdConstants.getApiRoute('getMyDinner'))
          .toPromise()
          .then(async res => {
            await this.writeMyDinner(res as Dinner);
            resolve(this._myDinner);
          }, () => {
            reject();
          }).finally(
            () => {
              this.spinner.dismiss();
            });
      } else {
        resolve(this._myDinner);
      }
    })
  }

  // Ottengo le cene disponibili esclusa l'eventuale myDinner, eventualmente caricando il valore da cache
  async getOtherDinners(dinnerId: number, force: Boolean, index: number, filter: number, notSave: Boolean): Promise<Dinner[]> {
    return new Promise(async (resolve, reject) => {
      if (force || !this._otherDinners || !this._otherDinners.length) {
        await this.spinner.create(); // Lascio l'await perchè a volta è così veloce che non fa in tempo a creare lo spinner
        this.http.post(this.rdConstants.getApiRoute('getOtherDinners'), { dinnerId, index, filter })
          .toPromise().then(
            async res => {
              if (notSave) {
                resolve(res as Dinner[]);
              } else {
                await this.writeOtherDinners(res as Dinner[]);
                resolve(this._otherDinners);
              }
            },
            () => {
              reject();
            }
          ).finally(() => { this.spinner.dismiss(); });
      } else {
        resolve(this._otherDinners);
      }
    });
  }

  // Aggiorna le otherDinners in localStorage
  private async writeOtherDinners(otherDinners: Dinner[]) {
    await this.rdStorage.setItem('otherDinners', JSON.stringify(otherDinners));
    await this.readOtherDinners();
  }

  // Cancella dal localStorage le otherDinners
  public async clearOtherDinners() {
    await this.rdStorage.setItem('otherDinners', null);
    await this.readOtherDinners();
  }

  // Legge le otherDinners presenti in localStorage e le carica nel Service
  private async readOtherDinners() {
    this._otherDinners = JSON.parse(
      await this.rdStorage.getItem('otherDinners')
    ) as Dinner[] || [];
  }

  // Abbandona cena, eliminandola se sono l'unico partecipante
  async leaveDinner(leaveDinnerBody): Promise<object> {
    await this.spinner.create();
    return this.http.post(this.rdConstants.getApiRoute('leaveDinner'), leaveDinnerBody)
      .toPromise()
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }

  // Ottengo lo state della cena
  public async getDinnerState(dinnerId: number): Promise<any> {
    //await this.spinner.create();
    return new Promise((resolve, reject) =>
      this.http.post(this.rdConstants.getApiRoute('getDinnerState'), { dinnerId })
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          () => {
            reject();
          }
        )
        .finally(
          () => {
            //this.spinner.dismiss();
          }
        )
    );
  }

  public detDinnerStateRoute(dinner: Dinner, dinnerState: any, navigationFrom?: string) {
    if (dinnerState === -1) {
      this.navController.navigateRoot('/home/tabs/dinners', { queryParams: { message: 'Cena cancellata' } });
    } else if (dinnerState === 0) {
      if (navigationFrom === 'dinners') {
        this.navController.navigateForward('/home/tabs/dinners/dinner-detail', { queryParams: dinner });
      } else {
        this.navController.navigateForward('/home/tabs/my-dinners/dinner-detail', { queryParams: dinner });
      }
    } else if (dinner.groupIds.includes(this.paramsService.getParams().groupId) === true) {
      if (dinnerState === 1) {
        this.navController.navigateRoot('/home/tabs/my-dinners/dinner-event', { queryParams: dinner });
      } else if (dinnerState === 2 || dinnerState === 3 || dinnerState === 4) {
        this.navController.navigateRoot('/home/tabs/my-dinners/dinner-phases', { queryParams: dinner });
      } else if (dinnerState === 5) {
        this.navController.navigateRoot('/home/tabs/my-dinners/dinner-votes', { queryParams: dinner });
      } else if (dinnerState === 6) {
        this.navController.navigateRoot('/home/tabs/my-dinners/dinner-winners', { queryParams: dinner });
      }
    } else {
      this.navController.navigateRoot('/home/tabs/dinners', { queryParams: { message: 'Non è più possibile iscriversi alla cena' } });
    }
  }

  // Aggiorna i dinnerDetails nel localStorage
  private async writeDinnerDetails(dinnerDetails: DinnerDetails) {
    await this.rdStorage.setItem('dinnerDetails', JSON.stringify(dinnerDetails));
    await this.readDinnerDetails();
  }

  // Cancella dal localStorage i dinnerDetails
  public async clearDinnerDetails() {
    await this.rdStorage.setItem('dinnerDetails', null);
    await this.readDinnerDetails();
  }

  // Legge i dinnerDetails presenti in localStorage e li carica nel Service
  private async readDinnerDetails() {
    this._dinnerDetailsDict = JSON.parse(
      await this.rdStorage.getItem('dinnerDetails')
    ) || {};
  }

  // Ottiene i dettagli della cena selezionata
  public async getDinnerDetails(dinner: Dinner, userData: UserData, force: Boolean):
    Promise<DinnerDetails> {
    const dinnerId = dinner.id;

    return new Promise(async (resolve, reject) => {
      if ((force || !this._dinnerDetailsDict ||
        !Object.keys(this._dinnerDetailsDict).includes(dinnerId.toString()))
      ) {

        let userAddress: string;
        if (this.paramsService.getParams().groupId) {
          userAddress = this.profileService.getPartner().group_address;
        } else {
          userAddress = userData.address;
        }
        const userGroupId = this.paramsService.getParams().groupId;
        const dataToSend = {
          dinnerId: dinnerId,
          userAddress: userAddress,
          userGroupId: userGroupId
        };

        await this.spinner.create(); // Lascio l'await perchè a volta è così veloce che non fa in tempo a creare lo spinner
        this.http.post(this.rdConstants.getApiRoute('getDinnerDetails'), dataToSend)
          .toPromise()
          .then(
            res => {
              const avgDistance = res['avgDistance'];
              const dinnerData = res['dinnerData'];
              const dinnerBadges = this.getDinnerBadges(res as DinnerDetails);
              const allDinnerFoodAllergies = this.foodAllergiesService.convertImagesToJpeg(res['foodAllergies']);
              const dinnerFoodAllergies = this.getDinnerFoodAllergies(res as DinnerDetails);
              const dinnerMinMaxAges = this.getDinnerUsersData(res as DinnerDetails);
              this.usersData = res['usersData'];
              const addressesToDecode = {
                groupid: [],
                addresses: []
              };
              // Creo oggetto con i groupId e groupaddress per poi ottenere le coordinate
              for (let i = 0; i < this.usersData.length; i++) {
                if (addressesToDecode.groupid.includes(this.usersData[i].groupid) === false && this.usersData[i].groupid !== this.paramsService.getParams().groupId) {
                  addressesToDecode.addresses.push(this.usersData[i].group_address);
                  addressesToDecode.groupid.push(this.usersData[i].groupid);
                }
              }
              let userAddressToDecode: string;
              if (this.paramsService.getParams().groupId) {
                userAddressToDecode = this.profileService.getPartner().group_address;
              } else {
                userAddressToDecode = userData.address;
              }
              // Ottengo le coordinate degli indirizzi dei gruppi e dell'utente da utilizzare poi per calcolare le distanze
              this.getCoordinates(addressesToDecode.addresses, userAddressToDecode).then(async response => {
                const addressesLatLng = response[0];
                const userLatLng = response[1];
                const dinnerDetails: DinnerDetails = {
                  usersData: this.usersData,
                  badges: dinnerBadges,
                  allFoodAllergies: allDinnerFoodAllergies,
                  foodAllergies: dinnerFoodAllergies[0],
                  foodAllergiesCategories: dinnerFoodAllergies[1],
                  minMaxAges: dinnerMinMaxAges,
                  addressesLatLng: addressesLatLng,
                  userLatLng: userLatLng,
                  groupAddresses: addressesToDecode,
                  dinnerData: dinnerData,
                  avgDistance: avgDistance
                };

                this._dinnerDetailsDict[dinnerId.toString()] = dinnerDetails;
                await this.writeDinnerDetails(this._dinnerDetailsDict);
                resolve(this._dinnerDetailsDict[dinnerId.toString()]);
              });
            }, () => {
              reject();
            }
          )
          .finally(
            () => { this.spinner.dismiss(); }
          )
      } else {
        resolve(this._dinnerDetailsDict[dinnerId.toString()]);
      }
    });
  }

  // Aggiorna i myDinnerDetails nel localStorage
  private async writeMyDinnerDetails(myDinnerDetails: MyDinnerDetails) {
    await this.rdStorage.setItem('myDinnerDetails', JSON.stringify(myDinnerDetails));
    await this.readMyDinnerDetails();
  }

  // Cancella dal localStorage i myDinnerDetails
  public async clearMyDinnerDetails() {
    await this.rdStorage.setItem('myDinnerDetails', null);
    await this.readMyDinnerDetails();
  }

  // Legge i myDinnerDetails presenti in localStorage e li carica nel Service
  private async readMyDinnerDetails() {
    this._myDinnerDetailsDict = JSON.parse(
      await this.rdStorage.getItem('myDinnerDetails')
    ) || {};
  }

  // Ottiene i piatti della cena per l'evento cena e gli utenti corrispondenti
  async getMyDinnerDetails(dinner: Dinner, groupId: number):
    Promise<MyDinnerDetails> {

    const dinnerId = dinner.id;

    return new Promise(async (resolve, reject) => {
      if ((!this._myDinnerDetailsDict ||
        !Object.keys(this._myDinnerDetailsDict).includes(dinnerId.toString()))
      ) {

        const dataToSend = {
          dinnerId: dinner.id,
          groupId: groupId
        };

        await this.spinner.create(); // Lascio l'await perchè a volta è così veloce che non fa in tempo a creare lo spinner
        this.http.post(this.rdConstants.getApiRoute('getDinnerHouses'), dataToSend)
          .toPromise()
          .then(
            res => {
              const dinnerFoodAllergies = this.foodAllergiesService.convertImagesToJpeg(res['foodAllergies']);
              const myDinnerDetails = {
                houses: res['dinnerHouses'],
                myDish: undefined,
                houseDistances: [],
                foodAllergies: dinnerFoodAllergies,
                addressesLatLng: [],
                userLatLng: undefined
              };
              myDinnerDetails.houses = this.convertHouseImagesToJpeg(myDinnerDetails.houses);
              const addressesToDecode = this.detAddressesToDecode(myDinnerDetails.houses);

              this.getCoordinates(addressesToDecode, this.profileService.getPartner().group_address).then(response => {
                myDinnerDetails.addressesLatLng = response[0];
                myDinnerDetails.userLatLng = response[1];
                this.getHouseDistances(myDinnerDetails.houses).then(async resp => {
                  myDinnerDetails.houseDistances = resp as string[];

                  this._myDinnerDetailsDict[dinnerId.toString()] = myDinnerDetails;
                  await this.writeMyDinnerDetails(this._myDinnerDetailsDict);
                  resolve(this._myDinnerDetailsDict[dinnerId.toString()]);
                });
              });
            }, () => {
              reject();
            })
          .finally(
            () => { this.spinner.dismiss(); }
          );
      } else {
        resolve(this._myDinnerDetailsDict[dinnerId.toString()]);
      }
    });
  }

  // Funzioni di Dinner Details

  // Ottengo i Badges della cena selezionata
  getDinnerBadges(dinnerDetails: DinnerDetails) {
    const dinnerBadges = [];
    dinnerDetails.badges.forEach(badge => {
      const sameGroupid = dinnerBadges.filter(x => x.group_id === badge.group_id);
      if (sameGroupid) {
        const sameBadgeid = sameGroupid.find(x => x.badge_id === badge.badge_id);
        if (sameBadgeid) {
          if (sameBadgeid.progress < badge.progress) {
            sameBadgeid.progress = badge.progress;
            sameBadgeid.description = badge.description;
            sameBadgeid.badge_photo = badge.badge_photo;
          }
        } else {
          dinnerBadges.push(badge);
        }
      } else {
        dinnerBadges.push(badge);
      }
    });
    this.badgesService.convertImagesToJpeg(dinnerBadges);
    this.badgesService.setDescriptionProgress(dinnerBadges);
    return dinnerBadges;
  }

  // Rimuove duplicati tenendo solo il primo
  removeFoodAllergiesDuplicates(foodAllergies: UserAllergy[]) {
    const dinnerFoodAllergies = [];
    foodAllergies.forEach(foodAllergy => {
      const sameAllergyId = dinnerFoodAllergies.filter(x => x.allergy_id === foodAllergy.allergy_id);
      if (sameAllergyId) {
        const sameName = sameAllergyId.find(x => x.allergy_name.toLowerCase() === foodAllergy.allergy_name.toLowerCase());
        if (!sameName) {
          dinnerFoodAllergies.push(foodAllergy);
        }
      } else {
        dinnerFoodAllergies.push(foodAllergy);
      }
    });
    return dinnerFoodAllergies;
  }

  // Ottengo le intolleranze della cena selezionata
  getDinnerFoodAllergies(dinnerDetails: DinnerDetails) {
    // Rimuovo eventuali intolleranze duplicate
    const uniqueFoodAllergiesList = this.removeFoodAllergiesDuplicates(dinnerDetails.foodAllergies);
    // Ottengo le categorie delle foodAllergies presenti nella cena
    const dinnerAllergiesCategory = this.foodAllergiesService.createCategoryArray(uniqueFoodAllergiesList);

    return [uniqueFoodAllergiesList, dinnerAllergiesCategory];
  }

  // Calcolo gli anni e l'età minima/massima degli utenti partecipanti alla cena selezionata
  getDinnerUsersData(dinnerDetails: DinnerDetails) {
    const userAges: number[] = [];
    dinnerDetails.usersData.forEach(user => {
      user.birth_date = new Date(user.birth_date);
      user.birth_date = user.birth_date.toLocaleDateString() as unknown as Date;
      userAges.push(this.calcAge(user.birth_date));
    });
    const userMinMaxAges = [Math.min.apply(null, userAges), Math.max.apply(null, userAges)];
    return userMinMaxAges;
  }

  // Funzioni di myDinner

  // Converto le immagini dei membri delle case in JPEG
  convertHouseImagesToJpeg(dinnerHouses: DinnerHouses) {
    dinnerHouses.firstHouse.firstImage = 'data:image/jpeg;base64,' + dinnerHouses.firstHouse.firstImage;
    dinnerHouses.firstHouse.secondImage = 'data:image/jpeg;base64,' + dinnerHouses.firstHouse.secondImage;
    dinnerHouses.secondHouse.firstImage = 'data:image/jpeg;base64,' + dinnerHouses.secondHouse.firstImage;
    dinnerHouses.secondHouse.secondImage = 'data:image/jpeg;base64,' + dinnerHouses.secondHouse.secondImage;
    dinnerHouses.thirdHouse.firstImage = 'data:image/jpeg;base64,' + dinnerHouses.thirdHouse.firstImage;
    dinnerHouses.thirdHouse.secondImage = 'data:image/jpeg;base64,' + dinnerHouses.thirdHouse.secondImage;
    return dinnerHouses;
  }

  // Ottengo gli address di tutte le case tranne quella dello user
  detAddressesToDecode(dinnerHouses: DinnerHouses) {
    const addressesToDecode = [];
    if (dinnerHouses.firstHouse.groupid !== this.paramsService.getParams().groupId) {
      addressesToDecode.push(dinnerHouses.firstHouse.groupAddress);
    }
    if (dinnerHouses.secondHouse.groupid !== this.paramsService.getParams().groupId) {
      addressesToDecode.push(dinnerHouses.secondHouse.groupAddress);
    }
    if (dinnerHouses.thirdHouse.groupid !== this.paramsService.getParams().groupId) {
      addressesToDecode.push(dinnerHouses.thirdHouse.groupAddress);
    }
    return addressesToDecode;
  }

  // Ottengo solo le foodAllergies dei componenti della mia cena
  getMyDinnerFoodAllergies(dinnerHouses: DinnerHouses, foodAllergies: UserAllergy[]) {
    const myDinnerFoodAllergies = [];
    const myDinnerUserIds = [dinnerHouses.firstHouse.firstUserId, dinnerHouses.firstHouse.secondUserId, dinnerHouses.secondHouse.firstUserId, dinnerHouses.secondHouse.secondUserId, dinnerHouses.thirdHouse.firstUserId, dinnerHouses.thirdHouse.secondUserId]

    for (let k = 0; k < foodAllergies.length; k++) {
      for (let j = 0; j < myDinnerUserIds.length; j++) {
        if (foodAllergies[k].user_id === myDinnerUserIds[j]) {
          myDinnerFoodAllergies.push(foodAllergies[k]);
        }
      }
    }

    // Rimuovo eventuali intolleranze duplicate
    const uniqueMyDinnerFoodAllergies = this.removeFoodAllergiesDuplicates(myDinnerFoodAllergies);
    // Ottengo le categorie delle foodAllergies presenti nella cena
    const myDinnerAllergiesCategories = this.foodAllergiesService.createCategoryArray(uniqueMyDinnerFoodAllergies);

    return [uniqueMyDinnerFoodAllergies, myDinnerAllergiesCategories];
  }

  setDinnerDishes(dinner: Dinner) {
    const decodedDishNames = this.decodeType(Number(dinner.type));
    const dinnerDate = new Date(dinner.date);

    // firstDish
    const firstDishName = decodedDishNames[1];
    const firstDishStart = new Date(dinnerDate.getTime());
    const firstDishEnd = new Date(firstDishStart.getTime() + 35 * 60000);

    // secondDish
    const secondDishName = decodedDishNames[2];
    const secondDishStart = new Date(firstDishEnd.getTime() + 25 * 60000);
    const secondDishEnd = new Date(secondDishStart.getTime() + 35 * 60000);

    // thirdDish
    const thirdDishName = decodedDishNames[3];
    const thirdDishStart = new Date(secondDishEnd.getTime() + 25 * 60000);
    const thirdDishEnd = new Date(thirdDishStart.getTime() + 40 * 60000);

    const firstDish = { name: firstDishName, startTime: firstDishStart, endTime: firstDishEnd };
    const secondDish = { name: secondDishName, startTime: secondDishStart, endTime: secondDishEnd };
    const thirdDish = { name: thirdDishName, startTime: thirdDishStart, endTime: thirdDishEnd };

    return [firstDish, secondDish, thirdDish];
  }

  // Restituisce le informazioni sul tipo della cena
  getDinnerTypes() {
    return this.dinnerTypes;
  }

  // Restituisce il nome del tipo della cena ed i piatti preparati
  decodeType(type: number) {
    for (let i = 0; i < this.dinnerTypes.length; i++) {
      if (this.dinnerTypes[i].code === type) {
        const firstDish = this.dinnerTypes[i].dishes[0];
        const secondDish = this.dinnerTypes[i].dishes[1];
        const thirdDish = this.dinnerTypes[i].dishes[2]
        return [this.dinnerTypes[i].description, firstDish, secondDish, thirdDish]
      }
    }
  }

  // Determina il piatto che cucinerà il mio gruppo
  detMyDish(dinnerHouses: DinnerHouses, firstDish: string, secondDish: string, thirdDish: string) {
    if (this.paramsService.getParams().groupId === dinnerHouses.firstHouse.groupid) {
      return firstDish;
    } else if (this.paramsService.getParams().groupId === dinnerHouses.secondHouse.groupid) {
      return secondDish;
    } else {
      return thirdDish;
    }
  }

  // Funzioni di dinnerPhase

  // Determino in che fase della cena sono in base allo state della cena
  setPhase(state: number) {
    let phase: number;

    if (state === 2) {
      phase = 1;
    } else if (state === 3) {
      phase = 2;
    } else if (state === 4) {
      phase = 3;
    } else {
      phase = 4;
    }
    return phase;
  }

  // Imposto le variabili della fase ritornando la distanza tra le due case, il tempo di viaggio e l'oggetto DirectionsRenderer che disegna il percorso sulla mappa
  setVariables(firstAddress: string, secondAddress: string) {
    const variablesArray = [];
    return new Promise(async (res) => {
      await this.calcDistance(firstAddress, secondAddress).then(async res => {
        variablesArray.push('A ' + res[0] + ' da te', 'Tempo di viaggio stimato: ' + res[1] + ' in auto', res[2]);
      });
      res(variablesArray);
    });
  }

  // Funzioni di dinnerVotes

  // Controllo se l'utente ha già votato o meno
  async checkIfVoted(dinnerId: number): Promise<any> {
    await this.spinner.create();
    return new Promise((resolve, reject) =>
      this.http.post(this.rdConstants.getApiRoute('checkIfVoted'), { dinnerId })
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          () => {
            reject();
          }
        )
        .finally(
          () => { this.spinner.dismiss(); }
        )
    );
  }

  // Determino quali sono i due gruppi che devo votare
  detGroupsToVote(myDinnerDetails: MyDinnerDetails) {
    const groupsToVote = [];

    if (myDinnerDetails.houses.firstHouse.groupid !== this.paramsService.getParams().groupId) {
      groupsToVote.push(myDinnerDetails.houses.firstHouse);
    }
    if (myDinnerDetails.houses.secondHouse.groupid !== this.paramsService.getParams().groupId) {
      groupsToVote.push(myDinnerDetails.houses.secondHouse);
    }
    if (myDinnerDetails.houses.thirdHouse.groupid !== this.paramsService.getParams().groupId) {
      groupsToVote.push(myDinnerDetails.houses.thirdHouse);
    }

    return groupsToVote;
  }

  // Determino, in base al dinnerId, le categorie di voto
  detVoteCategories(dinnerType: number) {
    const voteCategories = [];

    switch (dinnerType) {
      case 1:
        voteCategories.push(...['Location', 'Bontà', 'Ospitalità', 'Simpatia', 'Complessità del piatto']);
        return voteCategories;
      case 2:
        voteCategories.push(...['Location', 'Bontà', 'Ospitalità', 'Simpatia', 'Complessità del piatto']);
        return voteCategories;
      case 3:
        voteCategories.push(...['Location', 'Bontà', 'Ospitalità', 'Simpatia', 'Veganità']);
        return voteCategories;
      case 4:
        voteCategories.push(...['Location', 'Bontà', 'Ospitalità', 'Simpatia', 'Sushitosità']);
        return voteCategories;
      default:
        voteCategories.push(...['Location', 'Bontà', 'Ospitalità', 'Simpatia', 'Complessità del piatto']);
        return voteCategories;
    }
  }

  // Invia i voti a DB
  async postGroupVotes(groups: object[], votingGroupId: number, dinnerId: number): Promise<any> {
    const postVotesBody = {
      groupsArray: groups,
      votingGroupId: votingGroupId,
      dinnerId: dinnerId
    };
    await this.spinner.create();
    return this.http.post(this.rdConstants.getApiRoute('insertDinnerVotes'), postVotesBody)
      .toPromise()
      .then(
        () => { this.spinner.dismiss(); }
      );
  }

  // Funzioni di dinnerWinners

  // Aggiorna i dinnerWinners nel localStorage
  private async writeDinnerWinners(dinnerWinners: DinnerWinner[]) {
    await this.rdStorage.setItem('dinnerWinners', JSON.stringify(dinnerWinners));
    await this.readDinnerWinners();
  }

  // Cancella dal localStorage i dinnerWinners
  public async clearDinnerWinners() {
    await this.rdStorage.setItem('dinnerWinners', null);
    await this.readDinnerWinners();
  }

  // Legge i dinnerWinners presenti in localStorage e li carica nel Service
  private async readDinnerWinners() {
    this._dinnerWinnersDict = JSON.parse(
      await this.rdStorage.getItem('dinnerWinners')
    ) || {};
  }

  // Ottengo i vincitori della cena selezionata
  async getDinnerWinners(dinner: Dinner, force: Boolean): Promise<DinnerWinner[]> {
    const dinnerId = dinner.id;

    return new Promise(async (resolve, reject) => {
      if ((force || !this._dinnerWinnersDict ||
        !Object.keys(this._dinnerWinnersDict).includes(dinnerId.toString()))
      ) {

        await this.spinner.create();
        this.http.post(this.rdConstants.getApiRoute('getDinnerWinners'), { dinnerId })
          .toPromise()
          .then(
            async (res) => {
              this._dinnerWinnersDict[dinnerId.toString()] = res;
              await this.writeDinnerWinners(this._dinnerWinnersDict);
              resolve(this._dinnerWinnersDict[dinnerId.toString()]);
            },
            () => {
              reject();
            }
          )
          .finally(() => { this.spinner.dismiss(); });
      } else {
        resolve(this._dinnerWinnersDict[dinnerId.toString()]);
      }
    });
  }

  // Converto le immagini dei vincitori e dei badges in JPEG
  convertWinnersImagesToJpeg(dinnerWinners: DinnerWinner[]) {
    for (let i = 0; i < dinnerWinners.length; i++) {
      if (!dinnerWinners[i].profile_photo.startsWith('data:image/jpeg;base64,')) dinnerWinners[i].profile_photo = 'data:image/jpeg;base64,' + dinnerWinners[i].profile_photo;
      if (!dinnerWinners[i].badge_photo.startsWith('data:image/jpeg;base64,')) dinnerWinners[i].badge_photo = 'data:image/jpeg;base64,' + dinnerWinners[i].badge_photo;
    }
    return dinnerWinners;
  }

  // Funzioni di myDinners

  // Aggiorna la dinnerHistory in localStorage
  private async writeDinnerHistory(dinnerHistory: Dinner[]) {
    await this.rdStorage.setItem('dinnerHistory', JSON.stringify(dinnerHistory));
    await this.readDinnerHistory();
  }

  // Cancella dal localStorage la dinnerHistory
  public async clearDinnerHistory() {
    await this.rdStorage.setItem('dinnerHistory', null);
    await this.readDinnerHistory();
  }

  // Legge la dinnerHistory presente in localStorage e la carica nel Service
  private async readDinnerHistory() {
    this._dinnerHistory = JSON.parse(
      await this.rdStorage.getItem('dinnerHistory')
    ) as Dinner[] || [];
  }

  // Ottengo le cene passate dell'utente
  async getDinnerHistory(force: Boolean): Promise<Dinner[]> {
    return new Promise(async (resolve, reject) => {
      if ((force || !this._dinnerHistory || !this._dinnerHistory.length)) {

        await this.spinner.create(); // Lascio l'await perchè a volta è così veloce che non fa in tempo a creare lo spinner
        this.http.get(this.rdConstants.getApiRoute('getDinnerHistory'))
          .toPromise()
          .then(
            async res => {
              await this.writeDinnerHistory(res as Dinner[]);
              resolve(this._dinnerHistory);
            }, () => {
              reject();
            })
          .finally(
            () => { this.spinner.dismiss(); }
          )
      } else {
        resolve(this._dinnerHistory);
      }
    });
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

  formatDate(date: Date) {
    // Converto l'ora in formato HH:mm
    date = new Date(date);
    const hours = ('0' + date.getUTCHours()).slice(-2);
    const minutes = ('0' + date.getUTCMinutes()).slice(-2);
    const dinnerTime = hours + '.' + minutes;

    // Converto la data in formato nomeGiorno DD nomeMese YYYY
    const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
    const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
    const dinnerDate = days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
    return [dinnerDate, dinnerTime];
  }

  // Converto img da base64 a jpeg
  convertUserImagesToJpeg(dinnerDetails: DinnerDetails) {
    for (let i = 0; i < dinnerDetails.usersData.length; i++) {
      dinnerDetails.usersData[i].profile_photo = 'data:image/jpeg;base64,' + dinnerDetails.usersData[i].profile_photo;
    }
    return dinnerDetails.usersData;
  }

  // Per ogni indirizzo della cena ottengo le coordinate
  async getCoordinates(addressesToDecode: any, userAddress: string) {
    const addressesLatLng = [];
    const userLatLng = [];
    // Ottengo coordinate dei partecipanti alla cena escluso eventualmente lo user
    for (let i = 0; i < addressesToDecode.length; i++) {
      await this.geocodeAddresses(addressesToDecode[i]).then(res => {
        addressesLatLng.push(res);
      },
        () => {
          console.log('Errore in geocodeAddresses dinners');
        });
    }
    // Ottengo coordinate user
    await this.geocodeAddresses(userAddress).then(res => {
      userLatLng.push(res);
    },
      () => {
        console.log('Errore in geocodeAddresses user');
      });
    return [addressesLatLng, userLatLng];
  }

  // Ottengo coordinate dall'indirizzo
  geocodeAddresses(address: string) {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
          resolve(results[0].geometry.location);
        } else {
          console.log('Impossibile eseguire geocoder per la seguente ragione: ' + status);
          reject();
        }
      });
    });
  }

  // Calcolo la distanza tra il primo ed il secondo gruppo ed il secondo e il terzo
  getHouseDistances(dinnerHouses: DinnerHouses) {
    return new Promise((resolve, reject) => {
      const houseDistances = [];
      this.calcDistance(dinnerHouses.firstHouse.groupAddress, dinnerHouses.secondHouse.groupAddress).then(res => {
        houseDistances.push(res[0]);
        this.calcDistance(dinnerHouses.secondHouse.groupAddress, dinnerHouses.thirdHouse.groupAddress).then(resp => {
          houseDistances.push(resp[0]);
          resolve(houseDistances);
        });
      });
    });
  }

  // Calcolo quanto tempo manca alla cena
  getDinnerTimeLeft(dinnerDate: Date) {
    const now = new Date().getTime();
    const diffDate = new Date(dinnerDate).getTime();
    const distance = (diffDate - now) - 7200000;
    let dinnerDaysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
    let dinnerHoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const dinnerMinutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    if (dinnerHoursLeft < 0) {
      dinnerDaysLeft++;
      dinnerHoursLeft++;
    }
    return [dinnerDaysLeft, dinnerHoursLeft, dinnerMinutesLeft];
  }

  // Partecipa a cena
  async joinDinner(joinDinnerBody): Promise<object> {
    await this.spinner.create();
    return this.http.post(this.rdConstants.getApiRoute('joinDinner'), joinDinnerBody)
      .toPromise()
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }

  // Aggiorna una cena se ne sono l'amministratore
  async updateDinner(updateDinnerBody): Promise<object> {
    await this.spinner.create();
    return this.http.put(this.rdConstants.getApiRoute('dinners'), updateDinnerBody)
      .toPromise()
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }

  // Calcolo distanza e tempo di percorrenza in auto tra due indirizzi
  calcDistance(firstAddress: string, secondAddress: string): Promise<any> {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    return new Promise((res, rej) => {
      this.directionsService.route({
        origin: firstAddress,
        destination: secondAddress,
        travelMode: google.maps.TravelMode['DRIVING']
      }, (response, status) => {
        if (status === 'OK') {
          const distance = response.routes[0].legs[0].distance.text; // Distanza tra due indirizzi
          const travelTime = response.routes[0].legs[0].duration.text; // Tempo di percorrenza in macchina
          directionsRenderer.setDirections(response); // Oggetto per disegnare sulla mappa il percorso
          res([distance, travelTime, directionsRenderer]);
        } else {
          window.alert('Directions request failed due to ' + status);
          rej();
        }
      });
    });
  }

  // Se esiste un marker nello stesso indirizzo, applico al secondo un offset
  checkIfExistingMarker(markers: google.maps.Marker[], address: google.maps.LatLng) {
    if (markers.length !== 0) {
      for (let i = 0; i < markers.length; i++) {
        const existingMarker = markers[i];
        const pos = existingMarker.getPosition();

        if (address.lat == pos.lat && address.lng == pos.lng) {
          // Applico un offset al secondo marker
          const newLat = address.lat() + (Math.random() - .5) / 1500;
          const newLng = address.lng() + (Math.random() - .5) / 1500;
          const finalLatLng = new google.maps.LatLng(newLat, newLng);
          return finalLatLng;
        }
      }
      return address;
    } else {
      return address;
    }
  }
}

// Rappresenta una tipologia di cena
export interface DinnerType {
  code: number; // 1: italiano, 2: sushi, 3: vegan, 4: flash dinner
  description: string;
  dishes: string[];
  background?: string; // TODO aggiungere gestione backgound della card in base alla tipologia di cena
}

// Rappresenta una cena
export interface Dinner {
  id: number;
  title: string;
  description: string;
  type: number; // rappresenta la tipologia di cena
  groupIds: number[]; // Rappresenta gli id dei gruppi partecipanti alla cena
  date: Date;
  dateString?: string;
  time?: number;
  administrator: number; // rappresenta l'id del gruppo amministratore della cena
  state: number; // Rappresenta lo state della cena
}

// Rappresenta i dettagli di una cena
export interface DinnerDetails {
  badges?: UserBadge[];
  allFoodAllergies?: UserAllergy[];
  foodAllergies: UserAllergy[];
  foodAllergiesCategories?: string[];
  usersData?: UserData[];
  minMaxAges?: number[];
  avgDistance?: number;
  addressesLatLng?: google.maps.LatLng[];
  groupAddresses?: any;
  userLatLng?: google.maps.LatLng[];
  dinnerData?: Dinner;
}

export interface DinnerHouse {
  groupid: number;
  firstName: string;
  firstUserId: number;
  secondName: string;
  secondUserId: number;
  firstImage: string;
  secondImage: string;
  groupAddress: string;
  dishName?: string;
}

export interface DinnerHouses {
  firstHouse: DinnerHouse;
  secondHouse: DinnerHouse;
  thirdHouse: DinnerHouse;
}

export interface DinnerDish {
  name: string;
  startTime: Date;
  endTime: Date;
}

// Rappresenta la cena nell'evento cena
export interface MyDinnerDetails extends DinnerDetails {
  houses: DinnerHouses;
  houseDistances: string[];
}

// Rappresenta un vincitore della Cena
export interface DinnerWinner {
  userId: number;
  name: string;
  groupId: number;
  profile_photo: string;
  badgeId: number;
  badge_photo: string;
  category: string;
  vote: number;
  has_voted: boolean;
}
