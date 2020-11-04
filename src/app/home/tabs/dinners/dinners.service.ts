import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RDConstantsService } from 'src/app/rdcostants.service';
import { RDSpinnerService } from 'src/app/rdspinner.service';
import { UserBadge, BadgesService } from '../../profile/badges.service';
import { UserAllergy, FoodAllergy } from 'src/app/rdmodals/food-allergies/food-allergies.page';
import { UserData, AuthService } from 'src/app/auth/auth.service';
import { FoodAllergiesService } from 'src/app/rdmodals/food-allergies/food-allergies.service';
import { RDParamsService } from 'src/app/rdparams.service';
import { ProfileService } from '../../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class DinnersService {

  _usersData: UserData[];
  geocoder = new google.maps.Geocoder();
  directionsService: google.maps.DirectionsService;

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
    private authService: AuthService,
    private profileService: ProfileService,
    public paramsService: RDParamsService,
    private foodAllergiesService: FoodAllergiesService,
    private badgesService: BadgesService) {
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

  // Ottiene l'elenco delle cene (e dell'eventuale cena a cui partecipo)
  async getDinners(): Promise<object> {
    await this.spinner.create();
    return this.http.get(this.rdConstants.getApiRoute('dinners'))
      .toPromise()
      .finally(
        () => { this.spinner.dismiss(); }
      );
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
  async getDinnerState(dinnerId: number): Promise<any> {
    await this.spinner.create();
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
          () => { this.spinner.dismiss(); }
        )
    );
  }

  // Ottiene i dettagli della cena selezionata
  async getDinnerDetails(dinner: Dinner): Promise<DinnerDetails> {
    const dinnerId = dinner.id;
    let userAddress: string;
    if (this.paramsService.getParams().groupId) {
      userAddress = this.profileService.getPartner().group_address;
    } else {
      userAddress = this.authService.getUserData().address;
    }
    const userGroupId = this.paramsService.getParams().groupId;
    const dataToSend = {
      dinnerId: dinnerId,
      userAddress: userAddress,
      userGroupId: userGroupId
    };
    await this.spinner.create();
    return new Promise((resolve, reject) =>
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
            this._usersData = this.convertUserImagesToJpeg(res as DinnerDetails);
            const addressesToDecode = {
              groupid: [],
              addresses: []
            };
            // Creo oggetto con i groupId e groupaddress per poi ottenere le coordinate
            for (let i = 0; i < this._usersData.length; i++) {
              if (addressesToDecode.groupid.includes(this._usersData[i].groupid) === false && this._usersData[i].groupid !== this.paramsService.getParams().groupId) {
                addressesToDecode.addresses.push(this._usersData[i].group_address);
                addressesToDecode.groupid.push(this._usersData[i].groupid);
              }
            }
            let userAddressToDecode: string;
            if (this.paramsService.getParams().groupId) {
              userAddressToDecode = this.profileService.getPartner().group_address;
            } else {
              userAddressToDecode = this.authService.getUser().userData.address;
            }
            // Ottengo le coordinate degli indirizzi dei gruppi e dell'utente da utilizzare poi per calcolare le distanze
            this.getCoordinates(addressesToDecode.addresses, userAddressToDecode).then(response => {
              const addressesLatLng = response[0];
              const userLatLng = response[1];
              const dinnerDetails: DinnerDetails = {
                usersData: this._usersData,
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
              resolve(dinnerDetails);
            });
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

  // Ottiene i piatti della cena per l'evento cena e gli utenti corrispondenti
  async getMyDinnerDetails(dinner: Dinner, groupId: number): Promise<MyDinnerDetails> {
    const dataToSend = {
      dinnerId: dinner.id,
      groupId: groupId
    };
    await this.spinner.create();
    return new Promise((resolve, reject) =>
      this.http.post(this.rdConstants.getApiRoute('getDinnerHouses'), dataToSend)
        .toPromise()
        .then(
          res => {
            const myDinnerDetails = {
              houses: res as DinnerHouses,
              myDish: undefined,
              houseDistances: [],
              foodAllergies: [],
              addressesLatLng: []
            };
            myDinnerDetails.houses = this.convertHouseImagesToJpeg(myDinnerDetails.houses);
            const addressesToDecode = this.detAddressesToDecode(myDinnerDetails.houses);

            this.getCoordinates(addressesToDecode, this.profileService.getPartner().group_address).then(response => {
              myDinnerDetails.addressesLatLng = response[0];
              this.getHouseDistances(myDinnerDetails.houses).then(resp => {
                myDinnerDetails.houseDistances = resp as string[];
                resolve(myDinnerDetails);
              });
            });
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

  // Funzioni di Dinner

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
  async setPhase(dinnerId: number) {
    let phase: number;
    await this.getDinnerState(dinnerId).then(res => {
      const dinnerState = res.dinner_state;
      if (dinnerState === 2) {
        phase = 1;
      } else if (dinnerState === 3) {
        phase = 2;
      } else if (dinnerState === 4) {
        phase = 3;
      } else if (dinnerState === 5) {
        phase = 4;
      }
    });
    return phase;
  }

  /* setPhase vecchio, che si basava sulla data dei singoli piatti
  setPhase(firstDish: DinnerDish, secondDish: DinnerDish, thirdDish: DinnerDish) {
      const now = new Date();
      let phase: number;
      if (now.getTime() <= firstDish.endTime.getTime() - 7200000) {
        phase = 1;
      } else if (now.getTime() <= secondDish.endTime.getTime() - 7200000) {
        phase = 2;
      } else if (now.getTime() <= thirdDish.endTime.getTime() - 7200000) {
        phase = 3;
      } else {
        phase = 4;
      }
      return phase;
    }
    */

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

  // Ottengo i vincitori della cena selezionata
    async getDinnerWinners(dinner: Dinner): Promise<DinnerWinner[]> {
      const dinnerId = dinner.id;

      await this.spinner.create();
      return new Promise((resolve, reject) =>
        this.http.post(this.rdConstants.getApiRoute('getDinnerWinners'), {dinnerId})
          .toPromise()
          .then(
            res => {
              resolve(res as DinnerWinner[]);
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

  // Converto le immagini dei vincitori e dei badges in JPEG
  convertWinnersImagesToJpeg(dinnerWinners: DinnerWinner[]) {
    for (let i = 0; i < dinnerWinners.length; i++) {
      dinnerWinners[i].profile_photo = 'data:image/jpeg;base64,' + dinnerWinners[i].profile_photo;
      dinnerWinners[i].badge_photo = 'data:image/jpeg;base64,' + dinnerWinners[i].badge_photo;
    }
    return dinnerWinners;
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

        if (address.equals(pos)) {
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
