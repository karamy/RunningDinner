import { Component, OnInit } from '@angular/core';
import { DinnerService } from '../dinner.service';
import { AlertController, NavController } from '@ionic/angular';
import { RDParamsService } from 'src/app/rdparams.service';


@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.page.html',
  styleUrls: ['./create-room.page.scss'],
})
export class CreateRoomPage implements OnInit {
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
  dinnerTypes: any[]; //TODO fare interfaccia

  constructor(private dinnerService: DinnerService,
    private alertController: AlertController,
    private paramsService: RDParamsService,
    private navController: NavController) { }

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
    this.dinnerService.createDinner(createDinnerBody).then(
      () => {
        // Ricarico parametri e vado in /dinners effettuando
        // reset della history per ricaricare in automatico le cene
        this.paramsService.loadParams();
        this.navController.navigateRoot('/home');
      },
      (err) => {
        console.warn(err);
      }
    );
  }
}
