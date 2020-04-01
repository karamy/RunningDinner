import { Component, OnInit } from '@angular/core';
import { PhotoService } from './photo.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { SignupService } from '../signup-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.page.html',
  styleUrls: ['./profile-photo.page.scss'],
})
export class ProfilePhotoPage implements OnInit {
  photoData: string; // Rappresenta i dati da mostrare a video

  constructor(public photoService: PhotoService, private signupService: SignupService, private router: Router) {
    defineCustomElements(window); // CAPIRE PERCHè SERVE
  }

  // All'avvio carico l'immagine eventualmente salvata in localStorage
  ngOnInit() {
    this.loadPicture();
  }

  // Ottengo foto da camera o galleria
  async getPicture() {
    const data = await this.photoService.getPicture();
    if (data) {
      this.loadPicture();
    }
  }

  private loadPicture() {
    const data = this.photoService.profilePhotoData;
    if (data) {
      this.photoData = 'data:image/png;base64,' + data;
    }
  }

  goToProfilePhoto() {
    this.signupService.setProfilePhoto(this.photoService.profilePhotoData);
    this.router.navigateByUrl('/sign-up/address-map');
  }
}
