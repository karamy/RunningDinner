import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dinner, DinnersService, DinnerDetails } from '../dinners.service';
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
  dinnerDetails: DinnerDetails = {
    badges: [],
    foodAllergies: [],
    minMaxAges: [],
    avgDistance: -1
  };
  dinnerType: string;
  dinnerDaysLeft: number; // Indica quanti giorni (multipli di 24h) mancano al giorno della cena

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
    // Ottengo i dati di testate della cena dai parametri della rotta
    this.route.queryParams.subscribe((dinner: Dinner) => {
      this.dinner = { ...dinner }; // Clono l'oggetto passato come parametro in quanto, essendo immutabile, darebbe errore nell'edit della cena
      this.getDinnerDetails();
    });

    // Registrazione observable per reagire al ricaricamento chat (es. vengo rimosso da una cena)
    this.notificationsService.getUpdateParamsObservable().subscribe(() => {
      console.log("Dinner Detail - Ricarico cena");
      this.getDinnerDetails();
    });
  }

  // Carica i dettagli della cena
  getDinnerDetails() {
    this.dinnersService.getDinnerDetails(this.dinner).then(res => {
      this.dinnerDetails = res;

      // Sovrascrivo titolo e descrizione in quanto possono essere modificati
      const dinnerData = res.dinnerData;
      this.dinner.title = dinnerData.title;
      this.dinner.description = dinnerData.description;

      // Ottengo la tipologia
      this.dinnerType = this.dinnersService.decodeType(Number(this.dinner.type));
      this.dinnerDaysLeft = this.dinnersService.getDinnerDaysLeft(this.dinner);

      // Carico la mappa
      this.initMap(this.dinnerDetails.addressesLatLng, this.dinnerDetails.userLatLng);
    });
  }

  // Inizializza la mappa per mostrare l'utente e gli altri partecipanti alla cena
  private initMap(addresses: google.maps.LatLng[], userAddress: google.maps.LatLng[]) {
    const bounds = new google.maps.LatLngBounds();
    const markers: google.maps.Marker[] = [];

   
    const mapElement = document.getElementById('map');
    if (mapElement) { // Istanzio la mappa solo se sono sulla pagina, altrimenti da errore 
      const map = new google.maps.Map(mapElement, {
        disableDefaultUI: true
      });

      // Creo marker per indirizzo user
      const userMarker = {
        url: '../../../../../assets/you-marker.png',
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(50, 50)
      };

      // Creo marker per le cene
      const dinnerMarker = {
        url: '../../../../../assets/dinner-marker.png',
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(50, 50)
      };

      // Imposto la posizione sulla mappa per lo user
      const mapUserMarker = new google.maps.Marker({
        position: userAddress[0],
        map: map,
        icon: userMarker
      });
      markers.push(mapUserMarker);
      const userCircle = new google.maps.Circle({
        center: userAddress[0],
        radius: 100,
        fillColor: '#0000FF',
        fillOpacity: 0.1,
        map: map,
        strokeColor: '#FFFFFF',
        strokeOpacity: 0.1,
        strokeWeight: 2
      });

      // Imposto la posizione sulla mappa per le cene
      for (let i = 0; i < addresses.length; i++) {
        const mapDinnerMarker = new google.maps.Marker({
          position: addresses[i],
          map: map,
          icon: dinnerMarker
        });
        markers.push(mapDinnerMarker);
        const dinnerCircle = new google.maps.Circle({
          center: addresses[i],
          radius: 100,
          fillColor: '#0000FF',
          fillOpacity: 0.1,
          map: map,
          strokeColor: '#FFFFFF',
          strokeOpacity: 0.1,
          strokeWeight: 2
        });
      }

      for (var j = 0; j < markers.length; j++) {
        bounds.extend(markers[j].getPosition());
      }
      map.fitBounds(bounds);
    }
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
          this.getDinnerDetails(); // Ricarico la cena in caso di esito positivo
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
  private sendRequestLeaveDinner() {
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
  private sendRequestJoinDinner() {
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
