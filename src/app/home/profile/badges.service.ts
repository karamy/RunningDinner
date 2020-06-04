import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RDConstantsService } from 'src/app/rdcostants.service';
import { RDParamsService } from 'src/app/rdparams.service';

@Injectable({
  providedIn: 'root'
})
export class BadgesService {

  _userBadges: UserBadge[];
  _groupBadges: UserBadge[];

  constructor(
    private http: HttpClient,
    private rdConstants: RDConstantsService,
    public paramsService: RDParamsService
  ) { }

  // Carica le i badges da DB
  async getUserBadges(userId: number): Promise<UserBadge[]> {
    return new Promise((resolve, reject) => {
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

  private convertImagesToJpeg(badges: UserBadge[]) {
    for (let i = 0; i < badges.length; i++) {
      badges[i].badge_photo = 'data:image/jpeg;base64,' + badges[i].badge_photo;
    }
    return badges;
  }

  // Sostituisce il carattere |n| con l'attuale progress del badge
  private setDescriptionProgress(badges: UserBadge[]) {
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
  private writeUserBadges(userBadges: UserBadge[]) {
    userBadges = this.convertImagesToJpeg(userBadges);
    userBadges = this.setDescriptionProgress(userBadges);
    localStorage.setItem('badges', JSON.stringify(userBadges));
    this.readUserBadges();
  }

  readUserBadges() {
    this._userBadges = JSON.parse(
      localStorage.getItem('badges')
    ) as UserBadge[];
  }

  // Ritorna la lista di tutti i badges
  getUserBadgesData() {
    return this._userBadges;
  }

  // Cancella dal localStorage la lista di tutti i badges
  clearUserBadges() {
    localStorage.setItem('badges', null);
    this.readUserBadges();
  }

  // Inserisce o aggiorna il badge dell'utente
  async insertUserBadge(user_id: number, badge_id: number) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.rdConstants.getApiRoute('insertUserBadge'), { user_id, badge_id })
        .toPromise()
        .then(
          () => {
            resolve();
          },
          err => {
            reject(err);
          }
        );
    });
  }

  // Ottengo da DB i badges del Partner
  async getPartnerBadges(userId: number) {
    const groupId = this.paramsService.getParams().groupId;
    const dataToSend = {
      groupId: groupId,
      userId: userId
    };
    return new Promise((resolve, reject) =>
      this.http
        .post(this.rdConstants.getApiRoute('getPartnerBadges'), dataToSend)
        .toPromise()
        .then(
          res => {
            this.writeGroupBadges(res as UserBadge[]);
            resolve();
          },
          () => {
            reject();
          }
        )
    );
  }

  // Creo l'array groupBadges e lo scrivo in localstorage
  private writeGroupBadges(partnerBadges: UserBadge[]) {
    const userBadges = JSON.parse(
      localStorage.getItem('badges')
    ) as UserBadge[];
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
    console.log('groupBadges');
    console.log(groupBadges);
    localStorage.setItem('groupBadges', JSON.stringify(groupBadges));
    this.readGroupBadges();
  }

  // Legge il parametro groupBadges e lo carica nel Service
  readGroupBadges() {
    this._groupBadges = JSON.parse(
      localStorage.getItem('groupBadges')
    ) as UserBadge[];
  }

  // Ritorna i badges del gruppo
  getGroupBadges() {
    return this._groupBadges;
  }

  // Cancella dal localStorage i badges del gruppo
  clearGroupBadges() {
    localStorage.setItem('groupBadges', '[]');
    this.readGroupBadges();
  }
}

export interface UserBadge {
  badge_id: number;
  description: string;
  badge_photo: string;
  phase: number;
  progress: number;
}
