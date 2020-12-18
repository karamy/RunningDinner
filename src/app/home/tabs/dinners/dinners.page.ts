import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { RDParamsService } from 'src/app/rdparams.service';
import { DinnersService, Dinner } from './dinners.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';
import { NotificationsService } from '../../notifications.service';

@Component({
  selector: 'app-dinners',
  templateUrl: './dinners.page.html',
  styleUrls: ['./dinners.page.scss']
})
export class DinnersPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  dinnerList: Dinner[] = [];
  myDinner: Dinner;
  filterType = 0;
  index = 0;

  constructor(public paramsService: RDParamsService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private dinnersService: DinnersService,
    private notificationsService: NotificationsService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.message) {
        this.presentAlert(params.message);
      }

      // Registrazione observable per reagire al ricaricamento cene (es. vengo aggiunto a una cena)
      this.notificationsService.getUpdateParamsObservable().subscribe(() => {
        console.log('Dinners - Ricarico cene');
        this.loadDinners(null, true, '', false);
      });
    });

    this.loadDinners(null, false, '', false);
  }

  // Ricarico i parametri e l'elenco delle cene
  loadDinners(event, force: Boolean, loadFrom: string, notSave: Boolean) {
    this.paramsService.loadParams(force).then(
      () => {

        // Se caricato dall'ion infinite aumento l'index di 10
        // In questo modo se ricarico la pagina (normale o con refresher), mi mostra sempre le prime 10 cene
        if (loadFrom === 'infinite') {
          this.index = this.index + 10;
        } else {
          this.dinnerList = [];
          this.index = 0;
        }

        this.dinnersService.getOtherDinners(this.paramsService.getParams().dinnerId || 0, force, this.index, this.filterType, notSave).then(
          (response) => {

            // Popolo la lista delle cene presenti
            for (let i = 0; i < response.length; i++) {
              this.dinnerList.push(response[i]);
            }

            for (let i = 0; i < this.dinnerList.length; i++) {
              const dinnerDateTime = this.dinnersService.formatDate(this.dinnerList[i].date);
              this.dinnerList[i].dateString = dinnerDateTime[0];
              this.dinnerList[i].time = Number(dinnerDateTime[1]);
            }

            if (event) { // Se lanciato dal refresher o dall'infinite scroll emetto evento di completamento
              event.target.complete();
            }

            // Se non ci sono piu cene da caricare disabilito l'ion infinite, altrimenti lo ri-abilito
            // Senno una volta caricate tutte, refreshando la pagina rimaneva disabilitato
            if (response.length === 0) {
              this.infiniteScroll.disabled = true;
            } else {
              this.infiniteScroll.disabled = false;
            }

            // Lancio la change detection, altrimenti all'arrivo della notifica
            // non aggiornava la videata
            this.ref.detectChanges();
          },
          (err) => {
            console.warn(err);
          });
      });
  }

  // Apre i dettagli della cena selezionata
  goToDinner(dinner: Dinner) {
    this.dinnersService.getDinnerState(dinner.id).then(res => {
      const dinnerState = res.dinner_state;
      console.log('Dinner State: ' + dinnerState);
      this.dinnersService.detDinnerStateRoute(dinner, dinnerState, 'dinners');
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
    this.loadDinners(null, true, '', true);
  }
}
