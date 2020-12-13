import { Component, OnDestroy, OnInit, ɵbypassSanitizationTrustStyle } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'src/app/home/notifications.service';
import { RDParamsService } from 'src/app/rdparams.service';
import { Dinner, DinnersService, DinnerWinner } from '../../dinners/dinners.service';

@Component({
  selector: 'app-dinner-winners',
  templateUrl: './dinner-winners.page.html',
  styleUrls: ['./dinner-winners.page.scss'],
})
export class DinnerWinnersPage implements OnInit, OnDestroy {
  dinner: Dinner;
  categories: string[];
  dinnerWinnersList: DinnerWinner[] = [];
  winnerLoaded = false;
  hideChat = false;

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private notificationsService: NotificationsService,
    private dinnerService: DinnersService,
    public paramsService: RDParamsService) { }

  ngOnInit() {
    // Ottengo i dati della cena dai parametri della rotta
    this.route.queryParams.subscribe((dinner: Dinner) => {
      this.dinner = { ...dinner };
      this.detDinnerDate(); // Controllo se nascondere la chat o meno
      this.getDinnerWinners(false);
    });

    // Registrazione observable per reagire al ricaricamento cena (es. vengo rimosso da una cena)
    this.subscription = this.notificationsService.getUpdateParamsObservable().subscribe(() => {
      console.log('Dinner Winners - Ricarico cena');
      this.detDinnerDate(); // Controllo se nascondere la chat o meno
      this.getDinnerWinners(true);
    });
  }

  // Rimuovo la sottoscrizione all'observable quando esco dalla videata
  ngOnDestroy() {
    console.log('OnDestroy');
    this.subscription.unsubscribe();
  }

  getDinnerWinners(force: Boolean) {
    // Ottengo i vincitori della cena
    this.dinnerService.getDinnerWinners(this.dinner,force).then(res => {

      // Converto le immagini profilo e badge in JPEG
      this.dinnerWinnersList = this.dinnerService.convertWinnersImagesToJpeg(res);
      this.winnerLoaded = true;

      // Ottengo i nomi delle categorie in base al dinnerType
      this.categories = this.dinnerService.detVoteCategories(this.dinner.type);

      // Ad ogni vincitore sostituisco il nome generico della categoria con quello specifico della cena
      this.dinnerWinnersList.forEach(x => {
        if (x.category === 'firstcat') {
          x.category = this.categories[0];
        } else if (x.category === 'secondcat') {
          x.category = this.categories[1];
        } else if (x.category === 'thirdcat') {
          x.category = this.categories[2];
        } else if (x.category === 'fourthcat') {
          x.category = this.categories[3];
        } else if (x.category === 'fifthcat') {
          x.category = this.categories[4];
        }
      });
    });
  }

  // Se sono passati 30 minuti dalla fine della cena, nascondo la chat
  detDinnerDate() {
    const date = new Date();
    const dinnerDate = new Date(this.dinner.date);
    const chatEndDate = dinnerDate.getTime() + 9000000;
    if (date.getTime() > chatEndDate) {
      this.hideChat = true;
    }
  }
}
