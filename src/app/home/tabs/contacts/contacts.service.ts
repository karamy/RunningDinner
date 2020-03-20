import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Contacts } from "@ionic-native/contacts";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class ContactsService {
  importedContacts = [
    /*     {
      name: "Paolo",
      number: "+393483773817",
      image: "assets/dummy.png"
    },
    {
      name: "Arya",
      number: "+39333444078",
      image: "assets/dummy.png"
    },
    {
      name: "Nadia",
      number: "+393450166161",
      image: "assets/dummy.png"
    } */
  ];

  contactList = [];

  constructor(
    private http: HttpClient,
    private contacts: Contacts,
    private sanitizer: DomSanitizer
  ) {}

  importContact() {
    // Importo contatti dal telefono
    let promise = new Promise(resolve => {
      this.contacts
        .find(["displayName", "phoneNumbers", "photos"])
        .then(contacts => {
          if (contacts.length == 0) {
            alert("No Contacts found");
          } else {
            for (var i = 0; i < contacts.length; i++) {
              if (contacts[i].name !== null) {
                let contact = {};
                contact["name"] = contacts[i].name.formatted;
                if (contacts[i].phoneNumbers !== null) {
                  contact["number"] = contacts[i].phoneNumbers[0].value.replace(
                    /\s+/g,
                    ""
                  );
                }
                if (contacts[i].photos !== null) {
                  contact["image"] = this.sanitizer.bypassSecurityTrustUrl(
                    (<any>window).Ionic.WebView.convertFileSrc(
                      contacts[i].photos[0].value
                    )
                  );
                } else {
                  contact["image"] = "assets/dummy.png";
                }
                this.importedContacts.push(contact);
              }
            }
          }
          this.getContacts().then(data => {
            resolve(data);
          });
        });
      /* Scommentare per testare su Web
      this.getContacts().then(data => {
        resolve(data);
      }); */
    });
    return promise;
  }

  getContacts() {
    // POST dei contatti al DB
    let promise = new Promise((resolve, reject) => {
      /*      this.http.post(
        "https://runningdinnerapi.herokuapp.com/login",
        this.importedContacts
      ); */
      resolve([
        {
          number: "+393450166161"
        },
        {
          number: "+393483773817"
        },
        {
          number: "+393389082282"
        }
      ]);
    });
    return promise;
  }

  compareContacts(returnedNumbers) {
    //Comparo contatti importati con quelli ottenuti dal DB
    for (var i = 0; i < this.importedContacts.length; i++) {
      for (var x = 0; x < returnedNumbers.length; x++) {
        if (returnedNumbers[x].number == this.importedContacts[i].number) {
          this.contactList.push(this.importedContacts[i]);
        }
      }
    }
    //Ordino contactList
    this.contactList = this.contactList.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    // Rimuovo duplicati
    const uniqueList = Array.from(
      new Set(this.contactList.map(a => a.number))
    ).map(number => {
      return this.contactList.find(a => a.number == number);
    });
    console.log(uniqueList);
    return uniqueList;
  }
}
