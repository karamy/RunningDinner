import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-contacts-detail",
  templateUrl: "./contacts-detail.page.html",
  styleUrls: ["./contacts-detail.page.scss"]
})
export class ContactsDetailPage implements OnInit {
  @Input() contactName: string;
  @Input() contactImage: string;

  constructor() { }

  ngOnInit() {
    console.log(this.contactImage)
  }
}
