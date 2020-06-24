import { Component, OnInit } from '@angular/core';
import { RDParamsService } from 'src/app/rdparams.service';
import { DinnersService, Dinner } from './dinners.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../notifications.service';

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
    private router: Router,
    private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.loadDinners(); // Caricamento iniziale cene

    this.notificationsService.getUpdateParamsObservable().subscribe(() => {
      console.log("Elenco cene - Ricarico cene");
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
          const myDinnerDateTime = this.dinnersService.formatDate(this.myDinner.date)
          this.myDinner.dateString = myDinnerDateTime[0]
          this.myDinner.time = myDinnerDateTime[1]
        }
        for (let i = 0; i < this.dinnerList.length; i++) {
          const dinnerDateTime = this.dinnersService.formatDate(this.dinnerList[i].date)
          this.dinnerList[i].dateString = dinnerDateTime[0]
          this.dinnerList[i].time = dinnerDateTime[1]
        }
        if (event) { // Se lanciato dal refresher emetto evento di completamento
          event.target.complete();
        }
      },
      (err) => {
        console.warn(err);
      }
    );
  }

  // Mostra il dettaglio della cena selezionata
  goToDinnerDetail(dinner: Dinner) {
    this.router.navigate(['/home/tabs/dinners/dinner-detail'], { queryParams: dinner });
  }
}

// Rappresenta la risposta del metodo loadDinners
export interface DinnerResponse {
  // Scelto di separare la cena di cui faccio parte dalle altre
  // per poterle in futuro caricare a pagine
  myDinner: Dinner;
  otherDinners: Dinner[];
}
