import { Component, OnInit } from '@angular/core';
import { DinnersService, DinnerType } from '../dinners.service';
import { AlertController, NavController } from '@ionic/angular';
import { RDParamsService } from 'src/app/rdparams.service';
import { NotificationsService } from 'src/app/home/notifications.service';


@Component({
  selector: 'app-create-dinner',
  templateUrl: './create-dinner.page.html',
  styleUrls: ['./create-dinner.page.scss'],
})
export class CreateDinnerPage implements OnInit {
  dinnerDescription: string;
  dinnerType: number;

  // Gestione ion-datetime, bisogna passare da property stringa
  dinnerDate: Date;
  get dinnerDateStr(): string {
    return this.dinnerDate.toISOString();
  }
  set dinnerDateStr(value: string) {
    this.dinnerDate = new Date(value);
  }

  customActionSheetOptions: any; // Descrive le property della select fatta tramite actionSheet
  dinnerTypes: DinnerType[];

  constructor(private dinnersService: DinnersService,
    private alertController: AlertController,
    private paramsService: RDParamsService,
    private navController: NavController,
    private notificationService: NotificationsService) { }

  ngOnInit() {
    this.customActionSheetOptions = {
      header: 'Tipologia',
      subHeader: 'Seleziona la tipologia di cena'
    };
    this.dinnerTypes = [
      {
        code: 1,
        description: "Generica"
      },
      {
        code: 2,
        description: "Piemontese"
      },
      {
        code: 3,
        description: "Sushi"
      }
    ];
    this.dinnerType = 1; // Pre-seleziono tipologia generica
    this.dinnerDate = new Date(); // Pre-seleziono oggi
  }

  // Creazione cena
  async onCreateDinner() {
    const alert = await this.alertController.create({
      header: 'Creazione cena',
      message: 'Confermi la creazione della cena? Verrai automaticamente inserito come partecipante',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('confirm cancel');
          }
        }, {
          text: 'Certo!',
          handler: () => {
            this.sendRequest();
          }
        }
      ]
    });

    await alert.present();
  }

  // Effettua chiamata http e gestisce il risultato
  sendRequest() {
    const createDinnerBody = {
      dinnerDescription: this.dinnerDescription,
      dinnerType: this.dinnerType,
      dinnerDate: this.dinnerDate,
      groupId: this.paramsService.getParams().groupId
    };
    this.dinnersService.createDinner(createDinnerBody).then(
      () => {
        // Ricarico parametri e vado in /dinners effettuando
        // reset della history per ricaricare in automatico le cene
        this.paramsService.loadParams().then(() => {
          this.notificationService.fireUpdateParamsEvent();
        });
        this.navController.navigateRoot('/home');
      },
      (err) => {
        console.warn(err);
      }
    );
  }
}
