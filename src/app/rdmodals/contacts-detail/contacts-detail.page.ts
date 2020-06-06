import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContactsService } from '../../home/tabs/contacts/contacts.service';
import { RDToastService } from 'src/app/rdtoast.service';
import { RDParamsService } from 'src/app/rdparams.service';
import { BadgesService, UserBadge } from 'src/app/home/profile/badges.service';

@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.page.html',
  styleUrls: ['./contacts-detail.page.scss']
})
export class ContactsDetailPage implements OnInit {
  @Input() contactName: string;
  @Input() contactImage: string;
  @Input() contactId: number;

  contactBadges: UserBadge[] = [];

  constructor(private modalCtrl: ModalController,
    private contactsService: ContactsService,
    private badgesService: BadgesService,
    private rdToast: RDToastService,
    public paramsService: RDParamsService // Utilizzato nell'html della pagina, non rimuovere
  ) { }

  ngOnInit() {

    this.badgesService.getContactBadges(this.contactId).then(res => {
      this.contactBadges = this.contactBadges.concat(res);
    },
      () => {
        console.log('Errore getContactBadges');
      });

  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  // Richiede l'invio di notifica lato server al contatto per aggiungerlo al gruppo
  async onAddToGroupRequest() {
    this.contactsService.sendGroupInvite(this.contactId).then(
      () => { },
      (err) => { // Errore creazione gruppo
        this.rdToast.show(err.error);
        console.warn(err);
      }
    );
    this.modalCtrl.dismiss();
  }
}
