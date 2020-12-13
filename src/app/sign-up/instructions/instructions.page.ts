import { Component, OnInit } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.page.html',
  styleUrls: ['./instructions.page.scss'],
})
export class InstructionsPage implements OnInit {

  @ViewChild('slider', {static: false}) Slider: IonSlides;

  index=0;
  progressvalue =0;

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  goToGeolocation(){
    this.navController.navigateRoot('/auth/geolocation');
  }

  prova(){
    this.Slider.getActiveIndex()
    .then(activeIndex => {
      console.log('active index = ', activeIndex );
      this.index=activeIndex;
      this.progressvalue= (activeIndex*0.5);
   });
  }
}
