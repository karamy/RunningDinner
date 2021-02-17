import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RDParamsService } from 'src/app/rdparams.service';
import { NotificationsService } from '../../notifications.service';
import { ProfileService } from '../../profile/profile.service';
import { Dinner, DinnersService } from '../dinners/dinners.service';

@Component({
  selector: 'app-my-dinners',
  templateUrl: './my-dinners.page.html',
  styleUrls: ['./my-dinners.page.scss'],
})
export class MyDinnersPage implements OnInit {
  dinnerHistoryList: Dinner[];
  myDinner: Dinner;
  syncInProgress: boolean;

  constructor(
    private dinnersService: DinnersService,
    private navController: NavController,
    public paramsService: RDParamsService,
    private ref: ChangeDetectorRef,
    private notificationsService: NotificationsService,
    public profileService: ProfileService
  ) { }

  ngOnInit() {
    // Registrazione observable per reagire al ricaricamento cene (es. vengo aggiunto a una cena)
    this.notificationsService.getUpdateParamsObservable().subscribe(() => {
      console.log('Dinner History - Ricarico cene');
      this.loadDinners(null, true);
    });

    this.loadDinners(null, false); // Caricamento della myDinner e cene passate

  }

  // Ricarico i parametri, ottengo l'eventuale myDinner e cene passate
  loadDinners(event, force: Boolean) {
    // Mostro ion-skeleton
    this.syncInProgress = true;

    this.paramsService.loadParams(force).then(
      () => {
        // Ottengo l'eventuale mia cena
        this.dinnersService.getMyDinner(force).then(
          (response: Dinner) => {
            this.myDinner = response;
            if (this.myDinner) {
              const myDinnerDateTime = this.dinnersService.formatDate(this.myDinner.date);
              this.myDinner.dateString = myDinnerDateTime[0];
              this.myDinner.time = Number(myDinnerDateTime[1]);
            }
            // Ottengo le cene passate
            this.dinnersService.getDinnerHistory(force).then(res => {
              this.dinnerHistoryList = res;
              console.log(this.dinnerHistoryList);
              if (this.dinnerHistoryList.length > 0) {
                for (let i = 0; i < this.dinnerHistoryList.length; i++) {
                  const dinnerHistoryDateTime = this.dinnersService.formatDate(this.dinnerHistoryList[i].date);
                  this.dinnerHistoryList[i].dateString = dinnerHistoryDateTime[0];
                  this.dinnerHistoryList[i].time = Number(dinnerHistoryDateTime[1]);
                }
              }

              if (event) { // Se lanciato dal refresher emetto evento di completamento
                event.target.complete();
              }

              // Fine della sincronizzazione, tolgo ion-skeleton
              this.syncInProgress = false;
            });
          },
          (err) => {
            // Fine della sincronizzazione, tolgo ion-skeleton
            this.syncInProgress = false;

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
    this.navController.navigateRoot('/home/tabs/my-dinners/dinner-winners', { queryParams: dinner });
  }
}
