import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.page.html',
  styleUrls: ['./instructions.page.scss'],
})
export class InstructionsPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  goToGeolocation(){
    this.navController.navigateRoot('/auth/geolocation');
  }

}
