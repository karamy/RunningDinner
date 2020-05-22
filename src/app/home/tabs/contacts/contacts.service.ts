import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contacts } from '@ionic-native/contacts';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { RDConstantsService } from 'src/app/rdcostants.service';
import { AuthService } from 'src/app/auth/auth.service';
import { RDSpinnerService } from 'src/app/rdspinner.service';

// Rappresenta i dati di un contatto sul telefono
export class RDContact {
  constructor() { }
  phoneNumbers: string[] = [];

  name: string;
  imageUrl: SafeUrl;
  userId: number;
}


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private http: HttpClient,
    private contacts: Contacts,
    private sanitizer: DomSanitizer,
    private platform: Platform,
    private rdConstants: RDConstantsService,
    private authService: AuthService,
    private spinner: RDSpinnerService
  ) { }

  // Legge i contatti all'interno del telefono
  getLocalContacts(skipDuplicates: boolean): Promise<RDContact[]> {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('cordova')) {
        const testContacts: RDContact[] = [ // Contatti di test per il Web
          {
            name: 'Carlo',
            phoneNumbers: ['+393408552105'],
            imageUrl: 'assets/dummy.png',
            userId: 0
          },
          {
            name: 'Paolo',
            phoneNumbers: ['+393483773817'],
            imageUrl: 'assets/Logo.png',
            userId: 0
          },
          {
            name: 'Fringo',
            phoneNumbers: ['+393483773819'],
            imageUrl: 'assets/Logo.png',
            userId: 0
          },
          {
            name: 'Pange',
            phoneNumbers: ['+393495339159'],
            imageUrl: 'assets/dummy.png',
            userId: 0
          },
          {
            name: 'Nadia',
            phoneNumbers: ['+393450166161'],
            imageUrl: 'assets/dummy.png',
            userId: 0
          },
          {
            name: 'Ale',
            phoneNumbers: ['+393460500674'],
            imageUrl: 'assets/dummy.png',
            userId: 0
          },
          {
            name: 'Emulatore',
            phoneNumbers: ['+391234567890'],
            imageUrl: 'assets/dummy.png',
            userId: 0
          },
          {
            name: 'Chiara',
            phoneNumbers: ['+393496824393'],
            imageUrl: 'assets/Logo.png',
            userId: 0
          }
        ];
        resolve(testContacts);
      } else {
        const importedContacts: RDContact[] = [];
        const userPhone: any = this.authService.getUserData().phone_number;

        // Importo contatti dal telefono
        this.contacts
          .find(['displayName', 'phoneNumbers', 'photos'])
          .then(localContacts => {
            if (localContacts.length === 0) { // Se non trovo contatti rifiuto la promise
              console.warn('No contacts found');
              reject();
            } else {
              for (let i = 0; i < localContacts.length; i++) {
                if (localContacts[i].phoneNumbers !== null) {
                  const newContact: RDContact = new RDContact();
                  if (localContacts[i].name !== null) {
                    newContact.name = localContacts[i].name.formatted;
                  }
                  if (localContacts[i].photos !== null) {
                    newContact.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
                      (window as any).Ionic.WebView.convertFileSrc(
                        localContacts[i].photos[0].value
                      )
                    );
                  } else {
                    newContact.imageUrl = 'assets/dummy.png';
                  }
                  for (let x = 0; x < localContacts[i].phoneNumbers.length; x++) {
                    if (localContacts[i].phoneNumbers[x].value.replace(/\s+/g, '') !== userPhone) { //Controllo che non sia il proprio numero
                      newContact.phoneNumbers.push(localContacts[i].phoneNumbers[x].value.replace(/\s+/g, ''))
                    }
                  }
                  importedContacts.push(newContact);
                }
              }

              // Rimuovo eventualmente i duplicati
              if (skipDuplicates) {
                const uniqueList = Array.from(
                  new Set(importedContacts.map(a => a.phoneNumbers))
                ).map(phoneNumbers => {
                  return importedContacts.find(a => a.phoneNumbers === phoneNumbers);
                });
                resolve(uniqueList);
              } else {
                resolve(importedContacts);
              }
            }
          });
      }
    });
  }

  // Invio dei propri contatti al server, che restituisce quelli che fanno match
  postContacts(localContacts): Promise<RDContact[]> {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.rdConstants.getApiRoute('compareContacts'),
        localContacts
      ).subscribe(
        (mathingContacts) => {
          resolve(mathingContacts as RDContact[]);
        },
        (err) => {
          console.warn(err);
          reject();
        }
      );
    });
  }

  // Comparo contatti ottenuti dal server per visualizzare i nomi del contatto del telefono
  compareContacts(returnedNumbers: RDContact[], localContacts: any[]) {
    let contactList = [];
    for (let counter = 0; counter < 4; counter++) {
      for (let i = 0; i < localContacts.length; i++) {
        if (localContacts[i].phoneNumbers.length > counter) {
          for (let x = 0; x < returnedNumbers.length; x++) {
            if (returnedNumbers[x].phoneNumbers === localContacts[i].phoneNumbers[counter] && !contactList.find(contact => contact.phoneNumbers[0] === localContacts[i].phoneNumbers[counter])) { //Match e rimuovo duplicati
              // Assegno immagine dal server al contatto
              localContacts[i].imageUrl = 'data:image/png;base64,' + returnedNumbers[x].imageUrl
              let tempPhoneNumber = localContacts[i].phoneNumbers[counter]
              localContacts[i].phoneNumbers = []
              localContacts[i].phoneNumbers.push(tempPhoneNumber)
              localContacts[i].userId = returnedNumbers[x].userId;
              contactList.push(localContacts[i]);
              break;
            }
          }
        }
      }
    }

    // Ordino contactList
    contactList = contactList.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    return contactList;
  }

  // Richiede l'invio di notifica lato server al contatto per aggiungerlo al gruppo
  async sendGroupInvite(userId) {
    const addGroupBody = {
      userId: userId
    };
    await this.spinner.create();
    return this.http.post(this.rdConstants.getApiRoute('inviteGroup'), addGroupBody)
      .toPromise()
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }

  // Scioglie il gruppo di cui fa parte l'utente, anche qui in automatico dovrebbe
  // inviare una notifica all'altro partecipante, che viene informato dell'azione fatta
  async leaveGroup(groupId) {
    const leaveGroupBody = {
      groupId: groupId
    };
    await this.spinner.create();
    return this.http.post(this.rdConstants.getApiRoute('leaveGroup'), leaveGroupBody)
      .toPromise()
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }

}
