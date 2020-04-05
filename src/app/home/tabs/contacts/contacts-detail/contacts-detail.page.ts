import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-contacts-detail",
  templateUrl: "./contacts-detail.page.html",
  styleUrls: ["./contacts-detail.page.scss"]
})
export class ContactsDetailPage implements OnInit {
  @Input() contactName: string;
  @Input() contactImage: string;

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {
    console.log(this.contactImage);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
