import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RDToastService {

  constructor(private toastController: ToastController) { }

  // Crea un istanza del toast
  async show(message: string, duration?: number) {
    if (!duration) {
      duration = 2000; // Se non impostata la durata è 2 secondi
    }
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
    return toast;
  }
}
