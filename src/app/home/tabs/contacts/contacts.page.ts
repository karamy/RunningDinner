import { Component, OnInit } from "@angular/core";
import { ModalController, IonRouterOutlet } from "@ionic/angular";
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
    private routerOutlet: IonRouterOutlet,
    private contactsService: ContactsService
  ) {}

  async showContact(contactName: string, contactImage) {
    const modal = await this.modalController.create({
      component: ContactsDetailPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.parentOutlet.nativeEl,
      componentProps: { contactName, contactImage }
    });
    return await modal.present();
  }

  ngOnInit() {
    this.contactsService.importContact().then(list => {
      this.contactList = this.contactsService.compareContacts(list);
    });
  }
}
