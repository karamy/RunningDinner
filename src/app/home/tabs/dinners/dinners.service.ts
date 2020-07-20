import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RDConstantsService } from 'src/app/rdcostants.service';
import { RDSpinnerService } from 'src/app/rdspinner.service';
import { UserBadge, BadgesService } from '../../profile/badges.service';
import { UserAllergy } from 'src/app/rdmodals/food-allergies/food-allergies.page';
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
  myDinnerGroups: number[] = [2148, 1247, 4929];
  dishTypes: DinnerDish[] = [
    {
      dishId: 1,
      dishName: 'Antipasto'
    },
    {
      dishId: 2,
      dishName: 'Primo'
    },
    {
      dishId: 3,
      dishName: 'Secondo'
    }
  ];

  dinnerTypes: DinnerType[] = [
    {
      code: 1,
      description: 'Italiano'
    },
    {
      code: 2,
      description: 'Pesce'
    },
    {
      code: 3,
      description: 'Vegan'
    },
    {
      code: 4,
      description: 'Sushi'
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
            const dinnerFoodAllergies = this.getDinnerFoodAllergies(res as DinnerDetails);
            const dinnerMinMaxAges = this.getDinnerUsersData(res as DinnerDetails);
            this._usersData = this.convertUserImagesToJpeg(res as DinnerDetails);
            const addressesToDecode = {
              groupid: [],
              addresses: []
            };
            // Creo oggetto con i groupId e groupaddress per poi ottenere le coordinate
            for (let i = 0; i < this._usersData.length; i++) {
              if (addressesToDecode.groupid.includes(this._usersData[i].groupid) === false) {
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
            this.getCoordinates(addressesToDecode, userAddressToDecode).then(response => {
              const addressesLatLng = response[0];
              const userLatLng = response[1];
              const dinnerDetails: DinnerDetails = {
                usersData: this._usersData,
                badges: dinnerBadges,
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
  async getMyDinnerDetails(dinner: Dinner): Promise<MyDinnerDetails> {
    const dinnerId = dinner.id;
    await this.spinner.create();
    return new Promise((resolve, reject) =>
      this.http.post(this.rdConstants.getApiRoute('getDinnerDishes'), { dinnerId })
        .toPromise()
        .then(
          res => {
            const myDinnerDetails = {
              dishes: [],
              myDish: undefined,
              dishDistances: [],
              foodAllergies: [],
              addressesLatLng: []
            };
            myDinnerDetails.dishes = this.getMyDinnerDishes(res as DinnerDish[]);
            myDinnerDetails.myDish = this.getMyDish(myDinnerDetails);
            const addressesToDecode = {
              groupid: [],
              addresses: []
            }
            for (let i = 0; i < this._usersData.length; i++) {
              if (addressesToDecode.groupid.includes(this._usersData[i].groupid) === false && this.myDinnerGroups.includes(this._usersData[i].groupid) == true) {
                addressesToDecode.addresses.push(this._usersData[i].group_address);
                addressesToDecode.groupid.push(this._usersData[i].groupid);
              }
            }
            this.getCoordinates(addressesToDecode, this.profileService.getPartner().group_address).then(response => {
              myDinnerDetails.addressesLatLng = response[0];
              this.getDishDistances(myDinnerDetails).then(resp => {
                myDinnerDetails.dishDistances = resp;
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

  // Ottengo le intolleranze della cena selezionata
  getDinnerFoodAllergies(dinnerDetails: DinnerDetails) {
    const dinnerFoodAllergies = [];
    dinnerDetails.foodAllergies.forEach(foodAllergy => {
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
    this.foodAllergiesService.convertImagesToJpeg(dinnerFoodAllergies);
    this.foodAllergiesService.orderFoodAllergies(dinnerFoodAllergies);
    const dinnerAllergiesCategory = this.foodAllergiesService.createCategoryArray(dinnerFoodAllergies);

    return [dinnerFoodAllergies, dinnerAllergiesCategory];
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

  // Filtro tutti i gruppi partecipanti alla cena tenendo solo quelli con i quali sono abbinato ed assegno il nome al dishId
  getMyDinnerDishes(dinnerDishes: DinnerDish[]) {
    const myDinnerDishes = [];
    for (let i = 0; i < dinnerDishes.length; i++) {
      const usersNames = [];
      if (this.myDinnerGroups.includes(dinnerDishes[i].groupId) === true) {
        for (let j = 0; j < this.dishTypes.length; j++) {
          if (this.dishTypes[j].dishId === dinnerDishes[i].dishId) {
            dinnerDishes[i].dishName = this.dishTypes[j].dishName;
          }
        }
        for (let k = 0; k < this._usersData.length; k++) {
          if (this._usersData[k].groupid === dinnerDishes[i].groupId) {
            usersNames.push(this._usersData[k]);
          }
        }
        // Inserisco dinnerDish che contiene le info del piatto e gli utenti che lo cucineranno
        const dinnerDish = {
          dish: dinnerDishes[i],
          usersData: usersNames
        };
        myDinnerDishes.push(dinnerDish);
      }
    }
    myDinnerDishes.sort((a, b) => a.dish.dishId - b.dish.dishId);
    return myDinnerDishes;
  }

  // Ottengo il piatto che devo preparare io
  getMyDish(myDinnerDetails: MyDinnerDetails) {
    for (let i = 0; i < myDinnerDetails.dishes.length; i++) {
      if (myDinnerDetails.dishes[i].dish.groupId === this.paramsService.getParams().groupId) {
        return myDinnerDetails.dishes[i].dish;
      }
    }
  }

  // Ottengo solo le foodAllergies dei componenti della mia cena
  getMyDinnerFoodAllergies(foodAllergies: UserAllergy[]) {
    const myDinnerUserIds = [];
    const myDinnerFoodAllergies = [];

    // Ottengo gli user_id dei componenti alla cena
    for (let i = 0; i < this.myDinnerGroups.length; i++) {
      const stringId = this.myDinnerGroups[i].toString().match(/.{1,2}/g);
      const idArray = stringId.map(Number);
      myDinnerUserIds.push(idArray);
    }
    for (let k = 0; k < foodAllergies.length; k++) {
      for (let j = 0; j < myDinnerUserIds.length; j++) {
        if (foodAllergies[k].user_id === myDinnerUserIds[j][0] || foodAllergies[k].user_id === myDinnerUserIds[j][1]) {
          myDinnerFoodAllergies.push(foodAllergies[k]);
        }
      }
    }
    // Ottengo le categorie delle foodAllergies presenti nella cena
    const myDinnerAllergiesCategories = this.foodAllergiesService.createCategoryArray(myDinnerFoodAllergies);
    return [myDinnerFoodAllergies, myDinnerAllergiesCategories];
  }

  // Restituisce le informazioni sul tipo della cena
  getDinnerTypes() {
    return this.dinnerTypes;
  }

  // Restituisce il nome del tipo della cena
  decodeType(type: number) {
    for (let i = 0; i < this.dinnerTypes.length; i++) {
      if (this.dinnerTypes[i].code === type) {
        return this.dinnerTypes[i].description;
      }
    }
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
    for (let i = 0; i < addressesToDecode.addresses.length; i++) {
      await this.geocodeAddresses(addressesToDecode.addresses[i]).then(res => {
        if (addressesToDecode.groupid[i] !== this.paramsService.getParams().groupId) {
          addressesLatLng.push(res);
        }
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
  async getDishDistances(myDinnerDetails: MyDinnerDetails) {
    let dish2Distance: string;
    let dish3Distance: string;
    for (let i = 0; i < myDinnerDetails.dishes.length; i++) {
      if (i === 0) {
        await this.calcDistance(myDinnerDetails.dishes[i].usersData[0].group_address, myDinnerDetails.dishes[i + 1].usersData[0].group_address).then(res => {
          dish2Distance = res;
        });
      } else if (i === 1) {
        await this.calcDistance(myDinnerDetails.dishes[i].usersData[0].group_address, myDinnerDetails.dishes[i + 1].usersData[0].group_address).then(res => {
          dish3Distance = res;
        });
      }
    }
    return [dish2Distance, dish3Distance]
  }

  // Calcolo quanti giorni mancano alla cena (ritorna 0 se mancano meno di 24 ore)
  getDinnerDaysLeft(dinner: Dinner) {
    const now = new Date().getTime();
    const dinnerDate = new Date(dinner.date).getTime();
    const dinnerDaysLeft = Math.floor(((dinnerDate - now) - 7200000) / (1000 * 60 * 60 * 24));
    return dinnerDaysLeft;
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

  // Calcolo distanza tra due indirizzi
  calcDistance(firstAddress: string, secondAddress: string): Promise<string> {
    return new Promise((res, rej) => {
      this.directionsService.route({
        origin: firstAddress,
        destination: secondAddress,
        travelMode: google.maps.TravelMode['DRIVING']
      }, (response, status) => {
        if (status === 'OK') {
          const distance = response.routes[0].legs[0].distance.text;
          res(distance);
        } else {
          window.alert('Directions request failed due to ' + status);
          rej();
        }
      });
    });
  }
}

// Rappresenta una tipologia di cena
export interface DinnerType {
  code: number; // 1: italiano, 2: sushi, 3: vegan, 4: flash dinner
  description: string;
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
  time?: string;
  administrator: number; // rappresenta l'id del gruppo amministratore della cena
}

// Rappresenta i dettagli di una cena
export interface DinnerDetails {
  badges?: UserBadge[];
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

// Rappresenta i piatti di una cena
export interface DinnerDish {
  groupId?: number;
  dishId: number;
  dishName?: string;
}

// Rappresenta i dettagli dell'evento cena
export interface DinnerEvent {
  dish: DinnerDish;
  usersData: UserData[];
}

// Rappresenta la cena nell'evento cena
export interface MyDinnerDetails extends DinnerDetails {
  dishes: DinnerEvent[];
  myDish: DinnerDish;
  dishDistances: string[];
}
