import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService } from './photo.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';


@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.page.html',
  styleUrls: ['./profile-photo.page.scss'],
})
export class ProfilePhotoPage implements OnInit {

  constructor(public photoService: PhotoService, public actionSheetController: ActionSheetController) {
    defineCustomElements(window);
  }
  ngOnInit() {
    this.photoService.loadSaved();
  }
}
