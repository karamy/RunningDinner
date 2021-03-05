import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RDConstantsService } from 'src/app/rdcostants.service';
import { RDParamsService } from 'src/app/rdparams.service';
import { RDStorageService } from 'src/app/rdstorage.service';

@Injectable({
  providedIn: 'root'
})
export class BadgesService {

  private _userBadges: UserBadge[];
  private _groupBadges: UserBadge[];
  private _contactBadgesDict: any;

  constructor(
    private http: HttpClient,
    private rdConstants: RDConstantsService,
    public paramsService: RDParamsService,
    private rdStorage: RDStorageService
  ) {
    this.readUserBadges();
    this.readGroupBadges();

    this._contactBadgesDict = {};
    this.readContactBadges();
  }

  // Carica le i badges da DB
  async getUserBadges(userId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http
        .post(this.rdConstants.getApiRoute('getUserBadges'), { userId })
        .toPromise()
        .then(
          res => {
            this.writeUserBadges(res as UserBadge[]);
            resolve();
          },
          err => {
            reject(err);
          }
        );
    });
  }

  // Ritorna la lista di tutti i badges
  getUserBadgesData() {
    return this._userBadges;
  }

  // Converte le immagini in stringhe utilizzabili dal tag <src>
  public convertImagesToJpeg(badges: UserBadge[]) {
    for (let i = 0; i < badges.length; i++) {
      badges[i].badge_photo = 'data:image/jpeg;base64,' + badges[i].badge_photo;
    }
    return badges;
  }

  // Sostituisce il carattere |n| con l'attuale progress del badge
  public setDescriptionProgress(badges: UserBadge[]) {
    for (let i = 0; i < badges.length; i++) {
      if (badges[i].description.includes('|n|')) {
        if (badges[i].progress === null) {
          badges[i].description = badges[i].description.replace('|n|', '0');
        } else {
          badges[i].description = badges[i].description.replace('|n|', badges[i].progress.toString());
        }
      }
    }
    return badges;
  }

  // Scrivo in localstorage la lista di tutti i badges
  private async writeUserBadges(userBadges: UserBadge[]) {
    userBadges = this.convertImagesToJpeg(userBadges);
    userBadges = this.setDescriptionProgress(userBadges);
    await this.rdStorage.setItem('badges', JSON.stringify(userBadges));
    await this.readUserBadges();
  }

  // Legge gli userBadges presenti in localStorage e li carica nel Service
  private async readUserBadges() {
    this._userBadges = JSON.parse(
      await this.rdStorage.getItem('badges')
    ) as UserBadge[] || [];
  }

  // Cancella dal localStorage la lista di tutti i badges
  public async clearUserBadges() {
    await this.rdStorage.setItem('badges', null);
    this.readUserBadges();
  }

  // Scrivo in localstorage la lista di tutti i contact badges
  private async writeContactBadges(contactBadges: any) {
    await this.rdStorage.setItem('contactBadges', JSON.stringify(contactBadges));
    await this.readContactBadges();
  }

  // Legge i contactBadges presenti in localStorage e li carica nel Service
  private async readContactBadges() {
    this._contactBadgesDict = JSON.parse(
      await this.rdStorage.getItem('contactBadges')
    ) || {};
  }

  // Cancella dal localStorage la lista di tutti i contact badges
  async clearContactBadges() {
    await this.rdStorage.setItem('contactBadges', null);
    await this.readContactBadges();
  }

  // Ottengo da DB i badges del Partner
  getPartnerBadges(userId: number) {
    const groupId = this.paramsService.getParams().groupId;
    const dataToSend = {
      groupId: groupId,
      userId: userId
    };
    return new Promise<void>((resolve, reject) =>
      this.http
        .post(this.rdConstants.getApiRoute('getPartnerBadges'), dataToSend)
        .toPromise()
        .then(
          async res => {
            await this.writeGroupBadges(res as UserBadge[]);
            resolve();
          },
          () => {
            reject();
          }
        )
    );
  }

  // Creo l'array groupBadges e lo scrivo in localstorage
  private async writeGroupBadges(partnerBadges: UserBadge[]) {
    const userBadges = JSON.parse(
      await this.rdStorage.getItem('badges')
    ) as UserBadge[] || [];

    // Converto le immagini dei badge del partner in Jpeg
    partnerBadges = this.convertImagesToJpeg(partnerBadges);
    partnerBadges = this.setDescriptionProgress(partnerBadges);
    const groupBadges = [...userBadges];

    // Confronto i badges dell'utente e del partner ed a parità di badge_id tengo quello con il progress maggiore
    for (let i = 0; i < groupBadges.length; i++) {
      for (let j = 0; j < partnerBadges.length; j++) {
        if (partnerBadges[j].badge_id === groupBadges[i].badge_id && partnerBadges[j].progress > groupBadges[i].progress) {
          groupBadges[i] = partnerBadges[j];
        }
      }
    }

    await this.rdStorage.setItem('groupBadges', JSON.stringify(groupBadges));
    await this.readGroupBadges();
  }

  // Legge il parametro groupBadges e lo carica nel Service
  private async readGroupBadges() {
    this._groupBadges = JSON.parse(
      await this.rdStorage.getItem('groupBadges')
    ) as UserBadge[] || [];
  }

  // Ritorna i badges del gruppo
  getGroupBadges() {
    return this._groupBadges;
  }

  // Cancella dal localStorage i badges del gruppo
  async clearGroupBadges() {
    await this.rdStorage.setItem('groupBadges', null);
    this.readGroupBadges();
  }

  getContactBadgesFromCache(contactId: number): UserBadge[] {
    return this._contactBadgesDict[contactId] || [];
  }

  // Carica i badges del contatto selezionato da DB
  async getContactBadges(contactId: number): Promise<UserBadge[]> {
    return new Promise(
      (resolve, reject) => {

        this.http
          .post(this.rdConstants.getApiRoute('getContactBadges'), { userId: contactId })
          .toPromise()
          .then(
            async res => {
              this.convertImagesToJpeg(res as UserBadge[]);
              this.setDescriptionProgress(res as UserBadge[]);

              this._contactBadgesDict[contactId.toString()] = res;
              await this.writeContactBadges(this._contactBadgesDict);
              resolve(this._contactBadgesDict[contactId.toString()]);
            },
            err => {
              reject(err);
            }
          );
      });
  }
}

export interface UserBadge {
  badge_id: number;
  description: string;
  title?: string; // Utilizzato in dinner_details
  help?: string; // Utilizzato nel profilo
  badge_photo: string;
  phase?: number;
  progress: number;
  group_id?: number;

  // Nonostante lo sia, non posso dichiararlo come un array di UserBadge altrimenti 
  // creo struttura circolare e RDStorage non riesce a serializzarlo
  groupDetails?: any[];
}
