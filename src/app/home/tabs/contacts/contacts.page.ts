import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ContactsDetailPage } from "./contacts-detail/contacts-detail.page";
import { ContactsService } from "./contacts.service";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.page.html",
  styleUrls: ["./contacts.page.scss"]
})
export class ContactsPage implements OnInit {
  contactList = [];

  constructor(
    public modalController: ModalController,
    private contactsService: ContactsService
  ) { }

  async showContact(contactName: string, contactImage) {
    const modal = await this.modalController.create({
      component: ContactsDetailPage,
      swipeToClose: true,
      backdropDismiss: true,
      componentProps: { contactName, contactImage },
      cssClass: "modal-style"
    });
    return await modal.present();
  }

  ngOnInit() {
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
          },
          () => {
            console.error("Impossibile inviare contatti al server");
          }
        );
      },
      () => {
        console.error("Impossibile leggere contatti dal dispositivo");
      }
    );
  }
}
