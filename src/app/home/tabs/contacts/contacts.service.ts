import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contacts } from '@ionic-native/contacts';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { RDConstantsService } from 'src/app/rdcostants.service';
import { RDSpinnerService } from 'src/app/rdspinner.service';
import { RDStorageService } from 'src/app/rdstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private _localContacts: RDContact[];
  private _matchingContacts: RDContact[];
  private syncInProgress = false;

  constructor(
    private http: HttpClient,
    private contacts: Contacts,
    private sanitizer: DomSanitizer,
    private platform: Platform,
    private rdConstants: RDConstantsService,
    private spinner: RDSpinnerService,
    private rdStorage: RDStorageService
  ) {
    this.readLocalContacts().then(
      () => {
        this.readMatchingContacts();
      }
    );
  }

  // Cancella dal localStorage i contatti che matchano
  public async clearMatchingContacts() {
    await this.rdStorage.setItem('matchingContacts', null);
    await this.readMatchingContacts();
  }

  // Cancella dal localStorage i contatti locali
  public async clearLocalContacts() {
    await this.rdStorage.setItem('localContacts', null);
    await this.readLocalContacts();
  }

  // Legge le informazioni utente presenti in localStorage e le carica nel Service
  private async readLocalContacts() {
    this._localContacts = JSON.parse(
      await this.rdStorage.getItem('localContacts')
    ) as RDContact[] || [];
  }

  // Legge le informazioni utente presenti in localStorage e le carica nel Service
  private async readMatchingContacts() {
    this._matchingContacts = JSON.parse(
      await this.rdStorage.getItem('matchingContacts')
    ) as RDContact[] || [];
  }

  // Aggiorna i localContacts in localStorage
  private async writeLocalContacts(localContacts: RDContact[]) {
    await this.rdStorage.setItem('localContacts', JSON.stringify(localContacts));
    await this.readLocalContacts();
  }

  // Aggiorna i matchingContacts in localStorage
  private async writeMatchingContacts(matchingContacts: RDContact[]) {
    await this.rdStorage.setItem('matchingContacts', JSON.stringify(matchingContacts));
    await this.readMatchingContacts();
  }

  // Legge i contatti all'interno del telefono
  public getLocalContacts(skipDuplicates: boolean, phone_number: number): Promise<RDContact[]> {
    return new Promise(async (resolve, reject) => {
      if ((!this._localContacts || !this._localContacts.length) && !this.syncInProgress) {
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
              phoneNumbers: ['3450166161'],
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
            },
            {
              name: 'Sid',
              phoneNumbers: ['+393914174499'],
              imageUrl: 'assets/Logo.png',
              userId: 0
            },
            {
              name: 'Matteo',
              phoneNumbers: ['+393338829439'],
              imageUrl: 'assets/Logo.png',
              userId: 0
            }
          ];
          await this.writeLocalContacts(testContacts);
          this.syncInProgress = false;
          resolve(testContacts);
        } else {
          const importedContacts: RDContact[] = [];
          const userPhone: any = phone_number;

          this.syncInProgress = true;

          // Importo contatti dal telefono
          this.contacts
            .find(['displayName', 'phoneNumbers', 'photos'])
            .then(async localContacts => {
              if (localContacts.length === 0) { // Se non trovo contatti rifiuto la promise
                console.warn('No contacts found');
                this.syncInProgress = false;
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

                  await this.writeLocalContacts(uniqueList);
                  this.syncInProgress = false;
                  resolve(this._localContacts);
                } else {
                  await this.writeLocalContacts(importedContacts);
                  this.syncInProgress = false;
                  resolve(importedContacts);
                }
              }
            });
        }
      } else {
        resolve(this._localContacts);
      }
    });
  }

  // Invio dei propri contatti al server, che restituisce quelli che fanno match
  public getMatchingContacts(localContacts): Promise<RDContact[]> {
    return new Promise((resolve, reject) => {
      if ((!this._matchingContacts || !this._matchingContacts.length) && !this.syncInProgress) {
        this.syncInProgress = true;
        this.http.post(
          this.rdConstants.getApiRoute('compareContacts'),
          localContacts
        ).subscribe(
          async (mathingContacts) => {
            await this.writeMatchingContacts(mathingContacts as RDContact[]);
            this.syncInProgress = false;
            resolve(this._matchingContacts);
          },
          (err) => {
            this.syncInProgress = false;
            console.warn(err);
            reject();
          }
        );
      } else {
        resolve(this._matchingContacts);
      }
    });
  }

  // Comparo contatti ottenuti dal server per visualizzare i nomi del contatto del telefono
  public compareContacts(returnedNumbers: RDContact[], localContacts: any[]) {
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
              localContacts[i].isInGroup = returnedNumbers[x].isInGroup;
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
  public async sendGroupInvite(userId: number, contactHouseId: number) {
    const addGroupBody = {
      userId: userId,
      contactHouseId: contactHouseId
    };
    await this.spinner.create();
    return this.http.post(this.rdConstants.getApiRoute('inviteGroup'), addGroupBody)
      .toPromise()
      .finally(
        () => { this.spinner.dismiss(); }
      );
  }
}

// Rappresenta i dati di un contatto sul telefono
export class RDContact {
  constructor() { }
  phoneNumbers: string[] = [];
  name: string;
  imageUrl: SafeUrl;
  userId: number;
  isInGroup?: boolean;
}
