import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ContactsDetailPage } from "../../../rdmodals/contacts-detail/contacts-detail.page";
import { ContactsService, RDContact } from "./contacts.service";
import { RDSpinnerService } from 'src/app/rdspinner.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.page.html",
  styleUrls: ["./contacts.page.scss"]
})
export class ContactsPage implements OnInit {
  contactList: RDContact[] = [];
  modalOpen = false;

  constructor(
    public modalController: ModalController,
    private contactsService: ContactsService,
    private spinner: RDSpinnerService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.spinner.create("Caricando Contatti...");
    this.loadContacts().finally(() => {
      setTimeout(() => { // Necessario perchè altrimenti in caso di valore cache-ato non viene chiamato il finally
        this.spinner.dismiss();
      }, 200);
    });
  }

  async doRefresh(event) {
    await this.contactsService.clearLocalContacts();
    await this.contactsService.clearMatchingContacts();

    this.loadContacts().finally(() => {
      event.target.complete();
    });
  }

  loadContacts(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.contactsService.getLocalContacts(true, this.authService.getUserData().phone_number).then(
        // Ottengo i contatti del device
        localContacts => {
          this.contactsService.getMatchingContacts(localContacts).then(
            // Invio i contatti al server
            remoteMathContacts => {
              // Riempio la lista locale
              this.contactList = this.contactsService.compareContacts(remoteMathContacts, localContacts);
              resolve();
            },
            () => {
              console.error("Impossibile inviare contatti al server");
              reject();
            }
          );
        },
        () => {
          console.error("Impossibile leggere contatti dal dispositivo");
          reject();
        }
      );
    })
  }

  // Mostra i dettagli del contatto
  async onShowContact(contactName: string, contactImage: string, contactId: number, isInGroup: boolean) {
    this.modalOpen = true;
    const modal = await this.modalController.create({
      component: ContactsDetailPage,
      swipeToClose: true,
      backdropDismiss: true,
      componentProps: { contactName, contactImage, contactId, isInGroup },
      cssClass: "modal-style"
    });
    modal.onWillDismiss().then(() => {
      this.modalOpen = false;
    });
    return await modal.present();
  }
}
