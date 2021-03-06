import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ContactsDetailPage } from "../../../rdmodals/contacts-detail/contacts-detail.page";
import { ContactsService, RDContact } from "./contacts.service";
import { RDSpinnerService } from 'src/app/rdspinner.service';
import { AuthService } from 'src/app/auth/auth.service';
import { RDToastService } from "src/app/rdtoast.service";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.page.html",
  styleUrls: ["./contacts.page.scss"]
})
export class ContactsPage implements OnInit {
  contactList: RDContact[] = [];
  modalOpen = false;
  syncInProgress: boolean;

  constructor(
    public modalController: ModalController,
    private contactsService: ContactsService,
    private spinner: RDSpinnerService,
    private authService: AuthService,
    private rdToast: RDToastService
  ) { }

  ngOnInit() {
    // this.spinner.create("Caricando Contatti...");
    this.loadContacts()
    /* .finally(() => {
      setTimeout(() => { // Necessario perchè altrimenti in caso di valore cache-ato non viene chiamato il finally
        this.spinner.dismiss();
      }, 2000);
    }); */
  }

  async doRefresh(event) {
    await this.contactsService.clearLocalContacts();
    await this.contactsService.clearMatchingContacts();

    this.loadContacts().finally(() => {
      event.target.complete();
    });
  }

  loadContacts(): Promise<void> {
    // Mostro ion-skeleton
    this.syncInProgress = true;

    return new Promise((resolve, reject) => {
      this.contactsService.getLocalContacts(true, this.authService.getUserData().phone_number).then(
        // Ottengo i contatti del device
        localContacts => {
          this.contactsService.getMatchingContacts(localContacts).then(
            // Invio i contatti al server
            remoteMathContacts => {
              // Popolo una lista temporanea
              const tempList = this.contactList;
              // Riempio la lista locale
              this.contactList = this.contactsService.compareContacts(remoteMathContacts, localContacts);
              // Se aggiunti/rimossi contatti mostro un toast
              if (tempList.length !== this.contactList.length) {
                //this.showAddedContactsToast(tempList); Per ora rimosso perchè all'apertura dell'app lo faceva sempre
              }

              // Fine della sincronizzazione, tolgo ion-skeleton
              this.syncInProgress = false;
              resolve();
            },
            () => {
              // Fine della sincronizzazione, tolgo ion-skeleton
              this.syncInProgress = false;

              console.error("Impossibile inviare contatti al server");
              reject();
            }
          );
        },
        () => {
          // Fine della sincronizzazione, tolgo ion-skeleton
          this.syncInProgress = false;

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

  // Mostro un toast se cambiamento nei contatti
  showAddedContactsToast(tempList) {
    const diff = (this.contactList.length - tempList.length);
    let message: string;
    if (diff > 0) {
      if (diff > 1) {
        message = 'Aggiunti ' + diff + ' contatti'
      } else {
        message = 'Aggiunto ' + diff + ' contatto'
      }
    } else {
      if (diff < -1) {
        message = 'Rimossi ' + Math.abs(diff) + ' contatti'
      } else {
        message = 'Rimosso ' + Math.abs(diff) + ' contatto'
      }
    }
    this.rdToast.show(message);
  }
}
