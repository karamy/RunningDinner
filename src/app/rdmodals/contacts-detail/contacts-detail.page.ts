import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ContactsService } from '../../home/tabs/contacts/contacts.service';
import { RDToastService } from 'src/app/rdtoast.service';
import { RDParamsService } from 'src/app/rdparams.service';
import { BadgesService, UserBadge } from 'src/app/home/profile/badges.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionsService } from 'src/app/auth/permissions.service';

@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.page.html',
  styleUrls: ['./contacts-detail.page.scss']
})
export class ContactsDetailPage implements OnInit {
  @Input() contactName: string;
  @Input() contactImage: string;
  @Input() contactId: number;
  @Input() isInGroup: boolean;

  contactBadges: UserBadge[] = [];

  constructor(private modalCtrl: ModalController,
    private contactsService: ContactsService,
    private badgesService: BadgesService,
    private rdToast: RDToastService,
    public paramsService: RDParamsService, // Utilizzato nell'html della pagina, non rimuovere
    private alertController: AlertController,
    private authService: AuthService,
    private permissionService: PermissionsService
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

    // Verifico se utente ha disabilitato le notifiche perchè non riuscirebbe a ricevere la conferma di invio a gruppo
    try {
      await this.permissionService.hasNotificationPermission();

      const alert = await this.alertController.create({
        header: 'Nuovo invito',
        message: 'In quale casa ospiterai i tuoi amici?',
        buttons: [
          { // Casa mia
            text: 'Casa mia',
            handler: () => {
              this.sendInvite(this.authService.getUserData().userid);
            }
          },
          { // Casa dell'utente nel mio gruppo
            text: 'Casa di ' + this.contactName,
            handler: () => {
              this.sendInvite(this.contactId);
            }
          },
          'Annulla'
        ]
      });
      await alert.present();
    } catch (e) {
      console.log("AddToGroupRequest - Login attivo ma permission non date");
      this.rdToast.show("Notifiche disabilitare, impossibile aggiungere a gruppo");
      return;
    }
  }

  // Effettua la richiesta
  private sendInvite(contactHouseId: number) {
    this.contactsService.sendGroupInvite(this.contactId, contactHouseId).then(
      () => { },
      (err) => { // Errore creazione gruppo
        this.rdToast.show("Errore invito a gruppo");
        console.warn(err);
      }
    );
    this.modalCtrl.dismiss();
  }
}
