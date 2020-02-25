import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { ContactsDetailPage } from './contacts-detail/contacts-detail.page';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  contacts: any[];
  constructor(public modalController: ModalController,private routerOutlet: IonRouterOutlet) { }

  async showContact(contactName: string) {
    const modal = await this.modalController.create({
      component: ContactsDetailPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.parentOutlet.nativeEl
    });
    return await modal.present();
  }
  ngOnInit() {
    this.contacts = [
      {
        name: "pino"
      },
      {
        name: "gino"
      }
    ];
  }

}
