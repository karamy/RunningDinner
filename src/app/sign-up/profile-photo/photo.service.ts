import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

const { Camera } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public profilePhotoData: string; // Rappresenta il Base64 della foto scattata
  private photoStorageName = 'profile_photo';

  // Impostato a true per debug il fatto di mantenere l'immagine della registrazione in corso anche chiudendo l'app
  private isCachingImage = true;

  constructor() {
    this.loadSaved(); // Carico alla creazione del service i dati dell'immagine
  }

  // Ottiene il Base64 dell'immagine profilo eventualmente salvata
  public async loadSaved() {
    this.profilePhotoData = localStorage.getItem(this.photoStorageName);
    return this.profilePhotoData;
  }

  // Ottiene il Base64 di una foto da galleria o fotocamera, eventualmente salvandolo
  public async getPicture() {
    const capturedPhoto = await Camera.getPhoto({
      allowEditing: true,
      resultType: CameraResultType.Base64, // richiedo il Base64 per memorizzarlo direttamente
      source: CameraSource.Prompt, // richiedo se aprire galleria o fotocamera
      quality: 100 // massima qualità (0 to 100)
    });

    this.profilePhotoData = capturedPhoto.base64String;

    // Se richiesto caching salvo i dati dell'immagine in localStorage
    if (this.isCachingImage) {
      localStorage.setItem(this.photoStorageName, this.profilePhotoData);
    }

    return this.profilePhotoData;
  }
}
