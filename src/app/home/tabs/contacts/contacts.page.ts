import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ContactsDetailPage } from "../../../rdmodals/contacts-detail/contacts-detail.page";
import { ContactsService, RDContact } from "./contacts.service";
import { RDSpinnerService } from 'src/app/rdspinner.service';

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
    private spinner: RDSpinnerService
  ) { }

  async showContact(contactName: string, contactImage: string, contactId: number) {
    this.modalOpen = true;
    const modal = await this.modalController.create({
      component: ContactsDetailPage,
      swipeToClose: true,
      backdropDismiss: true,
      componentProps: { contactName, contactImage, contactId },
      cssClass: "modal-style"
    });
    modal.onWillDismiss().then(() => {
      this.modalOpen = false;
    });
    return await modal.present();
  }

  ngOnInit() {
    this.spinner.create("Caricando Contatti...");
    this.fetchContacts().finally(() => {
      this.spinner.dismiss();
    })
  }

  fetchContacts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contactsService.getLocalContacts(true).then(
        // Ottengo i contatti del device
        localContacts => {
          this.contactsService.postContacts(localContacts).then(
            // Invio i contatti al server
            remoteMathContacts => {
              // Riempio la lista locale
              this.contactList = this.contactsService.compareContacts(
                remoteMathContacts,
                localContacts
              );
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
      )
    })
  }

  doRefresh(event) {
    this.fetchContacts().finally(() => {
      event.target.complete();
    })
  }
}
