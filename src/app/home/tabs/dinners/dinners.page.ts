import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RDParamsService } from 'src/app/rdparams.service';
import { DinnersService, Dinner } from './dinners.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../notifications.service';
import { ProfileService } from '../../profile/profile.service';

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

  // Ricarico i parametri e l'elenco delle cene
  loadDinners(event?) {
    this.paramsService.loadParams().then(
      () => {
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
    );
  }

  // In base allo state della cena selezionata ti manda sui dettagli/evento/fasi
  goToDinnerDetail(dinner: Dinner) {
    this.dinnersService.getDinnerState(dinner.id).then(res => {
      const dinnerState = res.dinner_state;
      console.log("Dinner State: " + dinnerState);

      if (dinnerState === 1 && dinner.groupIds.includes(this.paramsService.getParams().groupId) === true) {
        this.router.navigate(['/home/tabs/dinners/dinner-event'], { queryParams: dinner });
      } else if ((dinnerState === 2 || dinnerState === 3 || dinnerState === 4) && dinner.groupIds.includes(this.paramsService.getParams().groupId) === true) {
        this.router.navigate(['/home/tabs/dinners/dinner-phases'], { queryParams: dinner });
      } else if (dinnerState === 5 && dinner.groupIds.includes(this.paramsService.getParams().groupId) === true) {
        this.router.navigate(['/home/tabs/dinners/dinner-votes'], { queryParams: dinner });
      } else if (dinnerState === 6) {
        this.router.navigate(['/home/tabs/dinner-history/dinner-winners'], { queryParams: dinner });
      } else if (dinnerState === 0) {
        this.router.navigate(['/home/tabs/dinners/dinner-detail'], { queryParams: dinner });
      }
    });
  }

  /*  Vecchio sistema di reindirizzamento basato sul calcolo dell'ora lato app
  // Controllo quanto tempo manca alla cena per redirezionare alla page corretta
    compareDate(dinner: Dinner) {
      const timeLeft = this.dinnersService.getDinnerTimeLeft(dinner.date);
      // Se giorni mancanti alla cena = 0 ma ore mancanti > 0 ed il mio groupid è presente mando a dinner-event
      if (timeLeft[0] === 0 && timeLeft[1] > 0 && dinner.groupIds.includes(this.paramsService.getParams().groupId) === true) {
        return 'event';
        // Se giorni mancanti alla cena = 0 e ore mancanti <= 0 ed il mio groupid è presente mando a dinner-phase
      } else if (timeLeft[0] === 0 && timeLeft[1] <= 0 && dinner.groupIds.includes(this.paramsService.getParams().groupId) === true) {
        // Se sono passate 2 ore dall'inizio della cena
        if (timeLeft[1] === -2) {
          // controllo se sono passati anche 35 minuti
          if (timeLeft[2] <= -35) {
            return 'votes';
          } else {
            return 'phase';
          }
          // Altrimenti se sono passate più di 2 ore dall'inizio della cena
        } else if (timeLeft[1] < -2) {
          return 'votes';
        } else {
          return 'phase';
        }
      } else {
        return 'details';
      }
    } */
}

// Rappresenta la risposta del metodo loadDinners
export interface DinnerResponse {
  // Scelto di separare la cena di cui faccio parte dalle altre
  // per poterle in futuro caricare a pagine
  myDinner: Dinner;
  otherDinners: Dinner[];
}
