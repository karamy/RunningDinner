import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RDParamsService } from 'src/app/rdparams.service';
import { NotificationsService } from '../../notifications.service';
import { ProfileService } from '../../profile/profile.service';
import { DinnerResponse } from '../dinners/dinners.page';
import { Dinner, DinnersService } from '../dinners/dinners.service';


@Component({
  selector: 'app-dinner-history',
  templateUrl: './dinner-history.page.html',
  styleUrls: ['./dinner-history.page.scss'],
})

export class DinnerHistoryPage implements OnInit {

  dinnerHistoryList: Dinner[];
  myDinner: Dinner;

  constructor(
    private dinnersService: DinnersService,
    private route: ActivatedRoute,
    private navController: NavController,
    public paramsService: RDParamsService,
    private ref: ChangeDetectorRef,
    private notificationsService: NotificationsService,
    public profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      this.loadDinners(); // Caricamento della myDinner
    });

    // Registrazione observable per reagire al ricaricamento cene (es. vengo aggiunto a una cena)
    this.notificationsService.getUpdateParamsObservable().subscribe(() => {
      console.log('Dinner History - Ricarico cene');
      this.loadDinners();
    });
  }

  // Ricarico i parametri, ottengo l'eventuale myDinner e cene passate
  loadDinners(event?) {
    this.paramsService.loadParams().then(
      () => {
        this.dinnersService.getDinners().then(
          (response: DinnerResponse) => {
            this.myDinner = response.myDinner;
            console.log(this.myDinner);
            if (this.myDinner) {
              const myDinnerDateTime = this.dinnersService.formatDate(this.myDinner.date);
              this.myDinner.dateString = myDinnerDateTime[0];
              this.myDinner.time = Number(myDinnerDateTime[1]);
            }
            // Ottengo le cene passate
            this.dinnersService.getDinnerHistory().then(res => {
              this.dinnerHistoryList = res;
              console.log(this.dinnerHistoryList);
            });
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
  goToDinner(dinner: Dinner) {
    this.dinnersService.getDinnerState(dinner.id).then(res => {
      const dinnerState = res.dinner_state;
      console.log('Dinner State: ' + dinnerState);
      this.dinnersService.detDinnerStateRoute(dinner, dinnerState);
    });
  }

  // Se clicco su una cena delle cronologia, indirizzo a dinner-winners
  goToDinnerWinner(dinner: Dinner) {
    this.navController.navigateRoot('/home/tabs/dinner-history/dinner-winners', { queryParams: dinner });
  }

}
