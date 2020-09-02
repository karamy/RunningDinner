import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dinner, DinnersService, DinnerDetails } from '../dinners.service';
import { AlertController, NavController } from '@ionic/angular';
import { RDParamsService } from 'src/app/rdparams.service';
import { NotificationsService } from 'src/app/home/notifications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dinner-detail',
  templateUrl: './dinner-detail.page.html',
  styleUrls: ['./dinner-detail.page.scss'],
})
export class DinnerDetailPage implements OnInit, OnDestroy {
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

  private subscription: Subscription;

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

    // Registrazione observable per reagire al ricaricamento cena (es. vengo rimosso da una cena)
    this.subscription = this.notificationsService.getUpdateParamsObservable().subscribe(() => {
      console.log("Dinner Detail - Ricarico cena");
      this.getDinnerDetails();
    });
  }

  // Rimuovo la sottoscrizione all'observable quando esco dalla videata
  ngOnDestroy() {
    console.log("OnDestroy");
    this.subscription.unsubscribe();
  }

  // Carica i dettagli della cena
  getDinnerDetails() {
    this.dinnersService.getDinnerDetails(this.dinner).then(
      (res) => {
      this.dinnerDetails = res;

      // Sovrascrivo titolo e descrizione in quanto possono essere modificati
      const dinnerData = res.dinnerData;
      this.dinner.title = dinnerData.title;
      this.dinner.description = dinnerData.description;

      // Ottengo la tipologia
      this.dinnerType = this.dinnersService.decodeType(Number(this.dinner.type))[0];
      this.dinnerDaysLeft = this.dinnersService.getDinnerTimeLeft(this.dinner.date)[0];

      // Carico la mappa
      this.initMap(this.dinnerDetails.addressesLatLng, this.dinnerDetails.userLatLng);
      },
      () => {
        console.log("Errore getDinnerDetails, ritorno alla home");
        this.navController.navigateRoot('/home');
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
        const markerAddress = this.dinnersService.checkIfExistingMarker(markers, addresses[i])
        const mapDinnerMarker = new google.maps.Marker({
          position: markerAddress,
          map: map,
          icon: dinnerMarker
        });
        markers.push(mapDinnerMarker);
        const dinnerCircle = new google.maps.Circle({
          center: markerAddress,
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
    return this.paramsService.getParams().dinnerId === +this.dinner.id;
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
          }
