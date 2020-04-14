import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RDSpinnerService {

  constructor(private loadingCtrl: LoadingController) { }

  // Crea un istanza dello spinner
  async create(message?: string) {
    if (!message) message = "";
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

  // Funzioni di utility per gestire la corretta rimozione degli spinner presenti.
  // Wrapper di setTimeout fatto a promise per gestire l'await
  private awaitableTimeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  // Nasconde lo spinner, verificando di chiuderli tutti
  async dismiss() {
    try {
      while (await this.loadingCtrl.getTop() !== undefined) {
        // Per evitare loop infiniti scelto di attendere 200ms ogni volta che provo a rimuovere uno spinner
        await this.awaitableTimeout(200);
        await this.loadingCtrl.dismiss();
      }
    } catch (e) {
      console.log("multiple spinner dismiss");
    }
  }
}
