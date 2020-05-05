import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ContactsService } from '../../home/tabs/contacts/contacts.service';
import { RDParamsService } from 'src/app/rdparams.service';

@Component({
  selector: "app-contacts-detail",
  templateUrl: "./contacts-detail.page.html",
  styleUrls: ["./contacts-detail.page.scss"]
})
export class ContactsDetailPage implements OnInit {
  @Input() contactName: string;
  @Input() contactImage: string;
  @Input() contactId: string;

  constructor(private modalCtrl: ModalController,
    private contactsService: ContactsService,
    public paramsService: RDParamsService) { }

  ngOnInit() { }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  // Richiede l'invio di notifica lato server al contatto per aggiungerlo al gruppo
  async onAddToGroupRequest() {
    this.contactsService.sendGroupInvite(this.contactId).then(
      () => { // Gruppo creato, ricarico parametri
        /* this.paramsService.loadParams().then(
          () => {
            this.modalCtrl.dismiss();
          },
          () => { // Errore ricaricamento parametri
            console.warn("Errore caricamento parametri");
          }
        ); */
        this.modalCtrl.dismiss();
      },
      (err) => { // Errore creazione gruppo
        console.warn(err);
      }
    );
  }
}
