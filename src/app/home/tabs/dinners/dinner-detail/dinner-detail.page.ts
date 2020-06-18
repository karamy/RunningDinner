import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dinner, DinnersService } from '../dinners.service';
import { AlertController, NavController } from '@ionic/angular';
import { RDParamsService } from 'src/app/rdparams.service';
import { NotificationsService } from 'src/app/home/notifications.service';

@Component({
  selector: 'app-dinner-detail',
  templateUrl: './dinner-detail.page.html',
  styleUrls: ['./dinner-detail.page.scss'],
})
export class DinnerDetailPage implements OnInit {
  dinner: Dinner;

  constructor(private route: ActivatedRoute,
    private alertController: AlertController,
    private dinnersService: DinnersService,
    public paramsService: RDParamsService,
    private notificationsService: NotificationsService,
    private navController: NavController) { }

  ngOnInit() {
    this.route.queryParams.subscribe((dinner: Dinner) => {
      this.dinner = dinner;
    });
  }

  // Indica se la cena mostrata è quella a cui partecipo
  isMyDinner() {
    return this.paramsService.getParams().dinnerId == +this.dinner.id;
  }

  // Abbandono cena
  async onLeaveDinner() {
    const alert = await this.alertController.create({
      header: 'Abbandono',
      message: 'Confermi di voler abbandonare la cena? Lo farà anche il tuo partner',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('confirm cancel');
          }
        }, {
          text: 'Purtroppo si',
          handler: () => {
            this.sendRequestLeaveDinner();
          }
        }
      ]
    });

    await alert.present();
  }

  // Effettua chiamata http per abbandonare cena e gestisce il risultato
  sendRequestLeaveDinner() {
    const leaveDinnerBody = {
      dinnerId: this.dinner.id,
      groupId: this.paramsService.getParams().groupId
    };

    this.dinnersService.leaveDinner(leaveDinnerBody).then(
      () => {
        // Ricarico parametri e vado in /dinners
        this.paramsService.loadParams().then(() => {
          this.notificationsService.fireUpdateParamsEvent();
        });
        this.navController.navigateRoot('/home');
      },
      (err) => {
        console.warn(err);
      }
    );
  }

  // Partecipo a cena
  async onJoinDinner() {
    const alert = await this.alertController.create({
      header: 'Iscriviti',
      message: 'Confermi di voler partecipare la cena? Lo farà anche il tuo partner',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('confirm cancel');
          }
        }, {
          text: 'Eccerto!',
          handler: () => {
            this.sendRequestJoinDinner();
          }
        }
      ]
    });

    await alert.present();
  }

  // Effettua chiamata http per partecipare alla cena e gestisce il risultato
  sendRequestJoinDinner() {
    const joinDinnerBody = {
      dinnerId: this.dinner.id,
      groupId: this.paramsService.getParams().groupId
    };

    this.dinnersService.joinDinner(joinDinnerBody).then(
      () => {
        // Ricarico parametri e vado in /dinners
        this.paramsService.loadParams().then(() => {
          this.notificationsService.fireUpdateParamsEvent();
        });
        this.navController.navigateRoot('/home');
      },
      (err) => {
        console.warn(err);
      }
    );
  }
}
