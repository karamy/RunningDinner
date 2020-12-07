import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  private dinnerLoaded = false;
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
      if (!this.dinnerLoaded) { // Utilizzo boolean perchè i queryParams scattano anche se torno indietro es. dal profilo, quindi evito di ricaricare
        this.loadDinners(); // Caricamento della myDinner e cene passate
      }
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
        // Ottengo l'eventuale mia cena
        this.dinnersService.getMyDinner().then(
          (response: Dinner) => {
            this.myDinner = response;
            if (this.myDinner) {
              const myDinnerDateTime = this.dinnersService.formatDate(this.myDinner.date);
              this.myDinner.dateString = myDinnerDateTime[0];
              this.myDinner.time = Number(myDinnerDateTime[1]);
            }
            // Ottengo le cene passate
            this.dinnersService.getDinnerHistory().then(res => {
              this.dinnerHistoryList = res;

              if (event) { // Se lanciato dal refresher emetto evento di completamento
                event.target.complete();
              }
              // Lancio la change detection, altrimenti all'arrivo della notifica
              // non aggiornava la videata
              this.ref.detectChanges();

              this.dinnerLoaded = true;
            });
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
    this.navController.navigateRoot('/home/tabs/my-dinners/dinner-winners', { queryParams: dinner });
  }
}
