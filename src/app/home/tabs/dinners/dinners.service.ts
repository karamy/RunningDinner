import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RDConstantsService } from 'src/app/rdcostants.service';
import { RDSpinnerService } from 'src/app/rdspinner.service';
import { UserBadge, BadgesService } from '../../profile/badges.service';
import { UserAllergy } from 'src/app/rdmodals/food-allergies/food-allergies.page';
import { UserData, AuthService } from 'src/app/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Platform } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { FoodAllergiesService } from 'src/app/rdmodals/food-allergies/food-allergies.service';

@Injectable({
  providedIn: 'root'
})
export class DinnersService {

  private hideTabBarPages: string[] = [
    'dinner-detail',
  ];
  geocoder = new google.maps.Geocoder();
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
    private router: Router,
    private platform: Platform,
    private rdConstants: RDConstantsService,
    private spinner: RDSpinnerService,
    private authService: AuthService,
    private foodAllergiesService: FoodAllergiesService,
    private badgesService: BadgesService) {
    this.platform.ready().then(() => {
      this.navEvents();
    });
  }

  // Mi subscribo all'evento NavigationEnd per capire quando la navigazione sulle pagine dinner/dinner-detail finisce
  navEvents() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.showHideTabs(e);
      });
  }

  // Ottengo il nome della pagina aperta (page) e controllo se presente in hideTabBarPages
  showHideTabs(e: NavigationEnd) {
    const urlArray = e.url.split('/');
    const pageUrl = urlArray[urlArray.length - 1];
    const page = pageUrl.split('?')[0];
    const shouldHide = this.hideTabBarPages.indexOf(page) > -1;
    shouldHide ? this.hideTabs() : this.showTabs();
  }

  // Nascondo le tabs
  public hideTabs() {
    const tabBar = document.getElementById('myTabBar');
    if (tabBar.style.display !== 'none') tabBar.style.display = 'none';
  }

  // Mostro le tabs
  public showTabs() {
    const tabBar = document.getElementById('myTabBar');
    if (tabBar.style.display !== 'flex') tabBar.style.display = 'flex';
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

  // Registra nuova cena a DB, e aggiunge il mio gruppo in automatico
  async getDinnerDetails(dinner: Dinner): Promise<DinnerDetails> {
    const dinnerId = dinner.id;
    const userId = this.authService.getUserData().userid;
    const userAddress = this.authService.getUserData().address;
    const dataToSend = {
      dinnerId: dinnerId,
      userId: userId,
      userAddress: userAddress
    }
    await this.spinner.create();
    return new Promise((resolve, reject) =>
      this.http.post(this.rdConstants.getApiRoute('getDinnerDetails'), dataToSend)
        .toPromise()
        .then(
          res => {
            const avgDistance = res['avgDistance'];
            const dinnerBadges = this.getDinnerBadges(res as DinnerDetails);
            const dinnerFoodAllergies = this.getDinnerFoodAllergies(res as DinnerDetails);
            const dinnerMinMaxAges = this.getDinnerUsersData(res as DinnerDetails);
            this.getCoordinates(res as DinnerDetails, this.authService.getUserData().address).then(response => {
              const addressesLatLng = response[0];
              const userLatLng = response[1];
              const dinnerDetails: DinnerDetails = {
                badges: dinnerBadges,
                foodAllergies: dinnerFoodAllergies[0],
                foodAllergiesCategories: dinnerFoodAllergies[1],
                minMaxAges: dinnerMinMaxAges,
                addressesLatLng: addressesLatLng,
                userLatLng: userLatLng,
                avgDistance: avgDistance
              }
              resolve(dinnerDetails);
            })
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

  getDinnerTypes() {
    return this.dinnerTypes;
  }

  decodeType(type: number) {
    for (let i = 0; i < this.dinnerTypes.length; i++) {
      if (this.dinnerTypes[i].code === type) {
        return this.dinnerTypes[i].description;
      }
    }
  }

  // Calcolo et� utente
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
    date = new Date(date)
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const dinnerTime = hours + '.' + minutes;

    // Converto la data in formato nomeGiorno DD nomeMese YYYY 
    const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
    const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
    const dinnerDate = days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
    return [dinnerDate, dinnerTime];
  }

  // Per ogni indirizzo della cena ottengo le coordinate
  async getCoordinates(dinnerDetails: DinnerDetails, userAddress: string) {
    const addressesLatLng = [];
    const userLatLng = [];
    // Ottengo coordinate dei partecipanti alla cena escluso eventualmente lo user
    for (let i = 0; i < dinnerDetails.usersData.length; i++) {
      await this.geocodeAddresses(dinnerDetails.usersData[i].address).then(res => {
        if (dinnerDetails.usersData[i]['userId'] !== this.authService.getUserData().userid) {
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
  groupIds: string[]; // Rappresenta gli id dei gruppi partecipanti alla cena
  date: Date;
  dateString?: string;
  time?: string;
  administrator: number; // rappresenta l'id del gruppo amministratore della cena
}

// Rappresenta i dettagli di una cena
export interface DinnerDetails {
  badges: UserBadge[];
  foodAllergies: UserAllergy[];
  foodAllergiesCategories?: string[];
  usersData?: UserData[];
  minMaxAges?: number[];
  avgDistance?: number;
  addressesLatLng?: google.maps.LatLng[];
  userLatLng?: google.maps.LatLng[];
}
