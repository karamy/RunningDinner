import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RDParamsService } from 'src/app/rdparams.service';
import { DinnersService, Dinner } from './dinners.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../notifications.service';
import { ProfileService } from '../../profile/profile.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dinners',
  templateUrl: './dinners.page.html',
  styleUrls: ['./dinners.page.scss']
})
export class DinnersPage implements OnInit {
  dinnerList: Dinner[];
  myDinner: Dinner;

  constructor(public paramsService: RDParamsService,
    private dinnersService: DinnersService,
    private profileService: ProfileService,
    private router: Router,
    private notificationsService: NotificationsService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadDinners(); // Caricamento iniziale cene
    this.profileService.readPartner(); // Carica i dati del partner per poter inviare group_address
    // Registrazione observable per reagire al ricaricamento cene (es. vengo aggiunto a una cena)
    this.notificationsService.getUpdateParamsObservable().subscribe(() => {
      console.log('Elenco cene - Ricarico cene');
      this.loadDinners();
    });
  }

  // Ricarica l'elenco delle cene
  loadDinners(event?) {
    this.dinnersService.getDinners().then(
      (response: DinnerResponse) => {
        console.log(response);
        this.myDinner = response.myDinner;
        this.dinnerList = response.otherDinners;
        if (this.myDinner) {
          const myDinnerDateTime = this.dinnersService.formatDate(this.myDinner.date);
          this.myDinner.dateString = myDinnerDateTime[0];
          this.myDinner.time = Number(myDinnerDateTime[1]);
        }
        for (let i = 0; i < this.dinnerList.length; i++) {
          const dinnerDateTime = this.dinnersService.formatDate(this.dinnerList[i].date);
          this.dinnerList[i].dateString = dinnerDateTime[0];
          this.dinnerList[i].time = Number(dinnerDateTime[1]);
        }
        if (event) { // Se lanciato dal refresher emetto evento di completamento
          event.target.complete();
        }

        // Lancio la change detection, altrimenti all'arrivo della notifica
        // non aggiornava la videata
        this.ref.detectChanges();
      },
      (err) => {
        console.warn(err);
      }
    );
  }

  // In base al tempo che manca alla cena selezionata ti manda sui dettagli/evento/fasi
  goToDinnerDetail(dinner: Dinner) {
    if (this.compareDate(dinner) === 'event') {
      this.router.navigate(['/home/tabs/dinners/dinner-event'], { queryParams: dinner });
    } else if (this.compareDate(dinner) === 'phase') {
      this.router.navigate(['/home/tabs/dinners/dinner-phases'], { queryParams: dinner });
    } else {
      this.router.navigate(['/home/tabs/dinners/dinner-detail'], { queryParams: dinner });
    }
  }

  // Controllo quanto tempo manca alla cena per redirezionare alla page corretta
  compareDate(dinner: Dinner) {
    const timeLeft = this.dinnersService.getDinnerTimeLeft(dinner.date);
    // Se giorni mancanti alla cena = 0 ma ore mancanti > 0 ed il mio groupid è presente mando a dinner-event
    if (timeLeft[0] === 0 && timeLeft[1] > 0 && dinner.groupIds.includes(this.paramsService.getParams().groupId) === true) {
      return 'event';
      // Se giorni mancanti alla cena = 0 e ore mancanti <= 0 ed il mio groupid è presente mando a dinner-phase
    } else if (timeLeft[0] === 0 && timeLeft[1] <= 0 && dinner.groupIds.includes(this.paramsService.getParams().groupId) === true) {
      return 'phase';
    } else {
      return 'details';
    }
  }
}

// Rappresenta la risposta del metodo loadDinners
export interface DinnerResponse {
  // Scelto di separare la cena di cui faccio parte dalle altre
  // per poterle in futuro caricare a pagine
  myDinner: Dinner;
  otherDinners: Dinner[];
}
