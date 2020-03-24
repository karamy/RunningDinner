import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contacts } from '@ionic-native/contacts';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { RDCostantsService } from 'src/app/rdcostants.service';

// Rappresente i dati di un contatto sul telefono
export class RDContact {
  constructor() { }

  name: string;
  phoneNumber: string;
  imageUrl: SafeUrl;
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
    private rdCostants: RDCostantsService
  ) { }

  // Legge i contatti all'interno del telefono
  getLocalContacts(skipDuplicates: boolean): Promise<RDContact[]> {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('cordova')) {
        const testContacts: RDContact[] = [ // Contatti di test per il Web
          {
            name: 'Paolo',
            phoneNumber: '+393483773817',
            imageUrl: 'assets/dummy.png'
          },
          {
            name: 'Arya',
            phoneNumber: '+39333444078',
            imageUrl: 'assets/dummy.png'
          },
          {
            name: 'Nadia',
            phoneNumber: '+393450166161',
            imageUrl: 'assets/dummy.png'
          }
        ];

        resolve(testContacts);
      } else {
        const importedContacts: RDContact[] = [];

        // Importo contatti dal telefono
        this.contacts
          .find(['displayName', 'phoneNumbers', 'photos'])
          .then(localContacts => {
            if (localContacts.length === 0) { // Se non trovo contatti rifiuto la promise
              console.warn('No contacts found');
              reject();
            } else {
              for (let i = 0; i < localContacts.length; i++) {
                if (localContacts[i].name !== null) {
                  const newContact: RDContact = new RDContact();
                  newContact.name = localContacts[i].name.formatted;
                  if (localContacts[i].phoneNumbers !== null) {
                    newContact.phoneNumber = localContacts[i].phoneNumbers[0].value.replace(/\s+/g, '');
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
                  importedContacts.push(newContact);
                }
              }

              // Rimuovo eventualmente i duplicati
              if (skipDuplicates) {
                const uniqueList = Array.from(
                  new Set(importedContacts.map(a => a.phoneNumber))
                ).map(phoneNumber => {
                  return importedContacts.find(a => a.phoneNumber === phoneNumber);
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
        this.rdCostants.getApiRoute('compareContacts'),
        localContacts
      ).subscribe(
        (mathingContacts) => {
          resolve(mathingContacts as unknown as RDContact[]);
        },
        (err) => {
          console.warn(err);
          reject();
        }
      );
      /* resolve([
        {
          number: '+393450166161'
        },
        {
          number: '+393483773817'
        },
        {
          number: '+393389082282'
        }
      ]); */
    });
  }

  // Comparo contatti ottenuti dal server per visualizzare i nomi del contatto del telefono
  compareContacts(returnedNumbers: RDContact[], localContacts: RDContact[]) {
    let contactList = [];

    for (let i = 0; i < localContacts.length; i++) {
      for (let x = 0; x < returnedNumbers.length; x++) {
        if (returnedNumbers[x].phoneNumber === localContacts[i].phoneNumber) {
          contactList.push(localContacts[i]);
        }
      }
    }

    // Ordino contactList
    contactList = contactList.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return contactList;
  }
}
