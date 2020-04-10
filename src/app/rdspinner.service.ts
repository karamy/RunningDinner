import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RDSpinnerService {

  constructor(private loadingCtrl: LoadingController) { }

  // Crea un istanza dello spinner
  async create(message) {
    const spinner = await this.loadingCtrl.create({
      spinner: null,
      message: `<div class="cssload-container">
                  <div class="cssload-whirlpool">
                  </div>
                </div>
                <div>${message}</div>`,
      cssClass: 'loader',
      duration: 10000 // Per evitare problemi imposto comunque che dopo 10 secondi si chiuderebbe
    });

    spinner.present();
    return spinner;
  }

  // Nasconde lo dello spinner, verificando di chiuderli tutti
  async dismiss() {
    while (await this.loadingCtrl.getTop() !== undefined) {
      await this.loadingCtrl.dismiss();
    }
  }
}
