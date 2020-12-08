import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RDParamsService } from 'src/app/rdparams.service';
import { DinnersService, Dinner } from './dinners.service';
import { NotificationsService } from '../../notifications.service';
import { ProfileService } from '../../profile/profile.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dinners',
  templateUrl: './dinners.page.html',
  styleUrls: ['./dinners.page.scss']
})
export class DinnersPage implements OnInit {
  dinnerList: Dinner[];
  myDinner: Dinner;
  message: string;
  filterType = 0;

  constructor(public paramsService: RDParamsService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private dinnersService: DinnersService,
    private profileService: ProfileService,
    private notificationsService: NotificationsService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    // Ottengo l'eventuale messaggio dai parametri della rotta
    this.route.queryParams.subscribe((params) => {
      this.message = params.message;

      if (this.message) {
        this.presentAlert(this.message);
      }
    });

    this.loadDinners(); // Caricamento iniziale cene
  }

  // Ricarico i parametri e l'elenco delle cene
  loadDinners(event?) {
    this.paramsService.loadParams().then(
      () => {
        this.dinnersService.getOtherDinners(this.paramsService.getParams().dinnerId).then(
          (response) => {

            // Popolo la lista delle cene presenti
            this.dinnerList = response;
            console.log(this.dinnerList);

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
  goToDinner(dinner: Dinner) {
    this.dinnersService.getDinnerState(dinner.id).then(res => {
      const dinnerState = res.dinner_state;
      console.log('Dinner State: ' + dinnerState);
      this.dinnersService.detDinnerStateRoute(dinner, dinnerState);
    });
  }

  // Alert che viene presentato in caso di cena cancellata o iniziata
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Attenzione!',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  setFilter(event) {
    this.filterType = event;
  }
}
