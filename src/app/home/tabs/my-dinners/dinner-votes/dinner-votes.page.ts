import { Component, OnInit } from '@angular/core';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { Dinner, DinnersService, DinnerDetails, MyDinnerDetails, DinnerHouse } from 'src/app/home/tabs/dinners/dinners.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'src/app/home/notifications.service';
import { RDParamsService } from 'src/app/rdparams.service';
import { ProfileService } from 'src/app/home/profile/profile.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dinner-votes',
  templateUrl: './dinner-votes.page.html',
  styleUrls: ['./dinner-votes.page.scss'],
})
export class DinnerVotesPage implements OnInit {

  dinner: Dinner;
  state: number;
  hasVoted: boolean;
  dinnerDetails: DinnerDetails = {
    badges: [],
    foodAllergies: [],
    minMaxAges: [],
    avgDistance: -1
  };
  myDinnerDetails: MyDinnerDetails = {
    houses: {
      firstHouse: { groupid: null, firstUserId: null, firstName: "", secondUserId: null, secondName: "", firstImage: "", secondImage: "", groupAddress: "" },
      secondHouse: { groupid: null, firstUserId: null, firstName: "", secondUserId: null, secondName: "", firstImage: "", secondImage: "", groupAddress: "" },
      thirdHouse: { groupid: null, firstUserId: null, firstName: "", secondUserId: null, secondName: "", firstImage: "", secondImage: "", groupAddress: "" }
    },
    houseDistances: [],
    foodAllergies: [],
    foodAllergiesCategories: [],
    addressesLatLng: []
  };
  voteCategories: string[];
  groupsToVote: DinnerHouse[];
  vote: Vote;
  firstGroupVotes: GroupVotes = {
    groupId: null,
    firstCategory: null,
    secondCategory: null,
    thirdCategory: null,
    fourthCategory: null,
    fifthCategory: null
  };
  secondGroupVotes: GroupVotes = {
    groupId: null,
    firstCategory: null,
    secondCategory: null,
    thirdCategory: null,
    fourthCategory: null,
    fifthCategory: null
  };
  minutes: number;
  seconds: number;
  minutesString: string;
  secondsString: string;
  bottomPanel: CupertinoPane;

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private notificationsService: NotificationsService,
    private alertController: AlertController,
    public dinnersService: DinnersService,
    public paramsService: RDParamsService,
    public profileService: ProfileService,
    public authService: AuthService) { }

  // Opzioni ion-slides
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  ngOnInit() {
    // Ottengo i dati della cena dai parametri della rotta
    this.route.queryParams.subscribe((dinner: Dinner) => {
      this.dinner = { ...dinner };
      this.detDinnerVotes(false);
    });

    // Registrazione observable per reagire al ricaricamento cena (es. vengo rimosso da una cena)
    this.subscription = this.notificationsService.getUpdateParamsObservable().subscribe(() => {
      console.log('Dinner Votes - Ricarico cena');
      this.detDinnerVotes(true);
    });
  }

  // Rimuovo la sottoscrizione all'observable quando esco dalla videata
  ngOnDestroy() {
    console.log('OnDestroy');
    this.subscription.unsubscribe();
  }

  detDinnerVotes(force: Boolean) {
    this.dinnersService.getDinnerState(this.dinner.id).then(resp => {
      this.state = resp.dinner_state;

      if (this.state === 5) {
        // Controllo se l'utente ha già votato o meno
        this.dinnersService.checkIfVoted(this.dinner.id).then(response => {
          this.hasVoted = response.hasVoted;

          if (this.hasVoted === false) {

            // Istanzio il pannello inferiore se non ancora istanziato
            if (!this.bottomPanel) {
              this.presentBottomPanel();
            }

            this.dinnersService.getDinnerDetails(this.dinner, this.authService.getUserData(), force).then(res => {
              this.dinnerDetails = res;

              // Ottengo i dati relativi alla mia cena
              this.dinnersService.getMyDinnerDetails(this.dinner, this.paramsService.getParams().groupId, force).then(response => {
                this.myDinnerDetails = response;

                // Creo array con i due gruppi da votare
                this.groupsToVote = this.dinnersService.detGroupsToVote(this.myDinnerDetails);

                // Determino le categorie di voto
                this.voteCategories = this.dinnersService.detVoteCategories(this.dinner.type);

                // Valorizzo i groupId dei due oggetti che rappresentano i voti del primo e del secondo gruppo
                this.firstGroupVotes.groupId = this.groupsToVote[0].groupid;
                this.secondGroupVotes.groupId = this.groupsToVote[1].groupid;
              });
            });
          }
        });
      } else {
        this.dinnersService.detDinnerStateRoute(this.dinner, this.state);
      }
    });
  }

  // Assegno il voto all'utente ed alla categoria corretta
  assignVotes($event) {
    this.vote = $event;

    // Valorizzo firstGroupVotes e secondGroupVotes ogni volta che l'utente assegna un voto
    if (this.vote.groupId === this.groupsToVote[0].groupid) {
      switch (this.vote.categoryId) {
        case 1:
          this.firstGroupVotes.firstCategory = this.vote.rating;
          break;
        case 2:
          this.firstGroupVotes.secondCategory = this.vote.rating;
          break;
        case 3:
          this.firstGroupVotes.thirdCategory = this.vote.rating;
          break;
        case 4:
          this.firstGroupVotes.fourthCategory = this.vote.rating;
          break;
        case 5:
          this.firstGroupVotes.fifthCategory = this.vote.rating;
          break;
      }
    } else if (this.vote.groupId === this.groupsToVote[1].groupid) {
      switch (this.vote.categoryId) {
        case 1:
          this.secondGroupVotes.firstCategory = this.vote.rating;
          break;
        case 2:
          this.secondGroupVotes.secondCategory = this.vote.rating;
          break;
        case 3:
          this.secondGroupVotes.thirdCategory = this.vote.rating;
          break;
        case 4:
          this.secondGroupVotes.fourthCategory = this.vote.rating;
          break;
        case 5:
          this.secondGroupVotes.fifthCategory = this.vote.rating;
          break;
      }
    }
  }

  // Invio i voti a DB
  postDinnerVotes() {
    this.bottomPanel.destroy({ animate: true });
    const firstGroup = {
      userIds: [this.groupsToVote[0].firstUserId, this.groupsToVote[0].secondUserId],
      votes: this.firstGroupVotes
    };
    const secondGroup = {
      userIds: [this.groupsToVote[1].firstUserId, this.groupsToVote[1].secondUserId],
      votes: this.secondGroupVotes
    };
    this.dinnersService.postGroupVotes([firstGroup, secondGroup], this.paramsService.getParams().groupId, this.dinner.id).then(() => {
      this.showThankYouAlert();
      this.hasVoted = true;
    });
  }

  // Istanzia il pannello inferiore
  presentBottomPanel() {
    const panel = document.getElementById('cupertinoVotes');

    // Opzioni pannello
    const panelSettings: CupertinoSettings = {
      initialBreak: 'top',
      breaks: {
        top: { enabled: true, height: window.screen.height * 0.5, bounce: true },
        middle: { enabled: false, height: window.screen.height * 0.25, bounce: true },
        bottom: { enabled: true, height: window.screen.height * 0.15 },
      },
      topperOverflow: false,
      bottomClose: false,
      buttonClose: false,
      showDraggable: false,
      onBackdropTap: () => this.bottomPanel.destroy({ animate: true })
    };

    // Inizializzo il pannello
    this.bottomPanel = new CupertinoPane(panel, panelSettings);

    // Presento il pannello
    this.bottomPanel.present({ animate: true });
  }

  // Mostra alert di ringraziamento dopo il voto
  async showThankYouAlert() {

    const alert = await this.alertController.create({
      header: 'Ottimo lavoro!',
      message: 'Grazie per aver votato! Tra poco scoprirai il vincitore della cena 🎉',
      buttons: ['OK']
    });

    await alert.present();
  }

}

export interface Vote {
  groupId: number;
  categoryId: number;
  rating: number;
}

export interface GroupVotes {
  groupId: number;
  firstCategory: number;
  secondCategory: number;
  thirdCategory: number;
  fourthCategory: number;
  fifthCategory: number;
}
