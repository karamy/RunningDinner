import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.page.html',
  styleUrls: ['./credits.page.scss'],
})
export class CreditsPage implements AfterViewInit {

  @ViewChild('audio', { static: false }) public _audioRef: ElementRef;
  private audio: HTMLMediaElement;

  constructor(private modalCtrl: ModalController) { }

  ngAfterViewInit() {
    setTimeout(
      () => {
        this.dismiss();
      },
      20000
    );
    this.audio = this._audioRef.nativeElement;
    this.audio.play();
  }

  dismiss() {
    this.audio.pause();
    this.modalCtrl.dismiss();
  }
}
