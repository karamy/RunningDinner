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
  isEdit: Boolean = false; // Indica se la cena è in modalità edit

  // Valori temporanei della cena in edit
  _newTitle: string;
  _newDescription: string;

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

  // Indica se la sono l'amministratore della cena a cui partecipo
  isAdministrator() {
    return this.isMyDinner() && this.dinner.administrator == this.paramsService.getParams().groupId;
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

  // Attiva l'edit della cena
  onEditDinner() {
    this.isEdit = true;
    this._newTitle = this.dinner.title;
    this._newDescription = this.dinner.description;
  }

  getDinnerDetail() {
    console.log("RICARICO CENA");
  }

  // Salva la cena modificata
  onSaveDinner() {
    const updateDinnerBody = {
      dinnerId: this.dinner.id,
      title: this._newTitle,
      description: this._newDescription
    };

    this.dinnersService.updateDinner(updateDinnerBody)
      .then(
        () => {
          this.getDinnerDetail(); // Ricarico la cena in caso di esito positivo
        },
        (err) => {
          console.log(err);
        })
      .finally( // In qualsiasi esito riporto la cena in view
        () => {
          this.isEdit = false;
        })
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


  /*DEBUG: funzione di test per generare le possibili cene
  runCombinazioni() {
    var coupleBaseArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]; // Indica l'array di una possibile disposizione di coppie in un dish
    var housesBaseArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]; // Indica l'array di una possibile disposizione delle case delle coppie in una cena

    const permutator = (inputArr: string[]) => {
      let result = [];

      const permute = (arr, m = []) => {
        if (arr.length === 0) {
          result.push(m)
        } else {
          for (let i = 0; i < arr.length; i++) {
            let curr = arr.slice();
            let next = curr.splice(i, 1);
            permute(curr.slice(), m.concat(next))
          }
        }
      }

      permute(inputArr)

      return result;
    }

    // Risultato finale
    const winningCombinations = [];

    // Tutte le possibili combinazioni del coupleBaseArray
    const combinationsDishesArray = permutator(coupleBaseArray);
    const combinationsHousesArray = permutator(housesBaseArray);

    // Per ogni combinazione (es. [1,2,4,3,5,6,9,8,7])
    combinationsDishesArray.forEach(_dishcCmbinationFirst => {
      var tmpWinDishes = [];

      combinationsHousesArray.forEach(_housesCombination => {
        // Concateno al possibile risultato i valori della combinazione di houses per il primo dish
        _dishcCmbinationFirst = _dishcCmbinationFirst.concat(_housesCombination.slice(0, 3));
        tmpWinDishes.push(_dishcCmbinationFirst); // Aggiungo al possibile risultato il primo dish + houses

        // Aggiungo il secondo dish
        combinationsDishesArray.forEach(_dishCombinationSecond => {
          // Concateno al possibile risultato i valori della combinazione di houses per il primo dish
          _dishCombinationSecond = _dishCombinationSecond.concat(_housesCombination.slice(3, 6));
          tmpWinDishes.push(_dishCombinationSecond); // Aggiungo al possibile risultato il secondo dish

          if (!this.isValidDinner(tmpWinDishes, 2)) {
            
          }
          else {
            // La cena per ora è valida, aggiungo l'ultimo dish
            combinationsDishesArray.forEach(_dishCombinationThird => {
              _dishCombinationThird = _dishCombinationThird.concat(_housesCombination.slice(6, 9));
              tmpWinDishes.push(_dishCombinationThird);
              if (this.isValidDinner(tmpWinDishes, 3)) { // Aggiungo l'array all'elenco delle cene possibili
                winningCombinations.push(JSON.parse(JSON.stringify(tmpWinDishes)));
                tmpWinDishes = tmpWinDishes.slice(2, 1);
                console.log("Combinazione trovata");
                //console.log(winningCombinations);
                
              }
            });
          }
        });

        tmpWinDishes = tmpWinDishes.slice(1,1); // Tolgo il secondo dish per provarne un'altro
      });

      tmpWinDishes = tmpWinDishes.slice(0,1); // Tolgo il primo dish per provarne un'altro
    });
  }

  // Esplora la possibile cena generata decidendo se sarebbe valida o meno
  isValidDinner(winCombination: any[], dishes: number): boolean {
    return true;
  }
  */
}
